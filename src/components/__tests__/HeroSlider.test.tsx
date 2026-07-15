import { render, screen, fireEvent, act } from '@testing-library/react';
import HeroSliderStatic from '../HeroSliderStatic';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('HeroSliderStatic — Rendering', () => {
  it('renders the slider with slides', () => {
    render(<HeroSliderStatic />);
    expect(screen.getByText('Configuración Profesional')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<HeroSliderStatic />);
    const buttons = screen.getAllByRole('button');
    const prevButton = buttons.find((btn) => btn.getAttribute('aria-label') === 'Anterior');
    const nextButton = buttons.find((btn) => btn.getAttribute('aria-label') === 'Siguiente');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('renders dot indicators for each slide', () => {
    render(<HeroSliderStatic />);
    const dots = screen.getAllByRole('button', { name: /Ir a imagen/i });
    expect(dots.length).toBe(5);
  });

  it('renders counter showing current slide', () => {
    render(<HeroSliderStatic />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});

describe('HeroSliderStatic — Keyboard navigation', () => {
  it('advances to next slide on ArrowRight', () => {
    render(<HeroSliderStatic />);
    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('goes to previous slide on ArrowLeft', () => {
    render(<HeroSliderStatic />);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('wraps around to first slide when pressing ArrowRight on last slide', () => {
    render(<HeroSliderStatic />);
    for (let i = 0; i < 5; i++) {
      fireEvent.keyDown(window, { key: 'ArrowRight' });
    }
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('wraps around to last slide when pressing ArrowLeft on first slide', () => {
    render(<HeroSliderStatic />);
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    const counterCurrent = document.querySelector('.counterCurrent');
    expect(counterCurrent?.textContent).toBe('5');
  });
});

describe('HeroSliderStatic — Button navigation', () => {
  function getPrevButton() {
    const buttons = screen.getAllByRole('button');
    return buttons.find((btn) => btn.getAttribute('aria-label') === 'Anterior')!;
  }

  function getNextButton() {
    const buttons = screen.getAllByRole('button');
    return buttons.find((btn) => btn.getAttribute('aria-label') === 'Siguiente')!;
  }

  it('advances to next slide when clicking Siguiente', () => {
    render(<HeroSliderStatic />);
    fireEvent.click(getNextButton());
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('goes to previous slide when clicking Anterior', () => {
    render(<HeroSliderStatic />);
    fireEvent.click(getNextButton());
    fireEvent.click(getPrevButton());
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('navigates to specific slide when clicking dot indicator', () => {
    render(<HeroSliderStatic />);
    const dots = screen.getAllByRole('button', { name: /Ir a imagen/i });
    fireEvent.click(dots[2]);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('wraps around when clicking Siguiente past last slide', () => {
    render(<HeroSliderStatic />);
    for (let i = 0; i < 5; i++) {
      fireEvent.click(getNextButton());
    }
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

describe('HeroSliderStatic — Autoplay', () => {
  it('advances automatically after duration', () => {
    render(<HeroSliderStatic />);
    expect(screen.getByText('1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('advances multiple times with autoplay', () => {
    render(<HeroSliderStatic />);

    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('pauses autoplay on mouse enter', () => {
    const { container } = render(<HeroSliderStatic />);
    const slider = container.firstChild as HTMLElement;

    fireEvent.mouseEnter(slider);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('resumes autoplay on mouse leave', () => {
    const { container } = render(<HeroSliderStatic />);
    const slider = container.firstChild as HTMLElement;

    fireEvent.mouseEnter(slider);
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.mouseLeave(slider);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

describe('HeroSliderStatic — Autoplay wraps around', () => {
  it('cycles back to first slide after reaching last', () => {
    render(<HeroSliderStatic />);

    act(() => {
      jest.advanceTimersByTime(25000);
    });

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
