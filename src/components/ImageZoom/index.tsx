'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import styles from './ImageZoom.module.css';

export interface ImageZoomProps {
  src: string;
  alt: string;
  zoomScale?: number;
  sizes?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  objectFit?: 'cover' | 'contain';
  className?: string;
  badgePosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export default function ImageZoom({
  src,
  alt,
  zoomScale = 2.2,
  sizes = '(max-width: 768px) 100vw, 500px',
  priority = false,
  loading,
  objectFit = 'cover',
  className = '',
  badgePosition = 'bottom-right',
}: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    setPosition({ x, y });
    setIsZoomed(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
    setPosition({ x: 50, y: 50 });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }

      const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100));

      setPosition({ x, y });
      setIsZoomed(true);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsZoomed(false);
    setPosition({ x: 50, y: 50 });
  }, []);

  const toggleZoomLock = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed((prev) => !prev);
  }, []);

  const badgePositionStyle: React.CSSProperties = {
    top: badgePosition.startsWith('top') ? 12 : 'auto',
    bottom: badgePosition.startsWith('bottom') ? 12 : 'auto',
    left: badgePosition.endsWith('left') ? 12 : 'auto',
    right: badgePosition.endsWith('right') ? 12 : 'auto',
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.zoomContainer} ${isZoomed ? styles.zoomContainerActive : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label={`Visualizador con zoom para ${alt}`}
    >
      <div
        className={`${styles.imageWrapper} ${isZoomed ? styles.imageWrapperZoomed : ''}`}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
          transform: isZoomed ? `scale(${zoomScale})` : 'scale(1)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={loading}
          className={`${styles.zoomImg} ${objectFit === 'contain' ? styles.zoomImgContain : ''}`}
        />
      </div>

      {/* Floating Loupe Badge */}
      <button
        type="button"
        className={`${styles.loupeBadge} ${isZoomed ? styles.loupeBadgeActive : ''}`}
        onClick={toggleZoomLock}
        style={badgePositionStyle}
        aria-label={isZoomed ? 'Desactivar lupa' : 'Activar lupa de aumento'}
        title="Lupa de inspección detallada"
      >
        <span className={styles.loupeIcon} aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </span>
        <span>{isZoomed ? `${zoomScale}x` : 'Lupa'}</span>
      </button>
    </div>
  );
}
