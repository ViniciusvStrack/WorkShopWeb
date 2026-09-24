import { workshop } from '../content/workshop'

export function PageFooter() {
  return <footer className="page-footer"><span className="brand" aria-hidden="true">IP<span>27</span></span><p>{workshop.title} · {workshop.dates.long}</p><a href={`tel:+${workshop.whatsapp.phone}`}>{workshop.whatsapp.displayPhone}</a><small>© 2027 · Todos os direitos reservados.</small></footer>
}
