import ServiceTemplate from '@/components/ServiceTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mantenimiento de laptops Montería | FerchoTecnico',
  description: 'Mantenimiento preventivo y limpieza para laptops en Montería. Mejora rendimiento y evita sobrecalentamiento.',
};

export default function Page() {
  return (
    <ServiceTemplate
      title="Mantenimiento preventivo para laptops en Montería"
      description="Limpieza interna, reemplazo de pasta térmica, y optimización de software para prolongar vida útil."
      priceFrom="$40.000 COP"
      image="/hero-poster.jpg"
      canonical="https://www.ferchotecnico.com/servicios/mantenimiento-laptops-monteria"
      serviceName="Mantenimiento preventivo laptops"
      cases={[
        { title: 'Limpieza y thermal', text: 'Limpieza completa y cambio de pasta térmica, reducción de temperatura 12°C.' },
        { title: 'SSD y optimización', text: 'Migración a SSD y optimización del sistema, mejora notable en arranque.' }
      ]}
      faqs={[
        { q: '¿Incluye limpieza de ventilador?', a: 'Sí, limpieza completa y revisión de ventilador.' },
        { q: '¿Cada cuánto hacer mantenimiento?', a: 'Se recomienda cada 6–12 meses según uso.' },
      ]}
    />
  );
}
