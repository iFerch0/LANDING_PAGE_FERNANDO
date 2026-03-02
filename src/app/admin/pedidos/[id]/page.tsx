'use client';

// src/app/admin/pedidos/[id]/page.tsx
// Detalle de un pedido en el panel de admin

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { getOrderById } from '../actions';
import type { Order, OrderStatus } from '@/lib/types';
import { getCustomWhatsAppLink } from '@/lib/utils';
import styles from './page.module.css';

const formatCOP = (amount: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  failed: 'Fallido',
  cancelled: 'Cancelado',
};

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

export default function PedidoDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getOrderById(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  const waLink = order?.buyerPhone
    ? `https://wa.me/57${order.buyerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
        `Hola ${order.buyerName}, tu pedido ${order.reference} está confirmado. ¡Gracias por comprar en FerchoTécnico! 🎉`
      )}`
    : getCustomWhatsAppLink(
        `Pedido ${order?.reference ?? ''} — ${order?.buyerName ?? ''} — ${formatCOP(order?.total ?? 0)}`
      );

  return (
    <AuthGuard>
      <AdminLayout>
        <div className={styles.page}>
          <Link href="/admin/pedidos" className={styles.backBtn}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver a pedidos
          </Link>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Cargando pedido...</p>
            </div>
          ) : !order ? (
            <div className={styles.loading}>
              <p>Pedido no encontrado</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <h1>{order.buyerName}</h1>
                  <p className={styles.refCode}>{order.reference}</p>
                </div>
                <span className={`${styles.badge} ${getBadgeClass(order.status)}`}>
                  {STATUS_LABEL[order.status]}
                </span>
              </div>

              {/* Grid: comprador + timeline */}
              <div className={styles.grid}>
                {/* Datos del comprador */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Datos del comprador</h2>
                  <div className={styles.infoRow}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Nombre</span>
                      <span className={styles.infoValue}>{order.buyerName}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Email</span>
                      <span className={styles.infoValue}>{order.buyerEmail}</span>
                    </div>
                    {order.buyerPhone && (
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Teléfono</span>
                        <span className={styles.infoValue}>{order.buyerPhone}</span>
                      </div>
                    )}
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Ciudad</span>
                      <span className={styles.infoValue}>{order.buyerCity}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Total</span>
                      <span className={styles.infoValue}>{formatCOP(order.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline de estado */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Timeline</h2>
                  <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                      <div className={`${styles.timelineDot} ${styles.timelineDotActive}`} />
                      <div className={styles.timelineLine} />
                      <div className={styles.timelineContent}>
                        <p className={styles.timelineTitle}>Pedido creado</p>
                        <p className={styles.timelineSub}>{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                    <div className={styles.timelineItem}>
                      <div
                        className={`${styles.timelineDot} ${
                          order.status === 'paid'
                            ? styles.timelineDotActive
                            : order.status === 'failed' || order.status === 'cancelled'
                              ? styles.timelineDotFailed
                              : ''
                        }`}
                      />
                      <div className={styles.timelineContent}>
                        <p className={styles.timelineTitle}>
                          {order.status === 'paid'
                            ? 'Pago confirmado'
                            : order.status === 'failed'
                              ? 'Pago fallido'
                              : order.status === 'cancelled'
                                ? 'Pago cancelado'
                                : 'Esperando pago'}
                        </p>
                        {order.updatedAt !== order.createdAt && (
                          <p className={styles.timelineSub}>{formatDate(order.updatedAt)}</p>
                        )}
                        {order.wompiTxId && (
                          <p className={styles.timelineSub}>Tx: {order.wompiTxId}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabla de items */}
              <div className={styles.cardFull}>
                <h2 className={styles.cardTitle}>Productos</h2>
                <table className={styles.itemsTable}>
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Producto</th>
                      <th>Precio unit.</th>
                      <th>Cant.</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, i) => (
                      <tr key={`${item.productId}-${i}`}>
                        <td>
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className={styles.itemImage}
                            />
                          ) : (
                            <div className={styles.itemImagePlaceholder}>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                              </svg>
                            </div>
                          )}
                        </td>
                        <td>{item.title}</td>
                        <td>{formatCOP(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>{formatCOP(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                    <tr className={styles.totalRow}>
                      <td colSpan={4}>Total</td>
                      <td>{formatCOP(order.total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Acciones */}
              <div className={styles.actions}>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnWhatsapp}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp al comprador
                </a>
              </div>
            </>
          )}
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
