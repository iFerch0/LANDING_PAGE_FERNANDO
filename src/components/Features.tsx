'use client';
import React from 'react';
import styles from './Features.module.css';

const WrenchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <polygon
      points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

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
