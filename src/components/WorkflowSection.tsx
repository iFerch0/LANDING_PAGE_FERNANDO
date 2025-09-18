"use client";

import React from "react";
import styles from "./WorkflowSection.module.css";

type Step = {
  id: string;
  title: string;
  benefit: string;
  description: string;
  icon: "chat" | "clock" | "tools" | "shield" | "support";
};

const StepIcon = ({ name }: { name: Step["icon"] }) => {
  switch (name) {
    case "chat":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
          <path
            d="M5 5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8 9h8M8 12h5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
          <circle
            cx="12"
            cy="12"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 8v4l3 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tools":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
          <path
            d="M11 3a5 5 0 0 0 6.9 6.9l2.6 2.6-2 2-2.6-2.6A5 5 0 0 0 11 3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.6 14.4 9 9l3 3-5.4 5.4a2.1 2.1 0 0 1-3-3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
          <path
            d="M12 4.5 20 7v6a8 8 0 0 1-16 0V7l8-2.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m9.5 12.5 2 2 3-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
          <circle
            cx="12"
            cy="12"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 4v2M12 18v2M4 12h2M18 12h2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
};

const steps: Step[] = [
  {
    id: "01",
    title: "Me escribes al instante",
    benefit: "Respuesta inmediata",
    description:
      "Cuéntame por WhatsApp qué ocurre con tu computador. Atiendo hogares y empresas sin esperas.",
    icon: "chat"
  },
  {
    id: "02",
    title: "Diagnóstico express",
    benefit: "Revisión en 30 min",
    description:
      "Analizo tu equipo de forma remota o presencial para detectar la falla y explicarte la causa en lenguaje claro.",
    icon: "clock"
  },
  {
    id: "03",
    title: "Cotización transparente",
    benefit: "Sin costos ocultos",
    description:
      "Te presento las soluciones posibles, tiempos estimados y precio fijo antes de iniciar. Tú decides cómo avanzar.",
    icon: "shield"
  },
  {
    id: "04",
    title: "Reparación profesional",
    benefit: "Arreglo el mismo día",
    description:
      "Trabajo con repuestos certificados y procesos controlados para recuperar el rendimiento óptimo de tu PC.",
    icon: "tools"
  },
  {
    id: "05",
    title: "Garantía y soporte",
    benefit: "Seguimiento incluido",
    description:
      "Entrego tu equipo probado, con respaldo escrito de 30 días y acompañamiento para cualquier duda posterior.",
    icon: "support"
  }
];

const WorkflowSection: React.FC = () => {
  return (
    <section className={styles.workflow} id="proceso">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.kicker}>¿Cómo trabajo contigo?</span>
          <h2 className={styles.title}>Un proceso claro para reparar tu computador sin estrés</h2>
          <p className={styles.subtitle}>
            Entiende los pasos en menos de 10 segundos y confía en un servicio técnico rápido, seguro y respaldado.
          </p>
        </header>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <article key={step.id} className={styles.step}>
              <div className={styles.stepIndicator}>
                <span className={styles.stepNumber}>{step.id}</span>
                {index !== steps.length - 1 && <span className={styles.stepLine} aria-hidden="true" />}
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>
                  <StepIcon name={step.icon} />
                </div>

                <div className={styles.stepContent}>
                  <div className={styles.stepHeading}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <span className={styles.stepBadge}>{step.benefit}</span>
                  </div>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.trustGrid}>
          <div className={styles.trustItem}>
            <span className={styles.trustLabel}>+5 años atendiendo Montería</span>
            <p className={styles.trustCopy}>Servicio doméstico y corporativo con historial comprobado.</p>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustLabel}>Diagnóstico sin compromiso</span>
            <p className={styles.trustCopy}>Pagas solo si avanzamos con la reparación acordada.</p>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustLabel}>Soporte permanente</span>
            <p className={styles.trustCopy}>Te acompaño después de la entrega para asegurar tu tranquilidad.</p>
          </div>
        </div>

        <div className={styles.cta}>
          <h3 className={styles.ctaTitle}>¿Listo para arreglar tu PC?</h3>
          <p className={styles.ctaDescription}>
            Agenda tu reparación hoy mismo y recibe una respuesta inmediata por WhatsApp.
          </p>
          <a
            href="http://wa.link/n8et4q"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            <span className={styles.ctaButtonText}>Escríbeme por WhatsApp ahora</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
