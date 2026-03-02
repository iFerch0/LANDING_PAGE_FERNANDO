'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { Badge } from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import { CheckoutModal } from './CheckoutModal';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Prevent hydration mismatch since store is persisted
  const [isMounted, setIsMounted] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const cart = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isMounted) return null;

  const totalItems = cart.getTotalItems();
  const totalPrice = cart.getTotalPrice();

  return (
    <>
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart.items}
        total={totalPrice}
      />
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-label="Carrito de compras"
      >
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <h2>Tu Carrito</h2>
            {totalItems > 0 && <Badge variant="primary">{totalItems}</Badge>}
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar carrito">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {cart.items.length === 0 ? (
            <div className={styles.emptyState}>
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.emptyIcon}
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className={styles.emptyText}>Tu carrito está vacío</p>
              <p className={styles.emptySubtext}>Agrega equipos o accesorios desde la tienda</p>
              <Link href="/tienda" onClick={onClose} className={styles.emptyBtn}>
                Explorar la tienda
              </Link>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {cart.items.map((item) => (
                <li key={item.product.id} className={styles.item}>
                  <div className={styles.itemImageWrapper}>
                    <Image
                      src={item.product.images?.[0] || '/logo.png'}
                      alt={item.product.title}
                      fill
                      sizes="80px"
                      className={styles.itemImage}
                    />
                  </div>

                  <div className={styles.itemInfo}>
                    <span className={styles.itemBrand}>
                      {item.product.brand || item.product.category}
                    </span>
                    <h4 className={styles.itemTitle}>{item.product.title}</h4>
                    <span className={styles.itemPrice}>{formatPrice(item.product.price)}</span>

                    <div className={styles.itemControls}>
                      <div className={styles.quantityPicker}>
                        <button
                          onClick={() => cart.updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className={styles.removeBtn}
                        onClick={() => cart.removeItem(item.product.id)}
                        aria-label={`Eliminar ${item.product.title}`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
            </div>
            <p className={styles.disclaimer}>Pago seguro con Wompi</p>

            <div className={styles.footerActions}>
              <button className={styles.keepShoppingBtn} onClick={onClose}>
                Seguir comprando
              </button>
              <button className={styles.checkoutBtn} onClick={() => setIsCheckoutOpen(true)}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Pagar con Wompi
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
