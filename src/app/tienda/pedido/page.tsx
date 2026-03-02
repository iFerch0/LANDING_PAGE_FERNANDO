'use client';

// src/app/tienda/pedido/page.tsx
// Página de confirmación de pedido — se accede con ?ref=FT-xxx
// Hace polling del estado hasta que sea 'paid' o 'failed'

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { getOrderStatus } from './actions';
import type { OrderStatusResult } from './actions';
import styles from './page.module.css';

const formatCOP = (amount: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);

function PedidoContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref') ?? '';

  const [order, setOrder] = useState<OrderStatusResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);

  const clearCart = useCartStore((s) => s.clearCart);

  const fetchOrder = useCallback(async () => {
    if (!ref) {
      setLoading(false);
      return;
    }
    try {
      const data = await getOrderStatus(ref);
      if (data) {
        setOrder(data);
        if (data.status === 'paid') {
          clearCart();
        }
      }
    } catch {
      // ignorar errores de red en polling
    } finally {
      setLoading(false);
    }
  }, [ref, clearCart]);

  // Carga inicial
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Polling cada 3s si sigue en 'pending' (máx 10 intentos)
  useEffect(() => {
    if (!ref || !order || order.status !== 'pending') return;
    if (attempts >= 10) return;

    const timer = setTimeout(async () => {
      setAttempts((a) => a + 1);
      await fetchOrder();
    }, 3000);

    return () => clearTimeout(timer);
  }, [ref, order, attempts, fetchOrder]);

  if (!ref) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={`${styles.iconWrap} ${styles.iconFailed}`}>✗</div>
          <h1 className={styles.title}>Referencia no encontrada</h1>
          <p className={styles.subtitle}>No se especificó una referencia de pedido válida.</p>
          <div className={styles.ctaGroup}>
            <Link href="/tienda" className={styles.btnPrimary}>
              Ir a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.spinner} />
          <h1 className={styles.title} style={{ marginTop: '1.5rem' }}>
            Cargando tu pedido...
          </h1>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={`${styles.iconWrap} ${styles.iconFailed}`}>✗</div>
          <h1 className={styles.title}>Pedido no encontrado</h1>
          <p className={styles.subtitle}>
            No encontramos un pedido con la referencia <strong>{ref}</strong>.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/tienda" className={styles.btnPrimary}>
              Ir a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Estado: PENDING ──
  if (order.status === 'pending') {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={`${styles.iconWrap} ${styles.iconPending}`}>⏳</div>
          <h1 className={styles.title}>Procesando tu pago...</h1>
          <p className={styles.subtitle}>
            Estamos verificando tu transacción con Wompi. Esto puede tomar unos segundos.
          </p>
          <p className={styles.reference}>{order.reference}</p>
          <div className={styles.spinner} />
          {attempts > 0 && <p className={styles.pollingHint}>Verificación {attempts}/10...</p>}
        </div>
      </div>
    );
  }

  // ── Estado: PAID ──
  if (order.status === 'paid') {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={`${styles.iconWrap} ${styles.iconSuccess}`}>✓</div>
          <h1 className={styles.title}>¡Pago confirmado!</h1>
          <p className={styles.subtitle}>
            Gracias, <strong>{order.buyerName}</strong>. Tu pedido fue procesado exitosamente.
          </p>
          <p className={styles.reference}>{order.reference}</p>

          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCOP(item.price * item.quantity)}</td>
                </tr>
              ))}
              <tr className={styles.totalRow}>
                <td colSpan={2}>Total pagado</td>
                <td>{formatCOP(order.total)}</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.ctaGroup}>
            <Link href="/tienda" className={styles.btnPrimary}>
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Estado: FAILED | CANCELLED ──
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={`${styles.iconWrap} ${styles.iconFailed}`}>✗</div>
        <h1 className={styles.title}>Pago no completado</h1>
        <p className={styles.subtitle}>
          Tu pago no pudo ser procesado. Puedes intentarlo de nuevo o contactarnos.
        </p>
        <p className={styles.reference}>{order.reference}</p>
        <div className={styles.ctaGroup}>
          <Link href="/tienda" className={styles.btnPrimary}>
            Intentar de nuevo
          </Link>
          <Link href="/" className={styles.btnSecondary}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PedidoPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center', color: '#6b7280' }}>Cargando...</div>
        </div>
      }
    >
      <PedidoContent />
    </Suspense>
  );
}
