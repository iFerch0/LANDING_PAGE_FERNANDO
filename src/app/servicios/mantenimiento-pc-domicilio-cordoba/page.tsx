import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mantenimiento PC a Domicilio Córdoba | Fernando',
  description: 'Mantenimiento preventivo y optimización de equipos a domicilio en Córdoba y Montería. Reduce fallos y aumenta vida útil.'
}

export default function Page() {
  return (
    <main className="container">
      <h1>Mantenimiento Preventivo a Domicilio</h1>
      <p>Limpieza, cambio de pasta térmica y optimización de sistemas para mejorar el rendimiento de su equipo.</p>
    </main>
  );
}
