import { workshop } from '../content/workshop'
import { buildWhatsAppUrl } from '../lib/whatsapp'

export function Hero() {
  const registrationUrl = buildWhatsAppUrl(workshop.whatsapp.phone, workshop.whatsapp.message)
  const [firstTitleWord, ...remainingTitleWords] = workshop.title.split(' ')
  return <section className="hero" aria-labelledby="hero-title"><div className="hero__copy"><p className="eyebrow">{workshop.eyebrow}</p><h1 id="hero-title"><span>{firstTitleWord}</span>{' '}<em>{remainingTitleWords.join(' ')}</em></h1><p className="hero__summary">{workshop.summary}</p><a className="button" href={registrationUrl} target="_blank" rel="noreferrer">Quero me inscrever <span aria-hidden="true">↗</span></a></div><div className="hero__visual" aria-hidden="true"><div className="hero__frame"><span>Imagem principal</span><small>Fotografia a ser adicionada</small></div><p className="hero__date">{workshop.dates.display}</p><p className="hero__location">{workshop.location.value}</p></div></section>
}
