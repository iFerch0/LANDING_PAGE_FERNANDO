'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import styles from './RelatedProducts.module.css';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  // Filtrar el producto actual y limitar a 4
  const relatedProducts = products.filter((p) => p.id !== currentProductId).slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Productos relacionados</h2>
      <div className={styles.grid}>
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/tienda/${product.slug}`} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.images[0] || '/placeholder-product.jpg'}
                alt={product.title}
                width={200}
                height={200}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={styles.image}
              />
              {!product.availability && <div className={styles.outOfStock}>Agotado</div>}
            </div>
            <div className={styles.content}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.price}>
                ${product.price.toLocaleString('es-CO')}
                <span className={styles.currency}> COP</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.viewAll}>
        <Link href="/tienda" className={styles.viewAllBtn}>
          Ver todos los productos
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
