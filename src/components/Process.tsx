"use client";
import React from "react";
import styles from './Process.module.css';

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
        <section id="proceso" className={styles.process} aria-labelledby="process-title">
            <div className="container">
                {/* Header optimizado */}
                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.eyebrow}>Proceso simple</div>
                    <h2 id="process-title" className={styles.title}>
                        ¿Cómo trabajo contigo?
                    </h2>
                    <p className={styles.subtitle}>
                        Un proceso claro y directo, sin complicaciones ni sorpresas
                    </p>
                </div>

                {/* Steps con conectores visuales */}
                <div className={styles.timeline} role="list">
                    <div className={styles.step} role="listitem" data-aos="fade-up" data-aos-delay="100">
                        <div className={styles.stepIcon}>
                            <ChatIcon />
                        </div>
                        <div className={styles.stepContent}>
                            <h3 className={styles.stepTitle}>Me escribes</h3>
                            <p className={styles.stepDescription}>
                                Por WhatsApp me cuentas qué le pasa a tu PC. Entre más detalles, mejor puedo ayudarte.
                            </p>
                            <div className={styles.stepTime}>⏱️ Respuesta inmediata</div>
                        </div>
                        <div className={styles.stepNumber}>01</div>
                    </div>

                    <div className={styles.step} role="listitem" data-aos="fade-up" data-aos-delay="200">
                        <div className={styles.stepIcon}>
                            <SearchIcon />
                        </div>
                        <div className={styles.stepContent}>
                            <h3 className={styles.stepTitle}>Reviso el equipo</h3>
                            <p className={styles.stepDescription}>
                                Hago una revisión completa para saber exactamente qué tiene y cuánto cuesta arreglarlo.
                            </p>
                            <div className={styles.stepTime}>⏱️ 15-30 minutos</div>
                        </div>
                        <div className={styles.stepNumber}>02</div>
                    </div>

                    <div className={styles.step} role="listitem" data-aos="fade-up" data-aos-delay="300">
                        <div className={styles.stepIcon}>
                            <ToolIcon />
                        </div>
                        <div className={styles.stepContent}>
                            <h3 className={styles.stepTitle}>Arreglo el problema</h3>
                            <p className={styles.stepDescription}>
                                Una vez apruebes el presupuesto, me pongo a trabajar hasta que tu PC quede funcionando bien.
                            </p>
                            <div className={styles.stepTime}>⏱️ Mismo día (mayoría)</div>
                        </div>
                        <div className={styles.stepNumber}>03</div>
                    </div>

                    <div className={styles.step} role="listitem" data-aos="fade-up" data-aos-delay="400">
                        <div className={styles.stepIcon}>
                            <CheckIcon />
                        </div>
                        <div className={styles.stepContent}>
                            <h3 className={styles.stepTitle}>Listo para usar</h3>
                            <p className={styles.stepDescription}>
                                Te entrego tu equipo funcionando y te explico qué le hice. Si algo falla después, lo reviso gratis.
                            </p>
                            <div className={styles.stepTime}>✅ Con respaldo</div>
                        </div>
                        <div className={styles.stepNumber}>04</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
