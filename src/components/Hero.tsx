'use client';

import React from 'react';
import {
  WhatsAppIcon,
  PhoneIcon,
  CheckCircleIcon,
  MapPinIcon,
  StarIcon,
  ShieldIcon,
  ClockIcon,
} from './Icons';
import HeroSliderStatic from './HeroSliderStatic';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className={styles.hero}>
      {/* Background */}
      <div className={styles.background}>
        <div className={`${styles.gradientOrb} ${styles.gradientOrb1}`} />
        <div className={`${styles.gradientOrb} ${styles.gradientOrb2}`} />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Content — each child animates via nth-child stagger */}
          <div className={styles.content}>
            <div className={styles.badge}>
              <CheckCircleIcon className={styles.badgeIcon} />
              <span className={styles.badgeText}>Técnico Certificado</span>
              <span className={styles.badgePulse} />
            </div>

            <div className={styles.headlines}>
              <p className={styles.question}>¿Tu PC tarda más de 5 minutos en encender?</p>
              <h1 className={styles.title}>
                <span className={styles.titleLine1}>Lo arreglamos</span>
                <span className={styles.titleLine2}>HOY mismo</span>
              </h1>
              <p className={styles.subtitle}>
                <MapPinIcon className={styles.subtitleIcon} />
                Montería, Córdoba
              </p>
            </div>

            <p className={styles.description}>
              Ingeniero de sistemas con{' '}
              <span className={styles.descriptionStrong}>10+ años de experiencia</span>. Diagnóstico
              gratuito, repuestos originales y garantía en cada reparación.
            </p>

            <div className={styles.ctaGroup}>
              <div className={styles.ctas}>
                <a
                  href="http://wa.link/n8et4q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--cta-primary cta-pulse"
                >
                  <WhatsAppIcon className="btn__icon" />
                  <div className="btn__content">
                    <span className="btn__text">Diagnóstico Gratuito</span>
                    <span className="btn__subtext">Respuesta en minutos</span>
                  </div>
                </a>
                <a href="tel:+573008474121" className="btn btn--secondary btn--cta-secondary">
                  <PhoneIcon className="btn__icon" />
                  <div className="btn__content">
                    <span className="btn__text">Llamar Ahora</span>
                    <span className="btn__subtext">Lun-Vie 8AM-6PM</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className={styles.sliderColumn}>
            <div className={styles.sliderFrame} />
            <div className={styles.sliderWrapper}>
              <HeroSliderStatic />
            </div>
          </div>
        </div>

        {/* Stats Bento Grid */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statCardPrimary}`}>
            <div className={styles.statIconWrapper}>
              <CheckCircleIcon className={styles.statIcon} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statTitle}>PCs Reparadas</span>
              <span className={styles.statDesc}>Clientes satisfechos</span>
            </div>
            <div className={styles.statGlow} />
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}>
              <StarIcon className={styles.statIcon} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>
                4.9<span className={styles.statUnit}>/5</span>
              </span>
              <span className={styles.statTitle}>Calificación</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}>
              <ClockIcon className={styles.statIcon} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>
                &lt;24<span className={styles.statUnit}>h</span>
              </span>
              <span className={styles.statTitle}>Respuesta</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}>
              <ShieldIcon className={styles.statIcon} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>
                30<span className={styles.statUnit}>días</span>
              </span>
              <span className={styles.statTitle}>Garantía</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}>
              <MapPinIcon className={styles.statIcon} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>Taller</span>
              <span className={styles.statTitle}>Montería</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
