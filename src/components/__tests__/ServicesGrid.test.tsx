import { render, screen } from '@testing-library/react';
import ServicesGrid from '../ServicesGrid';

describe('ServicesGrid Component', () => {
  it('renders services title', () => {
    render(<ServicesGrid />);
    expect(screen.getByText('¿Qué necesita tu computador?')).toBeInTheDocument();
  });

  it('renders service cards correctly', () => {
    render(<ServicesGrid />);
    expect(screen.getByText('Mantenimiento Preventivo')).toBeInTheDocument();
    expect(screen.getByText('Reparación de Hardware')).toBeInTheDocument();
    expect(screen.getByText('Recuperación de Datos')).toBeInTheDocument();
  });

  it('shows price from labels', () => {
    render(<ServicesGrid />);
    const fromLabels = screen.getAllByText('Desde');
    expect(fromLabels.length).toBeGreaterThan(0);
  });

  it('matches snapshot', () => {
    const { container } = render(<ServicesGrid />);
    expect(container).toMatchSnapshot();
  });
});
