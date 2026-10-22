import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '../Hero';
import UsedEquipmentBanner from '../UsedEquipmentBanner';
import UsedEquipmentModal from '../UsedEquipmentModal';
import { usedEquipmentList, allEquipmentList, getEquipmentWhatsAppUrl } from '@/data/usedEquipment';

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

  it('renders modal with items or empty state when isOpen is true', () => {
    render(<UsedEquipmentModal isOpen={true} onClose={onCloseMock} />);

    // Check title
    expect(screen.getByRole('heading', { level: 2, name: /Equipos de Segunda/i })).toBeInTheDocument();

    if (usedEquipmentList.length > 0) {
      const firstItem = usedEquipmentList[0];
      expect(screen.getByText(firstItem.title)).toBeInTheDocument();
      expect(screen.getByText(firstItem.price)).toBeInTheDocument();
      expect(screen.getByText(firstItem.condition)).toBeInTheDocument();
    } else {
      expect(
        screen.getByText(/No hay equipos disponibles en esta categoría/i)
      ).toBeInTheDocument();
    }
  });

  it('navigates through items with Next and Prev buttons', () => {
    render(<UsedEquipmentModal isOpen={true} onClose={onCloseMock} />);

    if (usedEquipmentList.length > 0) {
      const firstItem = usedEquipmentList[0];
      expect(screen.getByText(firstItem.title)).toBeInTheDocument();

      const nextBtn = screen.getByRole('button', { name: /Equipo siguiente/i });
      fireEvent.click(nextBtn);

      if (usedEquipmentList.length > 1) {
        const secondItem = usedEquipmentList[1];
        expect(screen.getByText(secondItem.title)).toBeInTheDocument();

        const prevBtn = screen.getByRole('button', { name: /Equipo anterior/i });
        fireEvent.click(prevBtn);

        expect(screen.getByText(firstItem.title)).toBeInTheDocument();
      } else {
        expect(screen.getByText(firstItem.title)).toBeInTheDocument();
      }
    } else {
      expect(
        screen.getByText(/No hay equipos disponibles en esta categoría/i)
      ).toBeInTheDocument();
    }
  });

  it('filters items when clicking category tabs', () => {
    render(<UsedEquipmentModal isOpen={true} onClose={onCloseMock} />);

    const officeTab = screen.getByRole('tab', { name: /Oficina \/ Hogar/i });
    fireEvent.click(officeTab);

    const officeItem = usedEquipmentList.find((i) => i.category === 'office');
    if (officeItem) {
      expect(screen.getByText(officeItem.title)).toBeInTheDocument();
    } else {
      expect(screen.getByText(/No hay equipos disponibles en esta categoría/i)).toBeInTheDocument();
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
    const item = allEquipmentList[0] || {
      id: 'EQ-SAMPLE',
      title: 'Equipo de Prueba',
      price: '$500.000 COP',
    };
    const url = getEquipmentWhatsAppUrl(item);

    expect(url).toContain('wa.me');
    expect(url).toContain(encodeURIComponent(item.title));
    expect(url).toContain(encodeURIComponent(item.id));
  });
});

describe('Hero with UsedEquipment Integration', () => {
  it('handles banner display according to equipment availability', () => {
    render(<Hero />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const bannerBtn = screen.queryByRole('button', { name: /Ver equipos de segunda disponibles/i });
    if (usedEquipmentList.length > 0) {
      expect(bannerBtn).toBeInTheDocument();
      if (bannerBtn) {
        fireEvent.click(bannerBtn);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(usedEquipmentList[0].title)).toBeInTheDocument();
      }
    } else {
      // When no equipment is published, the banner is cleanly hidden from Hero
      expect(bannerBtn).toBeNull();
    }
  });
});
