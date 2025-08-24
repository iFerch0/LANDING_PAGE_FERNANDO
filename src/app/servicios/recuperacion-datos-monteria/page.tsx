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
