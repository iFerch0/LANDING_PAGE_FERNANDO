"use client";
import React from "react";
import Image from "next/image";

const SuccessCases = () => {
    return (
        <section id="casos" className="success-cases" aria-labelledby="cases-title">
            <div className="container">
                {/* Header optimizado */}
                <div className="success-cases__header" data-aos="fade-up">
                    <div className="success-cases__eyebrow">Casos de éxito reales</div>
                    <h2 id="cases-title" className="success-cases__title">
                        Transformaciones técnicas
                        <span className="success-cases__title-highlight"> documentadas</span>
                    </h2>
                    <p className="success-cases__subtitle">
                        Trabajos reales con resultados medibles: desde mantenimiento profesional hasta ensambles especializados
                    </p>
                </div>

                {/* Grid de casos mejorado */}
                <div className="success-cases__grid">
                    {/* Caso 1: Mantenimiento Completo */}
                    <article className="success-case success-case--featured" data-aos="fade-up" data-aos-delay="100">
                        <div className="success-case__header">
                            <div className="success-case__tag">🧹 Mantenimiento Profundo</div>
                            <h3 className="success-case__title">Reducción térmica crítica: 85°C → 45°C</h3>
                        </div>

                        <div className="before-after">
                            <div className="before-after__item">
                                <div className="before-after__label">ANTES</div>
                                <div className="before-after__image">
                                    <Image 
                                        src="/img/antes-despues/optimized/1-mantenimiento-antes.JPG" 
                                        alt="PC con polvo antes del mantenimiento"
                                        width={320}
                                        height={200}
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
                                        src="/img/antes-despues/optimized/1-manteniento-despues.JPG" 
                                        alt="PC limpia después del mantenimiento"
                                        width={320}
                                        height={200}
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

                        <div className="success-case__details">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.75rem',
                                padding: '0.5rem 0'
                            }}>
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    color: 'var(--brand-azul_vibrante)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    background: 'linear-gradient(135deg, rgba(var(--brand-azul_vibrante-rgb), 0.1), rgba(var(--brand-azul_oscuro-rgb), 0.05))',
                                    padding: '0.375rem 0.75rem',
                                    borderRadius: '0.375rem',
                                    border: '1px solid rgba(var(--brand-azul_vibrante-rgb), 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.375rem'
                                }}>
                                    <span style={{ fontSize: '1rem' }}>🔧</span>
                                    Proceso Técnico
                                </span>
                            </div>
                            
                            <div className="detail-item">
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-rojo_anaranjado-rgb), 0.1), rgba(var(--brand-rojo_intenso-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-rojo_anaranjado-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>🌡️</span>
                                        <span>DIAGNÓSTICO TÉRMICO</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-azul_vibrante-rgb), 0.1), rgba(var(--brand-azul_oscuro-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-azul_vibrante-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>🧹</span>
                                        <span>LIMPIEZA PROFUNDA</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-azul_vibrante-rgb), 0.1), rgba(var(--brand-azul_oscuro-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-azul_vibrante-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>❄️</span>
                                        <span>PASTA TÉRMICA NUEVA</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-marron_calido-rgb), 0.1), rgba(var(--brand-marron_calido-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-marron_calido-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>⚡</span>
                                        <span>CALIBRACIÓN FANS</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-naranja_quemado-rgb), 0.1), rgba(var(--brand-piel_bronceada-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-naranja_quemado-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>📊</span>
                                        <span>PRUEBAS TÉRMICAS</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-gris_oscuro-rgb), 0.1), rgba(var(--brand-gris_oscuro-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-gris_oscuro-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>✅</span>
                                        <span>VALIDACIÓN FINAL</span>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Diagnóstico inicial:</span>
                                <span>Sobrecalentamiento crítico por obstrucción total de ventiladores y degradación de pasta térmica</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Intervención especializada:</span>
                                <span>Limpieza profunda con aire comprimido + reemplazo pasta térmica + calibración ventiladores</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Resultado medible:</span>
                                <span>Reducción 47% temperatura CPU (85°C→45°C) + eliminación 100% ruido operativo</span>
                            </div>
                        </div>
                    </article>

                    {/* Caso 2: Ensamble PC */}
                    <article className="success-case" data-aos="fade-up" data-aos-delay="200">
                        <div className="success-case__header">
                            <div className="success-case__tag">🔧 Ensamble Especializado</div>
                            <h3 className="success-case__title">Workstation diseño: AMD Ryzen 8500G + DDR5 32GB</h3>
                        </div>

                        <div className="before-after">
                            <div className="before-after__item">
                                <div className="before-after__label">COMPONENTES</div>
                                <div className="before-after__image">
                                    <Image 
                                        src="/img/antes-despues/optimized/2-ensamble-antes.jpg" 
                                        alt="Componentes AMD Ryzen 8500G, DDR5 32GB, SSD M.2 1TB antes del ensamble"
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
                                        src="/img/antes-despues/optimized/2-ensamble-despues.jpg" 
                                        alt="PC para diseño gráfico con AMD Ryzen 8500G ensamblada y funcionando"
                                        width={280}
                                        height={180}
                                        className="case-image"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="success-case__details">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.75rem',
                                padding: '0.5rem 0'
                            }}>
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    color: 'var(--brand-azul_vibrante)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    background: 'linear-gradient(135deg, rgba(var(--brand-azul_vibrante-rgb), 0.1), rgba(var(--brand-azul_oscuro-rgb), 0.05))',
                                    padding: '0.375rem 0.75rem',
                                    borderRadius: '0.375rem',
                                    border: '1px solid rgba(var(--brand-azul_vibrante-rgb), 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.375rem'
                                }}>
                                    <span style={{ fontSize: '1rem' }}>🔧</span>
                                    Componentes Técnicos
                                </span>
                            </div>
                            
                            <div className="detail-item">
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-rojo_anaranjado-rgb), 0.1), rgba(var(--brand-rojo_intenso-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-rojo_anaranjado-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>🔥</span>
                                        <span>AMD RYZEN 8500G</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-azul_vibrante-rgb), 0.1), rgba(var(--brand-azul_oscuro-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-azul_vibrante-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>🔌</span>
                                        <span>BOARD A620</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-azul_vibrante-rgb), 0.1), rgba(var(--brand-azul_oscuro-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-azul_vibrante-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>❄️</span>
                                        <span>REFRIGERACIÓN LÍQUIDA</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-marron_calido-rgb), 0.1), rgba(var(--brand-marron_calido-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-marron_calido-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>⚡</span>
                                        <span>DDR5 32GB 6400MHZ</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-naranja_quemado-rgb), 0.1), rgba(var(--brand-piel_bronceada-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-naranja_quemado-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>💾</span>
                                        <span>SSD M.2 1TB</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-gris_oscuro-rgb), 0.1), rgba(var(--brand-gris_oscuro-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-gris_oscuro-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>📦</span>
                                        <span>COOLER MASTER Q300L</span>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Aplicación específica:</span>
                                <span>Workstation diseño gráfico profesional con arquitectura escalable para GPU dedicada</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Configuración entregada:</span>
                                <span>Sistema operativo optimizado + suite Adobe + drivers especializados + pruebas rendimiento</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Garantía técnica:</span>
                                <span>6 meses hardware + soporte configuración + asesoría upgrade futuro</span>
                            </div>
                        </div>
                    </article>

                    {/* Caso 3: Mantenimiento Sencillo */}
                    <article className="success-case" data-aos="fade-up" data-aos-delay="300">
                        <div className="success-case__header">
                            <div className="success-case__tag">🔄 Restauración Completa</div>
                            <h3 className="success-case__title">Rescate técnico: PC archivado → Estado regalo</h3>
                        </div>

                        <div className="before-after">
                            <div className="before-after__item">
                                <div className="before-after__label">ESTADO INICIAL</div>
                                <div className="before-after__image">
                                    <Image 
                                        src="/img/antes-despues/optimized/3-mantenimiento-pc-sencillo-antes.JPG" 
                                        alt="PC archivado extremadamente sucio antes del mantenimiento"
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
                                <div className="before-after__label">RECUPERADO</div>
                                <div className="before-after__image">
                                    <Image 
                                        src="/img/antes-despues/optimized/3-mantenimiento-pc-sencillo-despues.jpg" 
                                        alt="PC recuperado después del mantenimiento completo, listo para regalo"
                                        width={280}
                                        height={180}
                                        className="case-image"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="success-case__details">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.75rem',
                                padding: '0.5rem 0'
                            }}>
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    color: 'var(--brand-azul_vibrante)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    background: 'linear-gradient(135deg, rgba(var(--brand-azul_vibrante-rgb), 0.1), rgba(var(--brand-azul_oscuro-rgb), 0.05))',
                                    padding: '0.375rem 0.75rem',
                                    borderRadius: '0.375rem',
                                    border: '1px solid rgba(var(--brand-azul_vibrante-rgb), 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.375rem'
                                }}>
                                    <span style={{ fontSize: '1rem' }}>🛠️</span>
                                    Proceso de Restauración
                                </span>
                            </div>
                            
                            <div className="detail-item">
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-azul_vibrante-rgb), 0.1), rgba(var(--brand-azul_oscuro-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-azul_vibrante-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>🧹</span>
                                        <span>LIMPIEZA PROFUNDA</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-azul_vibrante-rgb), 0.1), rgba(var(--brand-azul_oscuro-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-azul_vibrante-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>🔍</span>
                                        <span>DIAGNÓSTICO COMPLETO</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-naranja_quemado-rgb), 0.1), rgba(var(--brand-piel_bronceada-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-naranja_quemado-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>💾</span>
                                        <span>INSTALACIÓN WINDOWS</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-marron_calido-rgb), 0.1), rgba(var(--brand-marron_calido-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-marron_calido-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>⚡</span>
                                        <span>OPTIMIZACIÓN SISTEMA</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-rojo_anaranjado-rgb), 0.1), rgba(var(--brand-rojo_intenso-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-rojo_anaranjado-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>🔥</span>
                                        <span>PASTA TÉRMICA NUEVA</span>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        background: 'linear-gradient(135deg, rgba(var(--brand-gris_oscuro-rgb), 0.1), rgba(var(--brand-gris_oscuro-rgb), 0.05))',
                                        border: '1px solid rgba(var(--brand-gris_oscuro-rgb), 0.2)',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        <span style={{ fontSize: '1rem' }}>✅</span>
                                        <span>PRUEBAS COMPLETAS</span>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Situación inicial:</span>
                                <span>PC archivado durante años, extremadamente sucio, destinado para regalo familiar</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Intervención técnica:</span>
                                <span>Desmontaje completo + limpieza especializada + reemplazo pasta térmica + instalación Windows limpio</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Entrega final:</span>
                                <span>PC completamente funcional como nuevo, optimizado y listo para regalo con garantía</span>
                            </div>
                        </div>
                    </article>
                </div>

                {/* CTA de casos de éxito */}
                <div className="success-cases__cta" data-aos="fade-up" data-aos-delay="400">
                    <div className="success-cta__content">
                        <div className="success-cta__header">
                            <h3 className="success-cta__title">¿Necesitas una intervención técnica similar?</h3>
                            <p className="success-cta__desc">
                                Diagnóstico profesional inmediato: describe tu situación y obtienes evaluación técnica en 5 minutos
                            </p>
                        </div>

                        <div className="success-cta__benefits">
                            <div className="cta-benefit-item">
                                <span className="benefit-icon">💬</span>
                                <span>Diagnóstico técnico inmediato</span>
                            </div>
                            <div className="cta-benefit-item">
                                <span className="benefit-icon">💰</span>
                                <span>Cotización profesional gratuita</span>
                            </div>
                            <div className="cta-benefit-item">
                                <span className="benefit-icon">🚀</span>
                                <span>Resultados documentados como estos</span>
                            </div>
                        </div>

                        <div className="success-cta__actions">
                            <a href="https://wa.me/573008474121" className="btn btn--primary btn--large cta-pulse">
                                <span className="btn__icon">📱</span>
                                Solicitar evaluación técnica
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
