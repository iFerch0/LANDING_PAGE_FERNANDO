'use client';

import React, { useRef, useState, useEffect } from 'react';
import Script from 'next/script';
import { GoogleIcon } from './Icons';
import { elfsightConfig } from '@/data/testimonials';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const [shouldLoadScript, setShouldLoadScript] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = containerRef.current;

    // Intersection Observer to defer Elfsight massive JS download
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadScript(true);
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      { rootMargin: '200px' } // Start loading 200px before reaching the section
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);
  return (
    <section ref={containerRef} id="testimonios" className={styles.testimonials}>
      <div className={`container ${styles.container}`}>
        {/* Header */}
        <div className={styles.header} data-aos="fade-up">
          <span className={styles.eyebrow}>Opiniones verificadas</span>
          <div className={styles.badge}>
            <GoogleIcon size={24} />
            <div className={styles.badgeText}>
              <span className={styles.badgeTitle}>Google Reviews</span>
              <span className={styles.badgeStars}>★★★★★</span>
            </div>
          </div>
          <h2 className={styles.title}>
            Lo que dicen nuestros
            <span className={styles.titleAccent}> clientes</span>
          </h2>
          <p className={styles.subtitle}>
            Opiniones reales de personas que confiaron en nuestro servicio
          </p>
        </div>

        {/* Widget Container */}
        <div className={styles.widget} data-aos="fade-up" data-aos-delay="100">
          {shouldLoadScript && (
            <Script src={elfsightConfig.scriptSrc} strategy="lazyOnload" async />
          )}
          <div className={`elfsight-app-${elfsightConfig.appId}`} data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
