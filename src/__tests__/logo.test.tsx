import { render, screen } from '@testing-library/react'
import { Logo } from '@/components/logo'

describe('Logo', () => {
  it('renders the logo', () => {
    render(<Logo />)
    const logo = screen.getByTestId('logo-svg')
    expect(logo).toBeInTheDocument()
  })
})