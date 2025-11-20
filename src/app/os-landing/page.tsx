import type { Metadata } from 'next';
import OSLanding from '@/components/OSLanding';

export const metadata: Metadata = {
  title: 'TechOS - Sistema de Servicios Técnicos | Reparación y Armado de Computadores',
  description: 'Servicios profesionales de reparación, asesoría y armado de computadores. Mantenimiento preventivo, optimización y soporte técnico especializado.',
  keywords: 'reparación computadores, armado PC, asesoría técnica, mantenimiento computadores, soporte técnico',
  openGraph: {
    title: 'TechOS - Sistema de Servicios Técnicos',
    description: 'Servicios profesionales de reparación, asesoría y armado de computadores',
    type: 'website',
  },
};

export default function OSLandingPage() {
  return <OSLanding />;
}
