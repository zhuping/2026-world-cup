/**
 * Centralized SEO configuration.
 *
 * Keep all global SEO constants here so individual pages stay focused on
 * page-specific copy.
 */

export const SITE_URL = 'https://2026-world-cup-beta.vercel.app';
export const SITE_NAME = 'FIFA World Cup 2026 Hub';
export const DEFAULT_LOCALE = 'en';
export const TWITTER_HANDLE = '@FIFAWorldCup';
export const OG_IMAGE = `${SITE_URL}/og-cover.jpg`;

export const SUPPORTED_LOCALES = ['en', 'es', 'pt', 'zh', 'ja', 'ko'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

// Map our short locale codes -> full IETF tags used in og:locale / hreflang
export const OG_LOCALE_MAP: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_MX',
  pt: 'pt_BR',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
};

export const HREFLANG_MAP: Record<Locale, string> = {
  en: 'en',
  es: 'es',
  pt: 'pt',
  zh: 'zh',
  ja: 'ja',
  ko: 'ko',
};

/** Build a fully-qualified URL for a given locale + path. */
export function buildUrl(locale: Locale | string, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const suffix = cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '');
  return `${SITE_URL}/${locale}${suffix}`;
}

/** Build the alternate languages map used in Next.js Metadata `alternates`. */
export function buildLanguageAlternates(path: string = ''): Record<string, string> {
  const alts: Record<string, string> = {};
  SUPPORTED_LOCALES.forEach((loc) => {
    alts[HREFLANG_MAP[loc]] = buildUrl(loc, path);
  });
  alts['x-default'] = buildUrl(DEFAULT_LOCALE, path);
  return alts;
}
