import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: "Blog Técnico | Guías y Consejos de Mantenimiento PC - Montería",
  description: "Artículos, guías y consejos expertos sobre mantenimiento de computadores, reparación PC y soporte técnico en Montería. Información útil para cuidar tu equipo.",
  alternates: {
    canonical: "https://www.ferchotecnico.com/blog"
  },
  openGraph: {
    title: "Blog Técnico | Guías y Consejos de Mantenimiento PC",
    description: "Artículos y guías sobre mantenimiento de computadores en Montería",
    url: "https://www.ferchotecnico.com/blog",
    type: "website"
  }
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'mantenimiento-computadores-monteria-2025',
    title: 'Guía Completa de Mantenimiento de Computadores en Montería 2025',
    description: 'Todo lo que necesitas saber sobre el mantenimiento preventivo y correctivo de tu computador en Montería.',
    date: '2025-01-15',
    category: 'Mantenimiento',
    readTime: '8 min'
  },
  {
    slug: 'senales-pc-necesita-servicio-tecnico-cordoba',
    title: '10 Señales de que tu PC Necesita Servicio Técnico en Córdoba',
    description: 'Identifica los síntomas que indican que tu computador necesita atención profesional.',
    date: '2025-01-10',
    category: 'Diagnóstico',
    readTime: '6 min'
  },
  {
    slug: 'guia-mantenimiento-2025',
    title: 'Guía de Mantenimiento Preventivo para Computadores 2025',
    description: 'Aprende cómo mantener tu computador en óptimas condiciones durante todo el año.',
    date: '2025-01-05',
    category: 'Mantenimiento',
    readTime: '10 min'
  }
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs />

      <main style={{
        background: 'var(--color-background)',
        minHeight: '100vh',
        padding: '80px 0'
      }}>
        <div className="container">
          {/* Header */}
          <header style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--color-primary)',
              color: 'var(--color-btn-primary-text)',
              padding: '8px 16px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '16px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              Blog Técnico
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: 'var(--color-text)'
            }}>
              Guías y Consejos de Expertos
            </h1>

            <p style={{
              fontSize: '18px',
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Artículos sobre mantenimiento, reparación y cuidado de computadores en Montería
            </p>
          </header>

          {/* Blog Posts Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}>
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  padding: '24px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Category & Read Time */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                    fontSize: '14px'
                  }}>
                    <span style={{
                      background: 'var(--color-primary)',
                      color: 'var(--color-btn-primary-text)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {post.category}
                    </span>
                    <span style={{
                      color: 'var(--color-text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: 'var(--color-text)',
                    lineHeight: '1.4'
                  }}>
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p style={{
                    color: 'var(--color-text-secondary)',
                    marginBottom: '16px',
                    lineHeight: '1.6',
                    flex: 1
                  }}>
                    {post.description}
                  </p>

                  {/* Date */}
                  <time
                    dateTime={post.date}
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-secondary)',
                      marginBottom: '16px'
                    }}
                  >
                    {new Date(post.date).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--color-primary)',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'gap 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.gap = '12px'}
                    onMouseOut={(e) => e.currentTarget.style.gap = '8px'}
                  >
                    Leer artículo
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14"/>
                      <path d="M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            border: '1px solid var(--color-border)'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: 'var(--color-text)'
            }}>
              ¿Necesitas ayuda con tu computador?
            </h3>
            <p style={{
              color: 'var(--color-text-secondary)',
              marginBottom: '24px',
              fontSize: '18px'
            }}>
              Contáctanos para diagnóstico gratuito y servicio técnico profesional
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="http://wa.link/n8et4q"
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
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
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
                  transition: 'all 0.2s'
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
        </div>
      </main>
    </>
  );
}
