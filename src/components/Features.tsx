'use client';
import React from 'react';
import { WrenchIcon, ZapIcon, ShieldCheckIcon, MapPinIcon, CheckCircleIcon } from './Icons';
import styles from './Features.module.css';

const heroChecklist = [
  'Diagnóstico gratuito sin compromiso',
  'Repuestos originales garantizados',
  'Presupuesto claro antes de reparar',
  'Limpieza profunda incluida',
  'Pruebas de estrés post-reparación',
];

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

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {/* Row 1 — Hero Banner (full width, horizontal) */}
          <article className={styles.heroBanner} data-aos="fade-up">
            <div className={styles.heroBannerTop}>
              <div className={styles.heroBannerContent}>
                <div className={styles.heroBannerHeader}>
                  <div className={styles.iconBoxLg}>
                    <WrenchIcon className={styles.iconLg} />
                  </div>
                  <div>
                    <h3 className={styles.heroBannerTitle}>Servicio Completo</h3>
                    <p className={styles.heroBannerSub}>Taller profesional en Montería</p>
                  </div>
                  <span className={styles.badgeFilled}>Equipado</span>
                </div>
                <p className={styles.heroBannerDesc}>
                  Herramientas especializadas y repuestos originales para cualquier reparación.
                  Diagnóstico gratuito, presupuesto claro, y sin sorpresas.
                </p>
              </div>
              <ul className={styles.checklist}>
                {heroChecklist.map((item) => (
                  <li key={item} className={styles.checkItem}>
                    <CheckCircleIcon className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.heroBannerMetrics}>
              <div className={styles.heroBannerMetric}>
                <span className={styles.hbMetricValue}>100%</span>
                <span className={styles.hbMetricLabel}>Repuestos originales</span>
              </div>
              <div className={styles.hbDivider} />
              <div className={styles.heroBannerMetric}>
                <span className={styles.hbMetricValue}>500+</span>
                <span className={styles.hbMetricLabel}>Equipos reparados</span>
              </div>
              <div className={styles.hbDivider} />
              <div className={styles.heroBannerMetric}>
                <span className={styles.hbMetricValue}>4.9★</span>
                <span className={styles.hbMetricLabel}>Valoración clientes</span>
              </div>
            </div>
            {/* Decorative */}
            <div className={styles.heroGlow} aria-hidden="true" />
          </article>

          {/* Row 2 — 3 Compact Cards */}
          <article
            className={`${styles.card} ${styles.cardAccentBlue}`}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.iconBoxBlue}`}>
                <ZapIcon className={styles.icon} />
              </div>
              <span className={`${styles.badge} ${styles.badgeOrange}`}>Express</span>
            </div>
            <h3 className={styles.cardTitle}>Atención Rápida</h3>
            <p className={styles.cardDesc}>
              Diagnóstico inmediato y solución clara. Mayoría de reparaciones el mismo día.
            </p>
            <div className={styles.cardMetric}>
              <span className={styles.cmValue}>&lt;2h</span>
              <span className={styles.cmLabel}>Respuesta</span>
            </div>
          </article>

          <article
            className={`${styles.card} ${styles.cardAccentGreen}`}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.iconBoxGreen}`}>
                <ShieldCheckIcon className={styles.icon} />
              </div>
              <span className={`${styles.badge} ${styles.badgeGreen}`}>Protegido</span>
            </div>
            <h3 className={styles.cardTitle}>Garantía Total</h3>
            <p className={styles.cardDesc}>
              Garantía escrita en todas las reparaciones. Si vuelve el problema, lo arreglamos
              gratis.
            </p>
            <div className={styles.cardMetric}>
              <span className={styles.cmValue}>30</span>
              <span className={styles.cmLabel}>Días garantía</span>
            </div>
          </article>

          <article
            className={`${styles.card} ${styles.cardAccentTeal}`}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className={styles.cardHeader}>
              <div className={`${styles.iconBox} ${styles.iconBoxTeal}`}>
                <MapPinIcon className={styles.icon} />
              </div>
              <span className={`${styles.badge} ${styles.badgeTeal}`}>Presencial</span>
            </div>
            <h3 className={styles.cardTitle}>Atención en Taller</h3>
            <p className={styles.cardDesc}>
              Trae tu equipo y lo diagnosticamos gratis. Horario: Lun-Vie 8AM-6PM, Sáb 8AM-2PM.
            </p>
            <div className={styles.cardMetric}>
              <span className={styles.cmValue}>Lun-Sáb</span>
              <span className={styles.cmLabel}>Disponible</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Features;
