// Patrocinadores da Copa Motiva.
// Para mostrar a logo de um deles, salve o arquivo em public/images/sponsors/
// e preencha `logo` (ex.: logo: '/images/sponsors/contafacio.png').
// Sem `logo`, o card mostra o nome e a área de atuação.
// `bg`: cor de fundo do card, para logos claras (ex.: a Love Gifts é branca).
export type SponsorItem = { name: string; tagline: string; logo?: string; bg?: string }

export const SPONSORS: SponsorItem[] = [
  { name: 'Contafacio', tagline: 'Contabilidade', logo: '/images/sponsors/contafacio.png' },
  { name: 'Construtora Ever', tagline: 'Construtora', logo: '/images/sponsors/construtora-ever.png' },
  { name: 'Love Gifts', tagline: 'Presentes', logo: '/images/sponsors/love-gifts-oficial.png', bg: '#F5A800' },
  { name: 'Pollansky Almeida', tagline: 'Especialista em consórcio', logo: '/images/sponsors/pollansky-almeida.png' },
  { name: 'Fenoplast', tagline: 'Embalagens flexíveis', logo: '/images/sponsors/fenoplast.png' },
  { name: 'MS Solar', tagline: 'Energia solar', logo: '/images/sponsors/ms-solar.png' },
  { name: 'BBC Securitizadora', tagline: 'Securitizadora de crédito', logo: '/images/sponsors/bbc-securitizadora-oficial.png' },
  { name: "Brother's Brownies", tagline: 'Brownies', logo: '/images/sponsors/brothers-brownies.png' },
  { name: 'Matheus Caldas', tagline: 'Consultoria e assessoria jurídica', logo: '/images/sponsors/matheus-caldas.png' },
];

// ---------- Dados do evento (atualize aqui a cada edição) ----------

export const WHATSAPP_NUMBER = '558396595988'
export const WHATSAPP_DISPLAY = '(83) 9659-5988'
export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const EVENT = {
  nextYear: 2027,
  nextEditionLabel: '5ª edição',
  editionsHeld: 4,
  daysOfGames: 4,
  venue: 'Arena Motiva',
  venueDetail: 'Colégio Motiva',
  city: 'Campina Grande · PB',
} as const

// Categorias "do pré-mirim ao juvenil". Confirme os nomes no regulamento.
export const CATEGORIES = ['Pré-mirim', 'Mirim', 'Infantil', 'Cadete', 'Juvenil'] as const

// Datas oficiais da próxima edição (formato AAAA-MM-DD). Quando preenchidas, o site
// envia ao Google os dados do evento, que pode aparecer nas buscas por eventos.
// Exemplo: { start: '2027-11-18', end: '2027-11-21' }
export const EVENT_DATES: { start: string; end: string } | null = null

// Dias da próxima edição. Enquanto estiver vazio, a seção Agenda mostra "datas em breve".
// Exemplo: { day: '19', month: 'Nov', label: 'Abertura e fase de grupos' }
export const AGENDA: { day: string; month: string; label: string }[] = []

export const PAST_EDITIONS: { roman: string; year: number; image?: string }[] = [
  { roman: 'IV', year: 2026 },
  { roman: 'III', year: 2025 },
  { roman: 'II', year: 2024, image: '/images/gallery/destaques-edicao1.jpg' },
  { roman: 'I', year: 2023, image: '/images/gallery/destaques-edicao2.jpg' },
]

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/copamotivadehandebol'
} as const;