import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

// Gera /robots.txt: libera o site inteiro para os buscadores e aponta o sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
