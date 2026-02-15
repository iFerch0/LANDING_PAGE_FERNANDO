'use client';
import React from 'react';
import Image from 'next/image';
import { WhatsAppIcon } from './Icons';
import BeforeAfterSlider from './BeforeAfterSlider';
import styles from './SuccessCases.module.css';

// Metric Component
const Metric: React.FC<{ value: string; label: string; highlight?: boolean }> = ({
  value,
  label,
  highlight,
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
      <Image src={image} alt={alt} fill style={{ objectFit: 'cover' }} />
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
          <p className={styles.subtitle}>Cada reparación documentada. Cada resultado medible.</p>
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

            <h3 className={styles.featuredTitle}>Reducción Térmica Crítica</h3>

            <p className={styles.featuredDesc}>
              PC que se apagaba constantemente por sobrecalentamiento. Intervención completa con
              resultados inmediatos.
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
              { value: 'Ryzen 8500G', label: 'Procesador' },
              { value: '32GB DDR5', label: 'Memoria' },
              { value: '1TB NVMe', label: 'Almacenamiento' },
            ]}
            index={0}
          />
          <CaseCard
            image="/img/antes-despues/optimized/3-mantenimiento-pc-sencillo-despues.jpg"
            alt="PC restaurado completamente"
            tag="Restauración"
            title="Rescate Total de Equipo"
            metrics={[
              { value: '100%', label: 'Funcionalidad' },
              { value: 'Nuevo', label: 'Estado final' },
              { value: '30 días', label: 'Garantía' },
            ]}
            index={1}
          />
          <CaseCard
            image="/img/antes-despues/optimized/4-pc-gamer-sencillo-despues.JPG"
            alt="PC Gamer limpio y optimizado después del mantenimiento"
            tag="PC Gamer"
            title="Mantenimiento PC Gamer"
            metrics={[
              { value: '-35°C', label: 'Temperaturas' },
              { value: '+40%', label: 'Rendimiento' },
              { value: '0 polvo', label: 'Limpieza' },
            ]}
            index={2}
          />
        </div>

        {/* CTA - Contextual */}
        <div className={styles.cta} data-aos="fade-up">
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>¿Quieres resultados así?</h3>
            <p className={styles.ctaText}>Cuéntame tu caso y te digo cómo lo solucionamos</p>
            <a
              href="https://wa.me/573015218139?text=Hola%20Fernando%2C%20vi%20los%20casos%20de%20éxito%20y%20necesito%20ayuda%20con%20mi%20equipo"
              className={styles.ctaButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} />
              Enviar mi caso
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCases;
