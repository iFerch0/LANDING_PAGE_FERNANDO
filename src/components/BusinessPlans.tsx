'use client';

import React from 'react';
import { CheckCircleIcon, ShieldCheckIcon, ZapIcon, ClockIcon, WhatsAppIcon } from './Icons';
import styles from './BusinessPlans.module.css';

/* ── Data ─────────────────────────────────────────────────────────────── */

interface Plan {
  name: string;
  badge: string;
  tagline: string;
  icon: React.FC<{ className?: string }>;
  features: string[];
  highlight?: boolean;
  accent: string;
}

const plans: Plan[] = [
  {
    name: 'Plan Básico',
    badge: 'Esencial',
    tagline: 'Mantenimiento preventivo mensual para tu negocio',
    icon: ShieldCheckIcon,
    features: [
      'Hasta 5 equipos',
      'Mantenimiento mensual preventivo',
      'Soporte por WhatsApp',
      'Reportes mensuales de estado',
      'Tiempo de respuesta: 24h',
    ],
    accent: 'blue',
  },
  {
    name: 'Plan Profesional',
    badge: 'Recomendado',
    tagline: 'Soporte completo con SLA garantizado',
    icon: ZapIcon,
    features: [
      'Hasta 15 equipos',
      'Mantenimiento quincenal',
      'Soporte prioritario + SLA 4h',
      'Inventario de equipos',
      'Reportes detallados + recomendaciones',
      'Antivirus corporativo incluido',
    ],
    highlight: true,
    accent: 'orange',
  },
  {
    name: 'Plan Corporativo',
    badge: 'Premium',
    tagline: 'Todo incluido con prioridad máxima',
    icon: ClockIcon,
    features: [
      'Equipos ilimitados',
      'Mantenimiento semanal',
      'Prioridad 24/7 + SLA 2h',
      'Gestor técnico dedicado',
      'Respaldo automatizado en la nube',
      'Licencias y antivirus incluidos',
      'Auditoría de seguridad trimestral',
    ],
    accent: 'teal',
  },
];

/* ── Component ────────────────────────────────────────────────────────── */

const BusinessPlans: React.FC = () => {
  return (
    <section id="planes-empresas" className={styles.section} aria-labelledby="plans-title">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} data-aos="fade-up">
          <span className={styles.eyebrow}>Para empresas</span>
          <h2 id="plans-title" className={styles.title}>
            Planes de
            <span className={styles.titleAccent}> Soporte Empresarial</span>
          </h2>
          <p className={styles.subtitle}>
            Tu negocio no puede parar por problemas técnicos. Elige el plan que se ajuste a tu
            operación y olvídate de los imprevistos.
          </p>
        </div>

        {/* Plans Grid */}
        <div className={styles.grid}>
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <article
                key={plan.name}
                className={`${styles.card} ${plan.highlight ? styles.cardHighlight : ''} ${styles[`accent${plan.accent.charAt(0).toUpperCase() + plan.accent.slice(1)}`]}`}
                data-aos="fade-up"
              >
                {plan.highlight && <div className={styles.recommendedRibbon}>Más elegido</div>}

                <div className={styles.cardTop}>
                  <div className={styles.planBadge}>
                    <IconComponent className={styles.planIcon} />
                    <span>{plan.badge}</span>
                  </div>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <p className={styles.planTagline}>{plan.tagline}</p>
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.featuresLabel}>Incluye:</span>
                  <ul className={styles.featureList}>
                    {plan.features.map((feat) => (
                      <li key={feat} className={styles.featureItem}>
                        <CheckCircleIcon className={styles.featureIcon} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/573008474121?text=${encodeURIComponent(`Hola Fernando, me interesa el ${plan.name} de soporte empresarial. ¿Me puedes dar más información?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.planCta} ${plan.highlight ? styles.planCtaPrimary : ''}`}
                >
                  <WhatsAppIcon size={16} />
                  Solicitar información
                </a>
              </article>
            );
          })}
        </div>

        {/* Trust line */}
        <p className={styles.trustLine} data-aos="fade-up">
          Todos los planes incluyen diagnóstico gratuito y sin compromiso de permanencia.
        </p>
      </div>
    </section>
  );
};

export default BusinessPlans;
