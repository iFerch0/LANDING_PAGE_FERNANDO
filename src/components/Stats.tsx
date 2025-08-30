"use client";
import React from "react";
import CountUpClient from './CountUpClient';

// Iconos para cada estadística
const RepairIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const StarIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ClockIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ShieldIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Stats = () => {
    return (
        <section className="stats" aria-labelledby="stats-title">
            <div className="container">
                {/* Header de estadísticas */}
                <div className="stats__header" data-aos="fade-up">
                    <h2 id="stats-title" className="stats__title">
                        Números que hablan por sí solos
                    </h2>
                    <p className="stats__subtitle">
                        Más de 3 años ayudando a familias y empresas de Montería con sus computadores
                    </p>
                </div>

                <div className="stats__grid">
                    {/* Estadística 1: Equipos Reparados */}
                    <div className="stat-item" data-aos="zoom-in" data-aos-delay="100">
                        <div className="stat-item__icon">
                            <RepairIcon />
                        </div>
                        <div className="stat-item__content">
                            <div className="stat__number">
                                <CountUpClient end={500} ssrValue={500} suffix="+" />
                            </div>
                            <div className="stat__label">PCs reparadas</div>
                            <div className="stat__description">
                                En Montería y alrededores desde 2015
                            </div>
                        </div>
                    </div>

                    {/* Estadística 2: Satisfacción */}
                    <div className="stat-item" data-aos="zoom-in" data-aos-delay="200">
                        <div className="stat-item__icon">
                            <StarIcon />
                        </div>
                        <div className="stat-item__content">
                            <div className="stat__number">
                                <CountUpClient end={92} ssrValue={92} suffix="%" />
                            </div>
                            <div className="stat__label">Satisfacción</div>
                            <div className="stat__description">
                                Clientes que recomiendan el servicio
                            </div>
                        </div>
                    </div>

                    {/* Estadística 3: Tiempo de Respuesta */}
                    <div className="stat-item" data-aos="zoom-in" data-aos-delay="300">
                        <div className="stat-item__icon">
                            <ClockIcon />
                        </div>
                        <div className="stat-item__content">
                            <div className="stat__number">
                                <CountUpClient end={24} ssrValue={24} suffix="h" />
                            </div>
                            <div className="stat__label">Tiempo promedio</div>
                            <div className="stat__description">
                                Mayoría de problemas resueltos
                            </div>
                        </div>
                    </div>

                    {/* Estadística 4: Garantía */}
                    <div className="stat-item" data-aos="zoom-in" data-aos-delay="400">
                        <div className="stat-item__icon">
                            <ShieldIcon />
                        </div>
                        <div className="stat-item__content">
                            <div className="stat__number">
                                <CountUpClient end={30} ssrValue={30} suffix=" días" />
                            </div>
                            <div className="stat__label">Garantía</div>
                            <div className="stat__description">
                                En todas las reparaciones
                            </div>
                        </div>
                    </div>
                </div>

                {/* Credenciales adicionales */}
                <div className="stats__credentials" data-aos="fade-up" data-aos-delay="500">
                    <div className="credentials-row">
                        <div className="credential-badge">
                            <span className="credential-icon">🏆</span>
                            <span>Técnico certificado</span>
                        </div>
                        <div className="credential-badge">
                            <span className="credential-icon">📍</span>
                            <span>Cobertura Montería</span>
                        </div>
                        <div className="credential-badge">
                            <span className="credential-icon">⚡</span>
                            <span>Servicio mismo día</span>
                        </div>
                        <div className="credential-badge">
                            <span className="credential-icon">💯</span>
                            <span>Repuestos originales</span>
                        </div>
                    </div>
                </div>

                {/* CTA en la sección de stats */}
                <div className="stats__cta" data-aos="fade-up" data-aos-delay="600">
                    <div className="stats-cta__content">
                        <h3 className="stats-cta__title">¿Quieres ser parte de estas estadísticas?</h3>
                        <p className="stats-cta__desc">Únete a los cientos de clientes satisfechos en Montería</p>
                        <a href="https://wa.me/573008474121" className="btn btn--secondary btn--large">
                            Solicitar servicio ahora
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Stats;

