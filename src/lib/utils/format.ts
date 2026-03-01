// src/lib/utils/format.ts
// Utilidades puras de formato — sin side-effects ni dependencias externas

/**
 * Formatea un precio en COP (pesos colombianos).
 * @example formatPrice(150000) // "$ 150.000"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Genera un slug URL-seguro desde un texto.
 * @example generateSlug("Laptop HP Pavilion 15") // "laptop-hp-pavilion-15"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Trunca texto a una longitud máxima con elipsis.
 * @example truncate("Texto muy largo...", 20) // "Texto muy largo..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Capitaliza la primera letra de un texto.
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Formatea una fecha ISO a formato legible en español.
 * @example formatDate("2024-01-15T10:00:00Z") // "15 ene. 2024"
 */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate));
}

/**
 * Formatea bytes a unidad legible.
 * @example formatBytes(1500000) // "1.4 MB"
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
