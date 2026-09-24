import { workshop } from '../content/workshop'
import { buildWhatsAppUrl } from '../lib/whatsapp'

export function MobileCta() {
  const registrationUrl = buildWhatsAppUrl(workshop.whatsapp.phone, workshop.whatsapp.message)
  return <aside className="mobile-cta" aria-label="Inscrição rápida"><span>{workshop.dates.display}</span><a href={registrationUrl} target="_blank" rel="noreferrer">Quero me inscrever</a></aside>
}
