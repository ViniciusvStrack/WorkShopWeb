import { workshop } from '../content/workshop'

export function Schedule() {
  return <section className="schedule" id="experiencia" aria-labelledby="schedule-title"><div className="section-heading"><div className="section-label section-label--light"><span>02</span><p>A experiência</p></div><h2 id="schedule-title">Uma jornada em três movimentos.</h2></div><div className="schedule__grid">{workshop.schedule.map((item) => <article className="schedule-card" data-testid="schedule-day" key={item.day}><div className="schedule-card__top"><span>{item.day}</span><span>{item.date}</span></div><p className="eyebrow">{item.eyebrow}</p><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
}
