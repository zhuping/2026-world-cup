import React from 'react'
import '@/styles/index.css'
import Providers from '@/app/providers'
import Script from 'next/script'
import Analytics from '@/app/Analytics'
import type { Metadata, Viewport } from 'next'
import { buildMetadata } from '@/app/seo.metadata'
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
} from '@/app/seo.config'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }))
}

export const viewport: Viewport = {
  themeColor: '#020A1B',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  return buildMetadata({ locale: params.lang || DEFAULT_LOCALE, path: '/' })
}

/**
 * Site-wide JSON-LD: WebSite + Organization + BreadcrumbList anchor.
 * Per-page JSON-LD (SportsEvent / Stadium / FAQ) is injected by each page.
 */
function buildSiteJsonLd(lang: string) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: lang,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/${lang}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: OG_IMAGE,
      sameAs: [
        'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026',
      ],
    },
  ]
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = params.lang || DEFAULT_LOCALE
  const jsonLd = buildSiteJsonLd(lang)

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3737000364381871"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="WC 2026" />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H0MFTF8LDE"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H0MFTF8LDE', {
              page_path: window.location.pathname
            });
          `}
        </Script>
        <React.Suspense>
          <Analytics />
        </React.Suspense>
        <Providers initialLang={lang}>{children}</Providers>
      </body>
    </html>
  )
}
