import { render, screen } from '@testing-library/react';
import ContactForm from '../ContactForm';

describe('ContactForm Component', () => {
  it('renders the form title', () => {
    render(<ContactForm />);
    // Title is split: h2 + titleAccent span
    expect(screen.getByRole('heading', { name: /cuéntame/i })).toBeInTheDocument();
  });

  it('renders input fields', () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText(/Tu nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/300 123 4567/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Cuéntame qué problema/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /Enviar por WhatsApp/i })).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<ContactForm />);
    expect(container).toMatchSnapshot();
  });
});
