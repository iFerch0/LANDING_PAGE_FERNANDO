'use client';

import React from 'react';

interface Service {
  icon: React.ReactElement;
  title: string;
  description: string;
  priceFrom: string;
  duration: string;
  includes: string[];
  popular?: boolean;
}

const ServicesGrid: React.FC = () => {
  const services: Service[] = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
      title: 'Mantenimiento Preventivo',
      description: 'Limpieza completa de hardware, actualización de sistema y optimización de rendimiento',
      priceFrom: '$50.000',
      duration: '2-3 horas',
      includes: [
        'Limpieza interna completa',
        'Cambio de pasta térmica',
        'Actualización de drivers',
        'Optimización del sistema'
      ]
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      title: 'Reparación de Hardware',
      description: 'Diagnóstico y reparación de componentes dañados, reemplazo de piezas con repuestos originales',
      priceFrom: '$70.000',
      duration: 'Mismo día',
      includes: [
        'Diagnóstico gratuito',
        'Reparación de componentes',
        'Repuestos originales',
        'Pruebas de funcionamiento'
      ],
      popular: true
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
          <path d="M22 12A10 10 0 0 0 12 2v10z"/>
        </svg>
      ),
      title: 'Recuperación de Datos',
      description: 'Recuperación de archivos perdidos, eliminados o de discos dañados con tecnología especializada',
      priceFrom: '$100.000',
      duration: '1-3 días',
      includes: [
        'Evaluación sin costo',
        'Recuperación de archivos',
        'Copia de seguridad',
        'Entrega en USB/Nube'
      ]
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title: 'Formateo e Instalación',
      description: 'Instalación limpia de Windows, configuración completa y programas esenciales',
      priceFrom: '$60.000',
      duration: '3-4 horas',
      includes: [
        'Windows 10/11 original',
        'Drivers actualizados',
        'Programas básicos',
        'Antivirus incluido'
      ]
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <circle cx="12" cy="11" r="3"/>
        </svg>
      ),
      title: 'Eliminación de Virus',
      description: 'Limpieza profunda de malware, virus, adware y optimización de seguridad',
      priceFrom: '$40.000',
      duration: '2 horas',
      includes: [
        'Escaneo completo',
        'Eliminación de amenazas',
        'Antivirus premium',
        'Consejos de prevención'
      ]
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Soporte Remoto',
      description: 'Asistencia técnica a distancia para problemas de software y configuración',
      priceFrom: '$30.000',
      duration: '30-60 min',
      includes: [
        'Conexión remota segura',
        'Solución inmediata',
        'Configuración de sistema',
        'Asesoría personalizada'
      ]
    }
  ];

  return (
    <section id="servicios" className="services-grid" aria-labelledby="services-title">
      <div className="container">
        {/* Header */}
        <div className="services-grid__header" data-aos="fade-up">
          <div className="services-grid__eyebrow">Servicios profesionales</div>
          <h2 id="services-title" className="services-grid__title">
            ¿Qué necesita tu computador?
          </h2>
          <p className="services-grid__subtitle">
            Precios transparentes, sin sorpresas. Diagnóstico gratuito incluido en todos los servicios
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid__container">
          {services.map((service, index) => (
            <article
              key={index}
              className={`service-card ${service.popular ? 'service-card--popular' : ''}`}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              {service.popular && (
                <div className="service-card__badge">Más solicitado</div>
              )}

              <div className="service-card__icon">{service.icon}</div>

              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>

              <div className="service-card__pricing">
                <div className="service-card__price">
                  <span className="price-from">Desde</span>
                  <span className="price-amount">{service.priceFrom}</span>
                </div>
                <div className="service-card__duration">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  {service.duration}
                </div>
              </div>

              <div className="service-card__includes">
                <div className="includes-title">Incluye:</div>
                <ul className="includes-list">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="includes-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="http://wa.link/n8et4q"
                target="_blank"
                rel="noopener noreferrer"
                className="service-card__cta"
              >
                Solicitar cotización
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                  <path d="M12 5l7 7-7 7"/>
                </svg>
              </a>
            </article>
          ))}
        </div>

        {/* CTA personalizado */}
        <div className="services-grid__footer" data-aos="fade-up">
          <div className="services-grid__custom">
            <div className="custom-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
              </svg>
            </div>
            <div className="custom-content">
              <h3>¿No encuentras lo que necesitas?</h3>
              <p>Cuéntame tu problema y te doy una solución personalizada</p>
            </div>
            <a href="http://wa.link/n8et4q" target="_blank" rel="noopener noreferrer" className="custom-cta">
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .services-grid {
          padding: 5rem 0;
          background: var(--color-background);
        }

        .services-grid__header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .services-grid__eyebrow {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: var(--color-primary);
          color: var(--color-btn-primary-text);
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .services-grid__title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 1rem;
        }

        .services-grid__subtitle {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .services-grid__container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .service-card {
          position: relative;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-primary);
        }

        .service-card--popular {
          border-color: var(--color-primary);
          box-shadow: 0 4px 20px rgba(var(--color-primary-rgb), 0.15);
        }

        .service-card__badge {
          position: absolute;
          top: -12px;
          right: 1rem;
          background: var(--color-primary);
          color: var(--color-btn-primary-text);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .service-card__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          color: var(--color-btn-primary-text);
          border-radius: 16px;
          margin-bottom: 1.5rem;
        }

        .service-card__title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 0.75rem;
        }

        .service-card__description {
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .service-card__pricing {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--color-background);
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .service-card__price {
          display: flex;
          flex-direction: column;
        }

        .price-from {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .price-amount {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .service-card__duration {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .service-card__includes {
          margin-bottom: 1.5rem;
        }

        .includes-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .includes-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .includes-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .includes-item svg {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .service-card__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: var(--color-primary);
          color: var(--color-btn-primary-text);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
        }

        .service-card__cta:hover {
          background: var(--color-secondary);
          transform: translateX(4px);
        }

        .services-grid__footer {
          margin-top: 3rem;
        }

        .services-grid__custom {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
          border: 2px solid var(--color-border);
          border-radius: 16px;
        }

        .custom-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: var(--color-primary);
          color: var(--color-btn-primary-text);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .custom-content {
          flex: 1;
        }

        .custom-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }

        .custom-content p {
          font-size: 1rem;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .custom-cta {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2rem;
          background: #25D366;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .custom-cta:hover {
          background: #128C7E;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .services-grid {
            padding: 3rem 0;
          }

          .services-grid__container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .services-grid__custom {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }

          .custom-cta {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesGrid;
