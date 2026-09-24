import { workshop } from '../content/workshop'
import { buildWhatsAppUrl } from '../lib/whatsapp'

export function Registration() {
  const registrationUrl = buildWhatsAppUrl(workshop.whatsapp.phone, workshop.whatsapp.message)
  return <section className="registration" aria-labelledby="registration-title"><p className="eyebrow">{workshop.dates.long}</p><h2 id="registration-title">O próximo passo começa com uma conversa.</h2><p>Fale diretamente com o anfitrião para tirar dúvidas e garantir sua vaga.</p><a className="button button--light" href={registrationUrl} target="_blank" rel="noreferrer">Quero me inscrever <span aria-hidden="true">↗</span></a></section>
}
