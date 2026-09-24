import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl } from './whatsapp'
import { workshop } from '../content/workshop'

describe('buildWhatsAppUrl', () => {
  it('normalizes the phone and safely encodes Portuguese copy', () => {
    expect(buildWhatsAppUrl('+55 (81) 9185-3191', 'Olá! Quero uma vaga.')).toBe(
      'https://wa.me/558191853191?text=Ol%C3%A1!%20Quero%20uma%20vaga.',
    )
  })

  it('rejects an empty normalized phone', () => {
    expect(() => buildWhatsAppUrl('---', 'Olá')).toThrow('WhatsApp phone is required')
  })
})

it('keeps the confirmed facts explicit', () => {
  expect(workshop.dates.display).toBe('19—21 JAN 2027')
  expect(workshop.price).toBe(1800)
  expect(workshop.whatsapp.phone).toBe('558191853191')
  expect(workshop.location.isConfirmed).toBe(true)
  expect(workshop.capacity.isConfirmed).toBe(true)
  expect(workshop.schedule).toHaveLength(3)
  expect(workshop.schedule.every((day) => day.eyebrow === 'Programação provisória')).toBe(true)
})

it('includes the confirmed venue in the registration conversation', () => {
  const url = buildWhatsAppUrl(workshop.whatsapp.phone, workshop.whatsapp.message)

  expect(decodeURIComponent(url)).toContain('Kasa da Falésia, Praia Bela, Pitimbu-PB')
})
