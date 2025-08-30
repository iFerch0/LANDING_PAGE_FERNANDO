import React from "react";
import Script from 'next/script';

const Testimonials = () => {
    return (
        <section id="testimonios" className="testimonials">
            <div className="container">
                {/* Enhanced Header */}
                <div className="testimonials__header" data-aos="fade-up">
                    <div className="testimonials__badge">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                        </svg>
                        Testimonios Verificados
                    </div>
                    <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
                    <p className="testimonials__subtitle">
                        Más de 500 clientes satisfechos en Montería y alrededores confían en nuestro servicio técnico especializado
                    </p>
                </div>

                {/* Trust Indicators */}
                <div className="testimonials__trust" data-aos="fade-up" data-aos-delay="100">
                    <div className="trust-item">
                        <div className="trust-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 12l2 2 4-4" />
                                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                                <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
                                <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
                            </svg>
                        </div>
                        <div className="trust-text">
                            <strong>100% Verificadas</strong>
                            <span>Reviews auténticas de Google</span>
                        </div>
                    </div>

                    <div className="trust-item">
                        <div className="trust-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                            </svg>
                        </div>
                        <div className="trust-text">
                            <strong>4.9/5 Estrellas</strong>
                            <span>Calificación promedio</span>
                        </div>
                    </div>

                    <div className="trust-item">
                        <div className="trust-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="m22 11-3-3 3-3" />
                                <path d="M16 8h4" />
                            </svg>
                        </div>
                        <div className="trust-text">
                            <strong>92% Recomendación</strong>
                            <span>Clientes que regresan</span>
                        </div>
                    </div>
                </div>

                {/* Widget Container */}
                <div className="testimonials__widget" data-aos="fade-up" data-aos-delay="200">
                    {/* Elfsight Google Reviews widget */}
                    <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" async />
                    <div className="elfsight-app-d4a2b5a4-3734-4c3c-bd68-010b5bf39151" data-elfsight-app-lazy></div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
