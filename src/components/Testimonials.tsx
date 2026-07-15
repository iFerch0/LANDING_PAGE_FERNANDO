'use client';

import React, { useRef, useState, useEffect } from 'react';
import Script from 'next/script';
import { elfsightConfig } from '@/data/testimonials';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const [shouldLoadScript, setShouldLoadScript] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadScript(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { rootMargin: '200px' }
    );
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={containerRef} id="testimonios" className={styles.testimonials}>
      <div className={styles.container}>
        {/* Header — numbered */}
        <div className={styles.header} data-reveal="up">
          <span className={styles.sectionNum}>03</span>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>
              Lo que dicen <span className={styles.titleAccent}>nuestros clientes</span>
            </h2>
            <p className={styles.subtitle}>
              Opiniones reales verificadas de personas que confiaron en nuestro servicio.
            </p>
          </div>
        </div>

        {/* Trust Indicators — data points, not a card */}
        <div className={styles.trustRow} data-reveal="up">
          <div className={styles.trustSource}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className={styles.trustSourceLabel}>Google Reviews</span>
          </div>

          <span className={styles.trustDivider} aria-hidden="true" />

          <div className={styles.trustItem}>
            <span className={styles.trustValue}>4.9</span>
            <div className={styles.trustStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          </div>

          <span className={styles.trustDivider} aria-hidden="true" />

          <div className={styles.trustItem}>
            <span className={styles.trustValue}>50+</span>
            <span className={styles.trustLabel}>Opiniones verificadas</span>
          </div>
        </div>

        {/* Widget */}
        <div className={styles.widget} data-reveal="scale">
          {shouldLoadScript && (
            <Script src={elfsightConfig.scriptSrc} strategy="lazyOnload" async />
          )}
          <div className={`elfsight-app-${elfsightConfig.appId}`} data-elfsight-app-lazy />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
