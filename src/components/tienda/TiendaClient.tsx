'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { ProductFilters } from './ProductFilters';
import { ProductCard } from './ProductCard';
import { ProductListItem } from './ProductListItem';
import styles from './TiendaClient.module.css';

interface TiendaClientProps {
  initialProducts: Product[];
}

type ViewMode = 'grid' | 'list';

const PRODUCTS_PER_PAGE = 12;

export function TiendaClient({ initialProducts }: TiendaClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Cargar favoritos desde localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('favoriteProducts');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }
  }, []);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favorites));
  }, [favorites]);

  const handleFilter = useCallback((filtered: Product[]) => {
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset a página 1 cuando cambian los filtros
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generar números de página para mostrar
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className={styles.tiendaContent}>
      <ProductFilters products={initialProducts} onFilter={handleFilter} />

      {/* Toolbar: Resultados, Vista */}
      <div className={styles.toolbar}>
        <div className={styles.resultsInfo}>
          <span className={styles.resultsCount}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
            {filteredProducts.length !== initialProducts.length ? ' encontrados' : ' disponibles'}
          </span>
          {totalPages > 1 && (
            <span className={styles.pageInfo}>
              Página {currentPage} de {totalPages}
            </span>
          )}
        </div>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Vista cuadrícula"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
          <button
            className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="Vista lista"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="4" width="18" height="4" rx="1" />
              <rect x="3" y="10" width="18" height="4" rx="1" />
              <rect x="3" y="16" width="18" height="4" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid/Lista de productos */}
      {paginatedProducts.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3 className={styles.emptyTitle}>No se encontraron productos</h3>
          <p className={styles.emptyText}>
            Intenta ajustar los filtros o buscar con otros términos
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className={styles.grid}>
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          {paginatedProducts.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Navegación de páginas">
          <button
            className={styles.pageBtn}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className={styles.pageNumbers}>
            {pageNumbers.map((page, idx) =>
              page === '...' ? (
                <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`${styles.pageNum} ${currentPage === page ? styles.activePage : ''}`}
                  onClick={() => goToPage(page as number)}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            className={styles.pageBtn}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </nav>
      )}
    </div>
  );
}
