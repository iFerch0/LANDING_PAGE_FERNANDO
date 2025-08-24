import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicio Técnico Computadores Montería | Fernando - Servicio a Domicilio',
  description: 'Servicio técnico de computadores en Montería. Diagnóstico gratuito, servicio a domicilio y garantía 30 días.'
}

export default function Page() {
  return (
    <main className="container">
      <h1>Servicio Técnico Computadores Montería</h1>
      <p>Servicio a domicilio, diagnóstico gratuito y reparación profesional de PC y portátiles en Montería.</p>
    </main>
  );
}
