"use client";

import React from 'react';
import { WhatsAppIcon, PhoneIcon } from './Icons';
import HeroSliderStatic from './HeroSliderStatic';
import styles from './Hero.module.css';

/* Icons */
const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
);

const TruckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

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
                    {/* Content */}
                    <div className={styles.content}>
                        <div className={styles.badge}>
                            <CheckCircleIcon className={styles.badgeIcon} />
                            <span className={styles.badgeText}>Técnico Certificado</span>
                            <span className={styles.badgePulse} />
                        </div>

                        <div className={styles.headlines}>
                            <p className={styles.question}>
                                ¿Tu PC tarda más de 5 minutos en encender?
                            </p>
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
                            <span className={styles.descriptionStrong}>10+ años de experiencia</span>.
                            Diagnóstico gratuito, repuestos originales y servicio a domicilio incluido.
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
                                <a
                                    href="tel:+573008474121"
                                    className="btn btn--secondary btn--cta-secondary"
                                >
                                    <PhoneIcon className="btn__icon" />
                                    <div className="btn__content">
                                        <span className="btn__text">Llamar Ahora</span>
                                        <span className="btn__subtext">Disponible 24/7</span>
                                    </div>
                                </a>
                            </div>

                            <div className={styles.statsStrip}>
                                <div className={styles.stat}>
                                    <span className={styles.statValue}>500+</span>
                                    <span className={styles.statLabel}>PCs reparados</span>
                                </div>
                                <div className={styles.stat}>
                                    <span className={styles.statValue}>24h</span>
                                    <span className={styles.statLabel}>Respuesta</span>
                                </div>
                                <div className={styles.stat}>
                                    <span className={styles.statValue}>30d</span>
                                    <span className={styles.statLabel}>Garantía</span>
                                </div>
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

                {/* Trust Bar */}
                <div className={styles.trustBar}>
                    <div className={styles.trustItems}>
                        <div className={styles.trustItem}>
                            <StarIcon className={styles.trustIcon} />
                            <span className={styles.trustText}>
                                <span className={styles.trustHighlight}>5.0</span> en Google
                            </span>
                        </div>
                        <div className={styles.trustItem}>
                            <TruckIcon className={styles.trustIcon} />
                            <span className={styles.trustText}>
                                Domicilio <span className={styles.trustHighlight}>gratis</span>
                            </span>
                        </div>
                        <div className={styles.trustItem}>
                            <ShieldIcon className={styles.trustIcon} />
                            <span className={styles.trustText}>
                                Garantía <span className={styles.trustHighlight}>30 días</span>
                            </span>
                        </div>
                        <div className={styles.trustItem}>
                            <ClockIcon className={styles.trustIcon} />
                            <span className={styles.trustText}>
                                Mismo <span className={styles.trustHighlight}>día</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
