'use client';
import React from 'react';
import { WrenchIcon, ZapIcon, ShieldCheckIcon, MapPinIcon } from './Icons';
import styles from './Features.module.css';

const Features = () => {
  return (
    <section className={styles.features} aria-labelledby="features-title">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} data-aos="fade-up">
          <span className={styles.eyebrow}>Por qué elegirnos</span>
          <h2 id="features-title" className={styles.title}>
            Servicio técnico que
            <span className={styles.titleGradient}> realmente funciona</span>
          </h2>
          <p className={styles.subtitle}>
            Especialistas certificados con años de experiencia solucionando problemas técnicos en
            Montería
          </p>
        </div>

        {/* Bento Grid 2x2 */}
        <div className={styles.bentoGrid}>
          {/* Card 1 - Servicio Completo */}
          <article className={styles.card} data-aos="fade-up">
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <WrenchIcon className={styles.icon} />
              </div>
              <span className={styles.badge}>Equipado</span>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Servicio Completo</h3>
              <p className={styles.cardSubtitle}>Taller profesional</p>
              <p className={styles.cardDesc}>
                Herramientas especializadas y repuestos originales para cualquier reparación.
              </p>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>100%</span>
                <span className={styles.metricLabel}>Original</span>
              </div>
            </div>
          </article>

          {/* Card 2 - Atención Express */}
          <article className={styles.card} data-aos="fade-up" data-aos-delay="100">
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <ZapIcon className={styles.icon} />
              </div>
              <span className={`${styles.badge} ${styles.badgeAccent}`}>Express</span>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Atención Rápida</h3>
              <p className={styles.cardSubtitle}>Mismo día</p>
              <p className={styles.cardDesc}>
                Diagnóstico inmediato y solución clara. Mayoría de reparaciones el mismo día.
              </p>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>&lt;2h</span>
                <span className={styles.metricLabel}>Respuesta</span>
              </div>
            </div>
          </article>

          {/* Card 3 - Garantía */}
          <article className={styles.card} data-aos="fade-up" data-aos-delay="200">
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <ShieldCheckIcon className={styles.icon} />
              </div>
              <span className={`${styles.badge} ${styles.badgeSuccess}`}>Protegido</span>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Garantía Total</h3>
              <p className={styles.cardSubtitle}>Trabajo respaldado</p>
              <p className={styles.cardDesc}>
                Garantía escrita en todas las reparaciones. Si vuelve el problema, lo arreglamos
                gratis.
              </p>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>30</span>
                <span className={styles.metricLabel}>Días</span>
              </div>
            </div>
          </article>

          {/* Card 4 - Atención en Taller */}
          <article className={styles.card} data-aos="fade-up" data-aos-delay="300">
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <MapPinIcon className={styles.icon} />
              </div>
              <span className={`${styles.badge} ${styles.badgePrimary}`}>Presencial</span>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Atención en Taller</h3>
              <p className={styles.cardSubtitle}>Montería, Córdoba</p>
              <p className={styles.cardDesc}>
                Trae tu equipo y lo diagnosticamos gratis. Horario: Lun-Vie 8AM-6PM, Sáb 8AM-2PM.
              </p>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>Lun-Sáb</span>
                <span className={styles.metricLabel}>Disponible</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Features;
