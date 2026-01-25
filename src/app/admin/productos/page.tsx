'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { getAllProducts, deleteProduct, toggleProductAvailability, getCategories } from '@/lib/db';
import type { Product } from '@/lib/types';
import styles from './page.module.css';

const ITEMS_PER_PAGE = 10;

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  // Delete modal
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; product: Product | null }>({
    open: false,
    product: null,
  });
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([getAllProducts(), getCategories()]);

      setProducts(productsData);
      setFilteredProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter products when filters change
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term) ||
          p.model?.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    // Availability filter
    if (availabilityFilter) {
      const isAvailable = availabilityFilter === 'available';
      filtered = filtered.filter((p) => p.availability === isAvailable);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, categoryFilter, statusFilter, availabilityFilter]);

  const handleToggleAvailability = async (product: Product) => {
    try {
      await toggleProductAvailability(product.id);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, availability: !p.availability } : p))
      );
    } catch (error) {
      console.error('Error toggling availability:', error);
      alert('Error al cambiar disponibilidad');
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.product) return;

    setDeleting(true);
    try {
      await deleteProduct(deleteModal.product.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteModal.product!.id));
      setDeleteModal({ open: false, product: null });
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar producto');
    } finally {
      setDeleting(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStockClass = (stock: number) => {
    if (stock === 0) return styles.stockOut;
    if (stock <= 3) return styles.stockLow;
    return styles.stockOk;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'nuevo':
        return styles.statusNuevo;
      case 'reacondicionado':
        return styles.statusReacondicionado;
      case 'usado':
        return styles.statusUsado;
      case 'exhibicion':
        return styles.statusExhibicion;
      default:
        return '';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AuthGuard>
      <AdminLayout>
        <div className={styles.page}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h1>Productos</h1>
              <p>{filteredProducts.length} productos encontrados</p>
            </div>
            <Link href="/admin/productos/nuevo" className={styles.addButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Agregar Producto
            </Link>
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            <div className={styles.searchBox}>
              <svg
                className={styles.searchIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Todos los estados</option>
              <option value="nuevo">Nuevo</option>
              <option value="reacondicionado">Reacondicionado</option>
              <option value="usado">Usado</option>
              <option value="exhibicion">Exhibición</option>
            </select>

            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Disponibilidad</option>
              <option value="available">Disponible</option>
              <option value="unavailable">No disponible</option>
            </select>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Cargando productos...</p>
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className={styles.tableContainer}>
              <div className={styles.emptyState}>
                <svg
                  className={styles.emptyIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20 7h-9M14 17H5M17 11l4-4M17 11l-4-4M7 17l-4-4M7 17l4-4" />
                </svg>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o agrega un nuevo producto.</p>
                <Link href="/admin/productos/nuevo" className={styles.addButton}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Agregar Producto
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Disponible</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className={styles.productCell}>
                          {product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className={styles.productImage}
                            />
                          ) : (
                            <div className={styles.productImagePlaceholder}>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                              </svg>
                            </div>
                          )}
                          <div className={styles.productInfo}>
                            <h3>{product.title}</h3>
                            <p>
                              {product.category} • {product.brand}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={styles.price}>{formatPrice(product.price)}</span>
                      </td>
                      <td>
                        <div className={styles.stockCell}>
                          <span className={`${styles.stockBadge} ${getStockClass(product.stock)}`}>
                            {product.stock} unid.
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${getStatusClass(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <div className={styles.toggleWrapper}>
                          <button
                            className={`${styles.toggle} ${product.availability ? styles.active : ''}`}
                            onClick={() => handleToggleAvailability(product)}
                            aria-label={product.availability ? 'Desactivar' : 'Activar'}
                          >
                            <span className={styles.toggleKnob} />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <Link
                            href={`/admin/productos/${product.id}`}
                            className={`${styles.actionButton} ${styles.editButton}`}
                            title="Editar"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </Link>
                          <button
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                            onClick={() => setDeleteModal({ open: true, product })}
                            title="Eliminar"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <span className={styles.paginationInfo}>
                    Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{' '}
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} de{' '}
                    {filteredProducts.length} productos
                  </span>
                  <div className={styles.paginationButtons}>
                    <button
                      className={styles.paginationButton}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </button>
                    <button
                      className={styles.paginationButton}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Delete Modal */}
        {deleteModal.open && (
          <div
            className={styles.modalOverlay}
            onClick={() => setDeleteModal({ open: false, product: null })}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Eliminar Producto</h2>
                <button
                  className={styles.modalClose}
                  onClick={() => setDeleteModal({ open: false, product: null })}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.deleteWarning}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <p>
                    Esta acción no se puede deshacer. El producto será eliminado permanentemente.
                  </p>
                </div>
                <p>
                  ¿Estás seguro de que deseas eliminar <strong>{deleteModal.product?.title}</strong>
                  ?
                </p>
              </div>
              <div className={styles.modalFooter}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setDeleteModal({ open: false, product: null })}
                >
                  Cancelar
                </button>
                <button className={styles.confirmButton} onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </AuthGuard>
  );
}
