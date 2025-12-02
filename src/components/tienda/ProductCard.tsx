import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const STATUS_LABELS = {
  nuevo: '⭐ NUEVO',
  reacondicionado: '✨ REACONDICIONADO',
  usado: '💼 USADO',
  exhibicion: '🏪 EXHIBICIÓN',
} as const;

export function ProductCard({ product }: ProductCardProps) {
  const hasImage = product.images && product.images.length > 0;
  const imageUrl = hasImage ? product.images[0] : '/placeholder-product.jpg';

  return (
    <article className={styles.card}>
      <Link href={`/tienda/${product.slug}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={product.title}
            width={400}
            height={400}
            className={styles.image}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
          {!product.availability && (
            <div className={styles.outOfStock}>
              <span>Agotado</span>
            </div>
          )}
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles[product.status]}`}>
            {STATUS_LABELS[product.status]}
          </span>
          {product.stock <= 3 && product.stock > 0 && (
            <span className={`${styles.badge} ${styles.lowStock}`}>
              ⚠️ Últimas unidades
            </span>
          )}
        </div>

        <Link href={`/tienda/${product.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>

        {product.category && (
          <p className={styles.category}>{product.category}</p>
        )}

        <div className={styles.footer}>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>
              ${product.price.toLocaleString('es-CO')}
            </span>
            <span className={styles.currency}>COP</span>
          </div>

          <div className={styles.availability}>
            {product.availability ? (
              <span className={styles.available}>
                <span className={styles.dot}>●</span> Disponible
              </span>
            ) : (
              <span className={styles.unavailable}>
                <span className={styles.dot}>●</span> Agotado
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/tienda/${product.slug}`}
          className={styles.button}
        >
          Ver detalles
        </Link>
      </div>
    </article>
  );
}
