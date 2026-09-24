import { workshop } from '../content/workshop'

const priceFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export function EventDetails() {
  const details = [{ label: 'Quando', value: workshop.dates.long, confirmed: true }, { label: workshop.location.label, value: workshop.location.value, confirmed: workshop.location.isConfirmed }, { label: workshop.capacity.label, value: workshop.capacity.value, confirmed: workshop.capacity.isConfirmed }, { label: 'Investimento', value: priceFormatter.format(workshop.price), confirmed: true }]
  return <section className="details" id="informacoes" aria-labelledby="details-title"><div className="section-label"><span>03</span><p>Informações</p></div><div className="details__body"><h2 id="details-title">Tudo o que você precisa saber agora.</h2><dl className="details__list">{details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd>{!detail.confirmed && <span>Em definição</span>}</div>)}</dl></div></section>
}
