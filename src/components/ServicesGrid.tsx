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
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: 'Mantenimiento Preventivo',
      description:
        'Limpieza completa de hardware, actualización de sistema y optimización de rendimiento',
      priceFrom: '$50.000',
      duration: '2-3 horas',
      includes: [
        'Limpieza interna completa',
        'Cambio de pasta térmica',
        'Actualización de drivers',
        'Optimización del sistema',
      ],
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: 'Reparación de Hardware',
      description:
        'Diagnóstico y reparación de componentes dañados, reemplazo de piezas con repuestos originales',
      priceFrom: '$70.000',
      duration: 'Mismo día',
      includes: [
        'Diagnóstico gratuito',
        'Reparación de componentes',
        'Repuestos originales',
        'Pruebas de funcionamiento',
      ],
      popular: true,
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
      ),
      title: 'Recuperación de Datos',
      description:
        'Recuperación de archivos perdidos, eliminados o de discos dañados con tecnología especializada',
      priceFrom: '$100.000',
      duration: '1-3 días',
      includes: [
        'Evaluación sin costo',
        'Recuperación de archivos',
        'Copia de seguridad',
        'Entrega en USB/Nube',
      ],
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
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
        'Antivirus incluido',
      ],
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="3" />
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
        'Consejos de prevención',
      ],
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
        'Asesoría personalizada',
      ],
    },
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
            Precios transparentes, sin sorpresas. Diagnóstico gratuito incluido en todos los
            servicios
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
              {service.popular && <div className="service-card__badge">Más solicitado</div>}

              <div className="service-card__icon">{service.icon}</div>

              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>

              <div className="service-card__pricing">
                <div className="service-card__price">
                  <span className="price-from">Desde</span>
                  <span className="price-amount">{service.priceFrom}</span>
                </div>
                <div className="service-card__duration">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  {service.duration}
                </div>
              </div>

              <div className="service-card__includes">
                <div className="includes-title">Incluye:</div>
                <ul className="includes-list">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="includes-item">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
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
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>

        {/* CTA personalizado */}
        <div className="services-grid__footer" data-aos="fade-up">
          <div className="services-grid__custom">
            <div className="custom-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="17" r="0.5" fill="currentColor" />
              </svg>
            </div>
            <div className="custom-content">
              <h3>¿No encuentras lo que necesitas?</h3>
              <p>Cuéntame tu problema y te doy una solución personalizada</p>
            </div>
            <a
              href="http://wa.link/n8et4q"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-cta"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488" />
              </svg>
              Cuéntame tu caso
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
          position: relative;
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2.5rem 3rem;
          background: linear-gradient(
            135deg,
            rgba(58, 110, 147, 0.08) 0%,
            rgba(37, 211, 102, 0.05) 100%
          );
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
        }

        .services-grid__custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-primary), #25d366, var(--color-accent));
        }

        .services-grid__custom::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -100px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(37, 211, 102, 0.15) 0%, transparent 70%);
          transform: translateY(-50%);
          pointer-events: none;
        }

        .custom-icon {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--color-primary), #25d366);
          color: white;
          border-radius: 16px;
          flex-shrink: 0;
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
        }

        .custom-content {
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .custom-content h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }

        .custom-content p {
          font-size: 1rem;
          color: var(--color-text-secondary);
          margin: 0;
          opacity: 0.85;
        }

        .custom-cta {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.75rem;
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          color: white;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          white-space: nowrap;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3);
        }

        .custom-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
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
