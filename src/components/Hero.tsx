import React from 'react';
import { WhatsAppIcon, PhoneIcon } from './Icons';
import HeroSliderStatic from './HeroSliderStatic';
import TrustBadges from './TrustBadges';

// Nuevos iconos para badges
const VerifiedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Hero = () => {
  return (
    <section id="inicio" className="hero" data-aos="fade-up">
      <div className="container">
        <div className="hero__content hero__layout">
          <div className="hero__copy">
            {/* Badges de credibilidad */}
            <div className="hero__badges" data-aos="fade-up">
              <div className="hero__badge hero__badge--verified">
                <VerifiedIcon />
                <span>Técnico Certificado</span>
              </div>
            </div>

            {/* Headline optimizado */}
            <div className="hero__headline" data-aos="fade-up" data-aos-delay="100">
              <h1 className="hero__title">
                <span className="hero__title-emphasis">¿Tu PC está lenta?</span>
                <span className="hero__title-main">La reparamos en 24h</span>
                <span className="hero__title-location">en Montería</span>
              </h1>
              
              {/* Propuesta de valor concisa */}
              <div className="hero__value-prop">
                <span className="hero__value-prop-badge">
                  <ClockIcon />
                  Técnico certificado con 10+ años de experiencia
                </span>
              </div>
            </div>

            <p className="hero__subtitle" data-aos="fade-up" data-aos-delay="200">
              Servicio técnico especializado en Montería. Diagnóstico gratuito, 
              reparación garantizada y atención a domicilio sin costo adicional.
            </p>

            {/* CTAs optimizados */}
            <div className="hero__actions" data-aos="fade-up" data-aos-delay="300">
              <a 
                href="http://wa.link/n8et4q" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Solicitar asesoría profesional por WhatsApp" 
                className="btn btn--primary btn--cta-primary cta-pulse"
              >
                <WhatsAppIcon className="btn__icon" />
                <div className="btn__content">
                  <span className="btn__text">Asesoría Profesional</span>
                  <span className="btn__subtext">Respuesta inmediata</span>
                </div>
              </a>

              <a 
                href="tel:+573008474121" 
                aria-label="Llamar para emergencias" 
                className="btn btn--secondary btn--cta-secondary"
              >
                <PhoneIcon className="btn__icon" />
                <div className="btn__content">
                  <span className="btn__text">Llamar Ahora</span>
                  <span className="btn__subtext">Emergencias 24/7</span>
                </div>
              </a>
            </div>

            {/* Beneficios clave simplificados */}
            <div className="hero__urgency" data-aos="fade-up" data-aos-delay="400">
              <div className="hero__urgency-item">
                <span className="hero__urgency-dot"></span>
                <span>🏠 <strong>Servicio a domicilio</strong> gratuito en Montería</span>
              </div>
              <div className="hero__urgency-item">
                <span className="hero__urgency-dot"></span>
                <span>⚡ <strong>Reparación express</strong> mismo día</span>
              </div>
            </div>

            {/* Trust Badges consolidados */}
            <div data-aos="fade-up" data-aos-delay="500">
              <TrustBadges />
            </div>
          </div>

          <div className="hero__media" data-aos="zoom-in" data-aos-delay="200">
            <HeroSliderStatic />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;