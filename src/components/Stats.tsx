'use client';
import React from 'react';
import { RepairIcon, StarIcon, ClockIcon, ShieldCheckIcon, DeviceIcon } from './Icons';
import CountUpClient from './CountUpClient';
import { stats, statsHeader, statsCTA } from '@/data/stats';
import styles from './Stats.module.css';

const iconMap = [RepairIcon, StarIcon, ClockIcon, ShieldCheckIcon, DeviceIcon];

const Stats = () => {
  return (
    <section className={styles.stats} aria-labelledby="stats-title">
      <div className={`container ${styles.container}`}>
        {/* Header */}
        <div className={styles.header} data-aos="fade-up">
          <span className={styles.eyebrow}>Nuestros números</span>
          <h2 id="stats-title" className={styles.title}>
            {statsHeader.title}
          </h2>
          <p className={styles.subtitle}>{statsHeader.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {stats.map((stat, index) => {
            const IconComponent = iconMap[index] || RepairIcon;

            return (
              <div
                key={stat.id}
                className={styles.statItem}
                data-aos="zoom-in"
                data-aos-delay={stat.aosDelay}
              >
                <div className={styles.statItemIcon}>
                  <IconComponent size={28} />
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

        {/* CTA */}
        <div className={styles.cta} data-aos="fade-up" data-aos-delay="600">
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
