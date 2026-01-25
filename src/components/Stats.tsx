'use client';
import React from 'react';
import CountUpClient from './CountUpClient';
import { stats, statsHeader, statsCTA } from '@/data/stats';
import styles from './Stats.module.css';

// Iconos para cada estadística
const RepairIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <polyline
      points="12,6 12,12 16,14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 12l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Stats = () => {
  return (
    <section className={styles.stats} aria-labelledby="stats-title">
      <div className={`container ${styles.container}`}>
        {/* Header de estadísticas */}
        <div className={styles.header} data-aos="fade-up">
          <h2 id="stats-title" className={styles.title}>
            {statsHeader.title}
          </h2>
          <p className={styles.subtitle}>{statsHeader.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {stats.map((stat, index) => {
            const icons = [RepairIcon, StarIcon, ClockIcon, ShieldIcon];
            const IconComponent = icons[index];

            return (
              <div
                key={stat.id}
                className={styles.statItem}
                data-aos="zoom-in"
                data-aos-delay={stat.aosDelay}
              >
                <div className={styles.statItemIcon}>
                  <IconComponent />
                </div>
                <div className={styles.statItemContent}>
                  <div className={styles.statNumber}>
                    <CountUpClient end={stat.end} ssrValue={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <div className={styles.statDescription}>{stat.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA en la sección de stats */}
        <div className={styles.cta} data-aos="fade-up" data-aos-delay="500">
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>{statsCTA.title}</h3>
            <p className={styles.ctaDesc}>{statsCTA.description}</p>
            <a href={statsCTA.buttonLink} className="btn btn--secondary btn--large">
              {statsCTA.buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
