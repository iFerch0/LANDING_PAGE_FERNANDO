import Link from 'next/link';

export default function BlogIndex(){
  return (
    <main className="container">
      <h1>Blog - Fernando Técnico</h1>
      <ul>
        <li><Link href="/blog/guia-mantenimiento-2025">Guía Completa: Mantenimiento Computadores Montería 2025</Link></li>
      </ul>
    </main>
  );
}
