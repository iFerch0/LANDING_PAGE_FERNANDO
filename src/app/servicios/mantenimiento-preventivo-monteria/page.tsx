import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mantenimiento Preventivo en Montería | FerchoTecnico',
  description: 'Mantenimiento preventivo para equipos y redes. Limpieza, actualizaciones y pruebas para prolongar la vida útil de tus dispositivos.',
};

export default function MantenimientoPreventivo() {
  return (
    <main>
      <div className="container">
        <h1>Mantenimiento Preventivo en Montería</h1>
        <p>
          Servicios de limpieza interna, pruebas de rendimiento y actualizaciones para mantener tus equipos en buen estado.
        </p>
        <ul>
          <li>Limpieza física y térmica</li>
          <li>Actualizaciones y parches</li>
          <li>Pruebas de estabilidad</li>
        </ul>
        <p>
          <Link href="/servicios">Ver todos los servicios</Link>
        </p>
      </div>
    </main>
  );
}
