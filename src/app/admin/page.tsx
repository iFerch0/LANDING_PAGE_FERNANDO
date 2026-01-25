'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { getAllProducts } from '@/lib/db';
import type { Product } from '@/lib/types';
import styles from './page.module.css';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.availability).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const totalViews = products.reduce((sum, p) => sum + p.views, 0);
  const totalWhatsAppClicks = products.reduce((sum, p) => sum + p.whatsapp_clicks, 0);

  const stats = [
    {
      name: 'Total Productos',
      value: totalProducts,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 7h-9M14 17H5M17 11l4-4M17 11l-4-4M7 17l-4-4M7 17l4-4" />
        </svg>
      ),
      color: '#667eea',
      bgColor: '#eef2ff',
    },
    {
      name: 'Disponibles',
      value: availableProducts,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      name: 'Valor Inventario',
      value: `$${(totalValue / 1000000).toFixed(1)}M`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      name: 'Vistas Totales',
      value: totalViews,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
  ];

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const lowStockProducts = products.filter((p) => p.stock <= 3 && p.stock > 0);

  return (
    <AuthGuard>
      <AdminLayout>
        <div className={styles.dashboard}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Dashboard</h1>
              <p className={styles.subtitle}>
                Bienvenido al panel de administración de FerchoTécnico
              </p>
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Cargando datos...</p>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                {stats.map((stat) => (
                  <div key={stat.name} className={styles.statCard}>
                    <div
                      className={styles.statIcon}
                      style={{ backgroundColor: stat.bgColor, color: stat.color }}
                    >
                      {stat.icon}
                    </div>
                    <div className={styles.statContent}>
                      <p className={styles.statLabel}>{stat.name}</p>
                      <p className={styles.statValue}>{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Content Grid */}
              <div className={styles.contentGrid}>
                {/* Recent Products */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Productos Recientes</h2>
                  <div className={styles.productList}>
                    {recentProducts.length === 0 ? (
                      <p className={styles.emptyText}>No hay productos registrados</p>
                    ) : (
                      recentProducts.map((product) => (
                        <div key={product.id} className={styles.productItem}>
                          <div className={styles.productInfo}>
                            <p className={styles.productName}>{product.title}</p>
                            <p className={styles.productMeta}>
                              {product.category} • Stock: {product.stock}
                            </p>
                          </div>
                          <div className={styles.productPrice}>
                            ${product.price.toLocaleString('es-CO')}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Low Stock Alert */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: '#f59e0b' }}
                    >
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                    Stock Bajo
                  </h2>
                  <div className={styles.productList}>
                    {lowStockProducts.length === 0 ? (
                      <p className={styles.emptyText}>
                        Todos los productos tienen stock suficiente
                      </p>
                    ) : (
                      lowStockProducts.map((product) => (
                        <div key={product.id} className={styles.productItem}>
                          <div className={styles.productInfo}>
                            <p className={styles.productName}>{product.title}</p>
                            <p className={styles.productMeta}>
                              Quedan solo {product.stock} unidades
                            </p>
                          </div>
                          <div className={styles.stockBadge}>{product.stock} unid.</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Estadísticas Rápidas</h2>
                  <div className={styles.quickStats}>
                    <div className={styles.quickStatItem}>
                      <span className={styles.quickStatLabel}>Clics WhatsApp</span>
                      <span className={styles.quickStatValue}>{totalWhatsAppClicks}</span>
                    </div>
                    <div className={styles.quickStatItem}>
                      <span className={styles.quickStatLabel}>Conversión</span>
                      <span className={styles.quickStatValue}>
                        {totalViews > 0 ? ((totalWhatsAppClicks / totalViews) * 100).toFixed(1) : 0}
                        %
                      </span>
                    </div>
                    <div className={styles.quickStatItem}>
                      <span className={styles.quickStatLabel}>Productos Agotados</span>
                      <span className={styles.quickStatValue}>
                        {products.filter((p) => p.stock === 0).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
