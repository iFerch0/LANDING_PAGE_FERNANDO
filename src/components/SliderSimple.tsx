"use client";
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';

type Props = {
  images: string[];
  height?: number; // pixel height fallback for the viewport
  interval?: number; // ms
};

export default function SliderSimple({ images, height = 420, interval = 3500 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const mounted = useRef(true);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false };
  }, []);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images, images.length, paused, interval]);

  if (!images || images.length === 0) return null;

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  return (
    <div className="slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onKeyDown={onKey} tabIndex={0} aria-roledescription="carousel">
      <div className="slider__viewport" ref={viewportRef} style={{height}}>
        <div className="slider__track" style={{transform: `translateX(-${index * 100}%)`}}>
          {images.map((src, i) => (
            <div key={i} className="slider__slide" role="group" aria-roledescription="slide" aria-label={`Imagen ${i + 1} de ${images.length}`}>
              <img src={src} alt={`slide-${i + 1}`} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
            </div>
          ))}
        </div>

        <button className="slider__nav slider__nav--prev" onClick={prev} aria-label="Anterior">‹</button>
        <button className="slider__nav slider__nav--next" onClick={next} aria-label="Siguiente">›</button>

        <div className="sr-only" aria-live="polite">Slide {index + 1} de {images.length}</div>
      </div>
    </div>
  );
}
