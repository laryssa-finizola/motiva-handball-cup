// Dados de SEO do site (título, descrição e endereço público).
// Se o site ganhar um domínio próprio (ex.: copamotiva.com.br), defina
// NEXT_PUBLIC_SITE_URL na Vercel com esse endereço — o sitemap, o robots.txt,
// os links canônicos e as imagens de compartilhamento passam a usá-lo.

import { EVENT } from '@/lib/constants'

export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://motiva-handball-cup.vercel.app').replace(/\/$/, ''),
  name: 'Copa Motiva de Handebol',
  shortName: 'Copa Motiva',
  // até ~60 caracteres, para não ser cortado no Google
  title: `Copa Motiva de Handebol ${EVENT.nextYear} – Torneio de handebol na Paraíba`,
  // até ~155 caracteres
  description: `O maior torneio de handebol de base da Paraíba, do pré-mirim ao juvenil, na ${EVENT.venue} em Campina Grande. Inscrições abertas para ${EVENT.nextYear}.`,
  locale: 'pt_BR',
  themeColor: '#1A2A45',
} as const
