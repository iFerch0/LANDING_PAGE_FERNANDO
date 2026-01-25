'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { getAllProducts } from '@/lib/db';
import type { Product } from '@/lib/types';
import styles from './page.module.css';

interface CategoryStats {
  name: string;
  productCount: number;
  totalValue: number;
  totalViews: number;
  totalClicks: number;
  availableCount: number;
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await getAllProducts();

        // Agrupar productos por categoría
        const categoryMap = new Map<string, Product[]>();

        products.forEach((product) => {
          const cat = product.category || 'Sin Categoría';
          if (!categoryMap.has(cat)) {
            categoryMap.set(cat, []);
          }
          categoryMap.get(cat)!.push(product);
        });

        // Calcular estadísticas por categoría
        const stats: CategoryStats[] = Array.from(categoryMap.entries()).map(([name, prods]) => ({
          name,
          productCount: prods.length,
          totalValue: prods.reduce((sum, p) => sum + p.price * p.stock, 0),
          totalViews: prods.reduce((sum, p) => sum + (p.views || 0), 0),
          totalClicks: prods.reduce((sum, p) => sum + (p.whatsapp_clicks || 0), 0),
          availableCount: prods.filter((p) => p.availability).length,
        }));

        // Ordenar por cantidad de productos
        stats.sort((a, b) => b.productCount - a.productCount);

        setCategories(stats);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);
  const totalValue = categories.reduce((sum, cat) => sum + cat.totalValue, 0);

  return (
    <AuthGuard>
      <AdminLayout>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Categorías</h1>
              <p className={styles.subtitle}>Gestiona las categorías de tus productos</p>
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Cargando categorías...</p>
            </div>
          ) : (
            <>
              {/* Stats Summary */}
              <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryLabel}>Total Categorías</span>
                  <span className={styles.summaryValue}>{categories.length}</span>
                </div>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryLabel}>Total Productos</span>
                  <span className={styles.summaryValue}>{totalProducts}</span>
                </div>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryLabel}>Valor Total</span>
                  <span className={styles.summaryValue}>${(totalValue / 1000000).toFixed(1)}M</span>
                </div>
              </div>

              {/* Search */}
              <div className={styles.searchBar}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories Grid */}
              <div className={styles.categoriesGrid}>
                {filteredCategories.length === 0 ? (
                  <div className={styles.empty}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3h18v18H3zM12 8v4M12 16h.01" />
                    </svg>
                    <p>No se encontraron categorías</p>
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <div key={category.name} className={styles.categoryCard}>
                      <div className={styles.categoryHeader}>
                        <h3 className={styles.categoryName}>{category.name}</h3>
                        <span className={styles.productBadge}>
                          {category.productCount} producto{category.productCount !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className={styles.categoryStats}>
                        <div className={styles.statRow}>
                          <span>Disponibles</span>
                          <span className={styles.available}>
                            {category.availableCount} / {category.productCount}
                          </span>
                        </div>
                        <div className={styles.statRow}>
                          <span>Valor en stock</span>
                          <span>${category.totalValue.toLocaleString('es-CO')}</span>
                        </div>
                        <div className={styles.statRow}>
                          <span>Vistas totales</span>
                          <span>{category.totalViews}</span>
                        </div>
                        <div className={styles.statRow}>
                          <span>Clics WhatsApp</span>
                          <span>{category.totalClicks}</span>
                        </div>
                        <div className={styles.statRow}>
                          <span>Conversión</span>
                          <span className={styles.conversion}>
                            {category.totalViews > 0
                              ? ((category.totalClicks / category.totalViews) * 100).toFixed(1)
                              : 0}
                            %
                          </span>
                        </div>
                      </div>

                      <div className={styles.categoryActions}>
                        <Link
                          href={`/admin/productos?category=${encodeURIComponent(category.name)}`}
                          className={styles.viewButton}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Ver productos
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Info Note */}
              <div className={styles.infoNote}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <p>
                  Las categorías se crean automáticamente cuando agregas productos. Para crear una
                  nueva categoría, simplemente escribe el nombre al crear un producto.
                </p>
              </div>
            </>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
