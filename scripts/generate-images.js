const fs = require('fs');
const path = require('path');

// Función para generar el array de imágenes
function generateImagesArray() {
  const imagesDir = path.join(__dirname, '..', 'public', 'img', 'pc-hogar-oficina');

  try {
    const files = fs.readdirSync(imagesDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    const imageFiles = files.filter((file) =>
      imageExtensions.some((ext) => file.toLowerCase().endsWith(ext))
    );

    const imagesArray = imageFiles.map((file, index) => ({
      id: index + 1,
      src: `/img/pc-hogar-oficina/${file}`,
      alt: `Reparación de computadores - Imagen ${index + 1}`,
    }));

    // Generar el código TypeScript
    const tsCode = `// Auto-generated file - Do not edit manually
// Generated on: ${new Date().toISOString()}

export interface SlideData {
  id: number;
  src: string;
  alt: string;
}

export const PC_IMAGES: SlideData[] = ${JSON.stringify(imagesArray, null, 2)};
`;

    // Escribir el archivo
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'pc-images.ts');
    fs.writeFileSync(outputPath, tsCode);

    console.log(`✅ Generated ${imagesArray.length} images in src/data/pc-images.ts`);
    return imagesArray;
  } catch (error) {
    console.error('Error generating images array:', error);
    return [];
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  generateImagesArray();
}

module.exports = { generateImagesArray };
