import ServiceTemplate from '@/components/ServiceTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reparación computadores Montería | FerchoTecnico',
  description: 'Reparación profesional de computadores y portátiles en Montería. Diagnóstico rápido y garantía.',
};

export default function Page() {
  return (
    <ServiceTemplate
      title="Reparación de computadores en Montería — Servicio profesional"
      description="Reparación de hardware y software, diagnóstico en el día y servicio a domicilio."
      priceFrom="$50.000 COP"
      image="/hero-poster.jpg"
      canonical="https://www.ferchotecnico.com/servicios/reparacion-computadores-monteria"
      serviceName="Reparación de computadores"
      cases={[{ title: 'Fuente reemplazada', text: 'Reemplazo de fuente defectuosa en 24h con garantía 30 días.' }]}
      faqs={[{ q: '¿Cuánto tarda?', a: 'Normalmente 24–72 horas según pieza.' }, { q: '¿Tienen garantía?', a: 'Sí, 30 días en mano de obra.' }]}
    />
  );
}
