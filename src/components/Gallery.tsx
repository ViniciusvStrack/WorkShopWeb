import { workshop } from '../content/workshop'

export function Gallery() {
  return <section className="gallery" aria-label="Espaços reservados para fotografias"><div className="gallery__intro"><p className="eyebrow">Imagens que ainda serão vividas</p><p>Os registros oficiais serão adicionados assim que o anfitrião finalizar a seleção.</p></div><div className="gallery__grid">{workshop.gallery.map((slot, index) => <figure className={`gallery-card gallery-card--${slot.tone} gallery-card--${index + 1}`} aria-hidden="true" key={slot.id}><span>{String(index + 1).padStart(2, '0')}</span><figcaption>{slot.label}</figcaption></figure>)}</div></section>
}
