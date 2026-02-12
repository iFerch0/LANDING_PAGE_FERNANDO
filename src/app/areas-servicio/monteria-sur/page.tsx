import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Servicio en Montería Sur | FerchoTecnico',
  description:
    'Cobertura de servicios técnicos en Montería Sur: reparaciones y soporte técnico en taller.',
};

export default function MonteriaSur() {
  return (
    <main>
      <div className="container">
        <h1>Servicios técnicos en Montería Sur</h1>
        <p>
          Ofrecemos atención en taller para la zona sur de Montería. Reparación de equipos y soporte
          técnico con diagnóstico gratuito.
        </p>
        <p>
          <Link href="/areas-servicio">Ver todas las áreas</Link>
        </p>
      </div>
    </main>
  );
}
