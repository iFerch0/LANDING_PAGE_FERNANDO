// src/lib/db.ts
import { supabase } from './supabase';
import type { Product } from './types';

// Mock products for testing without Supabase
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Laptop HP 15-dy2021la Core i5 11va Gen',
    slug: 'laptop-hp-15-dy2021la-core-i5',
    description: 'Laptop HP 15-dy2021la con procesador Intel Core i5 de 11va generación, perfecta para trabajo, estudio y entretenimiento. Incluye 8GB RAM, 256GB SSD, pantalla HD de 15.6" y Windows 11 Pro original. Estado impecable con garantía de 6 meses.',
    price: 1850000,
    category: 'Computadores Portátiles',
    brand: 'HP',
    model: '15-dy2021la',
    stock: 3,
    status: 'reacondicionado',
    availability: true,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800',
    ],
    specs: {
      'Procesador': 'Intel Core i5-1135G7 (11va Gen)',
      'RAM': '8GB DDR4',
      'Almacenamiento': '256GB SSD NVMe',
      'Pantalla': '15.6" HD (1366x768)',
      'Gráficos': 'Intel Iris Xe',
      'Sistema Operativo': 'Windows 11 Pro',
      'Batería': 'Hasta 7 horas',
    },
    payment_methods: ['Efectivo', 'Transferencia Bancaria', 'Nequi', 'Daviplata'],
    warranty: '6 meses',
    views: 45,
    whatsapp_clicks: 12,
    created_at: new Date('2025-11-28').toISOString(),
    updated_at: new Date('2025-12-01').toISOString(),
  },
  {
    id: '2',
    title: 'PC Gamer AMD Ryzen 5 5600G + 16GB RAM',
    slug: 'pc-gamer-amd-ryzen-5-5600g-16gb',
    description: 'PC Gamer de alto rendimiento con procesador AMD Ryzen 5 5600G con gráficos Radeon integrados, 16GB RAM DDR4, SSD 480GB + HDD 1TB. Ideal para gaming en 1080p, streaming y edición. Incluye case gamer RGB y Windows 11 activado.',
    price: 2450000,
    category: 'PC Escritorio',
    brand: 'Ensamblado',
    model: 'Custom Build 2024',
    stock: 2,
    status: 'nuevo',
    availability: true,
    images: [
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800',
    ],
    specs: {
      'Procesador': 'AMD Ryzen 5 5600G',
      'RAM': '16GB DDR4 3200MHz',
      'Almacenamiento': '480GB SSD + 1TB HDD',
      'Gráficos': 'AMD Radeon Graphics (integrados)',
      'Placa Madre': 'B450M',
      'Fuente': '600W 80+ Bronze',
      'Case': 'RGB Gamer con ventiladores',
    },
    payment_methods: ['Efectivo', 'Transferencia', 'Nequi', 'Financiación disponible'],
    warranty: '1 año',
    views: 89,
    whatsapp_clicks: 28,
    created_at: new Date('2025-11-25').toISOString(),
    updated_at: new Date('2025-12-02').toISOString(),
  },
  {
    id: '3',
    title: 'MacBook Air M1 2020 8GB 256GB',
    slug: 'macbook-air-m1-2020-8gb-256gb',
    description: 'MacBook Air con chip M1 de Apple, revolucionario rendimiento y eficiencia energética. Pantalla Retina de 13.3", hasta 18 horas de batería, TouchID. Perfecto para diseñadores, programadores y creadores de contenido. Estado excelente.',
    price: 3200000,
    category: 'Computadores Portátiles',
    brand: 'Apple',
    model: 'MacBook Air 2020',
    stock: 1,
    status: 'usado',
    availability: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    ],
    specs: {
      'Procesador': 'Apple M1 (8 núcleos CPU)',
      'RAM': '8GB RAM unificada',
      'Almacenamiento': '256GB SSD',
      'Pantalla': '13.3" Retina (2560x1600)',
      'Gráficos': 'GPU 7 núcleos',
      'Sistema Operativo': 'macOS Sonoma',
      'Batería': 'Hasta 18 horas',
    },
    payment_methods: ['Efectivo', 'Transferencia Bancaria'],
    warranty: '3 meses',
    views: 156,
    whatsapp_clicks: 42,
    created_at: new Date('2025-11-20').toISOString(),
    updated_at: new Date('2025-11-30').toISOString(),
  },
  {
    id: '4',
    title: 'Monitor LG 24" Full HD IPS 75Hz',
    slug: 'monitor-lg-24-full-hd-ips-75hz',
    description: 'Monitor LG de 24 pulgadas con panel IPS para colores precisos, resolución Full HD 1920x1080, tasa de refresco de 75Hz ideal para gaming casual, AMD FreeSync. Incluye cable HDMI y stand ajustable. Perfecto para trabajo y entretenimiento.',
    price: 420000,
    category: 'Monitores',
    brand: 'LG',
    model: '24MK430H',
    stock: 5,
    status: 'nuevo',
    availability: true,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
    ],
    specs: {
      'Tamaño': '24 pulgadas',
      'Resolución': '1920x1080 Full HD',
      'Panel': 'IPS',
      'Tasa de Refresco': '75Hz',
      'Tiempo de Respuesta': '5ms',
      'Conectividad': 'HDMI, VGA',
      'FreeSync': 'Sí',
    },
    payment_methods: ['Efectivo', 'Transferencia', 'Nequi', 'Daviplata'],
    warranty: '1 año',
    views: 67,
    whatsapp_clicks: 18,
    created_at: new Date('2025-11-22').toISOString(),
    updated_at: new Date('2025-12-01').toISOString(),
  },
  {
    id: '5',
    title: 'Teclado Mecánico RGB Redragon K552',
    slug: 'teclado-mecanico-rgb-redragon-k552',
    description: 'Teclado mecánico gaming Redragon Kumara K552 con switches blue, retroiluminación RGB personalizable, construcción metálica duradera, anti-ghosting completo. Formato TKL (sin teclado numérico) ideal para gaming competitivo.',
    price: 145000,
    category: 'Periféricos',
    brand: 'Redragon',
    model: 'K552 Kumara',
    stock: 8,
    status: 'nuevo',
    availability: true,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
    ],
    specs: {
      'Tipo': 'Mecánico',
      'Switches': 'Blue (táctil y clicky)',
      'Iluminación': 'RGB personalizable',
      'Layout': 'TKL (87 teclas)',
      'Construcción': 'Base metálica',
      'Conectividad': 'USB con cable',
      'Anti-Ghosting': '100%',
    },
    payment_methods: ['Efectivo', 'Transferencia', 'Nequi'],
    warranty: '6 meses',
    views: 123,
    whatsapp_clicks: 35,
    created_at: new Date('2025-11-18').toISOString(),
    updated_at: new Date('2025-11-29').toISOString(),
  },
  {
    id: '6',
    title: 'Lenovo ThinkPad X1 Carbon Gen 9 - AGOTADO',
    slug: 'lenovo-thinkpad-x1-carbon-gen-9',
    description: 'Laptop empresarial premium Lenovo ThinkPad X1 Carbon Gen 9, ultraligera (1.13kg), procesador Intel Core i7-1165G7, 16GB RAM, 512GB SSD, pantalla 14" Full HD IPS, teclado retroiluminado legendario, lector de huellas.',
    price: 4200000,
    category: 'Computadores Portátiles',
    brand: 'Lenovo',
    model: 'ThinkPad X1 Carbon Gen 9',
    stock: 0,
    status: 'exhibicion',
    availability: false,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
    ],
    specs: {
      'Procesador': 'Intel Core i7-1165G7 (11va Gen)',
      'RAM': '16GB LPDDR4X',
      'Almacenamiento': '512GB SSD NVMe',
      'Pantalla': '14" Full HD IPS',
      'Peso': '1.13 kg',
      'Batería': 'Hasta 16 horas',
      'Seguridad': 'TPM 2.0, Lector de huellas',
    },
    payment_methods: ['Efectivo', 'Transferencia'],
    warranty: '90 días',
    views: 234,
    whatsapp_clicks: 67,
    created_at: new Date('2025-11-15').toISOString(),
    updated_at: new Date('2025-12-02').toISOString(),
  },
];

export async function getProducts(): Promise<Product[]> {
  // Return mock products if Supabase is not configured
  if (!supabase) {
    console.log('📦 Using mock products (Supabase not configured)');
    return MOCK_PRODUCTS.filter(p => p.availability);
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('availability', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    // Return mock products if there's an error (e.g., table doesn't exist yet)
    console.log('📦 Using mock products (Supabase error)');
    return MOCK_PRODUCTS.filter(p => p.availability);
  }

  // If no products in database, return mock products
  if (!data || data.length === 0) {
    console.log('📦 Using mock products (no products in Supabase)');
    return MOCK_PRODUCTS.filter(p => p.availability);
  }

  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Return mock product if Supabase is not configured
  if (!supabase) {
    const product = MOCK_PRODUCTS.find(p => p.slug === slug);
    return product || null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    // Return mock product if there's an error
    const product = MOCK_PRODUCTS.find(p => p.slug === slug);
    if (product) {
      console.log('📦 Using mock product (Supabase error)');
    }
    return product || null;
  }

  // If no product found, try mock products
  if (!data) {
    const product = MOCK_PRODUCTS.find(p => p.slug === slug);
    if (product) {
      console.log('📦 Using mock product (not found in Supabase)');
    }
    return product || null;
  }

  return data;
}

export async function incrementViews(productId: string): Promise<void> {
  if (!supabase) {
    return;
  }

  const { error } = await supabase.rpc('increment_views', { product_id: productId });

  if (error) {
    console.error('Error incrementing views:', error);
  }
}

export async function incrementWhatsAppClicks(productId: string): Promise<void> {
  if (!supabase) {
    return;
  }

  const { error } = await supabase.rpc('increment_whatsapp_clicks', { product_id: productId });

  if (error) {
    console.error('Error incrementing WhatsApp clicks:', error);
  }
}
