import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero Component', () => {
  it('renders hero title correctly', () => {
    render(<Hero />);

    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Lo arreglamos/i);
  });

  it('displays contact buttons', () => {
    render(<Hero />);

    const whatsappButton = screen.getByText(/Respuesta en minutos/i);
    const phoneButton = screen.getByText(/Lun-Vie 8AM-6PM/i);

    expect(whatsappButton).toBeInTheDocument();
    expect(phoneButton).toBeInTheDocument();
  });

  it('shows hero statistics', () => {
    render(<Hero />);

    expect(screen.getByText(/PCs Reparadas/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Garantía/i).length).toBeGreaterThan(0);
  });
});
