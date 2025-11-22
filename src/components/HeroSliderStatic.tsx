'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { HERO_SLIDES } from '../data/heroSlides';
import styles from './HeroSlider.module.css';

// Custom SVG Icons
const ChevronLeft = () => (
    <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChevronRight = () => (
    <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PlayIcon = () => (
    <svg className={styles.playPauseIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,3 19,12 5,21" fill="currentColor"/>
    </svg>
);

const PauseIcon = () => (
    <svg className={styles.playPauseIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
        <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
    </svg>
);

const HeroSliderStatic: React.FC = () => {
    const slides = HERO_SLIDES;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [progressKey, setProgressKey] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const SLIDE_DURATION = 5000;

    // Auto-play functionality
    useEffect(() => {
        if (!isPlaying || isHovered) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setProgressKey((prev) => prev + 1);
        }, SLIDE_DURATION);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, isHovered, slides.length]);

    // Preload images
    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = slides.map((slide) => {
                return new Promise((resolve, reject) => {
                    const img = new window.Image();
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = slide.src;
                });
            });

            try {
                await Promise.all(imagePromises);
                setIsLoaded(true);
            } catch {
                console.warn('Some images failed to preload');
                setIsLoaded(true);
            }
        };

        preloadImages();
    }, [slides]);

    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index);
        setProgressKey((prev) => prev + 1);
    }, []);

    const goToPrevious = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setProgressKey((prev) => prev + 1);
    }, [slides.length]);

    const goToNext = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setProgressKey((prev) => prev + 1);
    }, [slides.length]);

    const togglePlayPause = useCallback(() => {
        setIsPlaying((prev) => !prev);
    }, []);

    // Touch/swipe support
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrevious();
            }
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
                case ' ':
                    event.preventDefault();
                    togglePlayPause();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToPrevious, goToNext, togglePlayPause]);

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
            role="region"
            aria-label="Galería de servicios de reparación"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Slides */}
            <div className={styles.slideContainer}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                        aria-hidden={index !== currentSlide}
                    >
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            className={styles.slideImage}
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, 520px"
                            quality={85}
                        />
                        <div className={styles.slideOverlay} />

                        {/* Caption */}
                        <div className={styles.caption}>
                            <span className={styles.captionCategory}>{slide.category}</span>
                            <h3 className={styles.captionTitle}>{slide.title}</h3>
                            <p className={styles.captionSubtitle}>{slide.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                className={`${styles.nav} ${styles.navPrev}`}
                onClick={goToPrevious}
                aria-label="Imagen anterior"
                type="button"
            >
                <ChevronLeft />
            </button>

            <button
                className={`${styles.nav} ${styles.navNext}`}
                onClick={goToNext}
                aria-label="Siguiente imagen"
                type="button"
            >
                <ChevronRight />
            </button>

            {/* Play/Pause Button */}
            <button
                className={styles.playPause}
                onClick={togglePlayPause}
                aria-label={isPlaying ? 'Pausar slideshow' : 'Reproducir slideshow'}
                type="button"
            >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/* Counter Badge */}
            <div className={styles.counter} aria-live="polite">
                <span className={styles.counterCurrent}>{currentSlide + 1}</span>
                <span className={styles.counterSeparator}>/</span>
                <span className={styles.counterTotal}>{slides.length}</span>
            </div>

            {/* Thumbnail Navigation */}
            <div className={styles.thumbnails} role="tablist" aria-label="Seleccionar imagen">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        className={`${styles.thumbnail} ${index === currentSlide ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Ir a: ${slide.title}`}
                        aria-selected={index === currentSlide}
                        role="tab"
                        type="button"
                    >
                        <Image
                            src={slide.src}
                            alt=""
                            fill
                            className={styles.thumbnailImage}
                            sizes="48px"
                            quality={50}
                        />
                    </button>
                ))}
            </div>

            {/* Mobile Dots */}
            <div className={styles.dots} role="tablist" aria-label="Seleccionar imagen">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Ir a imagen ${index + 1}`}
                        aria-selected={index === currentSlide}
                        role="tab"
                        type="button"
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className={styles.progress}>
                <div
                    key={progressKey}
                    className={`${styles.progressBar} ${isPlaying && !isHovered ? styles.animating : ''}`}
                    style={{
                        width: isPlaying && !isHovered ? '100%' : `${((currentSlide + 1) / slides.length) * 100}%`
                    }}
                />
            </div>
        </div>
    );
};

export default HeroSliderStatic;
