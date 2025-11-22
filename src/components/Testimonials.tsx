import React from "react";
import Script from 'next/script';
import { testimonialsHeader, trustIndicators, elfsightConfig } from '@/data/testimonials';
import styles from './Testimonials.module.css';

const Testimonials = () => {
    return (
        <section id="testimonios" className={styles.testimonials}>
            <div className={`container ${styles.container}`}>
                {/* Enhanced Header */}
                <div className={styles.header} data-aos="fade-up">
                    <div className={styles.badge}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                        </svg>
                        {testimonialsHeader.badge}
                    </div>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                    }}>
                        <h2 className={styles.title}>
                            {testimonialsHeader.title}
                        </h2>
                    </div>
                    <p className={styles.subtitle}>
                        {testimonialsHeader.subtitle}
                    </p>
                </div>

                {/* Trust Indicators */}
                <div className={styles.trust} data-aos="fade-up" data-aos-delay="100">
                    {trustIndicators.map((indicator, index) => (
                        <div key={indicator.id} className={styles.trustItem}>
                            <div className={styles.trustIcon}>
                                {index === 0 ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4" />
                                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                                        <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
                                        <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                                    </svg>
                                )}
                            </div>
                            <div className={styles.trustText}>
                                <strong>{indicator.title}</strong>
                                <span>{indicator.subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Widget Container */}
                <div className={styles.widget} data-aos="fade-up" data-aos-delay="200">
                    {/* Elfsight Google Reviews widget */}
                    <Script src={elfsightConfig.scriptSrc} strategy="afterInteractive" async />
                    <div className={`elfsight-app-${elfsightConfig.appId}`} data-elfsight-app-lazy></div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
