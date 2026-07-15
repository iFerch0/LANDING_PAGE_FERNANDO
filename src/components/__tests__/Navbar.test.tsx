import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

beforeEach(() => {
  window.scrollY = 0;
});

describe('Navbar — Rendering', () => {
  it('renders the brand logo', () => {
    render(<Navbar />);
    expect(screen.getByAltText('Fernando Técnico')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Navbar />);
    expect(screen.getByRole('menuitem', { name: /Inicio/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Servicios/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Testimonios/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Sobre mí/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Contacto/ })).toBeInTheDocument();
  });

  it('renders WhatsApp CTA button', () => {
    render(<Navbar />);
    expect(screen.getByLabelText('Contactar por WhatsApp')).toBeInTheDocument();
  });

  it('renders mobile toggle button', () => {
    render(<Navbar />);
    const toggle = screen.getByLabelText('Abrir menú');
    expect(toggle).toBeInTheDocument();
  });
});

describe('Navbar — Mobile menu', () => {
  it('opens menu when toggle is clicked', () => {
    render(<Navbar />);
    const toggle = screen.getByLabelText('Abrir menú');
    fireEvent.click(toggle);
    expect(screen.getByLabelText('Cerrar menú')).toBeInTheDocument();
  });

  it('closes menu when toggle is clicked again', () => {
    render(<Navbar />);
    const toggle = screen.getByLabelText('Abrir menú');
    fireEvent.click(toggle);
    const closeToggle = screen.getByLabelText('Cerrar menú');
    fireEvent.click(closeToggle);
    expect(screen.getByLabelText('Abrir menú')).toBeInTheDocument();
  });

  it('updates aria-expanded when menu opens and closes', () => {
    render(<Navbar />);
    const toggle = screen.getByRole('button', { name: /Abrir menú/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(screen.getByRole('button', { name: /Cerrar menú/i }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes menu when Escape key is pressed', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Abrir menú'));
    expect(screen.getByLabelText('Cerrar menú')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByLabelText('Abrir menú')).toBeInTheDocument();
  });

  it('closes menu when clicking outside the navbar', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Abrir menú'));
    expect(screen.getByLabelText('Cerrar menú')).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(screen.getByLabelText('Abrir menú')).toBeInTheDocument();
  });
});

describe('Navbar — Scroll behavior', () => {
  it('adds scrolled class when page is scrolled', () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector('header');

    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    fireEvent.scroll(window);

    expect(header?.className).toContain('scrolled');
  });

  it('does not add scrolled class when scroll is minimal', () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector('header');

    Object.defineProperty(window, 'scrollY', { value: 10, writable: true });
    fireEvent.scroll(window);

    expect(header?.className).not.toContain('scrolled');
  });
});

describe('Navbar — Navigation', () => {
  it('closes mobile menu after clicking a nav link', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText('Abrir menú'));

    const serviciosLink = screen.getByText('Servicios');
    fireEvent.click(serviciosLink);

    expect(screen.getByLabelText('Abrir menú')).toBeInTheDocument();
  });

  it('scrolls to section when clicking anchor link', () => {
    const scrollIntoViewMock = jest.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const section = document.createElement('section');
    section.id = 'servicios';
    document.body.appendChild(section);

    render(<Navbar />);
    fireEvent.click(screen.getByText('Servicios'));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    document.body.removeChild(section);
  });
});
