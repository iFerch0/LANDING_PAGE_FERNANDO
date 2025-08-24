import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Servicios | FerchoTecnico - Montería',
  description: 'Lista de servicios técnicos ofrecidos en Montería: reparación, recuperación de datos, eliminación de virus, mantenimiento y soporte.',
};

export default function ServiciosIndex() {
  const servicios = [
    { href: '/servicios/reparacion-pc-monteria', title: 'Reparación de PC y Portátiles' },
    { href: '/servicios/recuperacion-datos-monteria', title: 'Recuperación de Datos' },
    { href: '/servicios/eliminacion-virus-monteria', title: 'Eliminación de Virus' },
    { href: '/servicios/mantenimiento-preventivo-monteria', title: 'Mantenimiento Preventivo' },
    { href: '/servicios/soporte-tecnico-monteria', title: 'Soporte Técnico' },
  ];

  return (
    <main>
      <div className="container">
        <h1>Servicios</h1>
        <p>Explora los servicios que ofrecemos en Montería. Haz clic en cualquiera para ver más detalles.</p>

        <ul>
          {servicios.map((s) => (
            <li key={s.href}>
              <Link href={s.href}>{s.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
