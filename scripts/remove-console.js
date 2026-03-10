#!/usr/bin/env node
/**
 * remove-console.js
 * Elimina todas las llamadas a console.* del proyecto usando el AST de TypeScript.
 * Preciso: no toca strings que contengan "console.log", solo llamadas reales.
 *
 * Uso:
 *   node scripts/remove-console.js            # modifica archivos
 *   node scripts/remove-console.js --dry-run  # solo muestra qué cambiaría
 *   node scripts/remove-console.js --list     # lista cada console encontrado
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const DRY_RUN = process.argv.includes('--dry-run');
const LIST_MODE = process.argv.includes('--list');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

const SKIP_DIRS = new Set([
  'node_modules',
  '.next',
  'out',
  'build',
  '.git',
  'coverage',
  '__tests__',
  '__mocks__',
]);

const SKIP_FILES = new Set(['next-env.d.ts']);

const TS_EXTS = new Set(['.ts', '.tsx', '.mjs', '.js']);

const CONSOLE_METHODS = new Set([
  'log',
  'error',
  'warn',
  'info',
  'debug',
  'trace',
  'table',
  'dir',
  'dirxml',
  'group',
  'groupEnd',
  'groupCollapsed',
  'time',
  'timeEnd',
  'timeLog',
  'count',
  'countReset',
  'assert',
  'clear',
  'profile',
  'profileEnd',
  'timeStamp',
]);

function collectFiles(dir) {
  const results = [];

  function walk(current) {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (TS_EXTS.has(ext) && !SKIP_FILES.has(entry.name)) {
          results.push(full);
        }
      }
    }
  }

  walk(dir);
  return results;
}

/**
 * Devuelve true si el nodo es una llamada console.*(...)
 */
function isConsoleCall(node) {
  if (!ts.isCallExpression(node)) return false;
  const expr = node.expression;
  if (!ts.isPropertyAccessExpression(expr)) return false;
  const obj = expr.expression;
  const method = expr.name.text;
  return ts.isIdentifier(obj) && obj.text === 'console' && CONSOLE_METHODS.has(method);
}

/**
 * Analiza un archivo y devuelve los rangos de los console.* a eliminar.
 * Cada rango incluye el statement completo y la línea si está sola.
 */
function findConsoleRanges(source, filePath) {
  const ext = path.extname(filePath);
  const scriptKind =
    ext === '.tsx' || ext === '.jsx'
      ? ts.ScriptKind.TSX
      : ext === '.mjs' || ext === '.js'
        ? ts.ScriptKind.JS
        : ts.ScriptKind.TS;

  const sourceFile = ts.createSourceFile(
    path.basename(filePath),
    source,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  );

  const hits = [];

  function visit(node) {
    if (ts.isExpressionStatement(node) && isConsoleCall(node.expression)) {
      const expr = node.expression;
      const method = expr.expression.name.text;
      const line = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
      hits.push({ pos: node.pos, end: node.end, method, line });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return hits;
}

/**
 * Elimina los rangos del source text.
 * Cuando el console.* está solo en su línea, elimina la línea completa.
 */
function applyRemovals(source, ranges) {
  ranges.sort((a, b) => b.pos - a.pos);

  let result = source;

  for (const range of ranges) {
    const before = result.slice(0, range.pos);
    let end = range.end;

    const lineStart = before.lastIndexOf('\n') + 1;
    const beforeOnLine = before.slice(lineStart).trim();
    const afterStatement = result.slice(end);
    const nextNewline = afterStatement.indexOf('\n');
    const afterOnLine =
      nextNewline === -1 ? afterStatement.trim() : afterStatement.slice(0, nextNewline).trim();

    if (beforeOnLine === '' && afterOnLine === '') {
      let pos = lineStart;
      if (result[end] === '\n') end++;
      result = result.slice(0, pos) + result.slice(end);
    } else {
      result = result.slice(0, range.pos).trimEnd() + result.slice(end);
    }
  }

  result = result.replace(/\n{3,}/g, '\n\n');
  return result;
}

function processFile(filePath) {
  let source;
  try {
    source = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return { status: 'error', message: err.message, hits: [] };
  }

  let ranges;
  try {
    ranges = findConsoleRanges(source, filePath);
  } catch (err) {
    return { status: 'error', message: err.message, hits: [] };
  }

  if (ranges.length === 0) return { status: 'unchanged', hits: [] };

  const result = applyRemovals(source, ranges);

  if (!DRY_RUN && !LIST_MODE) {
    try {
      fs.writeFileSync(filePath, result, 'utf-8');
    } catch (err) {
      return { status: 'error', message: err.message, hits: ranges };
    }
  }

  return { status: 'modified', hits: ranges };
}

const allFiles = collectFiles(SRC_DIR);

const mode = LIST_MODE ? '🔍 Listando' : DRY_RUN ? '🔍 Dry run —' : '🗑️  Eliminando';
console.log(`${mode} console.* en el proyecto...\n`);

let totalModified = 0;
let totalHits = 0;
let errors = 0;

for (const file of allFiles) {
  const rel = path.relative(PROJECT_ROOT, file);
  const { status, hits, message } = processFile(file);

  if (status === 'modified') {
    totalModified++;
    totalHits += hits.length;
    if (LIST_MODE) {
      console.log(`  ${rel}`);
      for (const h of hits) {
        console.log(`    línea ${h.line}: console.${h.method}()`);
      }
    } else {
      const label = hits.map((h) => `console.${h.method}`).join(', ');
      console.log(`  ✓ ${rel}  (${hits.length}: ${label})`);
    }
  } else if (status === 'error') {
    console.error(`  ✗ ${rel}: ${message}`);
    errors++;
  }
}

console.log(
  `\n${DRY_RUN || LIST_MODE ? 'Encontrados' : 'Eliminados'}: ${totalHits} console.* en ${totalModified} archivos${errors ? ` | Errores: ${errors}` : ''}`
);

if ((DRY_RUN || LIST_MODE) && totalHits > 0) {
  console.log('\nEjecuta sin flags para aplicar los cambios.');
}
