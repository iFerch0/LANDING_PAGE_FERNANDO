'use client';

import React from 'react';
import Link from 'next/link';
import { WA_SHORT_LINK } from '@/constants/contact';

const BlogCTA: React.FC = () => {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: '16px',
        padding: '48px 24px',
        textAlign: 'center',
        border: '1px solid var(--color-border)',
      }}
    >
      <h3
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: 'var(--color-text)',
        }}
      >
        ¿Necesitas ayuda con tu computador?
      </h3>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          marginBottom: '24px',
          fontSize: '18px',
        }}
      >
        Contáctanos para diagnóstico gratuito y servicio técnico profesional
      </p>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <a
          href={WA_SHORT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 32px',
            background: '#25D366',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '16px',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488" />
          </svg>
          Contactar por WhatsApp
        </a>

        <Link
          href="/#contacto"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 32px',
            background: 'transparent',
            color: 'var(--color-primary)',
            border: '2px solid var(--color-primary)',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '16px',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'var(--color-primary)';
            e.currentTarget.style.color = 'var(--color-btn-primary-text)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
        >
          Solicitar Servicio
        </Link>
      </div>
    </div>
  );
};

export default BlogCTA;
