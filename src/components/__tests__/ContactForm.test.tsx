import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../ContactForm';

// Use fake timers for the simulated API delay (800ms)
jest.useFakeTimers();

describe('ContactForm - Unit Tests', () => {
  let openSpy: jest.MockedFunction<typeof window.open>;

  const getProblemField = () => screen.getByPlaceholderText(/computador\\. Mientras.*detalles/i);

  const fillValidForm = () => {
    fireEvent.change(screen.getByPlaceholderText('Ej: Fernando Rhenals'), { target: { value: 'Fernando Rhenals' } });
    fireEvent.change(screen.getByPlaceholderText('300 123 4567'), { target: { value: '+57 300 123 4567' } });
    fireEvent.change(screen.getByPlaceholderText('correo@ejemplo.com'), { target: { value: 'test@example.com' } });

    const selects = screen.getAllByRole('combobox');
    // 0: deviceType, 1: urgency
    fireEvent.change(selects[0], { target: { value: 'laptop' } });
    fireEvent.change(selects[1], { target: { value: 'media' } });

    fireEvent.change(getProblemField(), {
      target: { value: 'Mi PC se reinicia constantemente después de unos minutos de uso.' }
    });
  };

  beforeEach(() => {
    // Mock window.open
    openSpy = jest.fn<typeof window.open>();
    Object.defineProperty(window, 'open', {
      writable: true,
      configurable: true,
      value: openSpy
    });

    render(<ContactForm />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('muestra errores de validación en campos obligatorios al perder foco', async () => {
    // name
    const nameInput = screen.getByPlaceholderText('Ej: Fernando Rhenals');
    fireEvent.blur(nameInput);
    expect(await screen.findByText(/El nombre debe tener al menos 2 caracteres/)).toBeInTheDocument();

    // phone
    const phoneInput = screen.getByPlaceholderText('300 123 4567');
    fireEvent.blur(phoneInput);
    expect(await screen.findByText(/Ingresa un número de teléfono válido/)).toBeInTheDocument();

    // email
    const emailInput = screen.getByPlaceholderText('correo@ejemplo.com');
    fireEvent.blur(emailInput);
    expect(await screen.findByText(/Ingresa un correo .* válido/)).toBeInTheDocument();

    // deviceType
    const selectsOnBlur = screen.getAllByRole('combobox');
    fireEvent.blur(selectsOnBlur[0]);
    expect(await screen.findByText(/Selecciona el tipo de equipo/)).toBeInTheDocument();

    // urgency
    fireEvent.blur(selectsOnBlur[1]);
    expect(await screen.findByText(/Selecciona el nivel de urgencia/)).toBeInTheDocument();

    // problem
    const problemTextarea = getProblemField();
    fireEvent.blur(problemTextarea);
    expect(await screen.findByText(/Describe el problema con .* detalle/)).toBeInTheDocument();
  });

  it('valida formato de email inválido', () => {
    const emailInput = screen.getByPlaceholderText('correo@ejemplo.com');
    fireEvent.change(emailInput, { target: { value: 'invalido@' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText(/Ingresa un correo .* válido/)).toBeInTheDocument();
  });

  it('actualiza contador de caracteres del problema', () => {
    fireEvent.change(getProblemField(), { target: { value: '12345' } });
    expect(screen.getByText('5/500')).toBeInTheDocument();
  });

  it('envía el formulario correctamente y llama a window.open con WhatsApp', async () => {
    fillValidForm();

    const submitBtn = screen.getByRole('button', { name: /Enviar por WhatsApp/i });
    fireEvent.click(submitBtn);

    // Botón entra en estado de envío
    expect(await screen.findByText('Enviando solicitud...')).toBeInTheDocument();

    // Avanzar el tiempo del "fake" delay de 800ms
    jest.advanceTimersByTime(800);

    await waitFor(() => {
      expect(openSpy).toHaveBeenCalledTimes(1);
      const url = openSpy.mock.calls[0]?.[0];
      expect(typeof url === 'string' || url instanceof URL).toBe(true);
      const formattedUrl = url instanceof URL ? url.toString() : url ?? '';
      expect(formattedUrl).toContain('https://wa.me/573008474121');
      const parsed = new URL(formattedUrl);
      const textParam = parsed.searchParams.get('text');
      expect(textParam).toBeTruthy();
      const decoded = decodeURIComponent(textParam ?? '');
      expect(decoded).toContain('NUEVA SOLICITUD DE SERVICIO TÉCNICO');
      expect(decoded).toContain('Cliente:');
    });
  });

  it('limpia errores al escribir nuevamente', async () => {
    const nameInput = screen.getByPlaceholderText('Ej: Fernando Rhenals');
    fireEvent.blur(nameInput);
    expect(screen.getByText(/El nombre debe tener al menos 2 caracteres/)).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'Fe' } });
    await waitFor(() => {
      expect(screen.queryByText(/El nombre debe tener al menos 2 caracteres/)).not.toBeInTheDocument();
    });
  });
});
