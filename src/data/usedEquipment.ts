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
  status: 'available' | 'reserved';
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

export const usedEquipmentList: UsedEquipmentItem[] = [
  {
    id: 'EQ-GAMER-01',
    title: 'Torre Gamer Intel Core i9-10850K · Refrigeración Líquida',
    subtitle: 'Potencia extrema de 10 núcleos / 20 hilos con refrigeración líquida de 240mm y chasis Corsair',
    category: 'gaming',
    categoryLabel: 'Torre Gamer',
    badge: 'Gama Alta · Ensamblado 2022',
    condition: 'Excelente estado (Ensamblado en 2022)',
    warranty: 'Garantía y soporte directo',
    price: '$2.000.000 COP',
    priceNote: 'Ligeramente negociable',
    status: 'available',
    images: [
      '/img/equipos-segunda/EQ-GAMER-01/1.jpg',
      '/img/equipos-segunda/EQ-GAMER-01/2.jpg',
      '/img/equipos-segunda/EQ-GAMER-01/3.jpg',
      '/img/equipos-segunda/EQ-GAMER-01/4.jpg',
    ],
    specs: [
      { label: 'Procesador', value: 'Intel Core i9-10850K (10 núcleos / 20 hilos · hasta 5.2 GHz)' },
      { label: 'Refrigeración', value: 'Refrigeración Líquida 240MM (AIO Radiador Doble)' },
      { label: 'Memoria RAM', value: '32 GB DDR4 RGB (2x16GB)' },
      { label: 'Almacenamiento', value: 'SSD 1TB M.2 NVMe de alta velocidad' },
      { label: 'Chasis & Fans', value: 'Chasis Corsair Middle Tower + 4 Fans instalados' },
      { label: 'Fuente de Poder', value: 'Fuente Real con certificación 80+ Gold' },
      { label: 'Año de Ensamble', value: '2022 (Uso personal cuidadoso)' },
    ],
    highlights: [
      'Procesador i9 de 10 núcleos reales y 20 hilos para multitarea pesada y juegos.',
      'Refrigeración líquida de 240mm que mantiene temperaturas óptimas bajo carga.',
      'Chasis Corsair de construcción sólida con excelente flujo de aire.',
      'Mantenimiento recién realizado y listo para entrega inmediata.',
    ],
  },
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
    status: 'available',
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
 * Generates direct WhatsApp inquiry link for a specific used equipment item
 */
export function getEquipmentWhatsAppUrl(item: UsedEquipmentItem): string {
  const message = `Hola Fernando, vi en tu web el equipo de segunda disponible: *${item.title}* (${item.id}) por ${item.price}. ¿Sigue disponible? Me gustaría recibir más información.`;
  return whatsappUrl(message);
}
