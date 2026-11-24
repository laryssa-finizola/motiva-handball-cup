import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

// Gera /sitemap.xml. Envie esse endereço no Google Search Console.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/docs/regulamento.pdf`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]
}
