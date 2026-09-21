'use client';

import React from 'react';
import styles from './UsedEquipmentBanner.module.css';

interface UsedEquipmentBannerProps {
  onOpenModal: () => void;
}

export default function UsedEquipmentBanner({ onOpenModal }: UsedEquipmentBannerProps) {
  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.bannerCard}>
        {/* Left: Device Icon & Equipment Overview */}
        <div className={styles.leftCol}>
          <div className={styles.iconBox} aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="13" height="18" rx="2" />
              <circle cx="8.5" cy="7" r="1" fill="currentColor" />
              <line x1="5.5" y1="11" x2="11.5" y2="11" />
              <line x1="5.5" y1="14" x2="11.5" y2="14" />
              <rect x="13" y="10" width="9" height="11" rx="1.5" />
              <line x1="12" y1="21" x2="23" y2="21" />
            </svg>
          </div>

          <div className={styles.textGroup}>
            <div className={styles.titleRow}>
              <span className={styles.mainTag}>EQUIPOS DISPONIBLES</span>
              <span className={styles.stockBadge}>Actualizado hoy</span>
            </div>
            <div className={styles.headline}>
              Equipos de segunda testeados y listos para entrega
            </div>
            <div className={styles.subtext}>
              Torres Gamer • Portátiles • PCs
            </div>
          </div>
        </div>

        {/* Center: Clean Technical Assurance Points */}
        <div className={styles.centerCol} aria-hidden="true">
          <div className={styles.divider} />
          <div className={styles.metricsList}>
            <div className={styles.metricItem}>
              <span className={styles.checkIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className={styles.metricText}>
                <span className={styles.metricTop}>100%</span>
                <span className={styles.metricBottom}>TESTEADOS</span>
              </div>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.checkIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className={styles.metricText}>
                <span className={styles.metricTop}>MANTENIMIENTO</span>
                <span className={styles.metricBottom}>INCLUIDO</span>
              </div>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.checkIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className={styles.metricText}>
                <span className={styles.metricTop}>GARANTÍA</span>
                <span className={styles.metricBottom}>DIRECTA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tactile Hardware Action */}
        <div className={styles.rightCol}>
          <button
            type="button"
            className={styles.ctaButton}
            onClick={onOpenModal}
            aria-haspopup="dialog"
            aria-label="Ver equipos de segunda disponibles con garantía"
          >
            <span className={styles.gridIcon} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </span>
            <span className={styles.btnLabel}>VER EQUIPOS</span>
            <span className={styles.arrowIcon} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
