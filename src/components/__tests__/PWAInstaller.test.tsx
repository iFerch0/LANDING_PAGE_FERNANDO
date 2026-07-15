import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PWAInstaller from '../PWAInstaller';

describe('PWAInstaller', () => {
  let mockRegister: jest.Mock;
  let mockPrompt: jest.Mock;

  const createMockRegistration = () => ({
    addEventListener: jest.fn(),
    installing: null,
  });

  beforeEach(() => {
    mockRegister = jest.fn().mockResolvedValue(createMockRegistration());
    mockPrompt = jest.fn();

    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        register: mockRegister,
        controller: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders nothing initially', () => {
    const { container } = render(<PWAInstaller />);
    expect(container.firstChild).toBeNull();
  });

  it('shows install button when beforeinstallprompt fires', async () => {
    render(<PWAInstaller />);

    const event = new Event('beforeinstallprompt');
    Object.defineProperty(event, 'preventDefault', { value: jest.fn() });
    Object.defineProperty(event, 'prompt', { value: mockPrompt });
    Object.defineProperty(event, 'userChoice', {
      value: Promise.resolve({ outcome: 'accepted' }),
    });

    window.dispatchEvent(event);

    await waitFor(() => {
      expect(screen.getByText('Instalar App')).toBeInTheDocument();
    });
  });

  it('handles install button click', async () => {
    render(<PWAInstaller />);

    const mockUserChoice = Promise.resolve({ outcome: 'accepted' });
    const event = new Event('beforeinstallprompt');
    Object.defineProperty(event, 'preventDefault', { value: jest.fn() });
    Object.defineProperty(event, 'prompt', { value: mockPrompt });
    Object.defineProperty(event, 'userChoice', { value: mockUserChoice });

    window.dispatchEvent(event);

    await waitFor(() => {
      const installBtn = screen.getByText('Instalar');
      fireEvent.click(installBtn);
    });

    expect(mockPrompt).toHaveBeenCalled();
  });

  it('hides install button when close is clicked', async () => {
    render(<PWAInstaller />);

    const event = new Event('beforeinstallprompt');
    Object.defineProperty(event, 'preventDefault', { value: jest.fn() });
    Object.defineProperty(event, 'prompt', { value: mockPrompt });
    Object.defineProperty(event, 'userChoice', {
      value: Promise.resolve({ outcome: 'dismissed' }),
    });

    window.dispatchEvent(event);

    await waitFor(() => {
      expect(screen.getByText('Instalar App')).toBeInTheDocument();
    });

    const closeBtn = screen.getByLabelText('Cerrar');
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText('Instalar App')).not.toBeInTheDocument();
    });
  });

  it('logs error when service worker registration fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const testError = new Error('SW registration failed');
    mockRegister.mockRejectedValue(testError);

    render(<PWAInstaller />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Service Worker registration failed:', testError);
    });

    consoleSpy.mockRestore();
  });
});
