'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CameraIcon } from './Icons';
import styles from './PortfolioButton.module.css';
import { builds, maintenance } from '@/data/portfolio';

const PortfolioModal = dynamic(() => import('./PortfolioModal'), {
  ssr: false,
  loading: () => null,
});

const PortfolioButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = builds.length + maintenance.length;

  if (totalItems === 0) {return null;}

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.card} data-reveal="scale">
            {/* Background pattern */}
            <div className={styles.background} aria-hidden="true" />

            <div className={styles.content}>
              <div className={styles.textContent}>
                <span className={styles.overline}>Portafolio de Trabajos</span>
                <h2 className={styles.title}>
                  Equipos que he <span className={styles.titleAccent}>armado</span>
                </h2>
                <p className={styles.description}>
                  Mira las workstations que he construido para desarrollo y diseño gráfico. Cada
                  pieza armada con precisión y componentes de calidad.
                </p>
              </div>

              <button
                className={`${styles.button} btn-press`}
                onClick={() => setIsOpen(true)}
                aria-label="Ver portafolio de trabajos"
              >
                <CameraIcon size={24} />
                <span>Ver Portafolio</span>
                <span className={styles.buttonCount}>{totalItems} trabajos</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {isOpen && (
        <PortfolioModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          builds={builds}
          maintenance={maintenance}
        />
      )}
    </>
  );
};

export default PortfolioButton;
