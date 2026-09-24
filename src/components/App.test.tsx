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
  expect(screen.getAllByText('Kasa da Falésia, Praia Bela, Pitimbu–PB').length).toBeGreaterThanOrEqual(1)
  expect(document.querySelector('img[src=""]')).not.toBeInTheDocument()
})

it('presents the confirmed venue, included stay and event times', () => {
  render(<App />)

  expect(screen.getAllByText('Kasa da Falésia, Praia Bela, Pitimbu–PB').length).toBeGreaterThanOrEqual(1)
  expect(screen.getByText('Acesso total ao workshop, pousada, café da manhã, almoço e jantar')).toBeInTheDocument()
  expect(screen.getByText('Terça-feira, 19 de janeiro, às 14h')).toBeInTheDocument()
  expect(screen.getByText('Quinta-feira, 21 de janeiro, às 11h')).toBeInTheDocument()

  const days = screen.getAllByTestId('schedule-day')
  expect(days[0]).toHaveTextContent('Chegada às 14h')
  expect(days[2]).toHaveTextContent('Encerramento às 11h')
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

it('offers navigation to three provisional speaker profiles', () => {
  render(<App />)

  expect(screen.getByRole('link', { name: 'Palestrantes' })).toHaveAttribute('href', '#palestrantes')
  const speakers = screen.getByRole('region', { name: 'Palestrantes convidados' })
  expect(speakers.querySelectorAll('[data-testid="speaker-card"]')).toHaveLength(3)
  expect(screen.getByText('Palestrante 01')).toBeInTheDocument()
  expect(screen.getByText('Palestrante 02')).toBeInTheDocument()
  expect(screen.getByText('Palestrante 03')).toBeInTheDocument()
  expect(screen.getAllByText('Informações profissionais em breve')).toHaveLength(3)
})

it('renders completed speaker data from the central content module', () => {
  const originalSpeaker = { ...workshop.speakers[0] }
  workshop.speakers[0] = {
    ...originalSpeaker,
    name: 'Nome confirmado',
    role: 'Fotógrafo e educador',
    bio: 'Biografia profissional confirmada.',
    photoSrc: '/speakers/nome-confirmado.jpg',
  }

  try {
    render(<App />)
    expect(screen.getByRole('img', { name: 'Nome confirmado' })).toHaveAttribute('src', '/speakers/nome-confirmado.jpg')
    expect(screen.getByText('Fotógrafo e educador')).toBeInTheDocument()
    expect(screen.getByText('Biografia profissional confirmada.')).toBeInTheDocument()
  } finally {
    workshop.speakers[0] = originalSpeaker
  }
})

it('renders an edited event title from the central content module', () => {
  const originalTitle = workshop.title
  workshop.title = 'Encontro de Autor'

  try {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Encontro de Autor' })).toBeInTheDocument()
  } finally {
    workshop.title = originalTitle
  }
})

it('uses layered focus contrast and opaque registration copy', () => {
  const globalStyles = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8')
  const pageStyles = readFileSync(resolve(process.cwd(), 'src/styles/page.css'), 'utf8')

  expect(globalStyles).toContain('outline: 3px solid #fff;')
  expect(globalStyles).toContain('box-shadow: 0 0 0 6px #111;')
  expect(pageStyles).toContain('color: #fff;')
})
