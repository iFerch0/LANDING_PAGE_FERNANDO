import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageZoom from '../ImageZoom';

describe('ImageZoom Component', () => {
  const sampleSrc = '/img/equipos-segunda/EQ-GAMER-01/1.jpg';
  const sampleAlt = 'Torre Gamer I9 10850K';

  it('renders image and loupe badge button', () => {
    render(<ImageZoom src={sampleSrc} alt={sampleAlt} />);

    const img = screen.getByRole('img', { name: sampleAlt });
    expect(img).toBeInTheDocument();

    const loupeBtn = screen.getByRole('button', { name: /Activar lupa de aumento/i });
    expect(loupeBtn).toBeInTheDocument();
    expect(screen.getByText('Lupa')).toBeInTheDocument();
  });

  it('toggles zoom state when clicking the loupe badge', () => {
    render(<ImageZoom src={sampleSrc} alt={sampleAlt} zoomScale={2.5} />);

    const loupeBtn = screen.getByRole('button', { name: /Activar lupa de aumento/i });
    fireEvent.click(loupeBtn);

    expect(screen.getByText('2.5x')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Desactivar lupa/i })).toBeInTheDocument();

    fireEvent.click(loupeBtn);
    expect(screen.getByText('Lupa')).toBeInTheDocument();
  });

  it('activates zoom on mouse enter and mouse move, deactivates on mouse leave', () => {
    render(<ImageZoom src={sampleSrc} alt={sampleAlt} />);

    const container = screen.getByRole('region', { name: new RegExp(sampleAlt, 'i') });

    // Mock getBoundingClientRect
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 400,
      height: 400,
      right: 400,
      bottom: 400,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    fireEvent.mouseEnter(container);
    expect(screen.getByText('2.2x')).toBeInTheDocument();

    fireEvent.mouseMove(container, { clientX: 200, clientY: 100 });
    expect(screen.getByText('2.2x')).toBeInTheDocument();

    fireEvent.mouseLeave(container);
    expect(screen.getByText('Lupa')).toBeInTheDocument();
  });
});
