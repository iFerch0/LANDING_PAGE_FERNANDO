import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    const texts = screen.getAllByText(/Fernando Rhenals/i);
    expect(texts.length).toBeGreaterThan(0);
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/300 847 4121/i)).toBeInTheDocument();
    expect(screen.getByText(/Montería, Córdoba/i)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
