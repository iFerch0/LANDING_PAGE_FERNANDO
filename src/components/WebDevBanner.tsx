'use client';

import React from 'react';
import { CheckCircleIcon, WhatsAppIcon } from './Icons';
import styles from './WebDevBanner.module.css';
import { getWaLink } from '@/constants/contact';

const WebDevBanner: React.FC = () => {
  return (
    <section className={styles.section} aria-labelledby="webdev-title" data-aos="fade-up">
      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.bannerGlow} aria-hidden="true" />

          <div className={styles.content}>
            <span className={styles.eyebrow}>Servicio adicional</span>
            <h2 id="webdev-title" className={styles.title}>
              También desarrollo
              <span className={styles.titleAccent}> sitios web</span>
            </h2>
            <p className={styles.desc}>
              Creo landing pages y aplicaciones web profesionales para negocios locales. Diseño
              moderno, rápido y optimizado para Google.
            </p>

            <ul className={styles.features}>
              {[
                'Landing pages de alto impacto',
                'Diseño moderno y responsive',
                'Optimización SEO incluida',
              ].map((item) => (
                <li key={item} className={styles.featureItem}>
                  <CheckCircleIcon className={styles.featureIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.ctaArea}>
            <a
              href={getWaLink(
                'Hola Fernando, me interesa que me desarrolles un sitio web para mi negocio. ¿Me puedes dar más información?'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <WhatsAppIcon size={18} />
              Cotizar mi sitio web
            </a>
            <span className={styles.ctaSub}>Respuesta en menos de 2 horas</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebDevBanner;
