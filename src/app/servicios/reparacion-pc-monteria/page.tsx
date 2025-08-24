import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Reparación de PC y Portátiles en Montería | FerchoTecnico',
  description: 'Reparación profesional de ordenadores y portátiles en Montería. Diagnóstico gratuito, piezas originales y garantía 30 días.',
};

export default function ReparacionPC() {
  return (
    <main>
      <div className="container">
        <h1>Reparación de PC y Portátiles en Montería</h1>
        <p>
          Ofrecemos diagnóstico completo, reparación de hardware y optimización de software para que tu equipo vuelva a funcionar como nuevo.
        </p>
        <ul>
          <li>Diagnóstico gratuito</li>
          <li>Repuestos originales</li>
          <li>Garantía 30 días</li>
        </ul>
        <p>
          <Link href="/servicios">Ver todos los servicios</Link>
        </p>
      </div>
    </main>
  );
}
