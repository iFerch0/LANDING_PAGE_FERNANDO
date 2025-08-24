import React from 'react';
import Image from 'next/image';
import { WhatsAppIcon, PhoneIcon } from './Icons';
import CountUpClient from './CountUpClient';

const Hero = () => {
  return (
    <section id="inicio" className="hero" data-aos="fade-up">
      <div className="container">
        <div className="hero__content hero__layout">
          <div className="hero__copy">
            <h1 className="hero__title">
              <span className="hero__title-line" data-aos="fade-up" data-aos-delay="100">Tu Computador</span>
              <span className="hero__title-line" data-aos="fade-up" data-aos-delay="200">Funcionando</span>
              <span className="hero__title-line hero__title-highlight" data-aos="fade-up" data-aos-delay="300">Como Nuevo</span>
            </h1>

            <p className="hero__subtitle">
              Más de <strong>10 años</strong> solucionando problemas tecnológicos en <strong>Montería</strong>. 
              Especialista en reparación, mantenimiento y optimización de equipos. 
              <strong>¡Diagnóstico gratuito!</strong>
            </p>

            <div className="hero__stats">
              <span className="hero__stat"><CountUpClient end={2000} suffix="+" /> equipos reparados</span>
              <span className="hero__stat">Garantía de <CountUpClient end={30} suffix=" días" /></span>
            </div>

            <div className="hero__actions" data-aos="fade-up" data-aos-delay="400">
              <a href="http://wa.link/n8et4q" target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" className="btn btn--whatsapp cta-pulse">
                <WhatsAppIcon className="btn__icon" />
                <span>Escribir por WhatsApp</span>
              </a>

              <a href="tel:+573008474121" aria-label="Llamar ahora" className="btn btn--call">
                <PhoneIcon className="btn__icon" />
                <span>Llamar Ahora</span>
              </a>
            </div>
          </div>

          <div className="hero__media" data-aos="zoom-in" aria-hidden>
            <Image src="/hero-poster.jpg" alt="Poster hero" width={560} height={420} className="hero__image" priority />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;