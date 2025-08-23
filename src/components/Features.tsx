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

const Features = () => {
    return (
        <section className="features" aria-labelledby="features-title">
            <div className="container">
                <h2 id="features-title" className="section-title visually-hidden">Características</h2>
                        <div className="features__grid" role="list">
                            <article className="feature-card" role="listitem" data-aos="fade-up">
                        <div className="feature-card__head">
                            <svg className="feature-card__icon" width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M3 12l2-2 4 4 8-8 4 4v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                                <h3 className="feature-card__title">Servicio a Domicilio</h3>
                                <p className="feature-card__subtitle">Respuesta inmediata</p>
                            </div>
                        </div>
                        <p className="feature-card__desc">Llevo herramientas y repuestos básicos al lugar; diagnóstico y reparación rápida para que vuelvas a trabajar sin contratiempos.</p>
                        <div className="feature-card__actions">
                            <span className="feature-badge">100% Confiable</span>
                        </div>
                    </article>

                                <StatCard number={92} label="Reseñas">Clientes satisfechos que recomiendan el servicio.</StatCard>

                                <StatCard number={24} label="Disponible">Soporte y atención continua para emergencias.</StatCard>
                </div>
            </div>
        </section>
    );
};

            const StatCard: React.FC<{ number: number; label: string; children?: React.ReactNode }> = ({ number, label, children }) => {
                const { ref, count } = useCountOnView(number);
                return (
                    <div className="stat-card" role="listitem" data-aos="fade-up">
                        <div className="stat-card__number" ref={ref as any}>{count}{label === 'Disponible' && <span>/7</span>}</div>
                        <div className="stat-card__label">{label}</div>
                        {children && <p className="stat-card__desc">{children}</p>}
                    </div>
                );
            }

export default Features;
