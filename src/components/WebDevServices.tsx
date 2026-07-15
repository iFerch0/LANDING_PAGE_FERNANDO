'use client';

import React from 'react';
import { WhatsAppIcon } from './Icons';
import styles from './WebDevServices.module.css';
import { whatsappUrl } from '@/data/contact';
import { webFeatures, techStack, deliverables } from '@/data/webServices';

const WebDevServices: React.FC = () => {
  return (
    <section id="desarrollo-web" className={styles.section} aria-labelledby="webdev-title">
      <div className={styles.container}>
        {/* Header — numbered */}
        <div className={styles.header} data-reveal="up">
          <span className={styles.sectionNum}>02</span>
          <div className={styles.headerContent}>
            <h2 id="webdev-title" className={styles.title}>
              Desarrollo Web <span className={styles.titleAccent}>Profesional</span>
            </h2>
            <p className={styles.subtitle}>
              Sitios web y aplicaciones con tecnología de vanguardia. Presencia digital que
              convierte visitantes en clientes.
            </p>
          </div>
        </div>

        {/* Main Layout */}
        <div className={styles.layout}>
          {/* Left — Statement */}
          <div className={styles.statement} data-reveal="left">
            <h3 className={styles.statementTitle}>
              Websites que <span>impactan</span> y convierten
            </h3>
            <p className={styles.statementDesc}>
              Construyo experiencias digitales que posicionan tu marca, capturan clientes y generan
              resultados medibles. Con las mismas tecnologías que usan las empresas líderes.
            </p>

            <div>
              <span className={styles.techLabel}>Stack tecnológico</span>
              <div className={styles.techList}>
                {techStack.map((tech) => (
                  <span key={tech} className={`${styles.techItem} tech-lift`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={whatsappUrl('Hola, estoy interesado en desarrollo web')}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.statementCta}
            >
              <WhatsAppIcon />
              Solicitar cotización web
            </a>
          </div>

          {/* Right — Spec Sheet */}
          <div className={styles.specSheet} data-reveal="right">
            {/* Features */}
            <div className={styles.featuresList}>
              {webFeatures.map((feature) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={feature.title} className={styles.featureRow}>
                    <div className={styles.featureIcon}>
                      <FeatureIcon />
                    </div>
                    <div>
                      <h4 className={styles.featureName}>{feature.title}</h4>
                      <p className={styles.featureDesc}>{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deliverables */}
            <div className={styles.deliverables}>
              <span className={styles.deliverablesTitle}>Qué puedo crear para vos</span>
              <ul className={styles.deliverablesList}>
                {deliverables.map((item) => (
                  <li key={item} className={styles.deliverableItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebDevServices;
