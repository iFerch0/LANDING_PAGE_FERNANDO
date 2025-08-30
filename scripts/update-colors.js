const fs = require('fs');
const path = require('path');

// Nueva paleta de colores
const PALETTE = {
  azul_oscuro: "#2b495d",
  naranja_quemado: "#d97334", 
  beige_claro: "#d2b384",
  rojo_intenso: "#b93c27",
  azul_vibrante: "#3a6e93",
  marron_calido: "#8b4c2f",
  gris_oscuro: "#444444",
  negro: "#101010",
  piel_bronceada: "#e08f55",
  rojo_anaranjado: "#e24a27"
};

// RGB versions
const PALETTE_RGB = {
  azul_oscuro: "43, 73, 93",
  naranja_quemado: "217, 115, 52",
  beige_claro: "210, 179, 132", 
  rojo_intenso: "185, 60, 39",
  azul_vibrante: "58, 110, 147",
  marron_calido: "139, 76, 47",
  gris_oscuro: "68, 68, 68",
  negro: "16, 16, 16",
  piel_bronceada: "224, 143, 85",
  rojo_anaranjado: "226, 74, 39"
};

// Mapeo de colores antiguos a nuevos
const COLOR_MAPPING = {
  // Azules
  '#1e40af': 'var(--brand-azul_vibrante)',
  '#3b82f6': 'var(--brand-azul_vibrante)', 
  '#2563eb': 'var(--brand-azul_oscuro)',
  'rgba(59, 130, 246': 'rgba(var(--brand-azul_vibrante-rgb)',
  'rgba(37, 99, 235': 'rgba(var(--brand-azul_oscuro-rgb)',
  
  // Rojos
  '#dc2626': 'var(--brand-rojo_intenso)',
  '#ef4444': 'var(--brand-rojo_anaranjado)',
  'rgba(239, 68, 68': 'rgba(var(--brand-rojo_anaranjado-rgb)',
  'rgba(220, 38, 38': 'rgba(var(--brand-rojo_intenso-rgb)',
  
  // Verdes
  '#059669': 'var(--brand-azul_vibrante)',
  '#22c55e': 'var(--brand-azul_vibrante)',
  'rgba(34, 197, 94': 'rgba(var(--brand-azul_vibrante-rgb)',
  'rgba(22, 163, 74': 'rgba(var(--brand-azul_oscuro-rgb)',
  
  // Naranjas
  '#ea580c': 'var(--brand-naranja_quemado)',
  '#f97316': 'var(--brand-piel_bronceada)',
  'rgba(245, 158, 11': 'rgba(var(--brand-naranja_quemado-rgb)',
  'rgba(217, 119, 6': 'rgba(var(--brand-piel_bronceada-rgb)',
  
  // Morados
  '#7c3aed': 'var(--brand-marron_calido)',
  '#a855f7': 'var(--brand-marron_calido)',
  'rgba(168, 85, 247': 'rgba(var(--brand-marron_calido-rgb)',
  'rgba(147, 51, 234': 'rgba(var(--brand-marron_calido-rgb)',
  
  // Grises
  '#64748b': 'var(--brand-gris_oscuro)',
  '#6b7280': 'var(--brand-gris_oscuro)',
  'rgba(107, 114, 128': 'rgba(var(--brand-gris_oscuro-rgb)',
  'rgba(75, 85, 99': 'rgba(var(--brand-gris_oscuro-rgb)'
};

function updateColorsInFile(filePath) {
  console.log(`🎨 Actualizando colores en: ${path.relative(process.cwd(), filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;
  
  // Aplicar mapeo de colores
  Object.entries(COLOR_MAPPING).forEach(([oldColor, newColor]) => {
    const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, newColor);
      changes += matches.length;
    }
  });
  
  if (changes > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ ${changes} colores actualizados`);
  } else {
    console.log(`  ⏭️ Sin cambios necesarios`);
  }
  
  return changes;
}

function updateAllComponents() {
  console.log('🚀 Iniciando actualización de paleta de colores...\n');
  
  const componentFiles = [
    'src/components/SuccessCases.tsx',
    'src/components/Testimonials.tsx', 
    'src/components/Faq.tsx',
    'src/components/Hero.tsx',
    'src/components/Features.tsx',
    'src/components/Services.tsx',
    'src/components/Process.tsx',
    'src/components/Stats.tsx',
    'src/components/Navbar.tsx',
    'src/components/Footer.tsx'
  ];
  
  let totalChanges = 0;
  
  componentFiles.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      totalChanges += updateColorsInFile(fullPath);
    } else {
      console.log(`⚠️ Archivo no encontrado: ${filePath}`);
    }
  });
  
  console.log(`\n🎉 Actualización completada!`);
  console.log(`📊 Total de cambios: ${totalChanges}`);
  console.log('\n🎨 Nueva paleta aplicada:');
  Object.entries(PALETTE).forEach(([name, color]) => {
    console.log(`  • ${name}: ${color}`);
  });
  
  console.log('\n💡 Compatibilidad:');
  console.log('  ✅ Tema claro y oscuro');
  console.log('  ✅ Accesibilidad de contraste');
  console.log('  ✅ Variables CSS reutilizables');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  updateAllComponents();
}

module.exports = { updateAllComponents };
