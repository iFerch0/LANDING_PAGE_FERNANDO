import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Servicio en Montería Centro | FerchoTecnico',
  description: 'Cobertura de servicios técnicos en Montería Centro: reparaciones, soporte y recuperación de datos.',
};

export default function MonteriaCentro() {
  return (
    <main>
      <div className="container">
        <h1>Servicios técnicos en Montería Centro</h1>
        <p>
          Atendemos reparaciones, soporte y mantenimiento en la zona céntrica de Montería.
        </p>
        <p>
          <Link href="/areas-servicio">Ver todas las áreas</Link>
        </p>
      </div>
    </main>
  );
}
