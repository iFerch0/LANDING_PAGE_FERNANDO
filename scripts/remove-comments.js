#!/usr/bin/env node
/**
 * remove-comments.js
 * Elimina todos los comentarios del proyecto usando el compilador de TypeScript
 * para archivos TS/TSX/JS (preciso, sin falsos positivos en strings/URLs)
 * y regex para archivos CSS (sintaxis más simple).
 *
 * Uso:
 *   node scripts/remove-comments.js            # modifica archivos
 *   node scripts/remove-comments.js --dry-run  # solo muestra qué cambiaría
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// ── Config ──────────────────────────────────────────────────────────────────

const DRY_RUN = process.argv.includes('--dry-run');

const PROJECT_ROOT = path.resolve(__dirname, '..');

/** Directorios a ignorar completamente */
const SKIP_DIRS = new Set(['node_modules', '.next', 'out', 'build', '.git', 'coverage', '.cache']);

/** Archivos individuales a ignorar */
const SKIP_FILES = new Set(['next-env.d.ts']);

/** Extensiones procesadas como TypeScript/JavaScript */
const TS_EXTS = new Set(['.ts', '.tsx', '.mjs', '.js']);

/** Extensiones procesadas como CSS */
const CSS_EXTS = new Set(['.css']);

/** Archivos de configuración en la raíz a incluir */
const ROOT_CONFIG_FILES = ['eslint.config.mjs', 'next.config.ts']
  .map((f) => path.join(PROJECT_ROOT, f))
  .filter(fs.existsSync);

// ── File discovery ──────────────────────────────────────────────────────────

function collectFiles(dir, extensions) {
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
        if (extensions.has(ext) && !SKIP_FILES.has(entry.name)) {
          results.push(full);
        }
      }
    }
  }

  walk(dir);
  return results;
}

// ── TypeScript comment stripper ─────────────────────────────────────────────

function stripTSComments(source, filePath) {
  const ext = path.extname(filePath);
  const base = path.basename(filePath);

  // Determinar ScriptKind
  const scriptKind =
    ext === '.tsx' || ext === '.jsx'
      ? ts.ScriptKind.TSX
      : ext === '.mjs' || ext === '.js'
        ? ts.ScriptKind.JS
        : ts.ScriptKind.TS;

  const sourceFile = ts.createSourceFile(base, source, ts.ScriptTarget.Latest, true, scriptKind);

  // Recopilar rangos de comentarios únicos
  const seen = new Set();
  const ranges = [];

  function collect(node) {
    const leading = ts.getLeadingCommentRanges(source, node.pos);
    if (leading) {
      for (const r of leading) {
        const key = `${r.pos}:${r.end}`;
        if (!seen.has(key)) {
          seen.add(key);
          ranges.push(r);
        }
      }
    }
    ts.forEachChild(node, collect);
  }

  collect(sourceFile);

  // Ordenar de mayor a menor posición para que el splicing no desplace índices
  ranges.sort((a, b) => b.pos - a.pos);

  let result = source;

  for (const range of ranges) {
    const before = result.slice(0, range.pos);
    let end = range.end;

    // Si el comentario ocupa toda la línea, eliminar también esa línea
    const lineStart = before.lastIndexOf('\n') + 1;
    const beforeOnLine = before.slice(lineStart).trim();

    if (beforeOnLine === '') {
      // Comentario en línea propia → eliminar línea completa (con su \n final)
      let pos = lineStart;
      if (result[end] === '\n') end++;
      result = result.slice(0, pos) + result.slice(end);
    } else {
      // Comentario inline → solo eliminar el comentario
      // Preservar un espacio si había uno antes
      const trailingSpace = result[end] === ' ' ? '' : '';
      result = result.slice(0, range.pos).trimEnd() + trailingSpace + result.slice(end);
    }
  }

  // Colapsar más de 2 líneas en blanco consecutivas
  result = result.replace(/\n{3,}/g, '\n\n');

  return result;
}

// ── CSS comment stripper ────────────────────────────────────────────────────

function stripCSSComments(source) {
  // Elimina /* ... */ preservando cantidad de líneas (para no desplazar números)
  const result = source.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    const newlines = (match.match(/\n/g) || []).length;
    return '\n'.repeat(newlines);
  });

  return result.replace(/\n{3,}/g, '\n\n');
}

// ── Process single file ─────────────────────────────────────────────────────

function processFile(filePath) {
  const ext = path.extname(filePath);
  let source;

  try {
    source = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return { status: 'error', message: err.message };
  }

  let result;
  try {
    if (TS_EXTS.has(ext)) {
      result = stripTSComments(source, filePath);
    } else if (CSS_EXTS.has(ext)) {
      result = stripCSSComments(source);
    } else {
      return { status: 'skipped' };
    }
  } catch (err) {
    return { status: 'error', message: err.message };
  }

  if (result === source) return { status: 'unchanged' };

  if (!DRY_RUN) {
    try {
      fs.writeFileSync(filePath, result, 'utf-8');
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  }

  return { status: 'modified' };
}

// ── Main ────────────────────────────────────────────────────────────────────

const srcDir = path.join(PROJECT_ROOT, 'src');

const tsFiles = collectFiles(srcDir, TS_EXTS);
const cssFiles = collectFiles(srcDir, CSS_EXTS);
const allFiles = [...tsFiles, ...ROOT_CONFIG_FILES, ...cssFiles];

console.log(
  DRY_RUN ? '🔍 Dry run — no se modificará ningún archivo\n' : '🗑️  Eliminando comentarios...\n'
);

let modified = 0;
let errors = 0;

for (const file of allFiles) {
  const rel = path.relative(PROJECT_ROOT, file);
  const { status, message } = processFile(file);

  if (status === 'modified') {
    console.log(`  ✓ ${rel}`);
    modified++;
  } else if (status === 'error') {
    console.error(`  ✗ ${rel}: ${message}`);
    errors++;
  }
}

const total = allFiles.length;
console.log(
  `\n${DRY_RUN ? 'Cambiarían' : 'Modificados'}: ${modified}/${total} archivos${errors ? ` | Errores: ${errors}` : ''}`
);

if (DRY_RUN && modified > 0) {
  console.log('\nEjecuta sin --dry-run para aplicar los cambios.');
}
