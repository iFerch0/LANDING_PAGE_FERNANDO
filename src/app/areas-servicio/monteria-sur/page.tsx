import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Servicio en Montería Sur | FerchoTecnico',
  description: 'Cobertura de servicios técnicos en Montería Sur: visitas a domicilio para reparaciones y soporte técnico.',
};

export default function MonteriaSur() {
  return (
    <main>
      <div className="container">
        <h1>Servicios técnicos en Montería Sur</h1>
        <p>
          Ofrecemos atención a domicilio en la zona sur de Montería para reparación de equipos y soporte.
        </p>
        <p>
          <Link href="/areas-servicio">Ver todas las áreas</Link>
        </p>
      </div>
    </main>
  );
}
