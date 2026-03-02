import { ProductCardSkeleton } from '@/components/tienda/ProductCardSkeleton';
import styles from './loading.module.css';

export default function TiendaLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.headerSkeleton} aria-hidden="true" />
      <div className={styles.grid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
