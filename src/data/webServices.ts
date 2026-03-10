import type { FC } from 'react';
import { LayoutIcon, SmartphoneIcon, RocketIcon, GlobeIcon } from '@/components/Icons';

export interface WebFeature {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
}

export const webFeatures: WebFeature[] = [
  {
    icon: LayoutIcon,
    title: 'Diseño UI/UX Premium',
    description:
      'Interfaces modernas, intuitivas y visualmente impactantes que convierten visitantes en clientes.',
  },
  {
    icon: SmartphoneIcon,
    title: '100% Responsive',
    description:
      'Tu sitio se ve perfecto en móvil, tablet y escritorio. Optimizado para cualquier dispositivo.',
  },
  {
    icon: RocketIcon,
    title: 'Rendimiento Óptimo',
    description:
      'Velocidad de carga ultrarrápida con las últimas tecnologías web (Next.js, React, SEO).',
  },
  {
    icon: GlobeIcon,
    title: 'SEO & Posicionamiento',
    description:
      'Sitios optimizados para Google. Tu negocio visible en las primeras posiciones de búsqueda.',
  },
];

export const techStack: string[] = [
  'React / Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Vercel / AWS',
];

export const deliverables: string[] = [
  'Landing Pages de alta conversión',
  'Sitios web corporativos',
  'E-commerce y tiendas online',
  'Aplicaciones web a medida',
  'Mantenimiento y soporte continuo',
  'Integración con WhatsApp, redes sociales y más',
];
