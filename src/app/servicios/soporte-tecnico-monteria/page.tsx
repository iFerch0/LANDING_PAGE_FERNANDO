import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Soporte Técnico en Montería | FerchoTecnico',
  description: 'Soporte técnico remoto y presencial en Montería. Resolución de incidencias, instalación de software y asesoría.',
};

export default function SoporteTecnico() {
  return (
    <main>
      <div className="container">
        <h1>Soporte Técnico en Montería</h1>
        <p>
          Soporte remoto o a domicilio para solucionar problemas de software, configuraciones o redes.
        </p>
        <ul>
          <li>Soporte remoto en línea</li>
          <li>Visitas a domicilio</li>
          <li>Asesoría personalizada</li>
        </ul>
        <p>
          <Link href="/servicios">Ver todos los servicios</Link>
        </p>
      </div>
    </main>
  );
}
