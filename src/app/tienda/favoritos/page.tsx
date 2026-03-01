'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '@/store';
import { ProductCard } from '@/components/tienda/ProductCard';
import { EmptyState } from '@/components/ui';
import { getFavoriteProducts } from './actions';
import type { Product } from '@/lib/types';
import styles from './page.module.css';

export default function FavoritosPage() {
  const ids = useFavoritesStore((state) => state.ids);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFavoriteProducts(ids)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [ids]);

  const count = ids.length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Mis Favoritos</h1>
          <p className={styles.subtitle}>
            {count === 0
              ? 'No tienes productos guardados aún.'
              : `${count} producto${count !== 1 ? 's' : ''} guardado${count !== 1 ? 's' : ''}`}
          </p>
        </div>
        {count > 0 && (
          <button className={styles.clearBtn} onClick={clearFavorites}>
            Limpiar todo
          </button>
        )}
      </header>

      {loading ? (
        <div className={styles.grid}>
          {ids.map((id) => (
            <div key={id} className={styles.skeleton} aria-hidden="true" />
          ))}
        </div>
      ) : count === 0 ? (
        <EmptyState
          icon="❤️"
          title="Tu lista de favoritos está vacía"
          description="Guarda productos tocando el corazón para encontrarlos aquí rápidamente."
          action={
            <Link href="/tienda" className={styles.browseLink}>
              Ver tienda
            </Link>
          }
        />
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
