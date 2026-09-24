import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { workshop } from '../content/workshop'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

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

it('ships the responsive and accessible style contracts', () => {
  const globalStyles = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8')
  const pageStyles = readFileSync(resolve(process.cwd(), 'src/styles/page.css'), 'utf8')
  const styles = `${globalStyles}\n${pageStyles}`

  expect(styles).toContain(':focus-visible')
  expect(styles).toContain('@media (prefers-reduced-motion: reduce)')
  expect(styles).toContain('.mobile-cta')
  expect(styles).toContain('@media (min-width: 64rem)')
})

it('guards the narrow mobile layout from horizontal clipping', () => {
  const pageStyles = readFileSync(resolve(process.cwd(), 'src/styles/page.css'), 'utf8')

  expect(pageStyles).toContain('.page-header__cta { display: none; }')
  expect(pageStyles).toContain('grid-template-columns: auto minmax(0, 1fr);')
  expect(pageStyles).toContain('font-size: clamp(3.2rem, 13vw, 8.5rem);')
  expect(pageStyles).toContain('.hero__copy { min-width: 0;')
  expect(pageStyles).toContain('.mobile-cta > span { display: none; }')
})

it('keeps provisional gallery artwork decorative', () => {
  render(<App />)
  const gallery = screen.getByRole('region', { name: /espaços reservados para fotografias/i })
  expect(gallery.querySelectorAll('figure[aria-hidden="true"]')).toHaveLength(6)
})
