import React from 'react';
import Image from 'next/image';
import aboutPhoto from '../../public/img/sobre-mi.avif';
import { WhatsAppIcon } from './Icons';
import styles from './AboutFernando.module.css';

const specialties = [
  'Desarrollo Web',
  'Reparación PC',
  'Soporte Empresarial',
  'Ensamble de Equipos',
  'Mantenimiento Preventivo',
];

const values = [
  {
    icon: '📋',
    title: 'Metodología profesional',
    desc: 'Diagnóstico documentado y presupuesto claro antes de cualquier intervención.',
  },
  {
    icon: '📦',
    title: 'Entregas por fases',
    desc: 'Trabajo organizado en etapas con avances visibles y resultados medibles.',
  },
  {
    icon: '📊',
    title: 'Resultados medibles',
    desc: 'Cada servicio incluye evidencia documentada del antes y después.',
  },
];

const AboutFernando: React.FC = () => {
  return (
    <section id="sobre-mi" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout} data-aos="fade-up">
          {/* Photo */}
          <div className={styles.photoWrapper}>
            <div className={styles.photoFrame}>
              <Image
                src={aboutPhoto}
                alt="Fernando Rhenals — Ingeniero de Sistemas y Técnico Especialista en Montería"
                width={480}
                height={560}
                className={styles.photo}
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
            <div className={styles.photoAccent} />
          </div>

          {/* Content */}
          <div className={styles.content}>
            <span className={styles.eyebrow}>Sobre el profesional</span>

            <h2 className={styles.name}>Fernando Rhenals</h2>
            <p className={styles.role}>Ingeniero de Sistemas · Técnico Especialista</p>

            <p className={styles.bio}>
              Con más de 10 años de experiencia en Montería, me especializo en soluciones técnicas
              que combinan conocimiento profesional con atención personalizada. Cada equipo que
              llega a mis manos recibe el mismo nivel de cuidado y detalle — desde una limpieza
              preventiva hasta la implementación de infraestructura empresarial completa.
            </p>

            {/* Specialties */}
            <div className={styles.specialties}>
              {specialties.map((s) => (
                <span key={s} className={styles.pill}>
                  {s}
                </span>
              ))}
            </div>

            {/* Values */}
            <div className={styles.values}>
              {values.map((v) => (
                <div key={v.title} className={styles.valueItem}>
                  <span className={styles.valueIcon}>{v.icon}</span>
                  <div>
                    <strong className={styles.valueTitle}>{v.title}</strong>
                    <p className={styles.valueDesc}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/573015218139?text=Hola%20Fernando%2C%20quiero%20hablar%20sobre%20mi%20proyecto"
              className={styles.cta}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} />
              Hablemos de tu proyecto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFernando;
