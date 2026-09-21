import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '../Hero';
import UsedEquipmentBanner from '../UsedEquipmentBanner';
import UsedEquipmentModal from '../UsedEquipmentModal';
import { usedEquipmentList, getEquipmentWhatsAppUrl } from '@/data/usedEquipment';

describe('UsedEquipmentBanner Component', () => {
  it('renders announcement banner with status badge and text', () => {
    const handleOpen = jest.fn();
    render(<UsedEquipmentBanner onOpenModal={handleOpen} />);

    expect(screen.getByText('EQUIPOS DISPONIBLES')).toBeInTheDocument();
    expect(screen.getByText(/Actualizado hoy/i)).toBeInTheDocument();
    expect(screen.getByText(/Torres Gamer • Portátiles • PCs/i)).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('TESTEADOS')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Ver equipos de segunda disponibles/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });
});

describe('UsedEquipmentModal Component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <UsedEquipmentModal isOpen={false} onClose={onCloseMock} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal with items, specs, and controls when isOpen is true', () => {
    render(<UsedEquipmentModal isOpen={true} onClose={onCloseMock} />);

    // Check title and first item
    expect(screen.getByRole('heading', { level: 2, name: /Equipos de Segunda/i })).toBeInTheDocument();
    const firstItem = usedEquipmentList[0];
    expect(screen.getByText(firstItem.title)).toBeInTheDocument();
    expect(screen.getByText(firstItem.price)).toBeInTheDocument();
    expect(screen.getByText(firstItem.condition)).toBeInTheDocument();
  });

  it('navigates through items with Next and Prev buttons', () => {
    render(<UsedEquipmentModal isOpen={true} onClose={onCloseMock} />);

    const firstItem = usedEquipmentList[0];
    const secondItem = usedEquipmentList[1];

    expect(screen.getByText(firstItem.title)).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /Equipo siguiente/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText(secondItem.title)).toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: /Equipo anterior/i });
    fireEvent.click(prevBtn);

    expect(screen.getByText(firstItem.title)).toBeInTheDocument();
  });

  it('filters items when clicking category tabs', () => {
    render(<UsedEquipmentModal isOpen={true} onClose={onCloseMock} />);

    const officeTab = screen.getByRole('tab', { name: /Oficina \/ Hogar/i });
    fireEvent.click(officeTab);

    const officeItem = usedEquipmentList.find((i) => i.category === 'office');
    expect(officeItem).toBeDefined();
    if (officeItem) {
      expect(screen.getByText(officeItem.title)).toBeInTheDocument();
    }
  });

  it('shows empty state when selecting a category with no items', () => {
    render(<UsedEquipmentModal isOpen={true} onClose={onCloseMock} />);

    const laptopsTab = screen.getByRole('tab', { name: /Portátiles/i });
    fireEvent.click(laptopsTab);

    expect(
      screen.getByText(/No hay equipos disponibles en esta categoría/i)
    ).toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    render(<UsedEquipmentModal isOpen={true} onClose={onCloseMock} />);

    const closeBtn = screen.getByRole('button', { name: /Cerrar catálogo de equipos/i });
    fireEvent.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when pressing Escape key', () => {
    render(<UsedEquipmentModal isOpen={true} onClose={onCloseMock} />);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('generates correct WhatsApp inquiry link for equipment', () => {
    const item = usedEquipmentList[0];
    const url = getEquipmentWhatsAppUrl(item);

    expect(url).toContain('wa.me');
    expect(url).toContain(encodeURIComponent(item.title));
    expect(url).toContain(encodeURIComponent(item.id));
  });
});

describe('Hero with UsedEquipment Integration', () => {
  it('opens UsedEquipmentModal when banner in Hero is clicked', () => {
    render(<Hero />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const bannerBtn = screen.getByRole('button', { name: /Ver equipos de segunda disponibles/i });
    fireEvent.click(bannerBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(usedEquipmentList[0].title)).toBeInTheDocument();
  });
});
