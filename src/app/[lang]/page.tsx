import App from '@/app/App'
import type { Metadata } from 'next'
import { buildMetadata, getSeoBundle } from '@/app/seo.metadata'
import { OG_IMAGE, buildUrl } from '@/app/seo.config'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  return buildMetadata({
    locale: params.lang,
    path: '/',
    pageKey: 'home',
  })
}

function buildHomeJsonLd(lang: string) {
  const bundle = getSeoBundle(lang)
  const sportsEvent = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: '2026 FIFA World Cup',
    alternateName: [
      'FIFA World Cup 2026',
      '2026 World Cup',
      'Mundial 2026',
      'Copa do Mundo 2026',
      '2026 ワールドカップ',
      '2026 월드컵',
      '2026 世界杯',
    ],
    sport: 'Association Football (Soccer)',
    description: bundle.description,
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: OG_IMAGE,
    url: buildUrl(lang, '/'),
    inLanguage: lang,
    organizer: {
      '@type': 'Organization',
      name: 'FIFA',
      url: 'https://www.fifa.com',
    },
    location: [
      {
        '@type': 'StadiumOrArena',
        name: 'Estadio Azteca',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mexico City',
          addressCountry: 'MX',
        },
      },
      {
        '@type': 'StadiumOrArena',
        name: 'MetLife Stadium',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1 MetLife Stadium Dr',
          addressLocality: 'East Rutherford',
          addressRegion: 'NJ',
          postalCode: '07073',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'StadiumOrArena',
        name: 'BC Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vancouver',
          addressRegion: 'BC',
          addressCountry: 'CA',
        },
      },
    ],
    subEvent: [
      {
        '@type': 'SportsEvent',
        name: 'Opening Match: Mexico vs South Africa',
        startDate: '2026-06-11',
        location: {
          '@type': 'StadiumOrArena',
          name: 'Estadio Azteca',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Mexico City',
            addressCountry: 'MX',
          },
        },
      },
      {
        '@type': 'SportsEvent',
        name: '2026 FIFA World Cup Final',
        startDate: '2026-07-19',
        location: {
          '@type': 'StadiumOrArena',
          name: 'MetLife Stadium',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'East Rutherford',
            addressRegion: 'NJ',
            addressCountry: 'US',
          },
        },
      },
    ],
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: buildUrl(lang, '/'),
      },
    ],
  }

  return [sportsEvent, breadcrumb]
}

export default function Page({ params }: { params: { lang: string } }) {
  const jsonLd = buildHomeJsonLd(params.lang || 'en')
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <App />
    </>
  )
}
