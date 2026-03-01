'use client';

import { useState, useEffect, useRef } from 'react';
import { getCheckoutWhatsAppLink } from '@/lib/utils';
import type { CartItem } from '@/store/cart';
import styles from './CheckoutModal.module.css';

const PAYMENT_OPTIONS = [
  { value: 'Contra-entrega', label: 'Contra-entrega' },
  { value: 'Nequi / Daviplata', label: 'Nequi / Daviplata' },
  { value: 'Efectivo en taller', label: 'Efectivo en taller' },
  { value: 'Transferencia bancaria', label: 'Transferencia bancaria' },
];

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
}

export function CheckoutModal({ isOpen, onClose, items, total }: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus primer campo al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Ingresa tu nombre';
    if (!city.trim()) next.city = 'Ingresa tu ciudad';
    if (!paymentMethod) next.paymentMethod = 'Selecciona un método de pago';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const link = getCheckoutWhatsAppLink(items, total, {
      name: name.trim(),
      city: city.trim(),
      paymentMethod,
    });
    window.open(link, '_blank', 'noopener,noreferrer');
    onClose();
    setName('');
    setCity('');
    setPaymentMethod('');
    setErrors({});
  };

  return (
    <div className={styles.backdrop} onClick={onClose} aria-modal="true" role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div>
            <h2 className={styles.title}>Confirmar pedido</h2>
            <p className={styles.subtitle}>Completa tus datos y te escribimos por WhatsApp</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Resumen del pedido */}
        <div className={styles.orderSummary}>
          <span className={styles.summaryLabel}>
            {items.length} {items.length === 1 ? 'producto' : 'productos'}
          </span>
          <span className={styles.summaryTotal}>
            {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
            }).format(total)}
          </span>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="checkout-name" className={styles.label}>
              Tu nombre
            </label>
            <input
              ref={nameRef}
              id="checkout-name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Ej: Juan García"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="checkout-city" className={styles.label}>
              Ciudad de entrega
            </label>
            <input
              id="checkout-city"
              type="text"
              className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
              placeholder="Ej: Montería, Córdoba"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              autoComplete="address-level2"
            />
            {errors.city && <span className={styles.error}>{errors.city}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Método de pago</label>
            <div className={styles.paymentOptions}>
              {PAYMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`${styles.paymentOption} ${paymentMethod === opt.value ? styles.paymentOptionActive : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.value}
                    checked={paymentMethod === opt.value}
                    onChange={() => setPaymentMethod(opt.value)}
                    className={styles.radioHidden}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.paymentMethod && <span className={styles.error}>{errors.paymentMethod}</span>}
          </div>

          <button type="submit" className={styles.submitBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enviar pedido por WhatsApp
          </button>
        </form>

        <p className={styles.disclaimer}>
          Al enviar, se abrirá WhatsApp con tu pedido listo. Fernando te confirmará disponibilidad y
          costos de envío.
        </p>
      </div>
    </div>
  );
}
