import { render, screen } from '@testing-library/react';
import AboutFernando from '../AboutFernando';
import { specialties } from '../../data/about';

describe('AboutFernando', () => {
  it('renders name and role', () => {
    render(<AboutFernando />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Fernando\s+Rhenals/);
    expect(screen.getByText(/Ingeniero de Sistemas/)).toBeInTheDocument();
  });

  it('renders all specialties', () => {
    render(<AboutFernando />);
    specialties.forEach((specialty) => {
      expect(screen.getByText(specialty)).toBeInTheDocument();
    });
  });

  it('renders values with icons', () => {
    render(<AboutFernando />);
    expect(screen.getByText('Metodología profesional')).toBeInTheDocument();
    expect(screen.getByText('Entregas por fases')).toBeInTheDocument();
    expect(screen.getByText('Resultados medibles')).toBeInTheDocument();
  });

  it('renders WhatsApp CTA with correct link', () => {
    render(<AboutFernando />);
    const cta = screen.getByText('Hablemos de tu proyecto').closest('a');
    expect(cta).toHaveAttribute('href', expect.stringContaining('wa.me'));
    expect(cta).toHaveAttribute('target', '_blank');
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders profile image with descriptive alt text', () => {
    render(<AboutFernando />);
    const img = screen.getByAltText(/Fernando Rhenals/);
    expect(img).toBeInTheDocument();
  });
});
