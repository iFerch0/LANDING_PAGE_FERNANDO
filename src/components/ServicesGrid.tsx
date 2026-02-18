'use client';

import React from 'react';
import {
  WrenchIcon,
  ZapIcon,
  ShieldCheckIcon,
  DeviceIcon,
  ClockIcon,
  CheckCircleIcon,
  WhatsAppIcon,
  QuestionCircleIcon,
} from './Icons';
import styles from './ServicesGrid.module.css';

/* ── Data ─────────────────────────────────────────────────────────────── */

interface CompactService {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  duration: string;
  features: [string, string];
  accent: string;
  iconBox: string;
}

const compactServices: CompactService[] = [
  {
    icon: ZapIcon,
    title: 'Mantenimiento Preventivo',
    description:
      'Limpieza completa de hardware, actualización de sistema y optimización de rendimiento.',
    duration: '2-3 horas',
    features: ['Limpieza interna completa', 'Cambio de pasta térmica'],
    accent: 'accentBlue',
    iconBox: 'iconBoxBlue',
  },
  {
    icon: DeviceIcon,
    title: 'Recuperación de Datos',
    description:
      'Recuperación de archivos perdidos o de discos dañados con tecnología especializada.',
    duration: '1-3 días',
    features: ['Evaluación sin costo', 'Entrega en USB/Nube'],
    accent: 'accentTeal',
    iconBox: 'iconBoxTeal',
  },
  {
    icon: DeviceIcon,
    title: 'Formateo e Instalación',
    description: 'Instalación limpia de Windows, configuración completa y programas esenciales.',
    duration: '3-4 horas',
    features: ['Windows 10/11 original', 'Drivers actualizados'],
    accent: 'accentGreen',
    iconBox: 'iconBoxGreen',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Eliminación de Virus',
    description: 'Limpieza profunda de malware, virus, adware y optimización de seguridad.',
    duration: '2 horas',
    features: ['Escaneo completo', 'Antivirus premium'],
    accent: 'accentRed',
    iconBox: 'iconBoxRed',
  },
  {
    icon: ZapIcon,
    title: 'Soporte Remoto',
    description: 'Asistencia técnica a distancia para problemas de software y configuración.',
    duration: '30-60 min',
    features: ['Conexión remota segura', 'Solución inmediata'],
    accent: 'accentAmber',
    iconBox: 'iconBoxAmber',
  },
];

/* ── Component ────────────────────────────────────────────────────────── */

const ServicesGrid: React.FC = () => {
  return (
    <section id="servicios" className={styles.services} aria-labelledby="services-title">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} data-aos="fade-up">
          <span className={styles.eyebrow}>Servicios profesionales</span>
          <h2 id="services-title" className={styles.title}>
            ¿Qué necesita
            <span className={styles.titleAccent}> tu computador?</span>
          </h2>
          <p className={styles.subtitle}>
            Soluciones profesionales para tu equipo. Diagnóstico gratuito incluido en todos los
            servicios.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {/* Hero Card — Reparación de Hardware (Más solicitado) */}
          <article className={styles.heroCard} data-aos="fade-up">
            <div className={styles.heroContent}>
              <div className={styles.heroHeader}>
                <div className={styles.heroIconBox}>
                  <WrenchIcon className={styles.heroIcon} />
                </div>
                <div className={styles.heroTitleGroup}>
                  <h3 className={styles.heroTitle}>Reparación de Hardware</h3>
                  <p className={styles.heroSub}>Servicio más solicitado</p>
                </div>
                <span className={styles.popularBadge}>Más solicitado</span>
              </div>

              <p className={styles.heroDesc}>
                Diagnóstico y reparación de componentes dañados, reemplazo de piezas con repuestos
                originales. Mismo día en la mayoría de casos.
              </p>

              <div className={styles.heroDuration}>
                <ClockIcon size={16} />
                <span>Mismo día</span>
              </div>

              <a
                href="http://wa.link/n8et4q"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroCta}
              >
                <WhatsAppIcon size={16} />
                Solicitar cotización
              </a>
            </div>

            <div className={styles.heroIncludes}>
              <span className={styles.includesTitle}>Incluye:</span>
              <ul className={styles.includesList}>
                {[
                  'Diagnóstico gratuito sin compromiso',
                  'Reparación de componentes',
                  'Repuestos originales garantizados',
                  'Pruebas de funcionamiento completas',
                ].map((item) => (
                  <li key={item} className={styles.includesItem}>
                    <CheckCircleIcon className={styles.includesIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.heroGlow} aria-hidden="true" />
          </article>

          {/* 5 Compact Cards */}
          {compactServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <article
                key={service.title}
                className={`${styles.card} ${styles[service.accent]}`}
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 50}
              >
                <div className={styles.cardHeader}>
                  <div className={`${styles.iconBox} ${styles[service.iconBox]}`}>
                    <IconComponent className={styles.cardIcon} />
                  </div>
                  <div className={styles.durationBadge}>
                    <ClockIcon size={12} />
                    {service.duration}
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>

                <div className={styles.cardFeatures}>
                  {service.features.map((feat) => (
                    <div key={feat} className={styles.cardFeature}>
                      <CheckCircleIcon className={styles.featureIcon} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="http://wa.link/n8et4q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardCta}
                >
                  Solicitar cotización
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              </article>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className={styles.footer} data-aos="fade-up">
          <div className={styles.footerIconBox}>
            <QuestionCircleIcon />
          </div>
          <div className={styles.footerContent}>
            <h3 className={styles.footerTitle}>¿No encuentras lo que necesitas?</h3>
            <p className={styles.footerDesc}>
              Cuéntame tu problema y te doy una solución personalizada
            </p>
          </div>
          <a
            href="http://wa.link/n8et4q"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerCta}
          >
            <WhatsAppIcon size={18} />
            Cuéntame tu caso
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
