'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './PcPortfolioSlider.module.css';
import { whatsappUrl } from '@/data/contact';
import { builds, maintenance, PortfolioMaintenance } from '@/data/portfolio';
import { CpuIcon, WrenchIcon, DiagnosticIcon, CheckCircleIcon, ZapIcon } from '../Icons';

const isVideo = (src: string) => /\.(mp4|webm|ogg|mov)$/i.test(src);

type TabType = 'builds' | 'maintenance';

const PcPortfolioSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('builds');

  // Builds state
  const [currentBuildIdx, setCurrentBuildIdx] = useState(0);
  const [currentBuildImage, setCurrentBuildImage] = useState(0);

  // Maintenance state
  const [currentMaintIdx, setCurrentMaintIdx] = useState(0);
  const [currentMaintView, setCurrentMaintView] = useState(0);

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
    setCurrentBuildImage(0);
    setCurrentMaintView(0);
  }, []);

  // Navigation handlers for active tab
  const totalItems = activeTab === 'builds' ? builds.length : maintenance.length;
  const currentIdx = activeTab === 'builds' ? currentBuildIdx : currentMaintIdx;

  const goTo = useCallback(
    (index: number) => {
      if (activeTab === 'builds') {
        setCurrentBuildIdx(index);
        setCurrentBuildImage(0);
      } else {
        setCurrentMaintIdx(index);
        setCurrentMaintView(0);
      }
    },
    [activeTab]
  );

  const prev = useCallback(() => {
    if (activeTab === 'builds') {
      setCurrentBuildIdx((c) => (c === 0 ? builds.length - 1 : c - 1));
      setCurrentBuildImage(0);
    } else {
      setCurrentMaintIdx((c) => (c === 0 ? maintenance.length - 1 : c - 1));
      setCurrentMaintView(0);
    }
  }, [activeTab]);

  const next = useCallback(() => {
    if (activeTab === 'builds') {
      setCurrentBuildIdx((c) => (c === builds.length - 1 ? 0 : c + 1));
      setCurrentBuildImage(0);
    } else {
      setCurrentMaintIdx((c) => (c === maintenance.length - 1 ? 0 : c + 1));
      setCurrentMaintView(0);
    }
  }, [activeTab]);

  // Current build data
  const build = builds[currentBuildIdx] || builds[0];
  const totalBuildImages = build.images ? build.images.length : 0;
  const safeBuildImageIndex = currentBuildImage < totalBuildImages ? currentBuildImage : 0;
  const hasBuildImages = totalBuildImages > 0 && Boolean(build.images[safeBuildImageIndex]);
  const activeBuildImage = hasBuildImages ? build.images[safeBuildImageIndex] : '';

  const prevBuildImage = useCallback(() => {
    if (totalBuildImages <= 1) {
      return;
    }
    setCurrentBuildImage((i) => (i <= 0 ? totalBuildImages - 1 : i - 1));
  }, [totalBuildImages]);

  const nextBuildImage = useCallback(() => {
    if (totalBuildImages <= 1) {
      return;
    }
    setCurrentBuildImage((i) => (i >= totalBuildImages - 1 ? 0 : i + 1));
  }, [totalBuildImages]);

  // Current maintenance data
  const currentMaint: PortfolioMaintenance = maintenance[currentMaintIdx] || maintenance[0];
  const beforeCount = currentMaint.beforeImages?.length || 0;
  const afterCount = currentMaint.afterImages?.length || 0;
  const safeBeforeImg =
    beforeCount > 0 ? currentMaint.beforeImages[Math.min(currentMaintView, beforeCount - 1)] : '';
  const safeAfterImg =
    afterCount > 0 ? currentMaint.afterImages[Math.min(currentMaintView, afterCount - 1)] : '';

  return (
    <section id="ensambles" className={styles.section} aria-labelledby="portfolio-slider-title">
      <div className={styles.container}>
        {/* Section header with Tab Switcher */}
        <div className={styles.header} data-reveal="up">
          <div className={styles.headerLeft}>
            <span className={styles.sectionNum}>01</span>
            <div className={styles.headerContent}>
              <h2 id="portfolio-slider-title" className={styles.title}>
                {activeTab === 'builds'
                  ? 'Últimos Ensambles de PC'
                  : 'Mantenimientos: Antes y Después'}
              </h2>
              <p className={styles.subtitle}>
                {activeTab === 'builds'
                  ? 'Builds personalizados, especificados y ensamblados para cada cliente'
                  : 'Evidencia real de limpieza profunda, repaste térmico y optimización de hardware'}
              </p>
            </div>
          </div>

          {/* Tab buttons */}
          <div className={styles.tabGroup} role="tablist" aria-label="Tipo de trabajos">
            <button
              role="tab"
              aria-selected={activeTab === 'builds'}
              className={`${styles.tabBtn} ${activeTab === 'builds' ? styles.tabBtnActive : ''}`}
              onClick={() => handleTabChange('builds')}
            >
              <CpuIcon size={16} />
              <span>Ensambles ({builds.length})</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'maintenance'}
              className={`${styles.tabBtn} ${activeTab === 'maintenance' ? styles.tabBtnActive : ''}`}
              onClick={() => handleTabChange('maintenance')}
            >
              <WrenchIcon size={16} />
              <span>Antes / Después ({maintenance.length})</span>
            </button>
          </div>
        </div>

        {/* Slider Area */}
        <div className={styles.slider}>
          {activeTab === 'builds' ? (
            /* ── Builds Card ── */
            <div
              className={styles.slide}
              style={{ '--build-accent': build.accentColor } as React.CSSProperties}
            >
              {/* Left column — photo gallery */}
              <div className={styles.visual}>
                <div className={styles.buildBadge}>
                  <span className={styles.buildId}>{build.id}</span>
                  <span className={styles.buildCategory} style={{ color: build.accentColor }}>
                    {build.category}
                  </span>
                </div>

                {/* Photo area */}
                <div className={styles.photoArea}>
                  {hasBuildImages ? (
                    <>
                      <div className={styles.photoFrame}>
                        {/* Accent glow */}
                        <div
                          className={styles.photoGlow}
                          style={{
                            background: `radial-gradient(ellipse at center, ${build.accentColor}30 0%, transparent 70%)`,
                          }}
                          aria-hidden="true"
                        />

                        {isVideo(activeBuildImage) ? (
                          <video
                            key={activeBuildImage}
                            src={activeBuildImage}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            className={styles.video}
                          />
                        ) : (
                          <Image
                            key={activeBuildImage}
                            src={activeBuildImage}
                            alt={`${build.name} — foto ${currentBuildImage + 1}`}
                            fill
                            sizes="(max-width: 900px) 100vw, 420px"
                            className={styles.photo}
                            priority={currentBuildIdx === 0 && currentBuildImage === 0}
                            loading={
                              currentBuildIdx === 0 && currentBuildImage === 0 ? 'eager' : 'lazy'
                            }
                          />
                        )}

                        {/* Photo nav arrows */}
                        {build.images.length > 1 && (
                          <>
                            <button
                              onClick={prevBuildImage}
                              className={styles.photoNavBtn}
                              aria-label="Foto anterior"
                              style={{ left: 8 }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M15 18l-6-6 6-6" />
                              </svg>
                            </button>
                            <button
                              onClick={nextBuildImage}
                              className={styles.photoNavBtn}
                              aria-label="Foto siguiente"
                              style={{ right: 8 }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </button>
                          </>
                        )}

                        {/* Photo counter */}
                        {build.images.length > 1 && (
                          <span className={styles.photoCounter} aria-live="polite">
                            {currentBuildImage + 1} / {build.images.length}
                          </span>
                        )}
                      </div>

                      {/* Thumbnail strip */}
                      {build.images.length > 1 && (
                        <div className={styles.thumbStrip} role="list" aria-label="Fotos del build">
                          {build.images.map((src, i) => (
                            <button
                              key={src}
                              role="listitem"
                              onClick={() => setCurrentBuildImage(i)}
                              className={`${styles.thumb} ${i === currentBuildImage ? styles.thumbActive : ''}`}
                              aria-label={`Ver archivo ${i + 1}`}
                              aria-current={i === currentBuildImage}
                              style={
                                i === currentBuildImage
                                  ? { borderColor: build.accentColor }
                                  : undefined
                              }
                            >
                              {isVideo(src) ? (
                                <div className={styles.videoThumbWrapper}>
                                  <video
                                    src={src}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className={styles.thumbImg}
                                  />
                                  <span className={styles.videoPlayBadge} aria-hidden="true">
                                    <svg
                                      width="8"
                                      height="8"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                  </span>
                                </div>
                              ) : (
                                <Image
                                  src={src}
                                  alt={`${build.name} miniatura ${i + 1}`}
                                  fill
                                  sizes="64px"
                                  className={styles.thumbImg}
                                  loading={currentBuildIdx === 0 && i === 0 ? 'eager' : 'lazy'}
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={styles.photoPlaceholder} aria-label="Sin imágenes aún">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ opacity: 0.25 }}
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <span className={styles.placeholderLabel}>Fotos próximamente</span>
                    </div>
                  )}
                </div>

                <h3 className={styles.buildName}>{build.name}</h3>
                <p className={styles.buildSubtitle}>{build.subtitle}</p>
              </div>

              {/* Right column — specs + FPS + CTAs */}
              <div className={styles.specs}>
                {/* Spec table */}
                <div className={styles.specTable}>
                  {build.specs.map((spec) => (
                    <div key={spec.label} className={styles.specRow}>
                      <span className={styles.specLabel}>{spec.label}</span>
                      <div className={styles.specContent}>
                        <span className={styles.specValue}>{spec.value}</span>
                        <span className={styles.specDetail}>{spec.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance block */}
                <div className={styles.performance}>
                  <span className={styles.perfTitle}>Rendimiento estimado</span>
                  <div className={styles.perfGrid}>
                    {build.fps.map((item) => (
                      <div key={item.game} className={styles.perfItem}>
                        <span className={styles.perfGame}>{item.game}</span>
                        <span className={styles.perfValue} style={{ color: build.accentColor }}>
                          {item.value}
                          <span className={styles.perfUnit}> FPS</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className={styles.actions}>
                  <a
                    href={whatsappUrl(
                      `Hola, me interesa armar un PC personalizado similar al ${build.name} (${build.id})`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaPrimary}
                  >
                    Hablemos de tu Próximo PC
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* ── Maintenance (Before/After) Card ── */
            <div
              className={styles.slide}
              style={{ '--build-accent': 'var(--color-accent)' } as React.CSSProperties}
            >
              {/* Left column — Before/After Interactive Slider */}
              <div className={styles.visual}>
                <div className={styles.buildBadge}>
                  <span className={styles.buildId}>
                    {currentMaint.id} · AÑO {currentMaint.year}
                  </span>
                  <span className={styles.buildCategory} style={{ color: 'var(--color-accent)' }}>
                    MANTENIMIENTO PREVENTIVO & TÉRMICO
                  </span>
                </div>

                <div className={styles.comparisonGrid}>
                  {/* Before Photo Card */}
                  <div className={`${styles.compareCard} ${styles.compareCardBefore}`}>
                    <div className={styles.comparePhotoWrapper}>
                      <span className={`${styles.compareBadge} ${styles.compareBadgeBefore}`}>
                        <span className={`${styles.compareDot} ${styles.compareDotBefore}`} />
                        Antes
                      </span>
                      {safeBeforeImg && (
                        <Image
                          src={safeBeforeImg}
                          alt={`${currentMaint.title} - Estado Antes`}
                          fill
                          sizes="(max-width: 900px) 50vw, 240px"
                          className={styles.comparePhoto}
                        />
                      )}
                    </div>
                    <div className={styles.compareCaption}>
                      <span>Polvo & suciedad</span>
                      <span>Inicial</span>
                    </div>
                  </div>

                  {/* After Photo Card */}
                  <div className={`${styles.compareCard} ${styles.compareCardAfter}`}>
                    <div className={styles.comparePhotoWrapper}>
                      <span className={`${styles.compareBadge} ${styles.compareBadgeAfter}`}>
                        <span className={`${styles.compareDot} ${styles.compareDotAfter}`} />
                        Después
                      </span>
                      {safeAfterImg && (
                        <Image
                          src={safeAfterImg}
                          alt={`${currentMaint.title} - Resultado Después`}
                          fill
                          sizes="(max-width: 900px) 50vw, 240px"
                          className={styles.comparePhoto}
                        />
                      )}
                    </div>
                    <div className={styles.compareCaption}>
                      <span>100% Limpio & repaste</span>
                      <span>Final</span>
                    </div>
                  </div>
                </div>

                {/* View switcher if multiple before/after shots exist */}
                {beforeCount > 1 && (
                  <div
                    className={styles.thumbStrip}
                    role="list"
                    aria-label="Vistas del mantenimiento"
                  >
                    {currentMaint.beforeImages.map((src: string, i: number) => (
                      <button
                        key={src}
                        role="listitem"
                        onClick={() => setCurrentMaintView(i)}
                        className={`${styles.thumb} ${i === currentMaintView ? styles.thumbActive : ''}`}
                        aria-label={`Ver toma ${i + 1}`}
                        aria-current={i === currentMaintView}
                        style={
                          i === currentMaintView
                            ? { borderColor: 'var(--color-accent)' }
                            : undefined
                        }
                      >
                        <Image
                          src={src}
                          alt={`${currentMaint.title} vista ${i + 1}`}
                          fill
                          sizes="64px"
                          className={styles.thumbImg}
                        />
                      </button>
                    ))}
                  </div>
                )}

                <h3 className={styles.buildName}>{currentMaint.title}</h3>
                <p className={styles.buildSubtitle}>{currentMaint.description}</p>
              </div>

              {/* Right column — Diagnosis, Technical Work & CTAs */}
              <div className={styles.maintenanceInfo}>
                <div className={styles.diagnosticGrid}>
                  {/* Problem Callout */}
                  <div className={`${styles.calloutCard} ${styles.calloutCardProblem}`}>
                    <div className={`${styles.calloutHeader} ${styles.calloutHeaderProblem}`}>
                      <DiagnosticIcon size={16} />
                      <span>Diagnóstico & Problema Inicial</span>
                    </div>
                    <p className={styles.calloutText}>{currentMaint.problem}</p>
                  </div>

                  {/* Solution Callout */}
                  <div className={`${styles.calloutCard} ${styles.calloutCardSolution}`}>
                    <div className={`${styles.calloutHeader} ${styles.calloutHeaderSolution}`}>
                      <CheckCircleIcon size={16} />
                      <span>Solución Técnica Realizada</span>
                    </div>
                    <p className={styles.calloutText}>{currentMaint.solution}</p>
                  </div>
                </div>

                {/* Benefit chips */}
                <div className={styles.benefitChips}>
                  <span className={styles.benefitChip}>
                    <ZapIcon size={14} /> -20°C a -30°C Térmico
                  </span>
                  <span className={styles.benefitChip}>
                    <CheckCircleIcon size={14} /> Pasta Térmica Premium
                  </span>
                  <span className={styles.benefitChip}>
                    <WrenchIcon size={14} /> Desarmado & Limpieza Total
                  </span>
                </div>

                {/* CTAs */}
                <div className={styles.actions}>
                  <a
                    href={whatsappUrl(
                      `Hola, vi el mantenimiento "${currentMaint.title}" en tu portafolio y necesito agendar un mantenimiento para mi equipo.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaPrimary}
                  >
                    Agendar Mantenimiento
                  </a>
                  <a
                    href={whatsappUrl(
                      'Hola, quiero consultar el costo de mantenimiento para mi equipo'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaOutline}
                  >
                    Cotizar Diagnóstico
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {totalItems > 1 && (
            <div className={styles.navigation}>
              <button
                onClick={prev}
                className={styles.navBtn}
                aria-label={activeTab === 'builds' ? 'Build anterior' : 'Mantenimiento anterior'}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div
                className={styles.dots}
                role="tablist"
                aria-label={activeTab === 'builds' ? 'Builds' : 'Mantenimientos'}
              >
                {Array.from({ length: totalItems }).map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === currentIdx}
                    className={`${styles.dot} ${i === currentIdx ? styles.dotActive : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Elemento ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className={styles.navBtn}
                aria-label={activeTab === 'builds' ? 'Build siguiente' : 'Mantenimiento siguiente'}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PcPortfolioSlider;
