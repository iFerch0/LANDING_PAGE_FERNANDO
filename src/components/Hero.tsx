"use client";

import React from 'react';
import { WhatsAppIcon, PhoneIcon } from './Icons';
import HeroSliderStatic from './HeroSliderStatic';
import styles from './Hero.module.css';

/* ==========================================================================
   Icons
   ========================================================================== */

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

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TruckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
);

/* ==========================================================================
   Hero Component
   ========================================================================== */

const Hero: React.FC = () => {
    return (
        <section id="inicio" className={styles.hero}>
            {/* Background */}
            <div className={styles.background}>
                <div className={`${styles.bgGradient} ${styles.bgGradient1}`} />
                <div className={`${styles.bgGradient} ${styles.bgGradient2}`} />
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Content Column */}
                    <div className={styles.content}>
                        {/* Badge */}
                        <div className={styles.badge}>
                            <CheckCircleIcon className={styles.badgeIcon} />
                            <span className={styles.badgeText}>Técnico Certificado</span>
                        </div>

                        {/* Headlines */}
                        <div className={styles.headlines}>
                            <p className={styles.question}>
                                ¿Tu PC tarda más de 5 minutos en encender?
                            </p>
                            <h1 className={styles.title}>
                                Lo arreglamos{' '}
                                <span className={styles.titleHighlight}>HOY</span>
                            </h1>
                            <div className={styles.location}>
                                <MapPinIcon className={styles.locationIcon} />
                                <span>Montería, Córdoba</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className={styles.description}>
                            Ingeniero de sistemas con{' '}
                            <span className={styles.descriptionStrong}>10+ años de experiencia</span>.
                            Diagnóstico gratuito, repuestos originales y servicio a domicilio.
                        </p>

                        {/* CTAs */}
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

                        {/* Stats */}
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>500+</span>
                                <span className={styles.statLabel}>PCs reparados</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>24h</span>
                                <span className={styles.statLabel}>Respuesta</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>30</span>
                                <span className={styles.statLabel}>Días garantía</span>
                            </div>
                        </div>
                    </div>

                    {/* Slider Column */}
                    <div className={styles.sliderArea}>
                        {/* Floating Cards */}
                        <div className={`${styles.floatingCard} ${styles.floatingCard1}`}>
                            <div className={`${styles.cardIcon} ${styles.cardIconGreen}`}>
                                <CheckIcon />
                            </div>
                            <span>Diagnóstico gratis</span>
                        </div>
                        <div className={`${styles.floatingCard} ${styles.floatingCard2}`}>
                            <div className={`${styles.cardIcon} ${styles.cardIconBlue}`}>
                                <ClockIcon />
                            </div>
                            <span>Mismo día</span>
                        </div>
                        <div className={`${styles.floatingCard} ${styles.floatingCard3}`}>
                            <div className={`${styles.cardIcon} ${styles.cardIconOrange}`}>
                                <TruckIcon />
                            </div>
                            <span>A domicilio</span>
                        </div>

                        {/* Slider */}
                        <div className={styles.sliderWrapper}>
                            <HeroSliderStatic />
                        </div>
                    </div>
                </div>

                {/* Trust Bar */}
                <div className={styles.trustBar}>
                    <div className={styles.trustItem}>
                        <StarIcon className={styles.trustIcon} />
                        <span>5.0 en Google</span>
                    </div>
                    <div className={styles.trustItem}>
                        <TruckIcon className={styles.trustIcon} />
                        <span>Domicilio gratis</span>
                    </div>
                    <div className={styles.trustItem}>
                        <ShieldIcon className={styles.trustIcon} />
                        <span>Garantía 30 días</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
