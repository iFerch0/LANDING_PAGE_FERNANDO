import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero Component', () => {
  it('renders hero title correctly', () => {
    render(<Hero />)
    
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Reparación de computadores en Montería')
  })

  it('displays contact buttons', () => {
    render(<Hero />)
    
    const whatsappButton = screen.getByRole('link', { name: /escribir por whatsapp/i })
    const phoneButton = screen.getByRole('link', { name: /llamar ahora/i })
    
    expect(whatsappButton).toBeInTheDocument()
    expect(phoneButton).toBeInTheDocument()
    expect(whatsappButton).toHaveAttribute('href', 'http://wa.link/n8et4q')
    expect(phoneButton).toHaveAttribute('href', 'tel:+573008474121')
  })

  it('shows hero statistics', () => {
    render(<Hero />)
    
    expect(screen.getByText(/equipos reparados/i)).toBeInTheDocument()
    expect(screen.getByText(/garantía de/i)).toBeInTheDocument()
  })

  it('displays hero image with correct attributes', () => {
    render(<Hero />)
    
    const heroImage = screen.getByAltText('Poster hero')
    expect(heroImage).toBeInTheDocument()
    expect(heroImage).toHaveAttribute('width', '560')
    expect(heroImage).toHaveAttribute('height', '420')
  })
})
