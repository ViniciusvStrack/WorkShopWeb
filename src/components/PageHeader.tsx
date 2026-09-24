import { workshop } from '../content/workshop'
import { buildWhatsAppUrl } from '../lib/whatsapp'

export function PageHeader() {
  const registrationUrl = buildWhatsAppUrl(workshop.whatsapp.phone, workshop.whatsapp.message)
  return <header className="page-header"><div className="page-header__inner"><span className="brand" aria-label="Imersão Presencial">IP<span>27</span></span><a className="button button--small page-header__cta" href={registrationUrl} target="_blank" rel="noreferrer">Quero me inscrever</a><nav className="page-nav" aria-label="Navegação principal"><a href="#sobre">Sobre</a><a href="#palestrantes">Palestrantes</a><a href="#experiencia">Experiência</a><a href="#informacoes">Informações</a></nav></div></header>
}
