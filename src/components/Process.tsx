"use client";
import React from "react";

// Iconos modernos para cada paso del proceso
const ChatIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 11.5c0 4.97-4.03 9-9 9-1.32 0-2.57-.29-3.69-.81L3 21l1.31-5.31C3.81 14.57 3.5 13.32 3.5 12c0-4.97 4.03-9 9-9s9 4.03 9 9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14c1 1 2.5 1 3.5 0s2.5-1 3.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="9.5" r="0.5" fill="currentColor"/>
        <circle cx="15" cy="9.5" r="0.5" fill="currentColor"/>
    </svg>
);

const SearchIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const ToolIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CheckIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Process = () => {
    return (
        <section id="proceso" className="process" aria-labelledby="process-title">
            <div className="container">
                {/* Header optimizado */}
                <div className="process__header" data-aos="fade-up">
                    <div className="process__eyebrow">Proceso simple</div>
                    <h2 id="process-title" className="process__title">
                        ¿Cómo trabajo contigo?
                    </h2>
                    <p className="process__subtitle">
                        Un proceso claro y directo, sin complicaciones ni sorpresas
                    </p>
                </div>

                {/* Steps con conectores visuales */}
                <div className="process__timeline" role="list">
                    <div className="process-step" role="listitem" data-aos="fade-up" data-aos-delay="100">
                        <div className="process-step__icon">
                            <ChatIcon />
                        </div>
                        <div className="process-step__content">
                            <h3 className="process-step__title">Me escribes</h3>
                            <p className="process-step__description">
                                Por WhatsApp me cuentas qué le pasa a tu PC. Entre más detalles, mejor puedo ayudarte.
                            </p>
                            <div className="process-step__time">⏱️ Respuesta inmediata</div>
                        </div>
                        <div className="process-step__number">01</div>
                    </div>

                    <div className="process-step" role="listitem" data-aos="fade-up" data-aos-delay="200">
                        <div className="process-step__icon">
                            <SearchIcon />
                        </div>
                        <div className="process-step__content">
                            <h3 className="process-step__title">Reviso el equipo</h3>
                            <p className="process-step__description">
                                Hago una revisión completa para saber exactamente qué tiene y cuánto cuesta arreglarlo.
                            </p>
                            <div className="process-step__time">⏱️ 15-30 minutos</div>
                        </div>
                        <div className="process-step__number">02</div>
                    </div>

                    <div className="process-step" role="listitem" data-aos="fade-up" data-aos-delay="300">
                        <div className="process-step__icon">
                            <ToolIcon />
                        </div>
                        <div className="process-step__content">
                            <h3 className="process-step__title">Arreglo el problema</h3>
                            <p className="process-step__description">
                                Una vez apruebes el presupuesto, me pongo a trabajar hasta que tu PC quede funcionando bien.
                            </p>
                            <div className="process-step__time">⏱️ Mismo día (mayoría)</div>
                        </div>
                        <div className="process-step__number">03</div>
                    </div>

                    <div className="process-step" role="listitem" data-aos="fade-up" data-aos-delay="400">
                        <div className="process-step__icon">
                            <CheckIcon />
                        </div>
                        <div className="process-step__content">
                            <h3 className="process-step__title">Listo para usar</h3>
                            <p className="process-step__description">
                                Te entrego tu equipo funcionando y te explico qué le hice. Si algo falla después, lo reviso gratis.
                            </p>
                            <div className="process-step__time">✅ Con respaldo</div>
                        </div>
                        <div className="process-step__number">04</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
