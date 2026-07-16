'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';
import styles from './PortfolioModal.module.css';
import BeforeAfterSlider from './BeforeAfterSlider';
import { PortfolioBuild, PortfolioMaintenance } from '@/data/portfolio';

type PortfolioModalProps = {
  isOpen: boolean;
  onClose: () => void;
  builds: PortfolioBuild[];
  maintenance: PortfolioMaintenance[];
};

type TabType = 'build' | 'maintenance';

const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  builds,
  maintenance,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(builds.length > 0 ? 'build' : 'maintenance');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedBeforeIndex, setSelectedBeforeIndex] = useState(0);
  const [selectedAfterIndex, setSelectedAfterIndex] = useState(0);

  const currentItems = useMemo(() => {
    return activeTab === 'build' ? builds : maintenance;
  }, [activeTab, builds, maintenance]);

  if (!isOpen || (builds.length === 0 && maintenance.length === 0)) {return null;}

  const currentItem = currentItems[currentIndex];
  const isBuild = activeTab === 'build';
  const buildItem = isBuild ? (currentItem as PortfolioBuild) : null;
  const maintenanceItem = !isBuild ? (currentItem as PortfolioMaintenance) : null;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setSelectedImageIndex(0);
    setSelectedBeforeIndex(0);
    setSelectedAfterIndex(0);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentItems.length - 1 : prev - 1));
    setSelectedImageIndex(0);
    setSelectedBeforeIndex(0);
    setSelectedAfterIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === currentItems.length - 1 ? 0 : prev + 1));
    setSelectedImageIndex(0);
    setSelectedBeforeIndex(0);
    setSelectedAfterIndex(0);
  };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleBeforeSelect = (index: number) => {
    setSelectedBeforeIndex(index);
  };

  const handleAfterSelect = (index: number) => {
    setSelectedAfterIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {handlePrevious();}
    if (e.key === 'ArrowRight') {handleNext();}
    if (e.key === 'Escape') {onClose();}
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio viewer"
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.tabs}>
            {builds.length > 0 && (
              <button
                className={`${styles.tab} ${activeTab === 'build' ? styles.tabActive : ''}`}
                onClick={() => handleTabChange('build')}
              >
                PC Armadas
                <span className={styles.tabCount}>({builds.length})</span>
              </button>
            )}
            {maintenance.length > 0 && (
              <button
                className={`${styles.tab} ${activeTab === 'maintenance' ? styles.tabActive : ''}`}
                onClick={() => handleTabChange('maintenance')}
              >
                Mantenimiento
                <span className={styles.tabCount}>({maintenance.length})</span>
              </button>
            )}
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar portafolio">
            <CloseIcon size={24} />
          </button>
        </div>

        {/* Counter */}
        <div className={styles.counterBar}>
          <span className={styles.counter}>
            {currentIndex + 1} / {currentItems.length}
          </span>
        </div>

        {/* Main content */}
        <div className={styles.content}>
          {/* Image gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              {isBuild && buildItem ? (
                <Image
                  src={buildItem.images[selectedImageIndex]}
                  alt={`${buildItem.title} - Imagen ${selectedImageIndex + 1}`}
                  fill
                  className={styles.image}
                  priority
                />
              ) : (
                <BeforeAfterSlider
                  beforeImage={maintenanceItem!.beforeImages[selectedBeforeIndex]}
                  afterImage={maintenanceItem!.afterImages[selectedAfterIndex]}
                  beforeAlt={`${currentItem.title} - Antes ${selectedBeforeIndex + 1}`}
                  afterAlt={`${currentItem.title} - Después ${selectedAfterIndex + 1}`}
                />
              )}
            </div>

            {/* Thumbnails for builds */}
            {isBuild && buildItem && buildItem.images.length > 1 && (
              <div className={styles.thumbnails}>
                {buildItem.images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${
                      index === selectedImageIndex ? styles.thumbnailActive : ''
                    }`}
                    onClick={() => handleImageSelect(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <Image
                      src={buildItem.images[index]}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Thumbnails for maintenance - Before */}
            {!isBuild && maintenanceItem && maintenanceItem.beforeImages.length > 1 && (
              <div className={styles.thumbnails}>
                <span className={styles.thumbnailLabel}>Antes:</span>
                {maintenanceItem.beforeImages.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${
                      index === selectedBeforeIndex ? styles.thumbnailActive : ''
                    }`}
                    onClick={() => handleBeforeSelect(index)}
                    aria-label={`Ver antes ${index + 1}`}
                  >
                    <Image
                      src={maintenanceItem.beforeImages[index]}
                      alt={`Antes ${index + 1}`}
                      fill
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Thumbnails for maintenance - After */}
            {!isBuild && maintenanceItem && maintenanceItem.afterImages.length > 1 && (
              <div className={styles.thumbnails}>
                <span className={styles.thumbnailLabel}>Después:</span>
                {maintenanceItem.afterImages.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${
                      index === selectedAfterIndex ? styles.thumbnailActive : ''
                    }`}
                    onClick={() => handleAfterSelect(index)}
                    aria-label={`Ver después ${index + 1}`}
                  >
                    <Image
                      src={maintenanceItem.afterImages[index]}
                      alt={`Después ${index + 1}`}
                      fill
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className={styles.infoPanel}>
            <h2 className={styles.title}>{currentItem.title}</h2>
            <p className={styles.description}>{currentItem.description}</p>

            {/* Specs for builds */}
            {isBuild && buildItem && (
              <div className={styles.specs}>
                <h3 className={styles.specsTitle}>Especificaciones Técnicas</h3>
                <div className={styles.specsGrid}>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Procesador</span>
                    <span className={styles.specValue}>{buildItem.specs.cpu}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Memoria RAM</span>
                    <span className={styles.specValue}>{buildItem.specs.ram}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Almacenamiento</span>
                    <span className={styles.specValue}>{buildItem.specs.storage}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Placa Base</span>
                    <span className={styles.specValue}>{buildItem.specs.motherboard}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Fuente</span>
                    <span className={styles.specValue}>{buildItem.specs.psu}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Refrigeración</span>
                    <span className={styles.specValue}>{buildItem.specs.cooling}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Chasis</span>
                    <span className={styles.specValue}>{buildItem.specs.case}</span>
                  </div>
                  {buildItem.specs.gpu && (
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>GPU</span>
                      <span className={styles.specValue}>{buildItem.specs.gpu}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Problem/Solution for maintenance */}
            {!isBuild && maintenanceItem && (
              <div className={styles.maintenanceInfo}>
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Problema</h3>
                  <p className={styles.infoText}>{maintenanceItem.problem}</p>
                </div>
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Solución</h3>
                  <p className={styles.infoText}>{maintenanceItem.solution}</p>
                </div>
              </div>
            )}

            <div className={styles.yearBadge}>
              {isBuild ? `Armado en ${currentItem.year}` : `Servicio en ${currentItem.year}`}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={handlePrevious}
            aria-label="Trabajo anterior"
          >
            <ChevronLeftIcon size={24} />
            <span>Anterior</span>
          </button>
          <button className={styles.navButton} onClick={handleNext} aria-label="Trabajo siguiente">
            <span>Siguiente</span>
            <ChevronRightIcon size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
