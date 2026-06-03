import type { MetadataRoute } from 'next'
import { SITE_URL, SUPPORTED_LOCALES } from './seo.config'

const ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/venues', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/venues/metlife-stadium', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/venues/estadio-azteca', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/tournament-format', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/travel-guide', priority: 0.7, changeFrequency: 'weekly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const route of ROUTES) {
    for (const lang of SUPPORTED_LOCALES) {
      const cleanPath = route.path === '/' ? '' : route.path
      const url = `${SITE_URL}/${lang}${cleanPath}`
      // Build hreflang alternates for this URL
      const languages: Record<string, string> = {}
      for (const altLang of SUPPORTED_LOCALES) {
        languages[altLang] = `${SITE_URL}/${altLang}${cleanPath}`
      }
      languages['x-default'] = `${SITE_URL}/en${cleanPath}`

      entries.push({
        url,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      })
    }
  }

  return entries
}
