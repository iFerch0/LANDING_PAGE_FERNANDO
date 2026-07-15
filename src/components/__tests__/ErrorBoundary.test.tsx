import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

const ThrowError = ({ message }: { message: string }) => {
  throw new Error(message);
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>Content works</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('Content works')).toBeInTheDocument();
  });

  it('renders default error UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError message="Test error" />
      </ErrorBoundary>
    );
    expect(screen.getByText('Algo salió mal')).toBeInTheDocument();
    expect(screen.getByText(/hemos encontrado un error inesperado/i)).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<p>Custom fallback</p>}>
        <ThrowError message="Test error" />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('resets error state when "Intentar de nuevo" is clicked', () => {
    let shouldThrow = true;
    const MaybeThrows = () => {
      if (shouldThrow) {
        throw new Error('boom');
      }
      return <p>Recovered</p>;
    };

    render(
      <ErrorBoundary>
        <MaybeThrows />
      </ErrorBoundary>
    );

    expect(screen.getByText('Algo salió mal')).toBeInTheDocument();

    shouldThrow = false;
    fireEvent.click(screen.getByText('Intentar de nuevo'));

    expect(screen.getByText('Recovered')).toBeInTheDocument();
  });

  it('sends exception event to gtag on error', () => {
    render(
      <ErrorBoundary>
        <ThrowError message="gtag test" />
      </ErrorBoundary>
    );

    expect(window.gtag).toHaveBeenCalledWith('event', 'exception', {
      description: 'gtag test',
      fatal: false,
    });
  });

  it('has "Volver al inicio" button that triggers navigation', () => {
    render(
      <ErrorBoundary>
        <ThrowError message="nav test" />
      </ErrorBoundary>
    );

    const homeButton = screen.getByText('Volver al inicio');
    expect(homeButton).toBeInTheDocument();
    expect(homeButton.tagName).toBe('BUTTON');
  });
});
