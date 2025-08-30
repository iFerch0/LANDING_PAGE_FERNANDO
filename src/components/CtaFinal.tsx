import React from "react";
import CountUpClient from './CountUpClient';

const CtaFinal = () => {
    return (
        <section className="cta-final">
            <div className="container">
                <div className="cta-final__content">
                    {/* Enhanced Header */}
                    <div className="cta-final__header" data-aos="fade-up">
                        <div className="cta-final__badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                            </svg>
                            ¡Actúa Ahora!
                        </div>
                        <h2 className="cta-final__title">Tu Computador Te Está Esperando</h2>
                        <p className="cta-final__subtitle">
                            No dejes que un problema técnico arruine tu productividad. Resolvámoslo hoy mismo.
                        </p>
                    </div>

                    {/* Value Proposition */}
                    <div className="cta-final__value" data-aos="fade-up" data-aos-delay="100">
                        <div className="value-grid">
                            <div className="value-item">
                                <div className="value-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                </div>
                                <div className="value-content">
                                    <h4>Servicio Profesional</h4>
                                    <span>Técnico certificado y experimentado</span>
                                </div>
                            </div>
                            
                            <div className="value-item">
                                <div className="value-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12,6 12,12 16,14"/>
                                    </svg>
                                </div>
                                <div className="value-content">
                                    <h4>Atención Inmediata</h4>
                                    <span>Respuesta en menos de 2 horas</span>
                                </div>
                            </div>
                            
                            <div className="value-item">
                                <div className="value-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4"/>
                                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                                        <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                                        <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                                    </svg>
                                </div>
                                <div className="value-content">
                                    <h4>Garantía Escrita</h4>
                                    <span><CountUpClient end={30} ssrValue={30} suffix=" días" /> sin letra pequeña</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Options */}
                    <div className="cta-final__actions" data-aos="fade-up" data-aos-delay="200">
                        <div className="contact-grid">
                            <div className="contact-option contact-option--primary">
                                <div className="contact-header">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
                                    </svg>
                                    <div>
                                        <h4>WhatsApp Directo</h4>
                                        <span>La forma más rápida</span>
                                    </div>
                                </div>
                                <a 
                                    href="http://wa.link/n8et4q" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn--whatsapp btn--large"
                                >
                                    Escribir Ahora
                                </a>
                            </div>

                            <div className="contact-option contact-option--secondary">
                                <div className="contact-header">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    <div>
                                        <h4>Llamada Directa</h4>
                                        <span>Para casos urgentes</span>
                                    </div>
                                </div>
                                <a 
                                    href="tel:+573008474121" 
                                    className="btn btn--call btn--large"
                                >
                                    (300) 847-4121
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="cta-final__trust" data-aos="fade-up" data-aos-delay="300">
                        <div className="trust-grid">
                            <div className="trust-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                </svg>
                                <span>Técnico Certificado</span>
                            </div>
                            
                            <div className="trust-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                                <span>500+ Clientes Satisfechos</span>
                            </div>
                            
                            <div className="trust-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12,6 12,12 16,14"/>
                                </svg>
                                <span>Atención 7 Días</span>
                            </div>
                            
                            <div className="trust-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 11l3 3L22 4"/>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                                </svg>
                                <span>Trabajo Garantizado</span>
                            </div>
                        </div>
                    </div>

                    {/* Final Info */}
                    <div className="cta-final__info" data-aos="fade-up" data-aos-delay="400">
                        <p>
                            <strong>Montería y alrededores</strong> • 
                            Servicio a domicilio sin costo adicional • 
                            <span className="hours">Lun - Sáb: 8:00 AM - 6:00 PM</span>
                        </p>
                        <div className="availability-indicator">
                            <div className="status-dot"></div>
                            <span>Disponible ahora para atenderte</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CtaFinal;
