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
      cases={[{ title: 'SSD recuperado', text: 'Recuperación de datos críticos de SSD con alta tasa de éxito.' }]}
      faqs={[{ q: '¿Garantizan recuperación?', a: 'Intentamos métodos no destructivos; no siempre es 100% garantizable.' }]}
    />
  );
}
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Recuperación de Datos en Montería | FerchoTecnico',
  description: 'Recuperación segura de datos desde discos duros, SSD, pendrives y tarjetas de memoria en Montería. Presupuesto sin compromiso.',
};

export default function RecuperacionDatos() {
  return (
    <main>
      <div className="container">
        <h1>Recuperación de Datos en Montería</h1>
        <p>
          Recuperamos archivos borrados o inaccesibles de distintos soportes con técnicas no destructivas cuando es posible.
        </p>
        <ul>
          <li>Discos HDD y SSD</li>
          <li>Pendrives y tarjetas SD</li>
          <li>Presupuesto transparente</li>
        </ul>
        <p>
          <Link href="/servicios">Ver todos los servicios</Link>
        </p>
      </div>
    </main>
  );
}
