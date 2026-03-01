// Skeleton de carga para la sección TiendaPreview en la landing page
import { Skeleton } from '@/components/ui';
import { ProductCardSkeleton } from '@/components/tienda/ProductCardSkeleton';
import styles from './TiendaPreview.module.css';
import skeletonStyles from './TiendaPreviewSkeleton.module.css';

export function TiendaPreviewSkeleton() {
  return (
    <section className={styles.section} aria-hidden="true">
      <div className={styles.container}>
        {/* Header skeleton */}
        <div className={skeletonStyles.header}>
          <div className={skeletonStyles.headerText}>
            <Skeleton width={140} height={12} rounded />
            <Skeleton height={36} width="70%" className={skeletonStyles.title} />
            <Skeleton height={16} className={skeletonStyles.subtitle} />
            <Skeleton height={16} width="60%" />
          </div>
          <Skeleton width={160} height={20} rounded className={skeletonStyles.viewAll} />
        </div>

        {/* Grid skeleton — 4 tarjetas */}
        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>

        {/* CTA skeleton */}
        <div className={styles.footer}>
          <Skeleton width={220} height={48} rounded />
        </div>
      </div>
    </section>
  );
}
