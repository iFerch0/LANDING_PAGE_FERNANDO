import Link from 'next/link';
import { getProducts } from '@/lib/db';
import { TiendaClient } from '@/components/tienda/TiendaClient';
import styles from './page.module.css';

export const metadata = {
  title: 'Tienda - Productos Tecnológicos | FerchoTécnico',
  description: 'Computadores, componentes y accesorios tecnológicos en Montería. Equipos nuevos y reacondicionados con garantía.',
};

export const dynamic = 'force-dynamic';

export default async function TiendaPage() {
  const products = await getProducts();

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <Link href="/" className={styles.backButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Volver al Inicio</span>
          </Link>
          <h1 className={styles.title}>Productos Disponibles</h1>
          <p className={styles.subtitle}>
            Equipos tecnológicos nuevos y reacondicionados con garantía en Montería
          </p>
        </header>

        <TiendaClient initialProducts={products} />
      </div>
    </div>
  );
}
