import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CheckoutModal } from '../CheckoutModal';
import type { CartItem } from '@/store/cart';
import type { Product } from '@/lib/types';

// Mock del server action de Wompi
const mockCreateOrderAndSign = jest.fn();
jest.mock('@/app/tienda/checkout/actions', () => ({
  createOrderAndSign: (...args: unknown[]) => mockCreateOrderAndSign(...args),
}));

beforeEach(() => {
  mockCreateOrderAndSign.mockClear();
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

const fillStep1 = (name = 'Juan García', email = 'juan@test.com', city = 'Montería') => {
  fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: name } });
  fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: email } });
  fireEvent.change(screen.getByLabelText(/ciudad de entrega/i), { target: { value: city } });
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

  it('muestra el título "Datos de entrega" en el paso 1', () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByText('Datos de entrega')).toBeInTheDocument();
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

  it('renderiza los cuatro campos del formulario', () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ciudad de entrega/i)).toBeInTheDocument();
    // Phone field with optional label
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
  });

  it('muestra el botón "Continuar al pago"', () => {
    render(<CheckoutModal {...defaultProps} />);
    expect(screen.getByRole('button', { name: /continuar al pago/i })).toBeInTheDocument();
  });

  it('muestra errores de validación al enviar vacío', async () => {
    render(<CheckoutModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /continuar al pago/i }));

    await waitFor(() => {
      expect(screen.getByText(/nombre debe tener/i)).toBeInTheDocument();
      expect(screen.getByText(/email válido/i)).toBeInTheDocument();
      expect(screen.getByText(/ciudad debe tener/i)).toBeInTheDocument();
    });
  });

  it('no llama al server action si el formulario está incompleto', async () => {
    render(<CheckoutModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /continuar al pago/i }));
    await waitFor(() => expect(mockCreateOrderAndSign).not.toHaveBeenCalled());
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

  it('llama a createOrderAndSign al enviar formulario completo', async () => {
    mockCreateOrderAndSign.mockResolvedValue({
      reference: 'FT-test-123',
      amountInCents: 150000000,
      publicKey: 'pub_test_xxx',
      signature: 'sha256hash',
      acceptanceToken: 'token',
      redirectUrl: 'http://localhost:3000/tienda/pedido?ref=FT-test-123',
    });

    render(<CheckoutModal {...defaultProps} />);
    fillStep1();
    fireEvent.click(screen.getByRole('button', { name: /continuar al pago/i }));

    await waitFor(() => {
      expect(mockCreateOrderAndSign).toHaveBeenCalledTimes(1);
      const [formData] = mockCreateOrderAndSign.mock.calls[0];
      expect(formData.name).toBe('Juan García');
      expect(formData.email).toBe('juan@test.com');
      expect(formData.city).toBe('Montería');
    });
  });

  it('avanza al paso 2 cuando createOrderAndSign resuelve correctamente', async () => {
    mockCreateOrderAndSign.mockResolvedValue({
      reference: 'FT-test-123',
      amountInCents: 150000000,
      publicKey: 'pub_test_xxx',
      signature: 'sha256hash',
      acceptanceToken: 'token',
      redirectUrl: 'http://localhost:3000/tienda/pedido?ref=FT-test-123',
    });

    render(<CheckoutModal {...defaultProps} />);
    fillStep1();
    fireEvent.click(screen.getByRole('button', { name: /continuar al pago/i }));

    await waitFor(() => {
      expect(screen.getByText('Completar pago')).toBeInTheDocument();
      expect(screen.getByText(/Ref: FT-test-123/)).toBeInTheDocument();
    });
  });

  it('muestra error del servidor si createOrderAndSign lanza una excepción', async () => {
    mockCreateOrderAndSign.mockRejectedValue(new Error('Error de red'));

    render(<CheckoutModal {...defaultProps} />);
    fillStep1();
    fireEvent.click(screen.getByRole('button', { name: /continuar al pago/i }));

    await waitFor(() => {
      expect(screen.getByText(/error al procesar tu pedido/i)).toBeInTheDocument();
    });
  });
});
