import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'img', 'pc-hogar-oficina');

    // Leer todos los archivos de la carpeta
    const files = fs.readdirSync(imagesDir);

    // Filtrar solo archivos de imagen
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];
    const imageFiles = files.filter((file) =>
      imageExtensions.some((ext) => file.toLowerCase().endsWith(ext.toLowerCase()))
    );

    // Crear array de objetos con información de las imágenes
    const images = imageFiles.map((file, index) => ({
      id: index + 1,
      src: `/img/pc-hogar-oficina/${file}`,
      alt: `Reparación de computadores - Imagen ${index + 1}`,
      filename: file,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
