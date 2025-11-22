"use client";
import React from "react";
import styles from './Process.module.css';

// Iconos modernos para cada paso del proceso
const MessageIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 9h8M8 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const DiagnosticIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const RepairIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CheckCircleIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PROCESS_STEPS = [
    {
        number: "01",
        icon: MessageIcon,
        title: "Me escribes",
        description: "Por WhatsApp me cuentas qué le pasa a tu PC. Entre más detalles, mejor puedo ayudarte.",
        time: "Respuesta inmediata",
        highlight: false
    },
    {
        number: "02",
        icon: DiagnosticIcon,
        title: "Diagnóstico",
        description: "Reviso tu equipo a fondo para identificar el problema exacto y darte un presupuesto claro.",
        time: "15-30 minutos",
        highlight: false
    },
    {
        number: "03",
        icon: RepairIcon,
        title: "Reparación",
        description: "Una vez apruebes, me pongo a trabajar hasta que tu equipo quede funcionando perfectamente.",
        time: "Mismo día",
        highlight: true
    },
    {
        number: "04",
        icon: CheckCircleIcon,
        title: "Entrega",
        description: "Te entrego tu equipo funcionando con explicación del trabajo y garantía incluida.",
        time: "Con garantía",
        highlight: false
    }
];

const Process = () => {
    return (
        <section id="proceso" className={styles.process} aria-labelledby="process-title">
            <div className="container">
                {/* Header */}
                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.eyebrow}>Proceso simple</div>
                    <h2 id="process-title" className={styles.title}>
                        ¿Cómo trabajo
                        <span className={styles.titleHighlight}> contigo?</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Un proceso claro y directo en 4 pasos. Sin complicaciones, sin sorpresas.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className={styles.grid} role="list">
                    {PROCESS_STEPS.map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                            <article
                                key={step.number}
                                className={`${styles.card} ${step.highlight ? styles.cardHighlight : ''}`}
                                role="listitem"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Número decorativo */}
                                <div className={styles.cardNumber}>{step.number}</div>

                                {/* Icono */}
                                <div className={styles.cardIcon}>
                                    <IconComponent />
                                </div>

                                {/* Contenido */}
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{step.title}</h3>
                                    <p className={styles.cardDescription}>{step.description}</p>
                                </div>

                                {/* Tiempo estimado */}
                                <div className={styles.cardFooter}>
                                    <span className={styles.timeBadge}>{step.time}</span>
                                </div>

                                {/* Conector (excepto último) */}
                                {index < PROCESS_STEPS.length - 1 && (
                                    <div className={styles.connector} aria-hidden="true">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Process;
