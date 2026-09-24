import { workshop } from '../content/workshop'

export function EditorialSection() {
  return <section className="editorial" id="sobre" aria-labelledby="editorial-title"><div className="section-label"><span>01</span><p>O encontro</p></div><div className="editorial__body"><p className="kicker">Uma pausa para olhar de perto.</p><h2 id="editorial-title">Três dias para trocar, experimentar e voltar diferente.</h2><div className="editorial__manifesto">{workshop.manifesto.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="audience" aria-label="Para quem é esta imersão">{workshop.audience.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div></div></section>
}
