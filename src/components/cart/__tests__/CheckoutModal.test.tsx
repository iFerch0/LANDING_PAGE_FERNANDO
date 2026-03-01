import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CheckoutModal } from '../CheckoutModal';
import type { CartItem } from '@/store/cart';
import type { Product } from '@/lib/types';

const mockWindowOpen = jest.fn();
beforeAll(() => {
  Object.defineProperty(window, 'open', { value: mockWindowOpen, writable: true });
});
beforeEach(() => {
  mockWindowOpen.mockClear();
});

const makeItem = (overrides: Partial<Product> = {}): CartItem => ({
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

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  items: [makeItem()],
  total: 1_500_000,
};

const fillAndSubmit = (name = 'Juan García', city = 'Montería', payment = 'Contra-entrega') => {
  fireEvent.change(screen.getByLabelText(/tu nombre/i), { target: { value: name } });
  fireEvent.change(screen.getByLabelText(/ciudad de entrega/i), { target: { value: city } });
  fireEvent.click(screen.getByText(payment));
  fireEvent.click(screen.getByRole('button', { name: /enviar pedido/i }));
};

describe('CheckoutModal', () => {
  it('no renderiza nada cuando isOpen es false', () => {
    render(<CheckoutModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('muestra el modal cuando isOpen es true', () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('muestra el título del modal', () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByText('Confirmar pedido')).toBeInTheDocument();
  });

  it('muestra el resumen con 1 producto', () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByText(/1 producto/)).toBeInTheDocument();
  });

  it('muestra el total formateado en el resumen', () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByText(/1\.500\.000/)).toBeInTheDocument();
  });

  it('muestra plural para múltiples productos', () => {
    const props = {
      ...defaultProps,
      items: [makeItem({ id: 'a' }), makeItem({ id: 'b' })],
      total: 3_000_000,
    };
    render(<CheckoutModal {...props} />);
    expect(screen.getByText(/2 productos/)).toBeInTheDocument();
  });

  it('renderiza los tres campos del formulario', () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByLabelText(/tu nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ciudad de entrega/i)).toBeInTheDocument();
    expect(screen.getByText(/método de pago/i)).toBeInTheDocument();
  });

  it('renderiza las 4 opciones de pago', () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByText('Contra-entrega')).toBeInTheDocument();
    expect(screen.getByText('Nequi / Daviplata')).toBeInTheDocument();
    expect(screen.getByText('Efectivo en taller')).toBeInTheDocument();
    expect(screen.getByText('Transferencia bancaria')).toBeInTheDocument();
  });

  it('muestra errores de validación al enviar vacío', async () => {
    render(<CheckoutModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /enviar pedido/i }));

    await waitFor(() => {
      expect(screen.getByText('Ingresa tu nombre')).toBeInTheDocument();
      expect(screen.getByText('Ingresa tu ciudad')).toBeInTheDocument();
      expect(screen.getByText('Selecciona un método de pago')).toBeInTheDocument();
    });
  });

  it('no abre WA si el formulario está incompleto', async () => {
    render(<CheckoutModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /enviar pedido/i }));
    await waitFor(() => expect(mockWindowOpen).not.toHaveBeenCalled());
  });

  it('cierra el modal al hacer clic en el botón X', () => {
    const onClose = jest.fn();
    render(<CheckoutModal {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /cerrar/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('cierra el modal al hacer clic en el backdrop', () => {
    const onClose = jest.fn();
    render(<CheckoutModal {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('abre WA al enviar formulario completo', async () => {
    render(<CheckoutModal {...defaultProps} />);
    fillAndSubmit('Juan García', 'Montería', 'Nequi / Daviplata');

    await waitFor(() => {
      expect(mockWindowOpen).toHaveBeenCalledTimes(1);
      const [url, target] = mockWindowOpen.mock.calls[0];
      expect(url).toContain('wa.me');
      expect(decodeURIComponent(url)).toContain('Juan García');
      expect(decodeURIComponent(url)).toContain('Montería');
      expect(decodeURIComponent(url)).toContain('Nequi / Daviplata');
      expect(target).toBe('_blank');
    });
  });

  it('llama a onClose después de enviar el pedido', async () => {
    const onClose = jest.fn();
    render(<CheckoutModal {...defaultProps} onClose={onClose} />);
    fillAndSubmit();

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
