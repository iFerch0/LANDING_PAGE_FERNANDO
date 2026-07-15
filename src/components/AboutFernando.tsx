import React from 'react';
import Image from 'next/image';
import { WhatsAppIcon } from './Icons';
import styles from './AboutFernando.module.css';
import { whatsappUrl } from '@/data/contact';
import { specialties, values } from '@/data/about';

const AboutFernando: React.FC = () => {
  return (
    <section id="sobre-mi" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout} data-reveal="up">
          {/* Photo Column */}
          <div className={styles.photoCol}>
            <div className={styles.photoWrapper}>
              <div className={styles.photoFrame}>
                <Image
                  src="/img/sobre-mi.webp"
                  alt="Fernando Rhenals — Ingeniero de Sistemas"
                  width={480}
                  height={640}
                  className={styles.photo}
                  style={{ objectFit: 'cover' }}
                />
                <span className={styles.photoCoords}>08°44&apos;N 75°53&apos;W — Montería, CO</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className={styles.content}>
            <span className={styles.overline}>Sobre el profesional</span>

            <h2 className={styles.name}>
              Fernando <span className={styles.nameAccent}>Rhenals</span>
            </h2>
            <p className={styles.role}>Ingeniero de Sistemas · Técnico Especialista</p>

            <p className={styles.bio}>
              Con más de 10 años de experiencia en Montería, me especializo en soluciones técnicas
              que combinan conocimiento profesional con atención personalizada. Cada equipo que
              llega a mis manos recibe el mismo nivel de cuidado y detalle — desde una limpieza
              preventiva hasta la implementación de infraestructura empresarial completa.
            </p>

            {/* Specialties — tech-style labels */}
            <div className={styles.specialties}>
              {specialties.map((s) => (
                <span key={s} className={styles.specialty}>
                  {s}
                </span>
              ))}
            </div>

            {/* Values — numbered list */}
            <div className={styles.values}>
              {values.map((v, i) => (
                <div key={v.title} className={`${styles.valueItem} value-accent`}>
                  <span className={styles.valueNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={styles.valueTitle}>{v.title}</h3>
                    <p className={styles.valueDesc}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={whatsappUrl('Hola Fernando, quiero hablar sobre mi proyecto')}
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
