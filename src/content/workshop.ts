export interface Fact {
  label: string
  value: string
  isConfirmed: boolean
}

export interface WorkshopDay {
  day: string
  date: string
  eyebrow: string
  title: string
  description: string
}

export interface GallerySlot {
  id: string
  label: string
  tone: 'clay' | 'olive' | 'sand'
}

export interface Speaker {
  id: string
  name: string
  role: string
  bio: string
  photoSrc: string | null
}

export interface WorkshopContent {
  title: string
  eyebrow: string
  summary: string
  manifesto: string[]
  audience: string[]
  dates: {
    display: string
    long: string
  }
  price: number
  location: Fact
  capacity: Fact
  experience: {
    included: string
    arrival: string
    closing: string
  }
  whatsapp: {
    phone: string
    displayPhone: string
    message: string
  }
  schedule: WorkshopDay[]
  speakers: Speaker[]
  gallery: GallerySlot[]
}

export const workshop: WorkshopContent = {
  title: 'Imersão Presencial',
  eyebrow: 'Três dias para mergulhar no seu processo',
  summary:
    'Uma experiência presencial criada para quem deseja desacelerar, trocar experiências e transformar intenção em prática.',
  manifesto: [
    'Há aprendizados que não cabem em uma tela. Eles acontecem no encontro, na observação e na coragem de experimentar ao lado de outras pessoas.',
    'Durante três dias, vamos construir um espaço de troca honesta, prática acompanhada e conversas que continuam muito depois do último encontro.',
  ],
  audience: [
    'Para quem deseja renovar o olhar e encontrar mais intenção no próprio processo.',
    'Para profissionais e pessoas em desenvolvimento que valorizam prática, repertório e troca próxima.',
    'Para quem procura uma experiência concentrada, humana e com espaço para perguntas reais.',
  ],
  dates: {
    display: '19—21 JAN 2027',
    long: '19 a 21 de janeiro de 2027',
  },
  price: 1800,
  location: {
    label: 'Local',
    value: 'Kasa da Falésia, Praia Bela, Pitimbu–PB',
    isConfirmed: true,
  },
  capacity: {
    label: 'Turma',
    value: 'Turma limitada — quantidade a confirmar',
    isConfirmed: false,
  },
  experience: {
    included: 'Acesso total ao workshop, pousada, café da manhã, almoço e jantar',
    arrival: 'Terça-feira, 19 de janeiro, às 14h',
    closing: 'Quinta-feira, 21 de janeiro, às 11h',
  },
  whatsapp: {
    phone: '558191853191',
    displayPhone: '+55 81 9185-3191',
    message:
      'Olá! Tenho interesse no workshop de 19 a 21 de janeiro de 2027, na Kasa da Falésia, Praia Bela, Pitimbu-PB, e gostaria de saber mais.',
  },
  schedule: [
    {
      day: 'Dia 01',
      date: '19 JAN',
      eyebrow: 'Programação provisória',
      title: 'Primeiro encontro',
      description:
        'Chegada às 14h. A programação e a dinâmica do primeiro dia serão divulgadas pelo anfitrião.',
    },
    {
      day: 'Dia 02',
      date: '20 JAN',
      eyebrow: 'Programação provisória',
      title: 'Segundo encontro',
      description:
        'Programação a confirmar. O anfitrião divulgará o conteúdo e a dinâmica deste segundo dia.',
    },
    {
      day: 'Dia 03',
      date: '21 JAN',
      eyebrow: 'Programação provisória',
      title: 'Terceiro encontro',
      description:
        'Encerramento às 11h. A programação anterior ao encerramento será divulgada pelo anfitrião.',
    },
  ],
  speakers: [
    { id: 'speaker-01', name: 'Palestrante 01', role: 'Informações profissionais em breve', bio: '', photoSrc: null },
    { id: 'speaker-02', name: 'Palestrante 02', role: 'Informações profissionais em breve', bio: '', photoSrc: null },
    { id: 'speaker-03', name: 'Palestrante 03', role: 'Informações profissionais em breve', bio: '', photoSrc: null },
  ],
  gallery: [
    { id: 'atmosfera', label: 'Atmosfera do encontro', tone: 'sand' },
    { id: 'processo', label: 'Processo em movimento', tone: 'olive' },
    { id: 'detalhes', label: 'Detalhes da experiência', tone: 'clay' },
    { id: 'trocas', label: 'Trocas presenciais', tone: 'clay' },
    { id: 'pratica', label: 'Prática acompanhada', tone: 'sand' },
    { id: 'memorias', label: 'Memórias da imersão', tone: 'olive' },
  ],
}
