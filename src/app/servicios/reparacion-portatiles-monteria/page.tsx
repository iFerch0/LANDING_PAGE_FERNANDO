import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reparación Portátiles Montería | Fernando - Servicio a Domicilio',
  description: 'Reparación de pantallas, baterías, y problemas de hardware/software en portátiles. Servicio rápido y garantía.'
}

export default function Page() {
  return (
    <main className="container">
      <h1>Reparación de Portátiles en Montería</h1>
      <p>Reemplazo de pantallas, baterías y solución de fallas en portátiles con servicio a domicilio.</p>
    </main>
  );
}
