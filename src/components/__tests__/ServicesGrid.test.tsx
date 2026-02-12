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

  it('shows duration info', () => {
    render(<ServicesGrid />);
    expect(screen.getByText('Mismo día')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<ServicesGrid />);
    expect(container).toMatchSnapshot();
  });
});
