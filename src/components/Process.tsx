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

const WhatsAppIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
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

                {/* CTA Section */}
                <div className={styles.cta} data-aos="fade-up" data-aos-delay="400">
                    <div className={styles.ctaContent}>
                        <div className={styles.ctaHeader}>
                            <h3 className={styles.ctaTitle}>¿Listo para empezar?</h3>
                            <p className={styles.ctaDesc}>
                                Escríbeme ahora y te respondo en menos de 5 minutos
                            </p>
                        </div>

                        <div className={styles.ctaActions}>
                            <a
                                href="https://wa.me/573015218139?text=Hola%20Fernando%2C%20necesito%20ayuda%20con%20mi%20computador"
                                className={styles.ctaButton}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <WhatsAppIcon />
                                <span>Iniciar conversación</span>
                            </a>
                        </div>

                        <div className={styles.ctaTrust}>
                            <div className={styles.trustItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span>Diagnóstico gratuito</span>
                            </div>
                            <div className={styles.trustItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span>Sin compromiso</span>
                            </div>
                            <div className={styles.trustItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span>30 días de garantía</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
