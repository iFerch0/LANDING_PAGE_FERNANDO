'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const hasImages = images && images.length > 0;
  const displayImages = hasImages ? images : ['/images/placeholder-product.jpg'];
  const currentImage = displayImages[selectedIndex];

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  const handleMainImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1));
    setIsZoomed(false);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  return (
    <div className={styles.gallery}>
      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <button
          className={styles.mainImageButton}
          onClick={handleMainImageClick}
          aria-label={isZoomed ? 'Cerrar zoom' : 'Ver imagen ampliada'}
        >
          <div className={`${styles.mainImage} ${isZoomed ? styles.zoomed : ''}`}>
            <Image
              src={currentImage}
              alt={`${alt} - Imagen ${selectedIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={selectedIndex === 0}
              className={styles.image}
            />
          </div>
        </button>

        {/* Navigation Arrows (only if multiple images) */}
        {displayImages.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.navPrev}`}
              onClick={handlePrevious}
              aria-label="Imagen anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className={`${styles.navButton} ${styles.navNext}`}
              onClick={handleNext}
              aria-label="Imagen siguiente"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* Zoom Hint */}
        {!isZoomed && (
          <div className={styles.zoomHint}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
              <path d="M11 8v6M8 11h6" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Click para ampliar</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className={styles.thumbnails}>
          {displayImages.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${
                index === selectedIndex ? styles.thumbnailActive : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${alt} - Miniatura ${index + 1}`}
                fill
                sizes="100px"
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {displayImages.length > 1 && (
        <div className={styles.counter}>
          {selectedIndex + 1} / {displayImages.length}
        </div>
      )}
    </div>
  );
}
