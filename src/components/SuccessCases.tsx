"use client";
import React from "react";
import Image from "next/image";
import styles from './SuccessCases.module.css';
import {
    SUCCESS_CASES,
    SUCCESS_CASES_HEADER,
    SUCCESS_CASES_CTA,
    type TechBadge as TechBadgeType,
    type CaseStat
} from '@/data/successCases';

// Badge variant mapping
const badgeVariants: Record<TechBadgeType['variant'], string> = {
    primary: styles.badgePrimary,
    secondary: styles.badgeSecondary,
    warning: styles.badgeWarning,
    success: styles.badgeSuccess,
    neutral: styles.badgeNeutral,
    accent: styles.badgeAccent
};

// Reusable TechBadge component
const TechBadge: React.FC<TechBadgeType> = ({ icon, label, variant }) => (
    <div className={`${styles.badge} ${badgeVariants[variant]}`}>
        <span className={styles.badgeIcon}>{icon}</span>
        <span>{label}</span>
    </div>
);

// Stats display component
const StatsDisplay: React.FC<{ stats: CaseStat[] }> = ({ stats }) => (
    <div className={styles.stats}>
        {stats.map((stat, idx) => (
            <div key={idx} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
            </div>
        ))}
    </div>
);

// Arrow icon
const ArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// WhatsApp icon
const WhatsAppIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
    </svg>
);

const SuccessCases = () => {
    return (
        <section id="casos" className={styles.section} aria-labelledby="cases-title">
            <div className="container">
                {/* Header */}
                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.eyebrow}>{SUCCESS_CASES_HEADER.eyebrow}</div>
                    <h2 id="cases-title" className={styles.title}>
                        {SUCCESS_CASES_HEADER.title}
                        <span className={styles.titleHighlight}>{SUCCESS_CASES_HEADER.titleHighlight}</span>
                    </h2>
                    <p className={styles.subtitle}>{SUCCESS_CASES_HEADER.subtitle}</p>
                </div>

                {/* Cases Grid */}
                <div className={styles.grid}>
                    {SUCCESS_CASES.map((caseItem, index) => (
                        <article
                            key={caseItem.id}
                            className={`${styles.card} ${caseItem.featured ? styles.cardFeatured : ''}`}
                            data-aos="fade-up"
                            data-aos-delay={100 + (index * 100)}
                        >
                            {/* Card Header */}
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTag}>
                                    <span>{caseItem.tagIcon}</span>
                                    <span>{caseItem.tag}</span>
                                </div>
                                <h3 className={styles.cardTitle}>{caseItem.title}</h3>
                            </div>

                            {/* Before/After Section */}
                            <div className={styles.beforeAfter}>
                                {/* Before */}
                                <div className={styles.beforeAfterItem}>
                                    <div className={`${styles.beforeAfterLabel} ${
                                        caseItem.beforeAfter.beforeLabel === 'ANTES'
                                            ? styles.labelBefore
                                            : styles.labelNeutral
                                    }`}>
                                        {caseItem.beforeAfter.beforeLabel}
                                    </div>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={caseItem.beforeAfter.beforeImage}
                                            alt={caseItem.beforeAfter.beforeAlt}
                                            width={320}
                                            height={200}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    {caseItem.beforeAfter.beforeStats && (
                                        <StatsDisplay stats={caseItem.beforeAfter.beforeStats} />
                                    )}
                                </div>

                                {/* Arrow */}
                                <div className={styles.arrow}>
                                    <ArrowIcon />
                                </div>

                                {/* After */}
                                <div className={styles.beforeAfterItem}>
                                    <div className={`${styles.beforeAfterLabel} ${
                                        caseItem.beforeAfter.afterLabel === 'DESPUÉS' || caseItem.beforeAfter.afterLabel === 'RECUPERADO'
                                            ? styles.labelAfter
                                            : styles.labelNeutral
                                    }`}>
                                        {caseItem.beforeAfter.afterLabel}
                                    </div>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={caseItem.beforeAfter.afterImage}
                                            alt={caseItem.beforeAfter.afterAlt}
                                            width={320}
                                            height={200}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    {caseItem.beforeAfter.afterStats && (
                                        <StatsDisplay stats={caseItem.beforeAfter.afterStats} />
                                    )}
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className={styles.details}>
                                <div className={styles.detailsHeader}>
                                    <span className={styles.detailsTitle}>
                                        <span>🔧</span>
                                        <span>Proceso Técnico</span>
                                    </span>
                                </div>

                                {/* Tech Badges */}
                                <div className={styles.badgesGrid}>
                                    {caseItem.techBadges.map((badge, idx) => (
                                        <TechBadge key={idx} {...badge} />
                                    ))}
                                </div>

                                {/* Detail Items */}
                                <div className={styles.detailsList}>
                                    {caseItem.details.map((detail, idx) => (
                                        <div key={idx} className={styles.detailItem}>
                                            <span className={styles.detailLabel}>{detail.label}:</span>
                                            <span className={styles.detailValue}>{detail.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA Section */}
                <div className={styles.cta} data-aos="fade-up" data-aos-delay="400">
                    <div className={styles.ctaContent}>
                        <h3 className={styles.ctaTitle}>{SUCCESS_CASES_CTA.title}</h3>
                        <p className={styles.ctaDesc}>{SUCCESS_CASES_CTA.description}</p>

                        {/* Benefits */}
                        <div className={styles.ctaBenefits}>
                            {SUCCESS_CASES_CTA.benefits.map((benefit, idx) => (
                                <div key={idx} className={styles.ctaBenefit}>
                                    <span>{benefit.icon}</span>
                                    <span>{benefit.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <a
                            href={SUCCESS_CASES_CTA.buttonLink}
                            className={styles.ctaButton}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon />
                            <span>{SUCCESS_CASES_CTA.buttonText}</span>
                        </a>

                        {/* Trust Indicators */}
                        <div className={styles.ctaTrust}>
                            {SUCCESS_CASES_CTA.trustIndicators.map((indicator, idx) => (
                                <div key={idx} className={styles.trustItem}>
                                    <span className={styles.trustIcon}>{indicator.icon}</span>
                                    <span>{indicator.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessCases;
