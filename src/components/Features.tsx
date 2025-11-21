"use client";
import React from "react";
import styles from './Features.module.css';

// Iconos optimizados para cada feature
const HomeIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ClockIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ShieldIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Features = () => {
    return (
        <section className={styles.features} aria-labelledby="features-title">
            <div className="container">
                {/* Encabezado de sección optimizado */}
                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.eyebrow}>Por qué elegirnos</div>
                    <h2 id="features-title" className={styles.title}>
                        Servicio técnico que
                        <span className={styles.titleHighlight}> realmente funciona</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Especialistas certificados con años de experiencia solucionando problemas técnicos en Montería
                    </p>
                </div>

                <div className={styles.grid} role="list">
                    {/* Feature 1: Servicio en Taller */}
                    <article className={`${styles.card} ${styles.cardPrimary}`} role="listitem" data-aos="fade-up">
                        <div className={styles.cardHead}>
                            <div className={styles.cardIcon}>
                                <HomeIcon />
                            </div>
                            <div>
                                <h3 className={styles.cardTitle}>Servicio completo</h3>
                                <p className={styles.cardSubtitle}>Taller equipado profesionalmente</p>
                            </div>
                        </div>
                        <p className={styles.cardDesc}>
                            Contamos con herramientas especializadas y repuestos originales para cualquier tipo de reparación.
                            Tu equipo queda como nuevo con respaldo técnico completo.
                        </p>
                        <div className={styles.cardActions}>
                            <span className={`${styles.badge} ${styles.badgeSuccess}`}>Equipos especializados</span>
                        </div>
                    </article>

                    {/* Feature 2: Respuesta Rápida */}
                    <article className={styles.card} role="listitem" data-aos="fade-up" data-aos-delay="100">
                        <div className={styles.cardHead}>
                            <div className={styles.cardIcon}>
                                <ClockIcon />
                            </div>
                            <div>
                                <h3 className={styles.cardTitle}>Atención inmediata</h3>
                                <p className={styles.cardSubtitle}>Respuesta en menos de 2 horas</p>
                            </div>
                        </div>
                        <p className={styles.cardDesc}>
                            Diagnosticamos tu problema rápidamente y te damos una solución clara.
                            La mayoría de reparaciones se completan el mismo día para que recuperes tu productividad.
                        </p>
                        <div className={styles.cardActions}>
                            <span className={`${styles.badge} ${styles.badgePrimary}`}>Servicio express</span>
                        </div>
                    </article>

                    {/* Feature 3: Garantía y Confianza */}
                    <article className={styles.card} role="listitem" data-aos="fade-up" data-aos-delay="200">
                        <div className={styles.cardHead}>
                            <div className={styles.cardIcon}>
                                <ShieldIcon />
                            </div>
                            <div>
                                <h3 className={styles.cardTitle}>Garantía total</h3>
                                <p className={styles.cardSubtitle}>Trabajo respaldado</p>
                            </div>
                        </div>
                        <p className={styles.cardDesc}>
                            Todas nuestras reparaciones incluyen garantía escrita. Si el mismo problema vuelve,
                            lo solucionamos sin costo adicional. Tu inversión está completamente protegida.
                        </p>
                        <div className={styles.cardActions}>
                            <span className={`${styles.badge} ${styles.badgePremium}`}>30 días de garantía</span>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Features;
