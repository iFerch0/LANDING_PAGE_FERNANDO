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
          {/* Trust Bar — unified eyebrow + Google badge */}
          <div className={styles.trustBar}>
            <div className={styles.trustLeft}>
              <GoogleIcon size={28} />
              <div className={styles.trustInfo}>
                <span className={styles.trustTitle}>Google Reviews</span>
                <div className={styles.trustRating}>
                  <span className={styles.ratingScore}>4.9</span>
                  <div className={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={styles.starIcon}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="#fbbc05"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustRight}>
              <span className={styles.trustCount}>50+</span>
              <span className={styles.trustLabel}>Opiniones verificadas</span>
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
