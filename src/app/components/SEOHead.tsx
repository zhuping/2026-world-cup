/**
 * SEOHead — DEPRECATED in favor of Next.js Metadata API.
 *
 * All <head> SEO tags (title, description, keywords, canonical, hreflang,
 * Open Graph, Twitter, robots, viewport, structured data) are now produced by:
 *   - `src/app/[lang]/layout.tsx` -> generateMetadata() + WebSite/Organization JSON-LD
 *   - `src/app/[lang]/<route>/page.tsx` -> generateMetadata() + per-page JSON-LD
 *   - `src/app/seo.metadata.ts` (`buildMetadata`) -> centralized builder
 *   - `src/app/i18n/seo.ts` -> per-locale title/description/keywords (Google
 *     trending optimized for the USA · Canada · Mexico region).
 *
 * This component is kept as a no-op so existing imports do not break, and so
 * we do not double-emit meta tags via react-helmet-async on the client.
 */
export function SEOHead() {
  return null;
}
