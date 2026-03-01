// Server component — carga 4 productos destacados para la landing page
import Link from 'next/link';
import { productService } from '@/lib/services/product.service';
import { ProductCard } from '@/components/tienda/ProductCard';
import styles from './TiendaPreview.module.css';

export default async function TiendaPreview() {
  const result = await productService.getProducts({ pageSize: 4 });
  const products = result.success ? result.data.data : [];

  if (products.length === 0) return null;

  return (
    <section className={styles.section} id="tienda">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.overline}>Equipos disponibles</span>
            <h2 className={styles.title}>
              Tecnología certificada{' '}
              <span className={styles.titleAccent}>con garantía de experto</span>
            </h2>
            <p className={styles.subtitle}>
              Cada equipo revisado, limpiado y probado por Fernando antes de la venta.
            </p>
          </div>

          <Link href="/tienda" className={styles.viewAll} aria-label="Ver tienda completa">
            Ver tienda completa
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/tienda" className={styles.ctaButton}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Explorar toda la tienda
          </Link>
        </div>
      </div>
    </section>
  );
}
