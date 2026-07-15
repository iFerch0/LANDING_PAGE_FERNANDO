'use client';

import React from 'react';
import { ClockIcon, CheckCircleIcon, WhatsAppIcon } from './Icons';
import styles from './ServicesGrid.module.css';
import { whatsappUrl } from '@/data/contact';
import { compactServices } from '@/data/servicesCompact';

const ServicesGrid: React.FC = () => {
  return (
    <section id="servicios" className={styles.services} aria-labelledby="services-title">
      <div className={styles.container}>
        {/* Header — numbered, editorial */}
        <div className={styles.header} data-reveal="up">
          <span className={styles.sectionNum}>01</span>
          <div className={styles.headerContent}>
            <h2 id="services-title" className={styles.title}>
              ¿Qué necesita <span className={styles.titleAccent}>tu computador?</span>
            </h2>
            <p className={styles.subtitle}>
              Soluciones profesionales con diagnóstico gratuito incluido en todos los servicios.
            </p>
          </div>
        </div>

        {/* Featured Service — Hardware Repair */}
        <article className={styles.featured} data-reveal="scale">
          <div>
            <p className={styles.featuredLabel}>Servicio más solicitado · HW-REP-01</p>
            <h3 className={styles.featuredTitle}>Reparación de Hardware</h3>
            <p className={styles.featuredSub}>Diagnóstico y reparación el mismo día</p>
            <p className={styles.featuredDesc}>
              Diagnóstico y reparación de componentes dañados, reemplazo de piezas con repuestos
              originales. Mismo día en la mayoría de casos.
            </p>
            <div className={styles.featuredMeta}>
              <span className={styles.featuredDuration}>
                <ClockIcon size={14} />
                Mismo día
              </span>
            </div>
            <a
              href={whatsappUrl('Hola, necesito ayuda con mi computador')}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.featuredCta}
            >
              <WhatsAppIcon size={16} />
              Solicitar cotización
            </a>
          </div>

          <div className={styles.featuredIncludes}>
            <span className={styles.includesTitle}>Incluye</span>
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
        </article>

        {/* Services List — varied, not uniform */}
        <div className={styles.servicesList} data-reveal-stagger>
          {compactServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <article
                key={service.title}
                className={`${styles.serviceItem} service-hover`}
                data-reveal="scale"
              >
                <div className={styles.serviceHeader}>
                  <div className={styles.serviceIcon}>
                    <IconComponent />
                  </div>
                  <div>
                    <h3 className={styles.serviceName}>{service.title}</h3>
                    <span className={styles.serviceDuration}>{service.duration}</span>
                  </div>
                </div>
                <p className={styles.serviceDesc}>{service.description}</p>
                <div className={styles.serviceFeatures}>
                  {service.features.map((feat) => (
                    <div key={feat} className={styles.serviceFeature}>
                      <CheckCircleIcon />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={whatsappUrl('Hola, necesito ayuda con mi computador')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.serviceCta}
                >
                  Cotizar
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </article>
            );
          })}
        </div>

        {/* Promo Banner */}
        <div className={styles.promo} data-reveal="up">
          <div className={styles.promoContent}>
            <p className={styles.promoTitle}>¿No sabés qué servicio necesitás?</p>
            <p className={styles.promoDesc}>
              Escribime por WhatsApp y te oriento sin compromiso. Diagnóstico inicial gratuito.
            </p>
          </div>
          <a
            href={whatsappUrl('Hola, no estoy seguro de qué servicio necesito')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.promoCta}
          >
            <WhatsAppIcon />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
