"use client";
import React from "react";
import Image from "next/image";
import BeforeAfterSlider from "./BeforeAfterSlider";
import styles from "./SuccessCases.module.css";

// Metric Component
const Metric: React.FC<{ value: string; label: string; highlight?: boolean }> = ({
    value, label, highlight
}) => (
    <div className={`${styles.metric} ${highlight ? styles.metricHighlight : ''}`}>
        <span className={styles.metricValue}>{value}</span>
        <span className={styles.metricLabel}>{label}</span>
    </div>
);

// Case Card Component for secondary cases
const CaseCard: React.FC<{
    image: string;
    alt: string;
    tag: string;
    title: string;
    metrics: { value: string; label: string }[];
    index: number;
}> = ({ image, alt, tag, title, metrics, index }) => (
    <article className={styles.card} data-aos="fade-up" data-aos-delay={index * 100}>
        <div className={styles.cardImage}>
            <Image src={image} alt={alt} fill style={{ objectFit: "cover" }} />
            <div className={styles.cardOverlay}>
                <span className={styles.cardTag}>{tag}</span>
            </div>
        </div>
        <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <div className={styles.cardMetrics}>
                {metrics.map((m, i) => (
                    <div key={i} className={styles.cardMetric}>
                        <span className={styles.cardMetricValue}>{m.value}</span>
                        <span className={styles.cardMetricLabel}>{m.label}</span>
                    </div>
                ))}
            </div>
        </div>
    </article>
);

const SuccessCases: React.FC = () => {
    return (
        <section id="casos" className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <header className={styles.header} data-aos="fade-up">
                    <span className={styles.eyebrow}>Resultados reales</span>
                    <h2 className={styles.title}>
                        Transformaciones que
                        <span className={styles.titleAccent}> hablan por sí solas</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Cada reparación documentada. Cada resultado medible.
                    </p>
                </header>

                {/* Featured Case */}
                <div className={styles.featured} data-aos="fade-up" data-aos-delay="100">
                    <div className={styles.featuredSlider}>
                        <BeforeAfterSlider
                            beforeImage="/img/antes-despues/optimized/1-mantenimiento-antes.JPG"
                            afterImage="/img/antes-despues/optimized/1-manteniento-despues.JPG"
                            beforeAlt="PC con sobrecalentamiento antes del mantenimiento"
                            afterAlt="PC funcionando a temperatura óptima después del mantenimiento"
                        />
                    </div>

                    <div className={styles.featuredContent}>
                        <div className={styles.featuredBadge}>
                            <span className={styles.badgeIcon}>🔥</span>
                            <span>Caso Destacado</span>
                        </div>

                        <h3 className={styles.featuredTitle}>
                            Reducción Térmica Crítica
                        </h3>

                        <p className={styles.featuredDesc}>
                            PC que se apagaba constantemente por sobrecalentamiento.
                            Intervención completa con resultados inmediatos.
                        </p>

                        <div className={styles.metricsGrid}>
                            <Metric value="85°C" label="Temp. inicial" />
                            <Metric value="45°C" label="Temp. final" highlight />
                            <Metric value="-47%" label="Reducción" highlight />
                            <Metric value="0dB" label="Ruido final" />
                        </div>

                        <div className={styles.processList}>
                            <div className={styles.processItem}>
                                <span className={styles.processIcon}>✓</span>
                                <span>Limpieza profunda de componentes</span>
                            </div>
                            <div className={styles.processItem}>
                                <span className={styles.processIcon}>✓</span>
                                <span>Reemplazo de pasta térmica premium</span>
                            </div>
                            <div className={styles.processItem}>
                                <span className={styles.processIcon}>✓</span>
                                <span>Calibración de sistema de ventilación</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Cases Grid */}
                <div className={styles.grid}>
                    <CaseCard
                        image="/img/antes-despues/optimized/2-ensamble-despues.jpg"
                        alt="Workstation AMD Ryzen ensamblada"
                        tag="Ensamble"
                        title="Workstation Diseño Gráfico"
                        metrics={[
                            { value: "Ryzen 8500G", label: "Procesador" },
                            { value: "32GB DDR5", label: "Memoria" },
                            { value: "1TB NVMe", label: "Almacenamiento" }
                        ]}
                        index={0}
                    />
                    <CaseCard
                        image="/img/antes-despues/optimized/3-mantenimiento-pc-sencillo-despues.jpg"
                        alt="PC restaurado completamente"
                        tag="Restauración"
                        title="Rescate Total de Equipo"
                        metrics={[
                            { value: "100%", label: "Funcionalidad" },
                            { value: "Nuevo", label: "Estado final" },
                            { value: "30 días", label: "Garantía" }
                        ]}
                        index={1}
                    />
                </div>

                {/* CTA */}
                <div className={styles.cta} data-aos="fade-up">
                    <div className={styles.ctaContent}>
                        <h3 className={styles.ctaTitle}>¿Tu equipo necesita atención?</h3>
                        <p className={styles.ctaText}>
                            Diagnóstico gratuito y presupuesto sin compromiso
                        </p>
                        <a
                            href="https://wa.me/573015218139?text=Hola%20Fernando%2C%20vi%20los%20casos%20de%20éxito%20y%20necesito%20ayuda%20con%20mi%20equipo"
                            className={styles.ctaButton}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
                            </svg>
                            Solicitar diagnóstico
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessCases;
