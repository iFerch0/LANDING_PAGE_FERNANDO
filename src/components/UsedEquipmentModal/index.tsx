'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageZoom from '../ImageZoom';
import styles from './UsedEquipmentModal.module.css';
import {
  usedEquipmentList,
  CATEGORY_FILTERS,
  EquipmentCategory,
  getEquipmentWhatsAppUrl,
} from '@/data/usedEquipment';
import { WhatsAppIcon } from '../Icons';

interface UsedEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function renderSpecIcon(label: string) {
  const norm = label.toLowerCase();
  if (norm.includes('procesador') || norm.includes('cpu')) {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    );
  }
  if (norm.includes('refrigera') || norm.includes('cooling') || norm.includes('líquida')) {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  }
  if (norm.includes('ram') || norm.includes('memoria')) {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 7h20v10H2z" />
        <path d="M6 11v2M10 11v2M14 11v2M18 11v2" />
      </svg>
    );
  }
  if (norm.includes('almacenamiento') || norm.includes('ssd') || norm.includes('m.2') || norm.includes('disco')) {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <path d="M21 16H3M21 8H3" />
      </svg>
    );
  }
  if (norm.includes('chasis') || norm.includes('gabinete') || norm.includes('torre') || norm.includes('fan')) {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="7" r="2" />
        <circle cx="12" cy="14" r="2" />
        <path d="M9 19h6" />
      </svg>
    );
  }
  if (norm.includes('fuente') || norm.includes('poder') || norm.includes('power')) {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
      </svg>
    );
  }
  if (norm.includes('año') || norm.includes('ensamble') || norm.includes('fecha')) {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export default function UsedEquipmentModal({ isOpen, onClose }: UsedEquipmentModalProps) {
  const [activeCategory, setActiveCategory] = useState<EquipmentCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return usedEquipmentList;
    }
    return usedEquipmentList.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const currentItem = filteredItems[currentIndex] || filteredItems[0];

  // Reset indices when category changes
  const handleCategoryChange = (cat: EquipmentCategory) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setCurrentImageIndex(0);
  };

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    setCurrentImageIndex(0);
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    setCurrentImageIndex(0);
  }, [filteredItems.length]);

  // Keyboard navigation (Escape to close, Arrows to slide)
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) {
      return;
    }
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  if (!isOpen) {
    return null;
  }

  const activePhoto = currentItem
    ? currentItem.images[currentImageIndex] || currentItem.images[0]
    : '';

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="used-equipment-title"
    >
      <div className={styles.modalContent} role="document">
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTitleGroup}>
            <h2 id="used-equipment-title" className={styles.modalTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={styles.titleLightning} aria-hidden="true">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>Equipos de Segunda</span>
            </h2>
            <span className={styles.modalBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Garantizados
            </span>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar catálogo de equipos"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Category Filters */}
        <div className={styles.filterBar} role="tablist" aria-label="Filtrar por categoría">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`${styles.filterTab} ${activeCategory === cat.id ? styles.filterTabActive : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Slider Body or Empty State */}
        {!currentItem ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon} aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>No hay equipos disponibles en esta categoría</h3>
            <p className={styles.emptyText}>
              Por el momento no contamos con unidades en stock para esta categoría. Si buscas un modelo específico o deseas encargar uno, escríbenos directamente.
            </p>
            <button
              type="button"
              className={styles.emptyBtn}
              onClick={() => handleCategoryChange('all')}
            >
              Ver todos los equipos disponibles
            </button>
          </div>
        ) : (
          <div
            className={styles.sliderBody}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
          {/* Left Column: Visuals & Gallery */}
          <div className={styles.galleryCol}>
            <div className={styles.mainImageFrame}>
              {/* Floating Header Badges on Image */}
              <div className={styles.imageOverlayTop}>
                <span className={styles.categoryPill}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  {currentItem.categoryLabel}
                </span>
                <button
                  type="button"
                  className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteBtnActive : ''}`}
                  onClick={() => setIsFavorite((prev) => !prev)}
                  aria-label="Guardar equipo en favoritos"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={isFavorite ? '#ef4444' : 'none'}
                    stroke={isFavorite ? '#ef4444' : 'currentColor'}
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Main Image with Interactive Hardware Loupe */}
              <ImageZoom
                key={activePhoto}
                src={activePhoto}
                alt={currentItem.title}
                zoomScale={2.4}
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />

              {/* Floating Bottom Counter */}
              <div className={styles.imageOverlayBottom}>
                <span className={styles.photoCountBadge}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  {currentImageIndex + 1} / {currentItem.images.length}
                </span>
              </div>

              {/* Photo internal navigation if more than 1 image */}
              {currentItem.images.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.photoNavBtn} ${styles.photoNavPrev}`}
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev > 0 ? prev - 1 : currentItem.images.length - 1
                      )
                    }
                    aria-label="Foto anterior del equipo"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className={`${styles.photoNavBtn} ${styles.photoNavNext}`}
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev < currentItem.images.length - 1 ? prev + 1 : 0
                      )
                    }
                    aria-label="Foto siguiente del equipo"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {currentItem.images.length > 1 && (
              <div className={styles.thumbStrip} aria-label="Miniaturas de fotos">
                {currentItem.images.map((imgSrc, i) => (
                  <button
                    key={imgSrc}
                    type="button"
                    className={`${styles.thumbBtn} ${i === currentImageIndex ? styles.thumbBtnActive : ''}`}
                    onClick={() => setCurrentImageIndex(i)}
                    aria-label={`Ver foto ${i + 1} de ${currentItem.title}`}
                  >
                    <Image
                      src={imgSrc}
                      alt={`Miniatura ${i + 1}`}
                      fill
                      sizes="80px"
                      className={styles.thumbImg}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Specs */}
          <div className={styles.infoCol}>
            <div className={styles.itemHeader}>
              <div className={styles.metaRow}>
                <div className={styles.idGroup}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                  <span className={styles.itemId}>{currentItem.id} • {currentItem.categoryLabel.toUpperCase()}</span>
                </div>
                <div className={styles.badgesWrapper}>
                  <span className={styles.purpleBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {currentItem.badge}
                  </span>
                  <span className={styles.greenBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {currentItem.condition}
                  </span>
                </div>
              </div>
              <h3 className={styles.itemTitle}>{currentItem.title}</h3>
              <p className={styles.itemSubtitle}>{currentItem.subtitle}</p>
            </div>

            {/* Price Box */}
            <div className={styles.priceBox}>
              <div className={styles.priceGroup}>
                <span className={styles.priceCurrent}>{currentItem.price}</span>
              </div>
              {currentItem.priceNote && (
                <span className={styles.priceNote}>
                  <span className={styles.handshakeEmoji} aria-hidden="true">🤝</span>
                  {currentItem.priceNote}
                </span>
              )}
              <span className={styles.warrantyTag}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {currentItem.warranty}
              </span>
            </div>

            {/* Specs Section */}
            <div className={styles.specsSection}>
              <div className={styles.specsHeader}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={styles.gearIcon} aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <h4 className={styles.sectionHeading}>Especificaciones Técnicas</h4>
              </div>
              <div className={styles.specsGrid}>
                {currentItem.specs.map((spec) => {
                  const isFullWidth = spec.label.toLowerCase().includes('año') || spec.label.toLowerCase().includes('ensamble');
                  return (
                    <div key={spec.label} className={`${styles.specCard} ${isFullWidth ? styles.specCardFull : ''}`}>
                      <div className={styles.specIconBox} aria-hidden="true">
                        {renderSpecIcon(spec.label)}
                      </div>
                      <div className={styles.specTextCol}>
                        <span className={styles.specLabel}>{spec.label}</span>
                        <span className={styles.specValue}>{spec.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Highlights */}
            {currentItem.highlights.length > 0 && (
              <div className={styles.highlightsContainer}>
                <div className={styles.highlightsGrid}>
                  {currentItem.highlights.map((highlight, idx) => (
                    <div key={idx} className={styles.highlightItem}>
                      <span className={styles.checkIcon} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct WhatsApp CTA */}
            <div className={styles.ctaWrapper}>
              <Link
                href={getEquipmentWhatsAppUrl(currentItem)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappCta}
              >
                <WhatsAppIcon size={20} />
                <span>Consultar Disponibilidad por WhatsApp</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.ctaArrow} aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

        {/* Modal Footer / Navigation Controls */}
        {currentItem && (
          <div className={styles.modalFooter}>
            <span className={styles.counterText}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              Equipo {currentIndex + 1} de {filteredItems.length}
            </span>
            <div className={styles.sliderNavControls}>
              <button
                type="button"
                className={styles.sliderNavBtn}
                onClick={handlePrev}
                aria-label="Equipo anterior"
              >
                ← Anterior
              </button>
              <button
                type="button"
                className={styles.sliderNavBtn}
                onClick={handleNext}
                aria-label="Equipo siguiente"
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
