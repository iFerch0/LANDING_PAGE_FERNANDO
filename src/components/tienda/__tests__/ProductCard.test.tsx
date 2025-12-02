import { render, screen } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
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

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });

  it('displays product price in COP format', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/1\.850\.000/)).toBeInTheDocument();
    expect(screen.getByText('COP')).toBeInTheDocument();
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
    expect(screen.getByText('Agotado')).toBeInTheDocument();
  });
});
