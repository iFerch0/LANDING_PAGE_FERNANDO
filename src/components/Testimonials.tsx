import React from 'react';
import Script from 'next/script';
import { GoogleIcon } from './Icons';
import { elfsightConfig } from '@/data/testimonials';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  return (
    <section id="testimonios" className={styles.testimonials}>
      <div className={`container ${styles.container}`}>
        {/* Simplified Header */}
        <div className={styles.header} data-aos="fade-up">
          <div className={styles.badge}>
            <GoogleIcon />
            Reviews de Google
          </div>
          <h2 className={styles.title}>Lo que dicen nuestros clientes</h2>
          <p className={styles.subtitle}>
            Opiniones reales de personas que confiaron en nuestro servicio
          </p>
        </div>

        {/* Widget Container */}
        <div className={styles.widget} data-aos="fade-up" data-aos-delay="100">
          <Script src={elfsightConfig.scriptSrc} strategy="afterInteractive" async />
          <div className={`elfsight-app-${elfsightConfig.appId}`} data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
