import type { Metadata } from 'next';
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  OG_LOCALE_MAP,
  TWITTER_HANDLE,
  buildLanguageAlternates,
  buildUrl,
  type Locale,
} from './seo.config';
import { getSeo, type PageSeo } from './i18n/seo';

type PageKey = keyof ReturnType<typeof getSeo>['pages'];

interface BuildMetadataInput {
  /** Locale code from the URL segment ([lang]). */
  locale: string;
  /** Path under the locale, e.g. '/venues' or '/'. */
  path?: string;
  /** Which page-level SEO bundle to use; if omitted, falls back to bundle defaults. */
  pageKey?: PageKey;
  /** Optional explicit overrides. */
  override?: Partial<PageSeo> & { ogTitle?: string; ogDescription?: string };
}

/**
 * Build a fully-populated Next.js Metadata object for a given locale/page.
 * Handles canonical URL, hreflang alternates, Open Graph, Twitter and robots.
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const { locale, path = '/', pageKey, override } = input;
  const code = (locale || 'en').toLowerCase() as Locale;
  const bundle = getSeo(code);

  const page: PageSeo = pageKey
    ? bundle.pages[pageKey]
    : {
        title: bundle.defaultTitle,
        description: bundle.description,
        keywords: bundle.keywords,
      };

  const finalTitle = override?.title ?? page.title;
  const finalDescription = override?.description ?? page.description;
  const finalKeywords = override?.keywords ?? page.keywords;
  const canonical = buildUrl(code, path);

  return {
    metadataBase: new URL(SITE_URL),
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    category: 'Sports / Football / FIFA World Cup 2026',
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: canonical,
      title: override?.ogTitle ?? finalTitle,
      description: override?.ogDescription ?? finalDescription,
      locale: OG_LOCALE_MAP[code],
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: '2026 FIFA World Cup — USA · Canada · Mexico',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title: finalTitle,
      description: finalDescription,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    other: {
      'news_keywords': finalKeywords.slice(0, 10).join(','),
    },
  };
}

/** Convenience helper to access the bundle for use in rendered content (e.g. JSON-LD). */
export function getSeoBundle(locale: string) {
  return getSeo(locale);
}
