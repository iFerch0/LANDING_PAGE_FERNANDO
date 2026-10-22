/**
 * Used & Refurbished Equipment Catalog
 * Single Source of Truth for second-hand available equipment
 */
import { whatsappUrl } from '@/data/contact';

export type EquipmentCategory = 'all' | 'gaming' | 'laptops' | 'office';

export interface EquipmentSpec {
  label: string;
  value: string;
}

export interface UsedEquipmentItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'gaming' | 'laptops' | 'office';
  categoryLabel: string;
  badge: string;
  condition: string;
  warranty: string;
  price: string;
  priceNote?: string;
  originalPrice?: string;
  status: 'available' | 'reserved' | 'hidden';
  hidden?: boolean;
  images: string[];
  specs: EquipmentSpec[];
  highlights: string[];
}

export const CATEGORY_FILTERS: { id: EquipmentCategory; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'gaming', label: 'Torres Gamer' },
  { id: 'laptops', label: 'Portátiles' },
  { id: 'office', label: 'Oficina / Hogar' },
];

/**
 * Inventario completo de equipos.
 * Aquellos con `hidden: true` o `status: 'hidden'` permanecen guardados pero no se publican en la web.
 */
export const allEquipmentList: UsedEquipmentItem[] = [
  {
    id: 'EQ-OFFICE-01',
    title: 'Minitorre Lenovo ThinkCentre M72e',
    subtitle: 'Equipo ultra compacto, silencioso y de bajo consumo · Óptimo para tareas de oficina, comercio y estudio',
    category: 'office',
    categoryLabel: 'Oficina / Hogar',
    badge: 'Compacto · Oficina',
    condition: 'Excelente estado (Revisado y optimizado)',
    warranty: 'Garantía y soporte directo',
    price: '$550.000 COP',
    priceNote: 'SSD o HDD a elección',
    status: 'hidden',
    hidden: true,
    images: [
      '/img/equipos-segunda/EQ-OFFICE-01/1.jpg',
      '/img/equipos-segunda/EQ-OFFICE-01/2.jpg',
      '/img/equipos-segunda/EQ-OFFICE-01/3.jpg',
    ],
    specs: [
      { label: 'Procesador', value: 'Intel Core i5-3470T (hasta 3.6 GHz · bajo consumo)' },
      { label: 'Memoria RAM', value: '16 GB RAM para multitarea fluida' },
      { label: 'Almacenamiento', value: 'SSD 240GB (rápido) o HDD 1TB (gran capacidad)' },
      { label: 'Gráficos', value: 'Intel HD Graphics integrada' },
      { label: 'Formato & Chasis', value: 'Minitorre Lenovo ThinkCentre ultra compacta' },
      { label: 'Uso Recomendado', value: 'Óptimo para oficina, facturación, navegación y estudio' },
    ],
    highlights: [
      'Formato minitorre ahorrador de espacio, ideal para oficinas o mostradores.',
      'Excelente fluidez con 16 GB de RAM en navegación web y programas de oficina.',
      'Configuración a tu gusto: SSD de 240GB para velocidad o HDD de 1TB para guardar archivos.',
      'Mantenimiento térmico al 100% y sistema operativo listo para trabajar.',
    ],
  },
];

/**
 * Equipos actualmente publicados y disponibles en la landing page.
 */
export const usedEquipmentList: UsedEquipmentItem[] = allEquipmentList.filter(
  (item) => !item.hidden && item.status !== 'hidden'
);

/**
 * Generates direct WhatsApp inquiry link for a specific used equipment item
 */
export function getEquipmentWhatsAppUrl(item: UsedEquipmentItem): string {
  const message = `Hola Fernando, vi en tu web el equipo de segunda disponible: *${item.title}* (${item.id}) por ${item.price}. ¿Sigue disponible? Me gustaría recibir más información.`;
  return whatsappUrl(message);
}
