const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/SuccessCases.tsx');

// Leer el archivo
let content = fs.readFileSync(filePath, 'utf8');

// Actualizar todas las rutas de imágenes y dimensiones
const replacements = [
  // Caso 2
  {
    old: 'src="/img/antes-despues/2-ensamble-antes.jpg"',
    new: 'src="/img/antes-despues/optimized/2-ensamble-antes.jpg"',
  },
  {
    old: 'src="/img/antes-despues/2-ensamble-despues.jpg"',
    new: 'src="/img/antes-despues/optimized/2-ensamble-despues.jpg"',
  },
  // Caso 3
  {
    old: 'src="/img/antes-despues/3-mantenimiento-pc-sencillo-antes.JPG"',
    new: 'src="/img/antes-despues/optimized/3-mantenimiento-pc-sencillo-antes.JPG"',
  },
  {
    old: 'src="/img/antes-despues/3-mantenimiento-pc-sencillo-despues.jpg"',
    new: 'src="/img/antes-despues/optimized/3-mantenimiento-pc-sencillo-despues.jpg"',
  },
];

// Actualizar dimensiones
const dimensionReplacements = [
  {
    old: 'width={280}',
    new: 'width={320}',
  },
  {
    old: 'height={180}',
    new: 'height={200}',
  },
];

// Aplicar reemplazos de rutas
replacements.forEach((replacement) => {
  content = content.replace(new RegExp(replacement.old, 'g'), replacement.new);
});

// Aplicar reemplazos de dimensiones
dimensionReplacements.forEach((replacement) => {
  content = content.replace(new RegExp(replacement.old, 'g'), replacement.new);
});

// Escribir el archivo actualizado
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ SuccessCases.tsx actualizado con imágenes optimizadas');
console.log('📐 Dimensiones actualizadas a 320x200 (ratio 16:10)');
console.log('🖼️ Todas las imágenes ahora usan la carpeta /optimized/');
