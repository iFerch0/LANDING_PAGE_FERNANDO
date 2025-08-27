import { render, screen } from '@testing-library/react'
import Services from '../Services'

describe('Services Component', () => {
  it('renders services section title', () => {
    render(<Services />)
    
    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Nuestros Servicios Profesionales en Montería')
  })

  it('displays all service cards', () => {
    render(<Services />)
    
    expect(screen.getByText('Reparación de PC y Portátiles')).toBeInTheDocument()
    expect(screen.getByText('Recuperación de Datos')).toBeInTheDocument()
    expect(screen.getByText('Eliminación de Virus')).toBeInTheDocument()
    expect(screen.getByText('Optimización de Rendimiento')).toBeInTheDocument()
    expect(screen.getByText('Mantenimiento Preventivo')).toBeInTheDocument()
    expect(screen.getByText('Soporte Técnico General')).toBeInTheDocument()
  })

  it('shows popular badge on first service', () => {
    render(<Services />)
    
    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('all service cards have WhatsApp contact links', () => {
    render(<Services />)
    
    const contactLinks = screen.getAllByText('Más información')
    expect(contactLinks).toHaveLength(6)
    
    contactLinks.forEach(link => {
      expect(link.closest('a')).toHaveAttribute('href', expect.stringContaining('wa.me/573008474121'))
      expect(link.closest('a')).toHaveAttribute('target', '_blank')
    })
  })
})
