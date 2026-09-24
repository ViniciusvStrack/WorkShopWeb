import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { workshop } from '../content/workshop'
import { buildWhatsAppUrl } from '../lib/whatsapp'

it('presents the confirmed workshop facts and honest provisional details', () => {
  render(<App />)

  expect(screen.getByRole('main')).toBeInTheDocument()
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getAllByText('19—21 JAN 2027').length).toBeGreaterThanOrEqual(1)
  expect(screen.getByText(/R\$\s*1\.800/)).toBeInTheDocument()
  expect(screen.getAllByTestId('schedule-day')).toHaveLength(3)
  expect(screen.getAllByText('Local a confirmar').length).toBeGreaterThanOrEqual(1)
  expect(document.querySelector('img[src=""]')).not.toBeInTheDocument()
})

it('keeps every registration action canonical and safe', () => {
  render(<App />)
  const canonicalUrl = buildWhatsAppUrl(workshop.whatsapp.phone, workshop.whatsapp.message)
  const links = screen.getAllByRole('link', { name: /quero me inscrever/i })

  expect(links.length).toBeGreaterThanOrEqual(3)
  for (const link of links) {
    expect(link).toHaveAttribute('href', canonicalUrl)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  }
})

it('makes the first registration action reachable by keyboard', async () => {
  const user = userEvent.setup()
  render(<App />)

  const links = screen.getAllByRole('link', { name: /quero me inscrever/i })
  await user.tab()
  await user.tab()
  expect(links[0]).toHaveFocus()
})
