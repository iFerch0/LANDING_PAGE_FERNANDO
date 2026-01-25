'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { getProductById, updateProduct, getCategories } from '@/lib/db';
import type { Product, ProductStatus } from '@/lib/types';
import styles from '../form.module.css';

const PAYMENT_OPTIONS = [
  'Efectivo',
  'Transferencia Bancaria',
  'Nequi',
  'Daviplata',
  'Tarjeta de Crédito',
  'Financiación',
];

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'reacondicionado', label: 'Reacondicionado' },
  { value: 'usado', label: 'Usado' },
  { value: 'exhibicion', label: 'Exhibición' },
];

interface FormErrors {
  title?: string;
  price?: string;
  category?: string;
  stock?: string;
}

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [notFound, setNotFound] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    model: '',
    stock: 1,
    status: 'nuevo',
    availability: true,
    images: [],
    specs: {},
    payment_methods: [],
    warranty: '',
  });

  // Specs
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([{ key: '', value: '' }]);

  // Custom category
  const [customCategory, setCustomCategory] = useState('');

  const loadData = useCallback(async () => {
    try {
      const [product, categoriesData] = await Promise.all([
        getProductById(productId),
        getCategories(),
      ]);

      if (!product) {
        setNotFound(true);
        return;
      }

      setCategories(categoriesData);
      setFormData(product);

      // Convert specs object to array
      if (product.specs) {
        const specsArray = Object.entries(product.specs).map(([key, value]) => ({
          key,
          value,
        }));
        setSpecs(specsArray.length > 0 ? specsArray : [{ key: '', value: '' }]);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (!formData.category?.trim() && !customCategory.trim()) {
      newErrors.category = 'La categoría es requerida';
    }

    if (formData.stock === undefined || formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // Build specs object from array
      const specsObject: Record<string, string> = {};
      specs.forEach((spec) => {
        if (spec.key.trim() && spec.value.trim()) {
          specsObject[spec.key.trim()] = spec.value.trim();
        }
      });

      const productData = {
        ...formData,
        category: customCategory.trim() || formData.category,
        specs: specsObject,
      };

      await updateProduct(productId, productData);

      setMessage({ type: 'success', text: '¡Producto actualizado exitosamente!' });

      // Redirect after short delay
      setTimeout(() => {
        router.push('/admin/productos');
      }, 1500);
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage({ type: 'error', text: 'Error al actualizar el producto. Intenta de nuevo.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    setSpecs((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleAddSpec = () => {
    setSpecs((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const togglePaymentMethod = (method: string) => {
    setFormData((prev) => {
      const current = prev.payment_methods || [];
      const updated = current.includes(method)
        ? current.filter((m) => m !== method)
        : [...current, method];
      return { ...prev, payment_methods: updated };
    });
  };

  if (loading) {
    return (
      <AuthGuard>
        <AdminLayout>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Cargando producto...</p>
          </div>
        </AdminLayout>
      </AuthGuard>
    );
  }

  if (notFound) {
    return (
      <AuthGuard>
        <AdminLayout>
          <div className={styles.page}>
            <div className={styles.header}>
              <Link href="/admin/productos" className={styles.backButton}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className={styles.headerContent}>
                <h1>Producto no encontrado</h1>
                <p>El producto que buscas no existe o fue eliminado</p>
              </div>
            </div>
          </div>
        </AdminLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <AdminLayout>
        <div className={styles.page}>
          {/* Header */}
          <div className={styles.header}>
            <Link href="/admin/productos" className={styles.backButton}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className={styles.headerContent}>
              <h1>Editar Producto</h1>
              <p>Modifica la información del producto</p>
            </div>
          </div>

          {/* Messages */}
          {message && (
            <div
              className={`${styles.message} ${message.type === 'success' ? styles.messageSuccess : styles.messageError}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                {message.type === 'success' ? (
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                ) : (
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                )}
              </svg>
              <p>{message.text}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className={styles.formCard}>
              {/* Basic Info */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  Información Básica
                </h2>

                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.formGridFull}`}>
                    <label className={styles.label}>
                      Título <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                      placeholder="Ej: Laptop HP 15-dy2021la Core i5"
                    />
                    {errors.title && <p className={styles.errorText}>{errors.title}</p>}
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGridFull}`}>
                    <label className={styles.label}>Descripción</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={styles.textarea}
                      placeholder="Describe el producto en detalle..."
                      rows={4}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Precio (COP) <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.priceInput}>
                      <span className={styles.pricePrefix}>$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    {errors.price && <p className={styles.errorText}>{errors.price}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Categoría <span className={styles.required}>*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`${styles.select} ${errors.category ? styles.inputError : ''}`}
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="__custom__">+ Nueva categoría</option>
                    </select>
                    {formData.category === '__custom__' && (
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className={styles.input}
                        placeholder="Nombre de la nueva categoría"
                        style={{ marginTop: '0.5rem' }}
                      />
                    )}
                    {errors.category && <p className={styles.errorText}>{errors.category}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Marca</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Ej: HP, Lenovo, Apple"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Modelo</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Ej: 15-dy2021la"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Stock <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.stock ? styles.inputError : ''}`}
                      min="0"
                    />
                    {errors.stock && <p className={styles.errorText}>{errors.stock}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Estado</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Garantía</label>
                    <input
                      type="text"
                      name="warranty"
                      value={formData.warranty}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Ej: 6 meses, 1 año"
                    />
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className={styles.toggleGroup} style={{ marginTop: '1rem' }}>
                  <div className={styles.toggleLabel}>
                    <span className={styles.toggleTitle}>Disponible para venta</span>
                    <span className={styles.toggleDesc}>El producto será visible en la tienda</span>
                  </div>
                  <button
                    type="button"
                    className={`${styles.toggle} ${formData.availability ? styles.active : ''}`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, availability: !prev.availability }))
                    }
                  >
                    <span className={styles.toggleKnob} />
                  </button>
                </div>
              </div>

              {/* Images */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  Imágenes
                </h2>

                <ImageUploader
                  images={formData.images || []}
                  onChange={handleImagesChange}
                  maxImages={6}
                />
              </div>

              {/* Specifications */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                  Especificaciones Técnicas
                </h2>

                <div className={styles.specsContainer}>
                  {specs.map((spec, index) => (
                    <div key={index} className={styles.specItem}>
                      <input
                        type="text"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                        className={styles.input}
                        placeholder="Ej: Procesador"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                        className={styles.input}
                        placeholder="Ej: Intel Core i5"
                      />
                      {specs.length > 1 && (
                        <button
                          type="button"
                          className={styles.specRemove}
                          onClick={() => handleRemoveSpec(index)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}

                  <button type="button" className={styles.addSpec} onClick={handleAddSpec}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Agregar especificación
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  Métodos de Pago
                </h2>

                <div className={styles.paymentMethods}>
                  {PAYMENT_OPTIONS.map((method) => (
                    <button
                      key={method}
                      type="button"
                      className={`${styles.paymentMethod} ${
                        formData.payment_methods?.includes(method) ? styles.selected : ''
                      }`}
                      onClick={() => togglePaymentMethod(method)}
                    >
                      <span className={styles.checkbox}>
                        {formData.payment_methods?.includes(method) && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <span className={styles.paymentMethodLabel}>{method}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className={styles.formActions}>
                <Link href="/admin/productos" className={styles.cancelButton}>
                  Cancelar
                </Link>
                <button type="submit" className={styles.submitButton} disabled={submitting}>
                  {submitting ? (
                    <>
                      <div
                        className={styles.spinner}
                        style={{ width: 20, height: 20, borderWidth: 2 }}
                      />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      Guardar Cambios
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
