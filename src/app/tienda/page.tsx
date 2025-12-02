import { getProducts } from '@/lib/db';
import { ProductGrid } from '@/components/tienda/ProductGrid';
import styles from './page.module.css';

export const metadata = {
  title: 'Tienda - Productos Tecnológicos | FerchoTécnico',
  description: 'Computadores, componentes y accesorios tecnológicos en Montería. Equipos nuevos y reacondicionados con garantía.',
};

export default async function TiendaPage() {
  const products = await getProducts();

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Productos Disponibles</h1>
          <p className={styles.subtitle}>
            Equipos tecnológicos nuevos y reacondicionados con garantía en Montería
          </p>
        </header>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
