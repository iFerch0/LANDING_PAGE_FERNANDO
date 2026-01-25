import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Áreas de Servicio | FerchoTecnico - Montería',
  description:
    'Zonas de cobertura en Montería para servicios técnicos: Centro y Sur. Solicita visita a domicilio según tu ubicación.',
};

export default function AreasServicioIndex() {
  const areas = [
    { href: '/areas-servicio/monteria-centro', title: 'Montería Centro' },
    { href: '/areas-servicio/monteria-sur', title: 'Montería Sur' },
  ];

  return (
    <main>
      <div className="container">
        <h1>Áreas de Servicio</h1>
        <p>
          Atendemos en diferentes zonas de Montería. Selecciona tu área para ver los servicios
          disponibles.
        </p>

        <ul>
          {areas.map((a) => (
            <li key={a.href}>
              <Link href={a.href}>{a.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
