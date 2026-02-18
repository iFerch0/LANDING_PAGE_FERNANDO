'use client';
import React from 'react';
import {
  MessageIcon,
  DiagnosticIcon,
  RepairIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from './Icons';
import styles from './Process.module.css';

const PROCESS_STEPS = [
  {
    number: '01',
    icon: MessageIcon,
    title: 'Me escribes',
    description:
      'Por WhatsApp me cuentas qué le pasa a tu PC. Entre más detalles, mejor puedo ayudarte.',
    time: 'Respuesta inmediata',
    highlight: false,
  },
  {
    number: '02',
    icon: DiagnosticIcon,
    title: 'Diagnóstico',
    description:
      'Reviso tu equipo a fondo para identificar el problema exacto y darte un presupuesto claro.',
    time: '15-30 minutos',
    highlight: false,
  },
  {
    number: '03',
    icon: RepairIcon,
    title: 'Reparación',
    description:
      'Una vez apruebes, me pongo a trabajar hasta que tu equipo quede funcionando perfectamente.',
    time: 'Mismo día',
    highlight: true,
  },
  {
    number: '04',
    icon: CheckCircleIcon,
    title: 'Entrega',
    description:
      'Te entrego tu equipo funcionando con explicación del trabajo y garantía incluida.',
    time: 'Con garantía',
    highlight: false,
  },
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
                    <ChevronRightIcon size={24} />
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
