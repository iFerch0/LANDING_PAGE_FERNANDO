import {
  getProductWhatsAppLink,
  getServiceWhatsAppLink,
  getCustomWhatsAppLink,
  getCheckoutWhatsAppLink,
} from '../whatsapp';
import { WA_BASE_URL } from '@/constants/contact';
import type { CartItem } from '@/store/cart';
import type { Product } from '@/lib/types';

const BASE = WA_BASE_URL;

const makeCartItem = (overrides: Partial<Product> = {}): CartItem => ({
  product: {
    id: 'p1',
    title: 'Laptop HP 15',
    slug: 'laptop-hp-15',
    description: 'Desc',
    price: 1_500_000,
    category: 'Computadores',
    brand: 'HP',
    model: '15',
    stock: 5,
    status: 'nuevo',
    availability: true,
    images: [],
    specs: {},
    payment_methods: [],
    warranty: '',
    views: 0,
    whatsapp_clicks: 0,
    created_at: '',
    updated_at: '',
    ...overrides,
  },
  quantity: 1,
});

describe('getProductWhatsAppLink', () => {
  it('genera un link de WA que comienza con la base correcta', () => {
    const link = getProductWhatsAppLink('Laptop HP', 'laptop-hp');
    expect(link).toContain(BASE);
  });

  it('incluye el título del producto en el mensaje', () => {
    const link = getProductWhatsAppLink('Laptop HP', 'laptop-hp');
    expect(decodeURIComponent(link)).toContain('Laptop HP');
  });

  it('incluye la URL del producto en el mensaje', () => {
    const link = getProductWhatsAppLink('Laptop HP', 'laptop-hp');
    expect(decodeURIComponent(link)).toContain('/tienda/laptop-hp');
  });
});

describe('getServiceWhatsAppLink', () => {
  it('genera un link genérico si no hay nombre de servicio', () => {
    const link = getServiceWhatsAppLink();
    expect(link).toContain(BASE);
    expect(decodeURIComponent(link)).toContain('servicio técnico');
  });

  it('incluye el nombre del servicio cuando se proporciona', () => {
    const link = getServiceWhatsAppLink('Mantenimiento Preventivo');
    expect(decodeURIComponent(link)).toContain('Mantenimiento Preventivo');
  });
});

describe('getCustomWhatsAppLink', () => {
  it('codifica el mensaje correctamente en la URL', () => {
    const link = getCustomWhatsAppLink('Hola mundo!');
    expect(link).toContain(encodeURIComponent('Hola mundo!'));
  });

  it('incluye la base de WA', () => {
    const link = getCustomWhatsAppLink('Test');
    expect(link).toContain(BASE);
  });
});

describe('getCheckoutWhatsAppLink', () => {
  it('genera un link de checkout con productos del carrito', () => {
    const items = [makeCartItem()];
    const link = getCheckoutWhatsAppLink(items, 1_500_000);
    const decoded = decodeURIComponent(link);

    expect(link).toContain(BASE);
    expect(decoded).toContain('Laptop HP 15');
    expect(decoded).toContain('Resumen de mi carrito');
  });

  it('incluye el total formateado en el mensaje', () => {
    const items = [makeCartItem()];
    const link = getCheckoutWhatsAppLink(items, 1_500_000);
    const decoded = decodeURIComponent(link);

    expect(decoded).toMatch(/1\.500\.000/);
  });

  it('numera cada producto del carrito', () => {
    const items = [
      makeCartItem({ id: 'a', title: 'Producto A' }),
      makeCartItem({ id: 'b', title: 'Producto B' }),
    ];
    const link = getCheckoutWhatsAppLink(items, 3_000_000);
    const decoded = decodeURIComponent(link);

    expect(decoded).toContain('1. *Producto A*');
    expect(decoded).toContain('2. *Producto B*');
  });

  it('incluye datos del comprador cuando se proporcionan', () => {
    const items = [makeCartItem()];
    const link = getCheckoutWhatsAppLink(items, 1_500_000, {
      name: 'Juan Pérez',
      city: 'Montería',
      paymentMethod: 'Nequi',
    });
    const decoded = decodeURIComponent(link);

    expect(decoded).toContain('Juan Pérez');
    expect(decoded).toContain('Montería');
    expect(decoded).toContain('Nequi');
    expect(decoded).toContain('Datos de entrega');
  });

  it('no incluye sección de datos si no se pasa comprador', () => {
    const items = [makeCartItem()];
    const link = getCheckoutWhatsAppLink(items, 1_500_000);
    const decoded = decodeURIComponent(link);

    expect(decoded).not.toContain('Datos de entrega');
  });

  it('funciona con carrito de un solo item', () => {
    const items = [makeCartItem({ quantity: 3 } as never)];
    const link = getCheckoutWhatsAppLink(items, 4_500_000);
    expect(link).toBeTruthy();
    expect(decodeURIComponent(link)).toContain('4.500.000');
  });
});
