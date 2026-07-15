'use client';

import React from 'react';
import { WhatsAppIcon, PhoneIcon, MapPinIcon } from './Icons';
import HeroSliderStatic from './HeroSliderStatic';
import styles from './Hero.module.css';
import { CONTACT, whatsappUrl } from '@/data/contact';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className={styles.hero}>
      {/* Blueprint grid background */}
      <div className={styles.background} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Content Column */}
          <div className={styles.content}>
            {/* Technical location label */}
            <div className={styles.location}>
              <span className={styles.locationDot} />
              Montería, Córdoba, CO
            </div>

            {/* Headlines */}
            <div className={styles.headlines}>
              <p className={styles.question}>¿Tu PC tarda más de 5 minutos en encender?</p>
              <h1 className={styles.title}>
                <span className={styles.titleLine}>Lo arreglamos</span>
                <span className={styles.titleEmphasis}>HOY mismo</span>
              </h1>
            </div>

            {/* Subtitle — technical tone */}
            <p className={styles.subtitle}>
              <MapPinIcon className={styles.subtitleIcon} />
              Ingeniero de Sistemas — Servicio Técnico Especializado
            </p>

            {/* Description */}
            <p className={styles.description}>
              <span className={styles.descriptionStrong}>10+ años de experiencia</span> en Montería.
              Diagnóstico gratuito, repuestos originales y garantía en cada reparación.
            </p>

            {/* CTAs */}
            <div className={styles.ctas}>
              <a
                href={whatsappUrl('Hola, necesito ayuda con mi computador')}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cta} ${styles.ctaPrimary} btn-press`}
              >
                <WhatsAppIcon className={styles.ctaIcon} />
                Diagnóstico Gratuito
                <span className={styles.ctaSub}>Respuesta en minutos</span>
              </a>
              <a href={`tel:${CONTACT.phone}`} className={`${styles.cta} ${styles.ctaSecondary}`}>
                <PhoneIcon className={styles.ctaIcon} />
                Llamar Ahora
                <span className={styles.ctaSub}>Lun–Vie 8AM–6PM</span>
              </a>
            </div>
          </div>

          {/* Slider Column */}
          <div className={styles.sliderColumn}>
            <div className={styles.sliderWrapper}>
              <HeroSliderStatic />
            </div>
          </div>
        </div>

        {/* Stats — Spec Sheet Style */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statItem} ${styles.statHighlight}`}>
            <span className={styles.statNumber}>
              500<span className={styles.statUnit}>+</span>
            </span>
            <span className={styles.statLabel}>PCs Reparadas</span>
            <span className={styles.statSub}>Clientes satisfechos</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              4.9<span className={styles.statUnit}>/5</span>
            </span>
            <span className={styles.statLabel}>Calificación</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statNumberSmall}>
              &lt;24<span className={styles.statUnit}>h</span>
            </span>
            <span className={styles.statLabel}>Tiempo de Respuesta</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statNumberSmall}>
              30<span className={styles.statUnit}>d</span>
            </span>
            <span className={styles.statLabel}>Garantía</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statNumberSmall}>Taller</span>
            <span className={styles.statLabel}>Montería, CO</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
