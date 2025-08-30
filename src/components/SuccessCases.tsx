"use client";
import React from "react";
import Image from "next/image";

const SuccessCases = () => {
    return (
        <section id="casos" className="success-cases" aria-labelledby="cases-title">
            <div className="container">
                {/* Header optimizado */}
                <div className="success-cases__header" data-aos="fade-up">
                    <div className="success-cases__eyebrow">Resultados reales</div>
                    <h2 id="cases-title" className="success-cases__title">
                        Estos clientes ya tienen su PC
                        <span className="success-cases__title-highlight"> funcionando perfecta</span>
                    </h2>
                    <p className="success-cases__subtitle">
                        Casos reales de PCs que parecían "perdidas" y ahora funcionan como nuevas
                    </p>
                </div>

                {/* Grid de casos mejorado */}
                <div className="success-cases__grid">
                    {/* Caso 1: Mantenimiento Completo */}
                    <article className="success-case success-case--featured" data-aos="fade-up" data-aos-delay="100">
                        <div className="success-case__header">
                            <div className="success-case__tag">🧹 Mantenimiento</div>
                            <h3 className="success-case__title">PC de oficina saturada de polvo</h3>
                            <p className="success-case__client">"Mi computador se sobrecalentaba y hacía mucho ruido. Pensé que se iba a dañar"</p>
                        </div>

                        <div className="before-after">
                            <div className="before-after__item">
                                <div className="before-after__label">ANTES</div>
                                <div className="before-after__image">
                                    <Image 
                                        src="/img/antes-despues/1-mantenimiento-antes.JPG" 
                                        alt="PC con polvo antes del mantenimiento"
                                        width={280}
                                        height={180}
                                        className="case-image"
                                    />
                                </div>
                                <div className="before-after__stats">
                                    <div className="stat">
                                        <span className="stat-value">85°C</span>
                                        <span className="stat-label">Temperatura CPU</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-value">Muy alto</span>
                                        <span className="stat-label">Ruido ventiladores</span>
                                    </div>
                                </div>
                            </div>

                            <div className="before-after__arrow">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <div className="before-after__item">
                                <div className="before-after__label">DESPUÉS</div>
                                <div className="before-after__image">
                                    <Image 
                                        src="/img/antes-despues/1-manteniento-despues.JPG" 
                                        alt="PC limpia después del mantenimiento"
                                        width={280}
                                        height={180}
                                        className="case-image"
                                    />
                                </div>
                                <div className="before-after__stats">
                                    <div className="stat">
                                        <span className="stat-value">45°C</span>
                                        <span className="stat-label">Temperatura CPU</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-value">Silencioso</span>
                                        <span className="stat-label">Funcionamiento</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="success-case__result">
                            <div className="result-quote">
                                "¡Increíble la diferencia! Ahora no se escucha nada y está súper rápida. Fernando es muy cuidadoso con su trabajo."
                            </div>
                            <div className="result-author">- María Elena, Secretaria</div>
                        </div>

                        <div className="success-case__details">
                            <div className="detail-item">
                                <span className="detail-label">Problema:</span>
                                <span>Acumulación extrema de polvo, ventiladores obstruidos</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Solución:</span>
                                <span>Limpieza profunda, cambio pasta térmica, optimización</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Tiempo:</span>
                                <span>3 horas</span>
                            </div>
                        </div>
                    </article>

                    {/* Caso 2: Ensamble PC */}
                    <article className="success-case" data-aos="fade-up" data-aos-delay="200">
                        <div className="success-case__header">
                            <div className="success-case__tag">� Ensamble</div>
                            <h3 className="success-case__title">PC gaming personalizada</h3>
                            <p className="success-case__client">"Quería una PC para jugar pero no sabía cómo armarla. Fernando me ayudó con todo"</p>
                        </div>

                        <div className="before-after">
                            <div className="before-after__item">
                                <div className="before-after__label">COMPONENTES</div>
                                <div className="before-after__image">
                                    <Image 
                                        src="/img/antes-despues/2-ensamble-antes.jpg" 
                                        alt="Componentes de PC antes del ensamble"
                                        width={280}
                                        height={180}
                                        className="case-image"
                                    />
                                </div>
                            </div>

                            <div className="before-after__arrow">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <div className="before-after__item">
                                <div className="before-after__label">PC TERMINADA</div>
                                <div className="before-after__image">
                                    <Image 
                                        src="/img/antes-despues/2-ensamble-despues.jpg" 
                                        alt="PC gaming ensamblada y funcionando"
                                        width={280}
                                        height={180}
                                        className="case-image"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="success-case__result">
                            <div className="result-quote">
                                "Mi PC quedó perfecta. Fernando me explicó cada paso y me ayudó a elegir las mejores piezas para mi presupuesto."
                            </div>
                            <div className="result-author">- Andrés, Estudiante</div>
                        </div>

                        <div className="success-case__details">
                            <div className="detail-item">
                                <span className="detail-label">Incluye:</span>
                                <span>Ensamble completo, instalación Windows, drivers, programas básicos</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Tiempo:</span>
                                <span>4 horas</span>
                            </div>
                        </div>
                    </article>

                    {/* Caso 3: Mantenimiento Sencillo */}
                    <article className="success-case" data-aos="fade-up" data-aos-delay="300">
                        <div className="success-case__header">
                            <div className="success-case__tag">⚡ Mantenimiento básico</div>
                            <h3 className="success-case__title">PC familiar con mantenimiento preventivo</h3>
                            <p className="success-case__client">"Quería que revisaran mi PC para que no se dañe. La uso para trabajo y estudios"</p>
                        </div>

                        <div className="before-after">
                            <div className="before-after__item">
                                <div className="before-after__label">ANTES</div>
                                <div className="before-after__image">
                                    <Image 
                                        src="/img/antes-despues/3-mantenimiento-pc-sencillo-antes.JPG" 
                                        alt="PC antes del mantenimiento básico"
                                        width={280}
                                        height={180}
                                        className="case-image"
                                    />
                                </div>
                            </div>

                            <div className="before-after__arrow">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>

                            <div className="before-after__item">
                                <div className="before-after__label">DESPUÉS</div>
                                <div className="before-after__image">
                                    <Image 
                                        src="/img/antes-despues/3-mantenimiento-pc-sencillo-despues.jpg" 
                                        alt="PC después del mantenimiento básico"
                                        width={280}
                                        height={180}
                                        className="case-image"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="success-case__result">
                            <div className="result-quote">
                                "Fernando fue muy honesto. Mi PC no necesitaba mucho, solo una limpieza básica. Quedó como nueva."
                            </div>
                            <div className="result-author">- Carmen, Profesora</div>
                        </div>

                        <div className="success-case__details">
                            <div className="detail-item">
                                <span className="detail-label">Servicio:</span>
                                <span>Limpieza preventiva, verificación general, optimización software</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Tiempo:</span>
                                <span>1.5 horas</span>
                            </div>
                        </div>
                    </article>
                </div>

                {/* CTA de casos de éxito */}
                <div className="success-cases__cta" data-aos="fade-up" data-aos-delay="400">
                    <div className="success-cta__content">
                        <div className="success-cta__header">
                            <h3 className="success-cta__title">¿Tu PC tiene el mismo problema?</h3>
                            <p className="success-cta__desc">
                                Cuéntame qué le pasa y en 5 minutos te digo si tiene solución y cuánto cuesta
                            </p>
                        </div>

                        <div className="success-cta__benefits">
                            <div className="cta-benefit-item">
                                <span className="benefit-icon">💬</span>
                                <span>Respuesta en 5 minutos</span>
                            </div>
                            <div className="cta-benefit-item">
                                <span className="benefit-icon">💰</span>
                                <span>Presupuesto sin compromiso</span>
                            </div>
                            <div className="cta-benefit-item">
                                <span className="benefit-icon">🚀</span>
                                <span>Trabajo como en las fotos</span>
                            </div>
                        </div>

                        <div className="success-cta__actions">
                            <a href="https://wa.me/573008474121" className="btn btn--primary btn--large cta-pulse">
                                <span className="btn__icon">📱</span>
                                Consultar mi caso ahora
                            </a>
                            
                            <div className="success-cta__social-proof">
                                <div className="social-proof-item">
                                    <span className="social-icon">⭐</span>
                                    <span>92% clientes satisfechos</span>
                                </div>
                                <div className="social-proof-item">
                                    <span className="social-icon">📸</span>
                                    <span>Trabajo documentado</span>
                                </div>
                            </div>
                        </div>

                        <div className="success-cta__guarantee">
                            <div className="guarantee-badge">
                                <span className="guarantee-icon">🛡️</span>
                                <div className="guarantee-text">
                                    <div className="guarantee-title">Garantía sin riesgo</div>
                                    <div className="guarantee-desc">Si no tiene solución, no pagas nada</div>
                                </div>
                            </div>
                        </div>

                        <div className="success-cta__urgency">
                            <span className="urgency-icon">⏰</span>
                            <span>Disponible hoy - Respuesta inmediata por WhatsApp</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessCases;
