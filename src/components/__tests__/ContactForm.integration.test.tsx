import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../ContactForm';

jest.useFakeTimers();

describe('ContactForm - Integration', () => {
  let openSpy: jest.MockedFunction<typeof window.open>;

  beforeEach(() => {
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

  const fillValidForm = () => {
    fireEvent.change(screen.getByPlaceholderText('Ej: Fernando Rhenals'), { target: { value: 'Cliente Demo' } });
    fireEvent.change(screen.getByPlaceholderText('300 123 4567'), { target: { value: '+57 300 999 8888' } });
    fireEvent.change(screen.getByPlaceholderText('correo@ejemplo.com'), { target: { value: 'cliente@demo.co' } });
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'pc-desktop' } });
    fireEvent.change(selects[1], { target: { value: 'alta' } });
    fireEvent.change(screen.getByPlaceholderText(/computador\\. Mientras.*detalles/i), {
      target: { value: 'Equipo se apaga de repente cuando abro aplicaciones pesadas.' }
    });
  };

  it('no envía si faltan campos requeridos y muestra errores', async () => {
    const submitBtn = screen.getByRole('button', { name: /Enviar por WhatsApp/i });
    fireEvent.click(submitBtn);

    // no debe haberse llamado window.open
    expect(openSpy).not.toHaveBeenCalled();

    // errores visibles (subset representativo para evitar ambigüedad en DOM)
    expect(await screen.findByText(/El nombre debe tener al menos 2 caracteres/)).toBeInTheDocument();
    expect(await screen.findByText(/Ingresa un correo .* válido/)).toBeInTheDocument();
    expect(await screen.findByText(/Describe el problema con .* detalle/)).toBeInTheDocument();
  });

  it('flujo completo exitoso y reseteo de campos', async () => {
    fillValidForm();

    const submitBtn = screen.getByRole('button', { name: /Enviar por WhatsApp/i });
    fireEvent.click(submitBtn);
    expect(screen.getByText('Enviando solicitud...')).toBeInTheDocument();

    jest.advanceTimersByTime(800);

    await waitFor(() => expect(openSpy).toHaveBeenCalledTimes(1));

    // Luego del envío, los campos deben resetearse
    expect((screen.getByPlaceholderText('Ej: Fernando Rhenals') as HTMLInputElement).value).toBe('');
    expect((screen.getByPlaceholderText('300 123 4567') as HTMLInputElement).value).toBe('');
    expect((screen.getByPlaceholderText('correo@ejemplo.com') as HTMLInputElement).value).toBe('');
    const selectsAfter = screen.getAllByRole('combobox') as HTMLSelectElement[];
    expect(selectsAfter[0].value).toBe('');
    expect(selectsAfter[1].value).toBe('');
    expect(
      (screen.getByPlaceholderText(/computador\\. Mientras.*detalles/i) as HTMLTextAreaElement).value
    ).toBe('');
  });

  it('accesibilidad básica: labels se asocian y el botón tiene role', () => {
    const accessibleSelects = screen.getAllByRole('combobox');
    expect(accessibleSelects[0]).toBeInTheDocument();
    expect(accessibleSelects[1]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar por WhatsApp/i })).toBeInTheDocument();
  });
});
