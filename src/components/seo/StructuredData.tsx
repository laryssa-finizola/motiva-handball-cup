// Dados estruturados (JSON-LD, schema.org) que explicam ao Google quem é a Copa Motiva,
// onde acontece, as perguntas frequentes e — quando houver datas — o próximo evento.
// Teste em https://search.google.com/test/rich-results depois de publicar.

import { CATEGORIES, EVENT, EVENT_DATES, SOCIAL_LINKS, SPONSORS, WHATSAPP_NUMBER } from '@/lib/constants'
import { FAQ } from '@/lib/faq'
import { SITE } from '@/lib/site'

const ORG_ID = `${SITE.url}/#organizacao`
const SITE_ID = `${SITE.url}/#site`
const PLACE_ID = `${SITE.url}/#local`

const address = {
  '@type': 'PostalAddress',
  addressLocality: 'Campina Grande',
  addressRegion: 'PB',
  addressCountry: 'BR',
}

export function StructuredData() {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'SportsOrganization',
      '@id': ORG_ID,
      name: SITE.name,
      alternateName: SITE.shortName,
      url: SITE.url,
      logo: `${SITE.url}/images/logo-copa-motiva.png`,
      image: `${SITE.url}/images/escudo-copa-motiva.webp`,
      description: SITE.description,
      sport: 'Handebol',
      areaServed: { '@type': 'State', name: 'Paraíba' },
      address,
      sameAs: [SOCIAL_LINKS.instagram],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'inscrições e patrocínio',
        telephone: `+${WHATSAPP_NUMBER}`,
        availableLanguage: 'Portuguese',
      },
      sponsor: SPONSORS.map((s) => ({ '@type': 'Organization', name: s.name })),
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: SITE.url,
      name: SITE.name,
      alternateName: SITE.shortName,
      inLanguage: 'pt-BR',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'Place',
      '@id': PLACE_ID,
      name: EVENT.venue,
      description: `${EVENT.venue}, no ${EVENT.venueDetail}`,
      address,
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE.url}/#duvidas`,
      inLanguage: 'pt-BR',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ]

  // O Google só aceita eventos com data. Sem data definida, o evento não é enviado.
  if (EVENT_DATES) {
    graph.push({
      '@type': 'SportsEvent',
      name: `Copa Motiva de Handebol ${EVENT.nextYear}`,
      description: `${EVENT.nextEditionLabel} da Copa Motiva de Handebol: categorias ${CATEGORIES.join(', ')}.`,
      startDate: EVENT_DATES.start,
      endDate: EVENT_DATES.end,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      sport: 'Handebol',
      location: { '@type': 'Place', name: EVENT.venue, address },
      image: [`${SITE.url}/images/escudo-copa-motiva.webp`],
      organizer: { '@id': ORG_ID, '@type': 'SportsOrganization', name: SITE.name, url: SITE.url },
      url: SITE.url,
    })
  }

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
