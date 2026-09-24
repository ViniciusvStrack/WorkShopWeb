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

it('keeps confirmed facts and provisional facts explicit', () => {
  expect(workshop.dates.display).toBe('19—21 JAN 2027')
  expect(workshop.price).toBe(1800)
  expect(workshop.whatsapp.phone).toBe('558191853191')
  expect(workshop.location.isConfirmed).toBe(false)
  expect(workshop.capacity.isConfirmed).toBe(false)
  expect(workshop.schedule).toHaveLength(3)
})
