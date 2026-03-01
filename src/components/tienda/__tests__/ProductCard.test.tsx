import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';
import type { Product } from '@/lib/types';

const mockProduct: Product = {
  id: '1',
  title: 'Laptop HP 15-dy2021la',
  slug: 'laptop-hp-15-dy2021la',
  description: 'Laptop HP con procesador Intel Core i5 de 11va generación',
  price: 1850000,
  category: 'Computadores',
  brand: 'HP',
  model: '15-dy2021la',
  stock: 5,
  status: 'nuevo',
  availability: true,
  images: ['/test-image.jpg'],
  specs: {
    procesador: 'Intel Core i5-1135G7',
    ram: '8GB DDR4',
    almacenamiento: '256GB SSD',
    pantalla: '15.6" HD',
  },
  payment_methods: ['Efectivo', 'Transferencia', 'Nequi'],
  warranty: '1 año',
  views: 0,
  whatsapp_clicks: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

beforeEach(() => {
  useCartStore.setState({ items: [] });
  useFavoritesStore.setState({ ids: [] });
});

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });

  it('displays product price in COP format', () => {
    render(<ProductCard product={mockProduct} />);
    // formatPrice renders as "$ 1.850.000" — no separate "COP" label in ProductCard
    expect(screen.getByText(/1\.850\.000/)).toBeInTheDocument();
  });

  it('shows availability status', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Disponible')).toBeInTheDocument();
  });

  it('displays status badge', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('⭐ NUEVO')).toBeInTheDocument();
  });

  it('shows low stock warning when stock is 3 or less', () => {
    const lowStockProduct = { ...mockProduct, stock: 2 };
    render(<ProductCard product={lowStockProduct} />);
    expect(screen.getByText('⚠️ Últimas unidades')).toBeInTheDocument();
  });

  it('shows out of stock overlay when not available', () => {
    const unavailableProduct = { ...mockProduct, availability: false };
    render(<ProductCard product={unavailableProduct} />);
    const agotadoElements = screen.getAllByText('Agotado');
    expect(agotadoElements.length).toBeGreaterThan(0);
  });

  it('agrega el producto al carrito al hacer clic en el botón de carrito', () => {
    render(<ProductCard product={mockProduct} />);
    const cartBtn = screen.getByRole('button', { name: /agregar al carrito/i });
    fireEvent.click(cartBtn);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].product.id).toBe(mockProduct.id);
  });

  it('el botón de carrito está deshabilitado cuando el producto está agotado', () => {
    const unavailableProduct = { ...mockProduct, availability: false };
    render(<ProductCard product={unavailableProduct} />);
    const cartBtn = screen.getByRole('button', { name: /agregar al carrito/i });
    expect(cartBtn).toBeDisabled();
  });

  it('muestra los botones de compartir', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByRole('button', { name: /compartir en whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /compartir en facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copiar enlace/i })).toBeInTheDocument();
  });

  it('renderiza enlace a la página de detalle del producto', () => {
    render(<ProductCard product={mockProduct} />);
    const links = screen.getAllByRole('link');
    const detailLinks = links.filter((l) => l.getAttribute('href')?.includes(mockProduct.slug));
    expect(detailLinks.length).toBeGreaterThan(0);
  });

  it('muestra la categoría del producto', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
  });

  it('el botón de favoritos siempre se renderiza y togglea el store al hacer clic', () => {
    render(<ProductCard product={mockProduct} />);
    const favBtn = screen.getByRole('button', { name: /agregar a favoritos/i });
    expect(favBtn).toBeInTheDocument();

    fireEvent.click(favBtn);
    expect(useFavoritesStore.getState().ids).toContain(mockProduct.id);

    // Segundo clic — quita de favoritos
    fireEvent.click(favBtn);
    expect(useFavoritesStore.getState().ids).not.toContain(mockProduct.id);
  });
});
