import React from 'react';
import { WhatsAppIcon, PhoneIcon } from './Icons';
import styles from './CtaFinal.module.css';

const CtaFinal = () => {
  return (
    <section className={styles.ctaFinal}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content} data-aos="fade-up">
          <h2 className={styles.title}>¿Listo para empezar?</h2>
          <p className={styles.subtitle}>Escríbeme y resolvemos tu problema hoy</p>

          <div className={styles.actions}>
            <a
              href="http://wa.link/n8et4q"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a href="tel:+573008474121" className={styles.phoneBtn}>
              <PhoneIcon />
              Llamar
            </a>
          </div>

          <div className={styles.availability}>
            <div className={styles.statusDot}></div>
            <span>Disponible ahora en Montería</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaFinal;
