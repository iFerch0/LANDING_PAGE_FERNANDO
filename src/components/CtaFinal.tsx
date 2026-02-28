import React from 'react';
import { WhatsAppIcon, PhoneIcon, CheckCircleIcon, ShieldIcon, ClockIcon } from './Icons';
import styles from './CtaFinal.module.css';
import { WA_SHORT_LINK, PHONE_TEL } from '@/constants/contact';

const CtaFinal = () => {
  return (
    <section className={styles.ctaFinal}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content} data-aos="fade-up">
          {/* Urgency Badge */}
          <div className={styles.urgencyBadge}>
            <span className={styles.urgencyDot} />
            <span className={styles.urgencyText}>Disponible ahora en Montería</span>
          </div>

          <h2 className={styles.title}>
            ¿Tu PC no funciona? <span className={styles.titleAccent}>Arréglalo hoy</span>
          </h2>
          <p className={styles.subtitle}>
            Escríbeme por WhatsApp, cuéntame tu problema y te doy un diagnóstico gratuito en minutos
          </p>

          <div className={styles.actions}>
            <a
              href={WA_SHORT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <WhatsAppIcon />
              Diagnóstico Gratuito
            </a>
            <a href={PHONE_TEL} className={styles.phoneBtn}>
              <PhoneIcon />
              Llamar Ahora
            </a>
          </div>

          {/* Social Proof */}
          <div className={styles.socialProof}>
            <div className={styles.proofItem}>
              <CheckCircleIcon className={styles.proofIcon} />
              <span>500+ equipos reparados</span>
            </div>
            <div className={styles.proofItem}>
              <ShieldIcon className={styles.proofIcon} />
              <span>Garantía de 30 días</span>
            </div>
            <div className={styles.proofItem}>
              <ClockIcon className={styles.proofIcon} />
              <span>Respuesta en minutos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaFinal;
