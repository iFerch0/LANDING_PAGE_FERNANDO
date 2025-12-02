// src/lib/storage.ts
import { supabase } from './supabase';

const BUCKET_NAME = 'products';

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  folder: string = 'images'
): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

  // Upload file
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading image:', error);
    throw new Error(`Error uploading image: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

/**
 * Upload multiple images
 * @param files - Array of files to upload
 * @param folder - Optional folder path within the bucket
 * @param onProgress - Callback for progress updates
 * @returns Array of public URLs
 */
export async function uploadMultipleImages(
  files: File[],
  folder: string = 'images',
  onProgress?: (completed: number, total: number) => void
): Promise<string[]> {
  const urls: string[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const url = await uploadImage(files[i], folder);
    urls.push(url);
    onProgress?.(i + 1, files.length);
  }

  return urls;
}

/**
 * Delete an image from Supabase Storage
 * @param imageUrl - The public URL of the image to delete
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  // Extract path from URL
  const urlParts = imageUrl.split(`/storage/v1/object/public/${BUCKET_NAME}/`);
  if (urlParts.length !== 2) {
    throw new Error('Invalid image URL');
  }

  const filePath = urlParts[1];

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    console.error('Error deleting image:', error);
    throw new Error(`Error deleting image: ${error.message}`);
  }
}

/**
 * Validate image file
 * @param file - The file to validate
 * @returns Validation result
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Tipo de archivo no permitido. Use JPG, PNG, WebP o GIF.',
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: 'El archivo es muy grande. Máximo 5MB.',
    };
  }

  return { valid: true };
}
