const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TARGET_WIDTH = 320;
const TARGET_HEIGHT = 200;
const QUALITY = 90;

const INPUT_DIR = path.join(__dirname, '../public/img/antes-despues');
const OUTPUT_DIR = path.join(__dirname, '../public/img/antes-despues/optimized');

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(
      `📸 Procesando: ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`
    );

    // Calcular las dimensiones para crop centrado manteniendo ratio 16:10
    const targetRatio = TARGET_WIDTH / TARGET_HEIGHT; // 1.6
    const currentRatio = metadata.width / metadata.height;

    let cropWidth,
      cropHeight,
      left = 0,
      top = 0;

    if (currentRatio > targetRatio) {
      // Imagen más ancha, recortar los lados
      cropHeight = metadata.height;
      cropWidth = Math.round(cropHeight * targetRatio);
      left = Math.round((metadata.width - cropWidth) / 2);
    } else {
      // Imagen más alta, recortar arriba y abajo
      cropWidth = metadata.width;
      cropHeight = Math.round(cropWidth / targetRatio);
      top = Math.round((metadata.height - cropHeight) / 2);
    }

    await sharp(inputPath)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        kernel: sharp.kernel.lanczos3,
        fit: 'fill',
      })
      .jpeg({
        quality: QUALITY,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(outputPath);

    console.log(`✅ Optimizada: ${path.basename(outputPath)} (${TARGET_WIDTH}x${TARGET_HEIGHT})`);
  } catch (error) {
    console.error(`❌ Error procesando ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('🚀 Iniciando optimización de imágenes Success Cases...\n');

  try {
    const files = fs.readdirSync(INPUT_DIR).filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

    if (files.length === 0) {
      console.log('⚠️  No se encontraron imágenes para optimizar');
      return;
    }

    console.log(`📁 Encontradas ${files.length} imágenes:`);
    files.forEach((file) => console.log(`   - ${file}`));
    console.log('');

    for (const file of files) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, file);
      await optimizeImage(inputPath, outputPath);
    }

    console.log(`\n🎉 Optimización completada!`);
    console.log(`📊 Dimensiones finales: ${TARGET_WIDTH}x${TARGET_HEIGHT} (ratio 16:10)`);
    console.log(`📁 Imágenes optimizadas en: /public/img/antes-despues/optimized/`);
    console.log(
      '\n💡 Tip: Actualiza las rutas en SuccessCases.tsx para usar las imágenes optimizadas'
    );
  } catch (error) {
    console.error('❌ Error durante la optimización:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  optimizeAllImages();
}

module.exports = { optimizeAllImages };
