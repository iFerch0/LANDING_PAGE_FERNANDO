import { render, screen } from '@testing-library/react';
import Features from '../Features';

describe('Features Component', () => {
  it('renders section title', () => {
    render(<Features />);
    expect(screen.getByText(/Por qué elegir/i)).toBeInTheDocument();
  });

  it('renders feature items', () => {
    render(<Features />);
    expect(screen.getByText(/Servicio Completo/i)).toBeInTheDocument();
    expect(screen.getByText(/Garantía Total/i)).toBeInTheDocument();
    expect(screen.getByText(/Atención en Taller/i)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Features />);
    expect(container).toMatchSnapshot();
  });
});
