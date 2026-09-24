import { workshop } from '../content/workshop'

export function Speakers() {
  return (
    <section className="speakers" id="palestrantes" aria-labelledby="speakers-title">
      <div className="section-heading">
        <div className="section-label"><span>02</span><p>Convidados</p></div>
        <h2 id="speakers-title">Palestrantes convidados</h2>
      </div>
      <div className="speakers__grid">
        {workshop.speakers.map((speaker, index) => (
          <article className="speaker-card" data-testid="speaker-card" key={speaker.id}>
            {speaker.photoSrc ? (
              <img className="speaker-card__photo" src={speaker.photoSrc} alt={speaker.name} />
            ) : (
              <div className="speaker-card__photo" aria-hidden="true">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <small>Foto em breve</small>
              </div>
            )}
            <div className="speaker-card__copy">
              <h3>{speaker.name}</h3>
              <p>{speaker.role}</p>
              {speaker.bio && <p className="speaker-card__bio">{speaker.bio}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
