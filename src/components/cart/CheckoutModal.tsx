'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { CartItem } from '@/store/cart';
import { checkoutFormSchema } from '@/lib/validators';
import type { CheckoutFormData } from '@/lib/validators';
import { createOrderAndSign } from '@/app/tienda/checkout/actions';
import type { WompiCheckoutData } from '@/app/tienda/checkout/actions';
import styles from './CheckoutModal.module.css';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
}

const EMPTY_FORM: CheckoutFormData = { name: '', email: '', phone: '', city: '' };

const formatCOP = (amount: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);

export function CheckoutModal({ isOpen, onClose, items, total }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<CheckoutFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [wompiData, setWompiData] = useState<WompiCheckoutData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // Declarar callbacks antes de los useEffect que los referencian
  const handleClose = useCallback(() => {
    if (containerRef.current) containerRef.current.innerHTML = '';
    setStep(1);
    setForm(EMPTY_FORM);
    setErrors({});
    setServerError(null);
    setWompiData(null);
    onClose();
  }, [onClose]);

  const setField = useCallback(
    (field: keyof CheckoutFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    },
    []
  );

  // Focus al abrir el paso 1
  useEffect(() => {
    if (isOpen && step === 1) {
      const t = setTimeout(() => nameRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen, step]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, handleClose]);

  // Inyectar widget Wompi en el paso 2
  useEffect(() => {
    if (step !== 2 || !wompiData || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.setAttribute('data-render', 'button');
    script.setAttribute('data-public-key', wompiData.publicKey);
    script.setAttribute('data-currency', 'COP');
    script.setAttribute('data-amount-in-cents', String(wompiData.amountInCents));
    script.setAttribute('data-reference', wompiData.reference);
    script.setAttribute('data-signature:integrity', wompiData.signature);
    script.setAttribute('data-redirect-url', wompiData.redirectUrl);
    script.setAttribute('data-acceptance-token', wompiData.acceptanceToken);

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [step, wompiData]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const result = checkoutFormSchema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: Partial<Record<keyof CheckoutFormData, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof CheckoutFormData;
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError(null);
    try {
      const data = await createOrderAndSign(form, items, total);
      setWompiData(data);
      setStep(2);
    } catch (err) {
      console.error('Error al crear la orden:', err);
      setServerError('Ocurrió un error al procesar tu pedido. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleClose} aria-modal="true" role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            {step === 1 ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
                <path d="M4 10h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10z" />
                <path d="M9 21V10M15 21V10" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
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
            )}
          </div>
          <div>
            <h2 className={styles.title}>{step === 1 ? 'Datos de entrega' : 'Completar pago'}</h2>
            <p className={styles.subtitle}>
              {step === 1
                ? 'Ingresa tus datos para continuar'
                : wompiData
                  ? `Ref: ${wompiData.reference}`
                  : 'Completa el pago con Wompi'}
            </p>
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Cerrar">
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

        {/* Indicador de pasos */}
        <div className={styles.steps}>
          <div className={`${styles.stepDot} ${step >= 1 ? styles.stepDotActive : ''}`} />
          <div className={styles.stepLine} />
          <div className={`${styles.stepDot} ${step >= 2 ? styles.stepDotActive : ''}`} />
        </div>

        {/* Resumen del pedido */}
        <div className={styles.orderSummary}>
          <span className={styles.summaryLabel}>
            {items.length} {items.length === 1 ? 'producto' : 'productos'}
          </span>
          <span className={styles.summaryTotal}>{formatCOP(total)}</span>
        </div>

        {/* ── PASO 1: Formulario de datos ── */}
        {step === 1 && (
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="checkout-name" className={styles.label}>
                Nombre completo
              </label>
              <input
                ref={nameRef}
                id="checkout-name"
                type="text"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="Ej: Juan García"
                value={form.name}
                onChange={setField('name')}
                autoComplete="name"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="checkout-email" className={styles.label}>
                Correo electrónico
              </label>
              <input
                id="checkout-email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Ej: juan@correo.com"
                value={form.email}
                onChange={setField('email')}
                autoComplete="email"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="checkout-phone" className={styles.label}>
                Teléfono <span className={styles.optional}>(opcional)</span>
              </label>
              <input
                id="checkout-phone"
                type="tel"
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                placeholder="Ej: 3001234567"
                value={form.phone}
                onChange={setField('phone')}
                autoComplete="tel"
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
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
                value={form.city}
                onChange={setField('city')}
                autoComplete="address-level2"
              />
              {errors.city && <span className={styles.error}>{errors.city}</span>}
            </div>

            {serverError && <p className={styles.serverError}>{serverError}</p>}

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? (
                <span className={styles.loadingPayment}>
                  <span className={styles.spinnerSmall} />
                  Procesando...
                </span>
              ) : (
                <>
                  Continuar al pago
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}

        {/* ── PASO 2: Widget Wompi + resumen ── */}
        {step === 2 && (
          <div className={styles.step2}>
            {/* Lista compacta de items */}
            <ul className={styles.summaryItems}>
              {items.map((item) => (
                <li key={item.product.id} className={styles.summaryItem}>
                  <span className={styles.summaryItemName}>
                    {item.product.title}
                    {item.quantity > 1 && (
                      <span className={styles.summaryItemQty}> ×{item.quantity}</span>
                    )}
                  </span>
                  <span className={styles.summaryItemPrice}>
                    {formatCOP(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Contenedor donde Wompi inyecta el botón de pago */}
            <div className={styles.wompiContainer} ref={containerRef} />

            {/* Volver al paso 1 */}
            <button className={styles.backBtn} onClick={() => setStep(1)} type="button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver a mis datos
            </button>
          </div>
        )}

        {step === 1 && (
          <p className={styles.disclaimer}>
            Pago seguro procesado por Wompi. Tus datos están protegidos.
          </p>
        )}
      </div>
    </div>
  );
}
