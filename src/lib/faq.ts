// Perguntas frequentes: aparecem na seção "Dúvidas" e são enviadas ao Google como dados
// estruturados. Respostas diretas e curtas ajudam o site a aparecer em buscas por
// perguntas (e em respostas de IA). Mantenha só informações confirmadas.

import { CATEGORIES, EVENT, PAST_EDITIONS, SPONSORS, WHATSAPP_DISPLAY } from '@/lib/constants'

const firstYear = Math.min(...PAST_EDITIONS.map((e) => e.year))
const categories = CATEGORIES.map((c) => c.toLowerCase())
const categoryList = `${categories.slice(0, -1).join(', ')} e ${categories[categories.length - 1]}`

export const FAQ: { question: string; answer: string }[] = [
  {
    question: 'O que é a Copa Motiva de Handebol?',
    answer: `É um torneio de handebol de base realizado em Campina Grande, na Paraíba, desde ${firstYear}. Já foram ${EVENT.editionsHeld} edições, com equipes do pré-mirim ao juvenil.`,
  },
  {
    question: `Quando acontece a Copa Motiva ${EVENT.nextYear}?`,
    answer: `As datas da ${EVENT.nextEditionLabel} ainda serão divulgadas. A programação sai primeiro no Instagram @copamotivadehandebol.`,
  },
  {
    question: 'Onde são os jogos?',
    answer: `Na ${EVENT.venue}, no ${EVENT.venueDetail}, em Campina Grande (PB).`,
  },
  {
    question: 'Quais categorias podem participar?',
    answer: `As categorias ${categoryList}. As faixas etárias de cada uma estão no regulamento.`,
  },
  {
    question: 'Como inscrever minha equipe?',
    answer: `Leia o regulamento e chame a organização pelo WhatsApp ${WHATSAPP_DISPLAY}, informando o nome da equipe e a categoria. A organização confirma a inscrição.`,
  },
  {
    question: 'Como minha empresa pode patrocinar a Copa?',
    answer: `Fale com a organização pelo WhatsApp ${WHATSAPP_DISPLAY}. A Copa Motiva conta hoje com ${SPONSORS.length} parceiros.`,
  },
]
