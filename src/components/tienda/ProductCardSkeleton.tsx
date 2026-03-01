// Skeleton de carga para ProductCard — mismas proporciones que el card real
import { Skeleton } from '@/components/ui';
import styles from './ProductCardSkeleton.module.css';

export function ProductCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      {/* Imagen */}
      <Skeleton height={260} className={styles.image} />

      {/* Contenido */}
      <div className={styles.content}>
        {/* Badge de estado */}
        <Skeleton width={90} height={22} rounded />

        {/* Título */}
        <div className={styles.titleGroup}>
          <Skeleton height={18} />
          <Skeleton height={18} width="75%" />
        </div>

        {/* Categoría */}
        <Skeleton height={14} width="45%" />

        {/* Precio */}
        <Skeleton height={30} width="55%" className={styles.price} />

        {/* Disponibilidad */}
        <Skeleton height={14} width="38%" />

        {/* Botones */}
        <div className={styles.actions}>
          <Skeleton height={44} width={44} />
          <Skeleton height={44} className={styles.detailsBtn} />
        </div>
      </div>
    </div>
  );
}
