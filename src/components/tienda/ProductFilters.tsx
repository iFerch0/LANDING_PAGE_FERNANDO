'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductStatus } from '@/lib/types';
import styles from './ProductFilters.module.css';

interface ProductFiltersProps {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
}

type SortOption = 'recent' | 'price-asc' | 'price-desc' | 'name';

const STATUS_OPTIONS: { value: ProductStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'reacondicionado', label: 'Reacondicionado' },
  { value: 'usado', label: 'Usado' },
  { value: 'exhibicion', label: 'Exhibición' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'name', label: 'Nombre A-Z' },
];

export function ProductFilters({ products, onFilter }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Get price range from products
  const maxPrice = Math.max(...products.map(p => p.price), 0);
  const minPrice = Math.min(...products.map(p => p.price), 0);

  // Initialize price range
  useEffect(() => {
    if (priceRange.max === 0 && maxPrice > 0) {
      setPriceRange({ min: minPrice, max: maxPrice });
    }
  }, [maxPrice, minPrice, priceRange.max]);

  const applyFilters = useCallback(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.brand?.toLowerCase().includes(search) ||
        p.model?.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    // Price range filter
    if (priceRange.min > minPrice || priceRange.max < maxPrice) {
      filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    onFilter(filtered);
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy, priceRange, minPrice, maxPrice, onFilter]);

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSortBy('recent');
    setPriceRange({ min: minPrice, max: maxPrice });
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || 
    priceRange.min > minPrice || priceRange.max < maxPrice;

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div className={styles.container}>
      {/* Search and Sort Row */}
      <div className={styles.topRow}>
        <div className={styles.searchBox}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className={styles.clearSearch}
              onClick={() => setSearchTerm('')}
              aria-label="Limpiar búsqueda"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.sortSelect}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        <button 
          className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filtros
          {hasActiveFilters && <span className={styles.filterBadge} />}
        </button>
      </div>

      {/* Expandable Filters */}
      <div className={`${styles.filtersPanel} ${showFilters ? styles.open : ''}`}>
        <div className={styles.filtersGrid}>
          {/* Category Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Categoría</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Todas las categorías</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Estado</label>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value as ProductStatus | 'all')}
              className={styles.filterSelect}
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Precio</label>
            <div className={styles.priceRangeContainer}>
              <div className={styles.priceInputs}>
                <input
                  type="text"
                  value={formatPrice(priceRange.min)}
                  readOnly
                  className={styles.priceInput}
                />
                <span className={styles.priceSeparator}>—</span>
                <input
                  type="text"
                  value={formatPrice(priceRange.max)}
                  readOnly
                  className={styles.priceInput}
                />
              </div>
              <div className={styles.priceRange}>
                <div className={styles.rangeTrack} />
                {maxPrice > minPrice && (
                  <div 
                    className={styles.rangeProgress}
                    style={{
                      left: `${Math.max(0, Math.min(100, ((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100))}%`,
                      width: `${Math.max(0, Math.min(100, ((priceRange.max - priceRange.min) / (maxPrice - minPrice)) * 100))}%`
                    }}
                  />
                )}
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ 
                    ...prev, 
                    min: Math.min(Number(e.target.value), prev.max - 10000) 
                  }))}
                  className={styles.rangeSlider}
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ 
                    ...prev, 
                    max: Math.max(Number(e.target.value), prev.min + 10000) 
                  }))}
                  className={styles.rangeSlider}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Clear Filters - Fuera del grid para evitar reflow */}
        <div className={styles.clearFilterRow}>
          <button 
            className={`${styles.clearButton} ${!hasActiveFilters ? styles.clearButtonDisabled : ''}`}
            onClick={clearFilters}
            disabled={!hasActiveFilters}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Active Filters Tags */}
      {hasActiveFilters && (
        <div className={styles.activeTags}>
          {searchTerm && (
            <span className={styles.tag}>
              Búsqueda: &quot;{searchTerm}&quot;
              <button onClick={() => setSearchTerm('')}>×</button>
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className={styles.tag}>
              {selectedCategory}
              <button onClick={() => setSelectedCategory('all')}>×</button>
            </span>
          )}
          {selectedStatus !== 'all' && (
            <span className={styles.tag}>
              {STATUS_OPTIONS.find(s => s.value === selectedStatus)?.label}
              <button onClick={() => setSelectedStatus('all')}>×</button>
            </span>
          )}
          {(priceRange.min > minPrice || priceRange.max < maxPrice) && (
            <span className={styles.tag}>
              {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
              <button onClick={() => setPriceRange({ min: minPrice, max: maxPrice })}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
