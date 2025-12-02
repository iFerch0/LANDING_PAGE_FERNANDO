'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { getAllProducts } from '@/lib/db';
import type { Product } from '@/lib/types';
import styles from './page.module.css';

interface ProductRanking {
  product: Product;
  conversionRate: number;
}

export default function EstadisticasPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calcular estadísticas generales
  const totalProducts = products.length;
  const availableProducts = products.filter(p => p.availability).length;
  const totalViews = products.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalClicks = products.reduce((sum, p) => sum + (p.whatsapp_clicks || 0), 0);
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const avgConversion = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

  // Top productos por vistas
  const topByViews = [...products]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  // Top productos por clics de WhatsApp
  const topByClicks = [...products]
    .sort((a, b) => (b.whatsapp_clicks || 0) - (a.whatsapp_clicks || 0))
    .slice(0, 5);

  // Top productos por conversión (con mínimo de vistas)
  const topByConversion: ProductRanking[] = products
    .filter(p => (p.views || 0) >= 5) // Mínimo 5 vistas para ser considerado
    .map(p => ({
      product: p,
      conversionRate: p.views > 0 ? ((p.whatsapp_clicks || 0) / p.views) * 100 : 0
    }))
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 5);

  // Estadísticas por estado
  const statusStats = {
    nuevo: products.filter(p => p.status === 'nuevo').length,
    reacondicionado: products.filter(p => p.status === 'reacondicionado').length,
    usado: products.filter(p => p.status === 'usado').length,
    exhibicion: products.filter(p => p.status === 'exhibicion').length,
  };

  // Productos sin stock
  const outOfStock = products.filter(p => p.stock === 0);

  // Productos sin vistas
  const noViews = products.filter(p => (p.views || 0) === 0);

  return (
    <AuthGuard>
      <AdminLayout>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Estadísticas</h1>
              <p className={styles.subtitle}>
                Análisis de rendimiento de tus productos
              </p>
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Cargando estadísticas...</p>
            </div>
          ) : (
            <>
              {/* Main Stats */}
              <div className={styles.mainStats}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#eef2ff', color: '#667eea' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Vistas Totales</span>
                    <span className={styles.statValue}>{totalViews.toLocaleString()}</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#d1fae5', color: '#10b981' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Clics WhatsApp</span>
                    <span className={styles.statValue}>{totalClicks.toLocaleString()}</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3v18h18M7 16l4-4 4 4 6-6" />
                    </svg>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Tasa Conversión</span>
                    <span className={styles.statValue}>{avgConversion.toFixed(1)}%</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#ede9fe', color: '#8b5cf6' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Valor Inventario</span>
                    <span className={styles.statValue}>${(totalValue / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>

              {/* Rankings Grid */}
              <div className={styles.rankingsGrid}>
                {/* Top por Vistas */}
                <div className={styles.rankingCard}>
                  <h3 className={styles.rankingTitle}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Top 5 - Más Vistos
                  </h3>
                  <div className={styles.rankingList}>
                    {topByViews.length === 0 ? (
                      <p className={styles.emptyText}>No hay datos suficientes</p>
                    ) : (
                      topByViews.map((product, index) => (
                        <div key={product.id} className={styles.rankingItem}>
                          <span className={styles.rankNumber}>#{index + 1}</span>
                          <div className={styles.rankInfo}>
                            <span className={styles.rankName}>{product.title}</span>
                            <span className={styles.rankMeta}>{product.category}</span>
                          </div>
                          <span className={styles.rankValue}>{(product.views || 0).toLocaleString()}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Top por Clics */}
                <div className={styles.rankingCard}>
                  <h3 className={styles.rankingTitle}>
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366' }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Top 5 - Más Clics WhatsApp
                  </h3>
                  <div className={styles.rankingList}>
                    {topByClicks.length === 0 ? (
                      <p className={styles.emptyText}>No hay datos suficientes</p>
                    ) : (
                      topByClicks.map((product, index) => (
                        <div key={product.id} className={styles.rankingItem}>
                          <span className={styles.rankNumber}>#{index + 1}</span>
                          <div className={styles.rankInfo}>
                            <span className={styles.rankName}>{product.title}</span>
                            <span className={styles.rankMeta}>{product.category}</span>
                          </div>
                          <span className={styles.rankValue}>{(product.whatsapp_clicks || 0).toLocaleString()}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Top por Conversión */}
                <div className={styles.rankingCard}>
                  <h3 className={styles.rankingTitle}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3v18h18M7 16l4-4 4 4 6-6" />
                    </svg>
                    Top 5 - Mejor Conversión
                  </h3>
                  <div className={styles.rankingList}>
                    {topByConversion.length === 0 ? (
                      <p className={styles.emptyText}>Necesita productos con +5 vistas</p>
                    ) : (
                      topByConversion.map((item, index) => (
                        <div key={item.product.id} className={styles.rankingItem}>
                          <span className={styles.rankNumber}>#{index + 1}</span>
                          <div className={styles.rankInfo}>
                            <span className={styles.rankName}>{item.product.title}</span>
                            <span className={styles.rankMeta}>
                              {item.product.whatsapp_clicks} clics / {item.product.views} vistas
                            </span>
                          </div>
                          <span className={styles.rankValue} style={{ color: '#10b981' }}>
                            {item.conversionRate.toFixed(1)}%
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Status and Alerts */}
              <div className={styles.bottomGrid}>
                {/* Estado de Productos */}
                <div className={styles.infoCard}>
                  <h3 className={styles.infoTitle}>Estado de Productos</h3>
                  <div className={styles.statusGrid}>
                    <div className={styles.statusItem}>
                      <span className={styles.statusDot} style={{ background: '#10b981' }}></span>
                      <span>Nuevos</span>
                      <span className={styles.statusCount}>{statusStats.nuevo}</span>
                    </div>
                    <div className={styles.statusItem}>
                      <span className={styles.statusDot} style={{ background: '#3b82f6' }}></span>
                      <span>Reacondicionados</span>
                      <span className={styles.statusCount}>{statusStats.reacondicionado}</span>
                    </div>
                    <div className={styles.statusItem}>
                      <span className={styles.statusDot} style={{ background: '#f59e0b' }}></span>
                      <span>Usados</span>
                      <span className={styles.statusCount}>{statusStats.usado}</span>
                    </div>
                    <div className={styles.statusItem}>
                      <span className={styles.statusDot} style={{ background: '#6b7280' }}></span>
                      <span>Exhibición</span>
                      <span className={styles.statusCount}>{statusStats.exhibicion}</span>
                    </div>
                  </div>
                </div>

                {/* Alertas */}
                <div className={styles.infoCard}>
                  <h3 className={styles.infoTitle}>Alertas</h3>
                  <div className={styles.alertsList}>
                    <div className={styles.alertItem}>
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ef4444' }}>
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                      </svg>
                      <span>Productos agotados</span>
                      <span className={styles.alertCount}>{outOfStock.length}</span>
                    </div>
                    <div className={styles.alertItem}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#f59e0b' }}>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      <span>Sin vistas aún</span>
                      <span className={styles.alertCount}>{noViews.length}</span>
                    </div>
                    <div className={styles.alertItem}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#10b981' }}>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span>Disponibles</span>
                      <span className={styles.alertCount}>{availableProducts}</span>
                    </div>
                  </div>
                </div>

                {/* Resumen */}
                <div className={styles.infoCard}>
                  <h3 className={styles.infoTitle}>Resumen General</h3>
                  <div className={styles.summaryList}>
                    <div className={styles.summaryItem}>
                      <span>Total de productos</span>
                      <span>{totalProducts}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span>Promedio de vistas</span>
                      <span>{totalProducts > 0 ? Math.round(totalViews / totalProducts) : 0}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span>Promedio de clics</span>
                      <span>{totalProducts > 0 ? Math.round(totalClicks / totalProducts) : 0}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span>Valor promedio producto</span>
                      <span>
                        ${totalProducts > 0 
                          ? Math.round(products.reduce((s, p) => s + p.price, 0) / totalProducts).toLocaleString('es-CO')
                          : 0}
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
