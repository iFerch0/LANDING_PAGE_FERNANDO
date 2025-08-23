import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="hero">
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-line">Tu Computador</span>
            <span className="hero__title-line">Funcionando</span>
            <span className="hero__title-line hero__title-highlight">Como Nuevo</span>
          </h1>
          
          <p className="hero__subtitle">
            Más de <strong>10 años</strong> solucionando problemas tecnológicos en <strong>Montería</strong>. 
            Especialista en reparación, mantenimiento y optimización de equipos. 
            <strong>¡Diagnóstico gratuito!</strong>
          </p>

          <div className="hero__stats">
            <span className="hero__stat">2000+ equipos reparados</span>
            <span className="hero__stat">Garantía de 30 días</span>
          </div>

          <div className="hero__actions">
            <a href="http://wa.link/n8et4q" target="_blank" className="btn btn--whatsapp">
              Escribir por WhatsApp
            </a>
            <a href="tel:+573008474121" className="btn btn--call">
              Llamar Ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;