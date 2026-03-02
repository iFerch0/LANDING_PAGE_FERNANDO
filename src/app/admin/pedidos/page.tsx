'use client';

// src/app/admin/pedidos/page.tsx
// Panel de administración de pedidos

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { getOrders } from './actions';
import type { Order, OrderStatus } from '@/lib/types';
import styles from './page.module.css';

type TabFilter = 'all' | OrderStatus;

const TABS: { key: TabFilter; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'pending', label: 'Pendientes' },
  { key: 'paid', label: 'Pagados' },
  { key: 'failed', label: 'Fallidos' },
  { key: 'cancelled', label: 'Cancelados' },
];

const formatCOP = (amount: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));

function getBadgeClass(status: OrderStatus) {
  switch (status) {
    case 'pending':
      return styles.badgePending;
    case 'paid':
      return styles.badgePaid;
    case 'failed':
      return styles.badgeFailed;
    case 'cancelled':
      return styles.badgeCancelled;
    default:
      return '';
  }
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  failed: 'Fallido',
  cancelled: 'Cancelado',
};

export default function PedidosPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabFilter>('all');

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getOrders(undefined, 100);
      setOrders(data);
    } catch (err) {
      console.error('Error al cargar pedidos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filtered = activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <AuthGuard>
      <AdminLayout>
        <div className={styles.page}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h1>Pedidos</h1>
              <p>
                {filtered.length} pedido{filtered.length !== 1 ? 's' : ''} encontrado
                {filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
                {t.key !== 'all' && (
                  <span> ({orders.filter((o) => o.status === t.key).length})</span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Cargando pedidos...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.tableContainer}>
              <div className={styles.emptyState}>
                <h3>No hay pedidos</h3>
                <p>
                  {activeTab === 'all'
                    ? 'Aún no se ha registrado ningún pedido.'
                    : `No hay pedidos con estado "${STATUS_LABEL[activeTab as OrderStatus]}".`}
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Referencia</th>
                    <th>Comprador</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr
                      key={order.id}
                      className={styles.tableRow}
                      onClick={() => router.push(`/admin/pedidos/${order.id}`)}
                    >
                      <td>
                        <span className={styles.refCode}>{order.reference}</span>
                      </td>
                      <td>
                        <p className={styles.buyerName}>{order.buyerName}</p>
                        <p className={styles.buyerEmail}>{order.buyerEmail}</p>
                      </td>
                      <td>
                        <span className={styles.price}>{formatCOP(order.total)}</span>
                      </td>
                      <td>
                        <span className={`${styles.badge} ${getBadgeClass(order.status)}`}>
                          {STATUS_LABEL[order.status]}
                        </span>
                      </td>
                      <td>
                        <span className={styles.date}>{formatDate(order.createdAt)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
