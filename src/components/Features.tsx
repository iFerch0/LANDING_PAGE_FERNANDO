"use client";
import React, { useEffect, useRef, useState } from "react";

function useCountOnView(targetNumber: number) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!ref.current) return;
        let started = false;
        const el = ref.current;
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    const duration = 900; // ms
                    const step = (timestampStart: number | null) => {
                        const now = performance.now();
                        if (!timestampStart) timestampStart = now;
                        const progress = Math.min((now - timestampStart) / duration, 1);
                        setCount(Math.floor(progress * targetNumber));
                        if (progress < 1) requestAnimationFrame(() => step(timestampStart));
                        else setCount(targetNumber);
                    };
                    requestAnimationFrame(() => step(null));
                }
            })
        }, { threshold: 0.4 });
        io.observe(el);
        return () => io.disconnect();
    }, [targetNumber]);

    return { ref, count };
}

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
        <section className="features" aria-labelledby="features-title">
            <div className="container">
                {/* Encabezado de sección optimizado */}
                <div className="features__header" data-aos="fade-up">
                    <div className="features__eyebrow">Por qué elegirnos</div>
                    <h2 id="features-title" className="features__title">
                        Soluciones tecnológicas que 
                        <span className="features__title-highlight"> realmente funcionan</span>
                    </h2>
                    <p className="features__subtitle">
                        Más de 500 computadores reparados en Montería con tecnología profesional y garantía total
                    </p>
                </div>

                <div className="features__grid" role="list">
                    {/* Feature 1: Servicio en Taller */}
                    <article className="feature-card feature-card--primary" role="listitem" data-aos="fade-up">
                        <div className="feature-card__head">
                            <div className="feature-card__icon">
                                <HomeIcon />
                            </div>
                            <div>
                                <h3 className="feature-card__title">Mejor en el taller</h3>
                                <p className="feature-card__subtitle">Más concentración</p>
                            </div>
                        </div>
                        <p className="feature-card__desc">
                            En el taller trabajo sin distracciones y tengo todo lo necesario a mano. Esto se traduce 
                            en mejor atención y precios más cómodos. ¿No puedes venir? También voy a domicilio.
                        </p>
                        <div className="feature-card__actions">
                            <span className="feature-badge feature-badge--success">Precio preferencial</span>
                            <a href="https://wa.me/573008474121" className="feature-link">
                                Consultar ubicación →
                            </a>
                        </div>
                    </article>

                    {/* Feature 2: Respuesta Rápida */}
                    <article className="feature-card" role="listitem" data-aos="fade-up" data-aos-delay="100">
                        <div className="feature-card__head">
                            <div className="feature-card__icon">
                                <ClockIcon />
                            </div>
                            <div>
                                <h3 className="feature-card__title">Respuesta rápida</h3>
                                <p className="feature-card__subtitle">Mismo día</p>
                            </div>
                        </div>
                        <p className="feature-card__desc">
                            Reviso tu equipo rápidamente y te digo qué tiene. La mayoría de problemas los resuelvo 
                            el mismo día para que no pierdas tiempo sin tu PC.
                        </p>
                        <div className="feature-card__actions">
                            <span className="feature-badge feature-badge--primary">Atención inmediata</span>
                        </div>
                        <div className="feature-card__stats">
                            <StatCard number={24} label="Horas">Tiempo promedio de reparación</StatCard>
                        </div>
                    </article>

                    {/* Feature 3: Garantía y Confianza */}
                    <article className="feature-card" role="listitem" data-aos="fade-up" data-aos-delay="200">
                        <div className="feature-card__head">
                            <div className="feature-card__icon">
                                <ShieldIcon />
                            </div>
                            <div>
                                <h3 className="feature-card__title">Con garantía</h3>
                                <p className="feature-card__subtitle">Trabajo respaldado</p>
                            </div>
                        </div>
                        <p className="feature-card__desc">
                            Si después de la reparación el mismo problema vuelve a aparecer, lo reviso sin costo 
                            adicional. Mi trabajo tiene respaldo porque confío en lo que hago.
                        </p>
                        <div className="feature-card__actions">
                            <span className="feature-badge feature-badge--premium">Garantía incluida</span>
                        </div>
                        <div className="feature-card__stats">
                            <StatCard number={92} label="Satisfacción">Clientes recomiendan el servicio</StatCard>
                        </div>
                    </article>
                </div>

                {/* Sección de credenciales */}
                <div className="features__credentials" data-aos="fade-up" data-aos-delay="300">
                    <div className="credentials-grid">
                        <div className="credential-item">
                            <div className="credential-icon">🏆</div>
                            <div>
                                <div className="credential-title">Técnico Certificado</div>
                                <div className="credential-desc">Formación profesional en reparación</div>
                            </div>
                        </div>
                        <div className="credential-item">
                            <div className="credential-icon">⚡</div>
                            <div>
                                <div className="credential-title">Herramientas Pro</div>
                                <div className="credential-desc">Equipos especializados para diagnóstico</div>
                            </div>
                        </div>
                        <div className="credential-item">
                            <div className="credential-icon">📍</div>
                            <div>
                                <div className="credential-title">Cobertura Montería</div>
                                <div className="credential-desc">Llegamos a toda la ciudad</div>
                            </div>
                        </div>
                        <div className="credential-item">
                            <div className="credential-icon">💯</div>
                            <div>
                                <div className="credential-title">Repuestos Originales</div>
                                <div className="credential-desc">Piezas de calidad garantizada</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StatCard: React.FC<{ number: number; label: string; children?: React.ReactNode }> = ({ number, label, children }) => {
    const { ref, count } = useCountOnView(number);
    return (
        <div className="stat-card" role="listitem">
            <div className="stat-card__number" ref={ref as React.RefObject<HTMLDivElement>}>
                {count}
                {label === 'Horas' && <span className="stat-card__unit">h</span>}
                {label === 'Satisfacción' && <span className="stat-card__unit">%</span>}
            </div>
            <div className="stat-card__label">{label}</div>
            {children && <p className="stat-card__desc">{children}</p>}
        </div>
    );
};

export default Features;
