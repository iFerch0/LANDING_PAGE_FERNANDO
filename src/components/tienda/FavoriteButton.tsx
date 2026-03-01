'use client';

import { useFavoritesStore } from '@/store';
import styles from './FavoriteButton.module.css';

interface FavoriteButtonProps {
  productId: string;
}

export function FavoriteButton({ productId }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(productId));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <button
      className={`${styles.button} ${isFavorite ? styles.active : ''}`}
      onClick={() => toggleFavorite(productId)}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <svg
        viewBox="0 0 24 24"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        className={styles.icon}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className={styles.text}>{isFavorite ? 'En favoritos' : 'Agregar a favoritos'}</span>
    </button>
  );
}
