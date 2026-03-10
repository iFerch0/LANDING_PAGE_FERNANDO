'use client';

import React from 'react';
import {
  CodeIcon,
  GlobeIcon,
  LayoutIcon,
  RocketIcon,
  SmartphoneIcon,
  CheckCircleIcon,
  WhatsAppIcon,
} from './Icons';
import styles from './WebDevServices.module.css';

/* ── Data ─────────────────────────────────────────────────────────────── */

interface WebFeature {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

const webFeatures: WebFeature[] = [
  {
    icon: LayoutIcon,
    title: 'Diseño UI/UX Premium',
    description:
      'Interfaces modernas, intuitivas y visualmente impactantes que convierten visitantes en clientes.',
  },
  {
    icon: SmartphoneIcon,
    title: '100% Responsive',
    description:
      'Tu sitio se ve perfecto en móvil, tablet y escritorio. Optimizado para cualquier dispositivo.',
  },
  {
    icon: RocketIcon,
    title: 'Rendimiento Óptimo',
    description:
      'Velocidad de carga ultrarrápida con las últimas tecnologías web (Next.js, React, SEO).',
  },
  {
    icon: GlobeIcon,
    title: 'SEO & Posicionamiento',
    description:
      'Sitios optimizados para Google. Tu negocio visible en las primeras posiciones de búsqueda.',
  },
];

const techStack: string[] = [
  'React / Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Vercel / AWS',
];

const deliverables: string[] = [
  'Landing Pages de alta conversión',
  'Sitios web corporativos',
  'E-commerce y tiendas online',
  'Aplicaciones web a medida',
  'Mantenimiento y soporte continuo',
  'Integración con WhatsApp, redes sociales y más',
];

/* ── Component ────────────────────────────────────────────────────────── */

const WebDevServices: React.FC = () => {
  return (
    <section id="desarrollo-web" className={styles.section} aria-labelledby="webdev-title">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} data-aos="fade-up">
          <span className={styles.eyebrow}>Desarrollo Web Profesional</span>
          <h2 id="webdev-title" className={styles.title}>
            Lleva tu negocio al
            <span className={styles.titleAccent}> mundo digital</span>
          </h2>
          <p className={styles.subtitle}>
            Desarrollo de sitios web y aplicaciones con tecnología de vanguardia. Diseños premium
            que impulsan tu presencia online y generan resultados reales.
          </p>
        </div>

        {/* Main Showcase Card */}
        <div className={styles.showcaseCard} data-aos="fade-up" data-aos-delay="100">
          {/* Decorative elements */}
          <div className={styles.showcaseGlow} aria-hidden="true" />
          <div className={styles.showcaseOrb} aria-hidden="true" />

          {/* Top gradient bar */}
          <div className={styles.showcaseTopBar} aria-hidden="true" />

          <div className={styles.showcaseInner}>
            {/* Left Column — Hero content */}
            <div className={styles.showcaseLeft}>
              <div className={styles.showcaseBadge}>
                <CodeIcon className={styles.showcaseBadgeIcon} />
                <span>Desarrollo Full-Stack</span>
              </div>

              <h3 className={styles.showcaseTitle}>
                Websites que <span className={styles.showcaseTitleGlow}>impactan</span> y convierten
              </h3>

              <p className={styles.showcaseDesc}>
                No solo creo páginas web — construyo experiencias digitales que posicionan tu marca,
                capturan clientes y generan ventas. Con las mismas tecnologías que usan las empresas
                líderes.
              </p>

              {/* Tech Stack Pills */}
              <div className={styles.techStack}>
                <span className={styles.techLabel}>Tecnologías:</span>
                <div className={styles.techPills}>
                  {techStack.map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className={styles.showcaseCtas}>
                <a
                  href="https://api.whatsapp.com/send?phone=573008474121&text=Hola%2C%20estoy%20interesado%20en%20desarrollo%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaPrimary}
                >
                  <WhatsAppIcon className={styles.ctaIcon} />
                  Solicitar cotización web
                </a>
              </div>
            </div>

            {/* Right Column — Features + Deliverables */}
            <div className={styles.showcaseRight}>
              {/* Features Grid */}
              <div className={styles.featuresGrid}>
                {webFeatures.map((feature) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={feature.title} className={styles.featureItem}>
                      <div className={styles.featureIconBox}>
                        <FeatureIcon className={styles.featureIcon} />
                      </div>
                      <div className={styles.featureContent}>
                        <h4 className={styles.featureTitle}>{feature.title}</h4>
                        <p className={styles.featureDesc}>{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Deliverables */}
              <div className={styles.deliverables}>
                <span className={styles.deliverablesTitle}>¿Qué puedo crear para ti?</span>
                <ul className={styles.deliverablesList}>
                  {deliverables.map((item) => (
                    <li key={item} className={styles.deliverableItem}>
                      <CheckCircleIcon className={styles.deliverableIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebDevServices;
