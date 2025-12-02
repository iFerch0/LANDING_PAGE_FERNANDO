'use client';

import { useState, useRef, useCallback } from 'react';
import { uploadImage, validateImageFile, deleteImage } from '@/lib/storage';
import styles from './ImageUploader.module.css';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onChange, maxImages = 6 }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    // Check max images
    if (images.length + fileArray.length > maxImages) {
      setError(`Máximo ${maxImages} imágenes permitidas`);
      return;
    }

    // Validate all files first
    for (const file of fileArray) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error || 'Archivo inválido');
        return;
      }
    }

    setError(null);
    setUploading(true);
    setUploadProgress({ current: 0, total: fileArray.length });

    const newUrls: string[] = [];

    try {
      for (let i = 0; i < fileArray.length; i++) {
        const url = await uploadImage(fileArray[i]);
        newUrls.push(url);
        setUploadProgress({ current: i + 1, total: fileArray.length });
      }

      onChange([...images, ...newUrls]);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Error al subir imagen');
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  }, [images, onChange, maxImages]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFiles]);

  const handleRemoveImage = useCallback(async (index: number) => {
    const imageUrl = images[index];
    
    // Try to delete from storage (only if it's a Supabase URL)
    if (imageUrl.includes('supabase.co/storage')) {
      try {
        await deleteImage(imageUrl);
      } catch (err) {
        console.error('Error deleting image from storage:', err);
        // Continue anyway to remove from UI
      }
    }

    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  }, [images, onChange]);

  const handleReorder = useCallback((fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    onChange(newImages);
  }, [images, onChange]);

  const moveImage = useCallback((index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < images.length) {
      handleReorder(index, newIndex);
    }
  }, [images.length, handleReorder]);

  return (
    <div className={styles.container}>
      {/* Drop Zone */}
      <div
        className={`${styles.dropZone} ${isDragging ? styles.dragging : ''} ${uploading ? styles.uploading : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleFileInput}
          className={styles.fileInput}
          disabled={uploading}
        />

        {uploading ? (
          <div className={styles.uploadingState}>
            <div className={styles.spinner}></div>
            <p>Subiendo imagen {uploadProgress?.current} de {uploadProgress?.total}...</p>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${uploadProgress ? (uploadProgress.current / uploadProgress.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className={styles.dropContent}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className={styles.dropText}>
              <strong>Arrastra imágenes aquí</strong> o haz clic para seleccionar
            </p>
            <span className={styles.dropHint}>
              JPG, PNG, WebP o GIF • Máximo 5MB • {images.length}/{maxImages} imágenes
            </span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.error}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          {error}
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className={styles.previewGrid}>
          {images.map((url, index) => (
            <div key={url} className={styles.previewItem}>
              <img src={url} alt={`Imagen ${index + 1}`} className={styles.previewImage} />
              
              {/* Badge for main image */}
              {index === 0 && (
                <span className={styles.mainBadge}>Principal</span>
              )}

              {/* Actions */}
              <div className={styles.previewActions}>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); moveImage(index, 'left'); }}
                    className={styles.actionBtn}
                    title="Mover a la izquierda"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); moveImage(index, 'right'); }}
                    className={styles.actionBtn}
                    title="Mover a la derecha"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemoveImage(index); }}
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  title="Eliminar imagen"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help text */}
      <p className={styles.helpText}>
        La primera imagen será la imagen principal del producto
      </p>
    </div>
  );
}
