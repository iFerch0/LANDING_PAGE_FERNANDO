import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  it('renders navbar logo', () => {
    render(<Navbar />);
    const logo = screen.getByAltText('Fernando Técnico');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});
