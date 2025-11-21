import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogPostCard from '@/components/BlogPostCard';
import BlogCTA from '@/components/BlogCTA';

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
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* CTA Section */}
          <BlogCTA />
        </div>
      </main>
    </>
  );
}
