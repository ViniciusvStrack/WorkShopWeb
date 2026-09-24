import { render, screen } from '@testing-library/react'
import App from '../App'

it('renders the workshop application landmark', () => {
  render(<App />)
  expect(screen.getByRole('main')).toBeInTheDocument()
})
