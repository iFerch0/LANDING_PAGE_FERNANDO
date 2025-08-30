'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { PC_IMAGES } from '../data/pc-images';

// Custom SVG Icons
const ChevronLeft = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Play = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="5,3 19,12 5,21" fill="currentColor"/>
  </svg>
);

const Pause = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
    <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
  </svg>
);

const HeroSliderStatic: React.FC = () => {
  // Usar las imágenes generadas automáticamente
  const slides = PC_IMAGES;
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, slides.length]);

  // Preload images for better performance
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
      } catch (error) {
        console.warn('Some images failed to preload');
        setIsLoaded(true);
      }
    };

    preloadImages();
  }, [slides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Mouse hover handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

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
      <div className="hero-slider__loading">
        <div className="hero-slider__skeleton"></div>
      </div>
    );
  }

  return (
    <div 
      className="hero-slider" 
      role="region" 
      aria-label="Galería de servicios de reparación"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main slider container */}
      <div className="hero-slider__container">
        <div 
          className="hero-slider__track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slider__slide ${index === currentSlide ? 'active' : ''}`}
              aria-hidden={index !== currentSlide}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="hero-slider__image"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                quality={85}
              />
              {/* Gradient overlay for better text readability */}
              <div className="hero-slider__overlay"></div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          className="hero-slider__nav hero-slider__nav--prev"
          onClick={goToPrevious}
          aria-label="Imagen anterior"
          type="button"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="hero-slider__nav hero-slider__nav--next"
          onClick={goToNext}
          aria-label="Siguiente imagen"
          type="button"
        >
          <ChevronRight size={24} />
        </button>

        {/* Play/Pause button */}
        <button
          className="hero-slider__play-pause"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pausar slideshow' : 'Reproducir slideshow'}
          type="button"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Progress bar */}
        <div className="hero-slider__progress">
          <div 
            className="hero-slider__progress-bar"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
              animationDuration: (isPlaying && !isHovered) ? '4000ms' : 'paused',
              opacity: isHovered ? 0.5 : 1
            }}
          ></div>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="hero-slider__dots" role="tablist" aria-label="Seleccionar imagen">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-slider__dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a imagen ${index + 1}`}
            aria-selected={index === currentSlide}
            role="tab"
            type="button"
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="hero-slider__counter" aria-live="polite">
        <span className="hero-slider__counter-current">{currentSlide + 1}</span>
        <span className="hero-slider__counter-separator">/</span>
        <span className="hero-slider__counter-total">{slides.length}</span>
      </div>
    </div>
  );
};

export default HeroSliderStatic;
