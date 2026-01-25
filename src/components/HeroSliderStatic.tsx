'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { HERO_SLIDES } from '../data/heroSlides';
import styles from './HeroSlider.module.css';

/* Icons */
const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeroSliderStatic: React.FC = () => {
  const slides = HERO_SLIDES;
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const DURATION = 5000;

  // Auto-advance
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgressKey((prev) => prev + 1);
    }, DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  // Preload images
  useEffect(() => {
    const preload = async () => {
      try {
        await Promise.all(
          slides.map((slide) => {
            return new Promise((resolve, reject) => {
              const img = new window.Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = slide.src;
            });
          })
        );
      } catch {
        // Continue anyway
      }
      setIsLoaded(true);
    };
    preload();
  }, [slides]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgressKey((prev) => prev + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    setProgressKey((p) => p + 1);
  }, [slides.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
    setProgressKey((p) => p + 1);
  }, [slides.length]);

  // Touch support
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  if (!isLoaded) {
    return (
      <div className={styles.slider}>
        <div className={styles.loading}>
          <div className={styles.skeleton} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.slider}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => {
        touchEnd.current = e.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Bar */}
      <div className={styles.progress}>
        <div
          key={progressKey}
          className={`${styles.progressFill} ${!isPaused ? styles.animate : ''}`}
        />
      </div>

      {/* Counter */}
      <div className={styles.counter}>
        <span className={styles.counterCurrent}>{current + 1}</span>
        <span className={styles.counterDivider}>/</span>
        <span className={styles.counterTotal}>{slides.length}</span>
      </div>

      {/* Slides */}
      <div className={styles.slides}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === current ? styles.active : ''}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={styles.image}
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 600px"
              quality={85}
              style={{ objectPosition: slide.objectPosition || 'center center' }}
            />
            <div className={styles.overlay} />
            <div className={styles.caption}>
              <span className={styles.captionTag}>{slide.category}</span>
              <h3 className={styles.captionTitle}>{slide.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        className={`${styles.navButton} ${styles.navPrev}`}
        onClick={prev}
        aria-label="Anterior"
        type="button"
      >
        <ChevronLeftIcon className={styles.navIcon} />
      </button>
      <button
        className={`${styles.navButton} ${styles.navNext}`}
        onClick={next}
        aria-label="Siguiente"
        type="button"
      >
        <ChevronRightIcon className={styles.navIcon} />
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.active : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Ir a imagen ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSliderStatic;
