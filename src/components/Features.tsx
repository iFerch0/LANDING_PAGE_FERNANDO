"use client";
import React from "react";
import styles from './Features.module.css';

const WrenchIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
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
                        Especialistas certificados con años de experiencia solucionando
                        problemas técnicos en Montería
                    </p>
                </div>

                {/* Bento Grid */}
                <div className={styles.bentoGrid}>
                    {/* Card 1 - Large */}
                    <article className={`${styles.card} ${styles.cardLarge}`} data-aos="fade-up">
                        <div className={styles.cardGlow} />
                        <div className={styles.iconBox}>
                            <WrenchIcon className={styles.icon} />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Servicio Completo</h3>
                            <p className={styles.cardSubtitle}>Taller equipado profesionalmente</p>
                            <p className={styles.cardDesc}>
                                Herramientas especializadas y repuestos originales para
                                cualquier tipo de reparación. Tu equipo queda como nuevo.
                            </p>
                            <ul className={styles.checkList}>
                                <li><CheckIcon className={styles.checkIcon} /> Herramientas profesionales</li>
                                <li><CheckIcon className={styles.checkIcon} /> Repuestos originales</li>
                                <li><CheckIcon className={styles.checkIcon} /> Respaldo técnico completo</li>
                            </ul>
                        </div>
                        <span className={styles.badge}>Equipado</span>
                    </article>

                    {/* Card 2 - Medium */}
                    <article className={`${styles.card} ${styles.cardMedium}`} data-aos="fade-up" data-aos-delay="100">
                        <div className={styles.iconBox}>
                            <ZapIcon className={styles.icon} />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Atención Express</h3>
                            <p className={styles.cardSubtitle}>Respuesta en menos de 2 horas</p>
                            <p className={styles.cardDesc}>
                                Diagnóstico rápido y solución clara. La mayoría de
                                reparaciones se completan el mismo día.
                            </p>
                        </div>
                        <div className={styles.metric}>
                            <span className={styles.metricValue}>&lt;2h</span>
                            <span className={styles.metricLabel}>tiempo respuesta</span>
                        </div>
                    </article>

                    {/* Card 3 - Medium */}
                    <article className={`${styles.card} ${styles.cardMedium}`} data-aos="fade-up" data-aos-delay="200">
                        <div className={styles.iconBox}>
                            <ShieldCheckIcon className={styles.icon} />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Garantía Total</h3>
                            <p className={styles.cardSubtitle}>Trabajo 100% respaldado</p>
                            <p className={styles.cardDesc}>
                                Garantía escrita en todas las reparaciones. Si el problema
                                vuelve, lo solucionamos sin costo.
                            </p>
                        </div>
                        <div className={styles.metric}>
                            <span className={styles.metricValue}>30</span>
                            <span className={styles.metricLabel}>días garantía</span>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Features;
