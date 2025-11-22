"use client";

import React from 'react';
import { WhatsAppIcon, PhoneIcon } from './Icons';
import HeroSliderStatic from './HeroSliderStatic';
import styles from './Hero.module.css';

// Icons
const VerifiedIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TruckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

const Hero = () => {
    return (
        <section id="inicio" className={styles.hero}>
            {/* Animated Background */}
            <div className={styles.background}>
                <div className={styles.gradient1} />
                <div className={styles.gradient2} />
                <div className={styles.gradient3} />
                <div className={styles.noise} />
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Text Column */}
                    <div className={styles.textColumn} data-aos="fade-right">
                        {/* Eyebrow */}
                        <div className={styles.eyebrow}>
                            <VerifiedIcon className={styles.eyebrowIcon} />
                            <span className={styles.eyebrowText}>Técnico Certificado</span>
                            <span className={styles.eyebrowPulse} />
                        </div>

                        {/* Headlines */}
                        <div className={styles.headlines}>
                            <p className={styles.question}>
                                ¿Tu PC tarda más de 5 minutos en encender?
                            </p>
                            <h1 className={styles.mainHeadline}>
                                <span className={styles.headlineGradient}>
                                    Lo arreglamos HOY
                                </span>
                            </h1>
                            <div className={styles.location}>
                                <LocationIcon className={styles.locationIcon} />
                                <span>Montería, Córdoba</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className={styles.description}>
                            Ingeniero de sistemas con{' '}
                            <span className={styles.highlight}>10+ años de experiencia</span>.
                            Diagnóstico gratuito, repuestos originales y servicio a domicilio incluido.
                        </p>

                        {/* CTAs */}
                        <div className={styles.ctas}>
                            <a
                                href="http://wa.link/n8et4q"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Solicitar diagnóstico gratuito por WhatsApp"
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
                                aria-label="Llamar ahora"
                                className="btn btn--secondary btn--cta-secondary"
                            >
                                <PhoneIcon className="btn__icon" />
                                <div className="btn__content">
                                    <span className="btn__text">Llamar Ahora</span>
                                    <span className="btn__subtext">Disponible 24/7</span>
                                </div>
                            </a>
                        </div>

                        {/* Quick Stats */}
                        <div className={styles.quickStats}>
                            <div className={styles.quickStat}>
                                <span className={styles.quickStatValue}>500+</span>
                                <span className={styles.quickStatLabel}>PCs reparados</span>
                            </div>
                            <div className={styles.quickStat}>
                                <span className={styles.quickStatValue}>24h</span>
                                <span className={styles.quickStatLabel}>Respuesta</span>
                            </div>
                            <div className={styles.quickStat}>
                                <span className={styles.quickStatValue}>30</span>
                                <span className={styles.quickStatLabel}>Días garantía</span>
                            </div>
                        </div>
                    </div>

                    {/* Slider Column */}
                    <div className={styles.sliderColumn} data-aos="fade-left" data-aos-delay="200">
                        <div className={styles.sliderWrapper}>
                            {/* Floating Cards */}
                            <div className={styles.floatingCards}>
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
                            </div>

                            {/* Slider with 3D effect */}
                            <div className={styles.sliderInner}>
                                <HeroSliderStatic />
                            </div>
                            <div className={styles.sliderShadow} />
                        </div>
                    </div>

                    {/* Trust Row */}
                    <div className={styles.trustRow}>
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
                        <div className={styles.trustItem}>
                            <CreditCardIcon className={styles.trustIcon} />
                            <span>Pago contraentrega</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
