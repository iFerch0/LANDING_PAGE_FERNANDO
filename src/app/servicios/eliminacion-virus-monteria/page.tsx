import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Eliminación de Virus en Montería | FerchoTecnico',
  description: 'Limpieza y eliminación de malware, virus y adware. Restauración de sistemas y protección preventiva en Montería.',
};

export default function EliminacionVirus() {
  return (
    <main>
      <div className="container">
        <h1>Eliminación de Virus y Malware en Montería</h1>
        <p>
          Eliminamos amenazas, limpiamos el sistema y aplicamos medidas para evitar reinfecciones.
        </p>
        <ul>
          <li>Escaneo profundo</li>
          <li>Eliminación de malware</li>
          <li>Optimización post-limpieza</li>
        </ul>
        <p>
          <Link href="/servicios">Ver todos los servicios</Link>
        </p>
      </div>
    </main>
  );
}
