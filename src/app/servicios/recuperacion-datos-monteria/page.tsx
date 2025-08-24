import ServiceTemplate from '@/components/ServiceTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recuperación de datos Montería | FerchoTecnico',
  description: 'Recuperación de datos desde discos, SSD, pendrives y tarjetas en Montería. Presupuesto claro y seguro.',
};

export default function Page() {
  return (
    <ServiceTemplate
      title="Recuperación de datos profesionales en Montería"
      description="Recuperamos archivos borrados o inaccesibles de distintos soportes con técnicas no destructivas cuando es posible."
      priceFrom="$80.000 COP"
      image="/hero-poster.jpg"
      canonical="https://www.ferchotecnico.com/servicios/recuperacion-datos-monteria"
      serviceName="Recuperación de datos"
      cases={[
        { title: 'SSD recuperado', text: 'Recuperación de datos críticos de SSD con alta tasa de éxito.' },
        { title: 'Pendrive con archivos', text: 'Recuperación de pendrive dañado y recuperación de documentos importantes.' }
      ]}
      faqs={[
        { q: '¿Garantizan recuperación?', a: 'Intentamos métodos no destructivos; no siempre es 100% garantizable.' },
        { q: '¿Cuánto cuesta el servicio?', a: 'El precio depende del soporte y la complejidad; ofrecemos presupuesto tras diagnóstico.' }
      ]}
    />
  );
}

