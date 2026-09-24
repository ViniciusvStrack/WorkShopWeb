import { PageHeader } from './components/PageHeader'
import { Hero } from './components/Hero'
import { EditorialSection } from './components/EditorialSection'
import { Schedule } from './components/Schedule'
import { Gallery } from './components/Gallery'
import { EventDetails } from './components/EventDetails'
import { Registration } from './components/Registration'
import { MobileCta } from './components/MobileCta'
import { PageFooter } from './components/PageFooter'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <PageHeader />
      <main id="conteudo">
        <Hero />
        <EditorialSection />
        <Schedule />
        <Gallery />
        <EventDetails />
        <Registration />
      </main>
      <PageFooter />
      <MobileCta />
    </>
  )
}
