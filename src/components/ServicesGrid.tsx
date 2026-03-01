'use client';

import React from 'react';
import Link from 'next/link';
import { WrenchIcon, ClockIcon, CheckCircleIcon, WhatsAppIcon, QuestionCircleIcon } from './Icons';
import styles from './ServicesGrid.module.css';
import { WA_SHORT_LINK } from '@/constants/contact';
import { compactServices } from '@/data/compact-services';

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
                href={WA_SHORT_LINK}
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
                  href={WA_SHORT_LINK}
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
            href={WA_SHORT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerCta}
          >
            <WhatsAppIcon size={18} />
            Cuéntame tu caso
          </a>
        </div>

        {/* Cross-sell — Tienda */}
        <div className={styles.crossSell} data-aos="fade-up">
          <div className={styles.crossSellText}>
            <span className={styles.crossSellEyebrow}>También disponible</span>
            <p className={styles.crossSellTitle}>
              ¿Necesitas equipo? <strong>Comprás en la tienda y lo reparamos si falla.</strong>
            </p>
          </div>
          <Link href="/tienda" className={styles.crossSellCta}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Ver la tienda
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
