import { useCartStore } from '../cart';
import type { Product } from '@/lib/types';

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 'prod-1',
  title: 'Laptop HP 15',
  slug: 'laptop-hp-15',
  description: 'Laptop de prueba',
  price: 1_500_000,
  category: 'Computadores',
  brand: 'HP',
  model: '15-dy2021',
  stock: 5,
  status: 'nuevo',
  availability: true,
  images: ['/test.jpg'],
  specs: {},
  payment_methods: ['Efectivo'],
  warranty: '1 año',
  views: 0,
  whatsapp_clicks: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

beforeEach(() => {
  useCartStore.setState({ items: [] });
  localStorage.clear();
});

describe('useCartStore — addItem', () => {
  it('agrega un producto nuevo al carrito', () => {
    const product = makeProduct();
    useCartStore.getState().addItem(product, 1);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].product.id).toBe('prod-1');
    expect(items[0].quantity).toBe(1);
  });

  it('incrementa la cantidad si el producto ya existe', () => {
    const product = makeProduct();
    useCartStore.getState().addItem(product, 1);
    useCartStore.getState().addItem(product, 2);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it('no excede el stock disponible al agregar', () => {
    const product = makeProduct({ stock: 3 });
    useCartStore.getState().addItem(product, 10);

    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(3);
  });

  it('no excede el stock al incrementar un producto existente', () => {
    const product = makeProduct({ stock: 3 });
    useCartStore.getState().addItem(product, 2);
    useCartStore.getState().addItem(product, 5); // 2 + 5 = 7, but max is 3

    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(3);
  });

  it('agrega múltiples productos distintos', () => {
    const p1 = makeProduct({ id: 'a', title: 'Laptop' });
    const p2 = makeProduct({ id: 'b', title: 'Mouse' });
    useCartStore.getState().addItem(p1, 1);
    useCartStore.getState().addItem(p2, 2);

    expect(useCartStore.getState().items).toHaveLength(2);
  });
});

describe('useCartStore — removeItem', () => {
  it('elimina un producto del carrito por id', () => {
    const product = makeProduct();
    useCartStore.getState().addItem(product, 1);
    useCartStore.getState().removeItem('prod-1');

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('no falla si el producto no existe', () => {
    useCartStore.getState().removeItem('no-existe');
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('solo elimina el producto indicado, no los demás', () => {
    const p1 = makeProduct({ id: 'a' });
    const p2 = makeProduct({ id: 'b' });
    useCartStore.getState().addItem(p1, 1);
    useCartStore.getState().addItem(p2, 1);
    useCartStore.getState().removeItem('a');

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].product.id).toBe('b');
  });
});

describe('useCartStore — updateQuantity', () => {
  it('actualiza la cantidad de un producto', () => {
    const product = makeProduct();
    useCartStore.getState().addItem(product, 1);
    useCartStore.getState().updateQuantity('prod-1', 4);

    expect(useCartStore.getState().items[0].quantity).toBe(4);
  });

  it('no permite bajar de 1', () => {
    const product = makeProduct();
    useCartStore.getState().addItem(product, 2);
    useCartStore.getState().updateQuantity('prod-1', 0);

    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it('no permite superar el stock al actualizar', () => {
    const product = makeProduct({ stock: 3 });
    useCartStore.getState().addItem(product, 1);
    useCartStore.getState().updateQuantity('prod-1', 99);

    expect(useCartStore.getState().items[0].quantity).toBe(3);
  });

  it('solo actualiza el item indicado cuando hay varios en el carrito', () => {
    const p1 = makeProduct({ id: 'a', price: 100_000 });
    const p2 = makeProduct({ id: 'b', price: 200_000 });
    useCartStore.getState().addItem(p1, 1);
    useCartStore.getState().addItem(p2, 1);
    useCartStore.getState().updateQuantity('a', 3);

    const { items } = useCartStore.getState();
    const itemA = items.find((i) => i.product.id === 'a');
    const itemB = items.find((i) => i.product.id === 'b');
    expect(itemA?.quantity).toBe(3);
    expect(itemB?.quantity).toBe(1); // no debe cambiar
  });
});

describe('useCartStore — clearCart', () => {
  it('limpia todos los productos del carrito', () => {
    const p1 = makeProduct({ id: 'a' });
    const p2 = makeProduct({ id: 'b' });
    useCartStore.getState().addItem(p1, 1);
    useCartStore.getState().addItem(p2, 2);
    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});

describe('useCartStore — getTotalItems', () => {
  it('retorna 0 cuando el carrito está vacío', () => {
    expect(useCartStore.getState().getTotalItems()).toBe(0);
  });

  it('suma las cantidades de todos los items', () => {
    const p1 = makeProduct({ id: 'a' });
    const p2 = makeProduct({ id: 'b' });
    useCartStore.getState().addItem(p1, 2);
    useCartStore.getState().addItem(p2, 3);

    expect(useCartStore.getState().getTotalItems()).toBe(5);
  });
});

describe('useCartStore — getTotalPrice', () => {
  it('retorna 0 cuando el carrito está vacío', () => {
    expect(useCartStore.getState().getTotalPrice()).toBe(0);
  });

  it('calcula el precio total correctamente', () => {
    const p1 = makeProduct({ id: 'a', price: 1_000_000 });
    const p2 = makeProduct({ id: 'b', price: 500_000 });
    useCartStore.getState().addItem(p1, 2); // 2_000_000
    useCartStore.getState().addItem(p2, 1); // 500_000

    expect(useCartStore.getState().getTotalPrice()).toBe(2_500_000);
  });

  it('refleja cambios de cantidad en el total', () => {
    const product = makeProduct({ price: 300_000 });
    useCartStore.getState().addItem(product, 1);
    useCartStore.getState().updateQuantity('prod-1', 3);

    expect(useCartStore.getState().getTotalPrice()).toBe(900_000);
  });
});
