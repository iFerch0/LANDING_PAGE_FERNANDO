'use client';

import React from 'react';

const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      value: '500+',
      label: 'PCs reparadas'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ),
      value: '4.9/5',
      label: 'Calificación'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      value: '< 24h',
      label: 'Tiempo respuesta'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      value: '30 días',
      label: 'Garantía'
    }
  ];

  return (
    <section className="trust-bar" aria-label="Indicadores de confianza">
      <div className="container">
        <div className="trust-bar__grid">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="trust-bar__item"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="trust-bar__icon">{item.icon}</div>
              <div className="trust-bar__content">
                <div className="trust-bar__value">{item.value}</div>
                <div className="trust-bar__label">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .trust-bar {
          background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
          padding: 2rem 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }

        .trust-bar__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          align-items: center;
          justify-items: center;
        }

        .trust-bar__item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem;
        }

        .trust-bar__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: var(--color-primary);
          color: var(--color-btn-primary-text);
          border-radius: 12px;
          flex-shrink: 0;
        }

        .trust-bar__content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .trust-bar__value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text);
          line-height: 1;
        }

        .trust-bar__label {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .trust-bar {
            padding: 1.5rem 0;
          }

          .trust-bar__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .trust-bar__value {
            font-size: 1.25rem;
          }

          .trust-bar__label {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .trust-bar__grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustBar;
