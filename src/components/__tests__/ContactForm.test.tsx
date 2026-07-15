import { render, screen, fireEvent, act } from '@testing-library/react';
import ContactForm from '../ContactForm';

const openMock = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  openMock.mockClear();
  window.open = openMock;
});

afterEach(() => {
  jest.useRealTimers();
});

function renderForm() {
  return render(<ContactForm />);
}

function getNameInput() {
  return screen.getByLabelText('Nombre completo *');
}

function getPhoneInput() {
  return screen.getByLabelText('WhatsApp *');
}

function getServiceSelect() {
  return screen.getByLabelText(/Qué servicio necesitas/);
}

function getDeviceSelect() {
  return screen.getByLabelText('Tipo de equipo *');
}

function getUrgencySelect() {
  return screen.getByLabelText('Urgencia *');
}

function getProblemTextarea() {
  return screen.getByLabelText(/Qué está pasando/);
}

function getNextButton() {
  const buttons = screen.getAllByRole('button', { name: /Siguiente/i });
  return (
    buttons.find(
      (btn) => !btn.hasAttribute('disabled') && btn.closest('[class*="stepPanelActive"]')
    ) || buttons[0]
  );
}

function getBackButton() {
  const buttons = screen.getAllByRole('button', { name: /Atrás/i });
  return buttons.find((btn) => btn.closest('[class*="stepPanelActive"]')) || buttons[0];
}

function getSubmitButton() {
  return screen.getByRole('button', { name: /Enviar por WhatsApp/i });
}

function fillStep0(name: string, phone: string) {
  fireEvent.change(getNameInput(), { target: { value: name, name: 'name' } });
  fireEvent.change(getPhoneInput(), { target: { value: phone, name: 'phone' } });
}

function fillStep1(service: string, deviceType: string, urgency: string) {
  fireEvent.change(getServiceSelect(), { target: { value: service, name: 'service' } });
  fireEvent.change(getDeviceSelect(), { target: { value: deviceType, name: 'deviceType' } });
  fireEvent.change(getUrgencySelect(), { target: { value: urgency, name: 'urgency' } });
}

function fillStep2(problem: string) {
  fireEvent.change(getProblemTextarea(), { target: { value: problem, name: 'problem' } });
}

describe('ContactForm — Rendering', () => {
  it('renders the form heading', () => {
    renderForm();
    expect(screen.getByRole('heading', { name: /Cuéntame/i })).toBeInTheDocument();
  });

  it('renders step 0 fields', () => {
    renderForm();
    expect(getNameInput()).toBeInTheDocument();
    expect(getPhoneInput()).toBeInTheDocument();
  });

  it('renders the Siguiente button on step 0', () => {
    renderForm();
    expect(getNextButton()).toBeInTheDocument();
  });
});

describe('ContactForm — Step 0 validation', () => {
  it('shows errors when trying to advance with empty fields', () => {
    renderForm();
    fireEvent.click(getNextButton());
    expect(screen.getByText(/El nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/Ingresa un número válido/i)).toBeInTheDocument();
  });

  it('does not advance to step 1 when fields are invalid', () => {
    renderForm();
    fireEvent.click(getNextButton());
    const activePanel = document.querySelector('[class*="stepPanelActive"]');
    expect(activePanel?.querySelector('h3')?.textContent).toContain('Información Personal');
  });

  it('shows error for short name', () => {
    renderForm();
    fireEvent.change(getNameInput(), { target: { value: 'A', name: 'name' } });
    fireEvent.click(getNextButton());
    expect(screen.getByText(/El nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();
  });

  it('advances to step 1 with valid data', () => {
    renderForm();
    fillStep0('Fernando', '3001234567');
    fireEvent.click(getNextButton());
    expect(screen.getByText(/Detalles del Servicio/i)).toBeInTheDocument();
  });
});

describe('ContactForm — Phone validation', () => {
  it('rejects phone with fewer than 10 digits', () => {
    renderForm();
    fillStep0('Fernando', '12345');
    fireEvent.click(getNextButton());
    expect(screen.getByText(/Ingresa un número válido/i)).toBeInTheDocument();
  });

  it('rejects phone with letters', () => {
    renderForm();
    fillStep0('Fernando', 'abcdefghij');
    fireEvent.click(getNextButton());
    expect(screen.getByText(/Ingresa un número válido/i)).toBeInTheDocument();
  });

  it('accepts phone with 10 digits', () => {
    renderForm();
    fillStep0('Fernando', '3001234567');
    fireEvent.click(getNextButton());
    expect(screen.queryByText(/Ingresa un número válido/i)).not.toBeInTheDocument();
  });

  it('accepts phone with country code', () => {
    renderForm();
    fillStep0('Fernando', '+57 300 123 4567');
    fireEvent.click(getNextButton());
    expect(screen.queryByText(/Ingresa un número válido/i)).not.toBeInTheDocument();
  });
});

describe('ContactForm — Step 1 validation', () => {
  function advanceToStep1() {
    renderForm();
    fillStep0('Fernando', '3001234567');
    fireEvent.click(getNextButton());
  }

  it('shows errors when trying to advance without selecting options', () => {
    advanceToStep1();
    fireEvent.click(getNextButton());
    const errorSpans = document.querySelectorAll('[class*="errorText"]');
    const errorTexts = Array.from(errorSpans).map((el) => el.textContent);
    expect(errorTexts.some((t) => t?.includes('Selecciona un servicio'))).toBe(true);
    expect(errorTexts.some((t) => t?.includes('Selecciona el tipo de equipo'))).toBe(true);
    expect(errorTexts.some((t) => t?.includes('Selecciona la urgencia'))).toBe(true);
  });

  it('advances to step 2 with valid selections', () => {
    advanceToStep1();
    fillStep1('reparacion', 'laptop', 'alta');
    fireEvent.click(getNextButton());
    expect(screen.getByText(/Describe tu problema/i)).toBeInTheDocument();
  });
});

describe('ContactForm — Step 2 validation', () => {
  function advanceToStep2() {
    renderForm();
    fillStep0('Fernando', '3001234567');
    fireEvent.click(getNextButton());
    fillStep1('reparacion', 'laptop', 'alta');
    fireEvent.click(getNextButton());
  }

  it('shows error when problem description is too short', () => {
    advanceToStep2();
    fireEvent.change(getProblemTextarea(), { target: { value: 'Corto', name: 'problem' } });
    fireEvent.click(getSubmitButton());
    expect(screen.getByText(/Describe el problema/i)).toBeInTheDocument();
  });

  it('accepts problem description with 10+ characters', () => {
    advanceToStep2();
    fillStep2('Mi laptop no enciende correctamente');
    fireEvent.click(getSubmitButton());
    expect(screen.queryByText(/Describe el problema/i)).not.toBeInTheDocument();
  });
});

describe('ContactForm — Multi-step navigation', () => {
  it('navigates forward and backward through steps', () => {
    renderForm();
    fillStep0('Fernando', '3001234567');
    fireEvent.click(getNextButton());
    expect(screen.getByText(/Detalles del Servicio/i)).toBeInTheDocument();

    fireEvent.click(getBackButton());
    expect(getNameInput()).toBeInTheDocument();
    expect(getNameInput()).toHaveValue('Fernando');
  });

  it('preserves data when navigating between steps', () => {
    renderForm();
    fillStep0('Fernando', '3001234567');
    fireEvent.click(getNextButton());

    fillStep1('reparacion', 'laptop', 'alta');
    fireEvent.click(getBackButton());

    expect(getNameInput()).toHaveValue('Fernando');
    expect(getPhoneInput()).toHaveValue('3001234567');

    fireEvent.click(getNextButton());
    expect(getServiceSelect()).toHaveValue('reparacion');
    expect(getDeviceSelect()).toHaveValue('laptop');
    expect(getUrgencySelect()).toHaveValue('alta');
  });
});

describe('ContactForm — Submission', () => {
  it('opens WhatsApp and resets form on successful submission', async () => {
    renderForm();

    fillStep0('Fernando', '3001234567');
    fireEvent.click(getNextButton());

    fillStep1('reparacion', 'laptop', 'alta');
    fireEvent.click(getNextButton());

    fillStep2('Mi laptop no enciende correctamente');

    await act(async () => {
      fireEvent.click(getSubmitButton());
      await act(async () => {
        jest.advanceTimersByTime(500);
      });
    });

    expect(openMock).toHaveBeenCalledWith(expect.stringContaining('wa.me'), '_blank');

    expect(getNameInput()).toHaveValue('');
    expect(getPhoneInput()).toHaveValue('');
  });

  it('shows submitting state while processing', async () => {
    renderForm();

    fillStep0('Fernando', '3001234567');
    fireEvent.click(getNextButton());

    fillStep1('reparacion', 'laptop', 'alta');
    fireEvent.click(getNextButton());

    fillStep2('Mi laptop no enciende correctamente');

    await act(async () => {
      fireEvent.click(getSubmitButton());
    });

    expect(screen.getByText(/Enviando/i)).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.queryByText(/Enviando/i)).not.toBeInTheDocument();
  });
});

describe('ContactForm — Error clearing on input', () => {
  it('clears field error when user types after validation failure', () => {
    renderForm();
    fireEvent.click(getNextButton());
    expect(screen.getByText(/El nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();

    fireEvent.change(getNameInput(), { target: { value: 'Fernando', name: 'name' } });
    expect(
      screen.queryByText(/El nombre debe tener al menos 2 caracteres/i)
    ).not.toBeInTheDocument();
  });
});
