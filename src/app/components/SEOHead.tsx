/**
 * SEOHead — Manages all document <head> meta tags
 *
 * Next.js migration path:
 *   Replace this component with Next.js Metadata API in `app/layout.tsx`:
 *
 *   export const metadata: Metadata = {
 *     title: { template: '%s | FIFA World Cup 2026', default: 'FIFA World Cup 2026' },
 *     description: '...',
 *     openGraph: { ... },
 *     twitter: { ... },
 *   };
 *
 *   For dynamic per-page metadata use `generateMetadata()` in page.tsx files.
 */

import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import type { LangCode } from '../i18n/translations';

const SITE_URL = 'https://worldcup2026.example.com';
const OG_IMAGE = `${SITE_URL}/og-cover.jpg`;

// Per-language SEO content
const SEO_CONTENT: Record<LangCode, {
  title: string;
  description: string;
  keywords: string;
  ogLocale: string;
}> = {
  zh: {
    title: '2026 FIFA 世界杯 | 美国·加拿大·墨西哥 | 官方场馆与赛程',
    description:
      '2026 FIFA 世界杯官方信息门户。探索16座比赛场馆（包括大都会人寿球场、阿兹特克球场等）、48支参赛球队小组赛积分榜、十六强至决赛完整淘汰赛对阵图。美国、加拿大、墨西哥联合举办，2026年6月11日开幕。',
    keywords:
      '2026世界杯,FIFA世界杯2026,美国加拿大墨西哥世界杯,世界杯场馆,世界杯赛程,小组赛积分,淘汰赛,大都会人寿球场,阿兹特克球场,世界杯球队,足球世界杯,FIFA 2026',
    ogLocale: 'zh_CN',
  },
  en: {
    title: '2026 FIFA World Cup | USA · Canada · Mexico | Venues & Tournament',
    description:
      'Official hub for the 2026 FIFA World Cup hosted across USA, Canada & Mexico. Explore 16 match venues including MetLife Stadium & Estadio Azteca, group stage standings for 48 teams across 12 groups, and the full knockout bracket from Round of 16 to the Grand Final.',
    keywords:
      'FIFA World Cup 2026, World Cup 2026, USA Canada Mexico World Cup, World Cup venues, World Cup schedule, group stage standings, knockout bracket, MetLife Stadium, Estadio Azteca, World Cup teams, soccer World Cup, football World Cup, FIFA 2026',
    ogLocale: 'en_US',
  },
  ja: {
    title: '2026 FIFAワールドカップ | アメリカ・カナダ・メキシコ | 会場・試合情報',
    description:
      '2026 FIFAワールドカップの公式情報ポータル。アメリカ・カナダ・メキシコの16会場、48チームのグループステージ順位表、ラウンド16から決勝までのトーナメント対戦表をご覧いただけます。',
    keywords:
      'FIFAワールドカップ2026,ワールドカップ2026,サッカーワールドカップ,会場,グループステージ,ノックアウト,トーナメント,メトライフスタジアム,アステカスタジアム',
    ogLocale: 'ja_JP',
  },
  ko: {
    title: '2026 FIFA 월드컵 | 미국·캐나다·멕시코 | 경기장 및 토너먼트',
    description:
      '2026 FIFA 월드컵 공식 정보 포털. 미국·캐나다·멕시코 16개 경기장, 48개 팀 조별리그 순위, 16강부터 결승까지의 토너먼트 대진표를 확인하세요.',
    keywords:
      'FIFA 월드컵 2026,월드컵 2026,미국 캐나다 멕시코 월드컵,경기장,조별리그,토너먼트,메트라이프 스타디움,아스테카 스타디움',
    ogLocale: 'ko_KR',
  },
  pt: {
    title: 'Copa do Mundo FIFA 2026 | EUA · Canadá · México | Estádios e Torneio',
    description:
      'Portal oficial da Copa do Mundo FIFA 2026 nos EUA, Canadá e México. Explore os 16 estádios oficiais, tabelas da fase de grupos com 48 seleções e o chaveamento completo das oitavas até a grande final.',
    keywords:
      'Copa do Mundo FIFA 2026, Copa do Mundo 2026, EUA Canadá México futebol, estádios Copa do Mundo, fase de grupos, eliminatórias, MetLife Stadium, Estadio Azteca, seleções, futebol',
    ogLocale: 'pt_BR',
  },
  es: {
    title: 'Copa Mundial FIFA 2026 | EE.UU. · Canadá · México | Estadios y Torneo',
    description:
      'Portal oficial de la Copa Mundial FIFA 2026 en EE.UU., Canadá y México. Explora los 16 estadios oficiales, la tabla de posiciones de la fase de grupos con 48 selecciones y el cuadro completo desde octavos hasta la gran final.',
    keywords:
      'Copa Mundial FIFA 2026, Mundial 2026, EE.UU. Canadá México fútbol, estadios Mundial, fase de grupos, eliminatorias, MetLife Stadium, Estadio Azteca, selecciones, fútbol',
    ogLocale: 'es_ES',
  },
};

// JSON-LD Structured Data (schema.org SportsSeries)
// Next.js: extract this to generateMetadata() or a separate <script> in layout
function buildJsonLd(lang: LangCode) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: '2026 FIFA World Cup',
    alternateName: ['FIFA World Cup 2026', '2026 世界杯', 'Copa Mundial 2026', 'Coupe du Monde 2026'],
    sport: 'Soccer',
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    location: [
      {
        '@type': 'Place',
        name: 'MetLife Stadium',
        address: { '@type': 'PostalAddress', addressCountry: 'US', addressLocality: 'East Rutherford', addressRegion: 'NJ' },
      },
      {
        '@type': 'Place',
        name: 'Estadio Azteca',
        address: { '@type': 'PostalAddress', addressCountry: 'MX', addressLocality: 'Mexico City' },
      },
      {
        '@type': 'Place',
        name: 'BC Place',
        address: { '@type': 'PostalAddress', addressCountry: 'CA', addressLocality: 'Vancouver' },
      },
    ],
    organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
    competitor: { '@type': 'SportsTeam', name: '48 National Teams' },
    url: SITE_URL,
    image: OG_IMAGE,
    description: SEO_CONTENT[lang].description,
    inLanguage: lang,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  });
}

export function SEOHead() {
  const { lang } = useLanguage();
  const seo = SEO_CONTENT[lang];

  return (
    <Helmet>
      {/* ── Primary Meta ────────────────────────────────────────── */}
      <html lang={lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="author" content="FIFA World Cup 2026" />
      <link rel="canonical" href={SITE_URL} />

      {/* ── Alternate Language Links (hreflang) ─────────────────── */}
      <link rel="alternate" hrefLang="zh" href={`${SITE_URL}?lang=zh`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}?lang=en`} />
      <link rel="alternate" hrefLang="ja" href={`${SITE_URL}?lang=ja`} />
      <link rel="alternate" hrefLang="ko" href={`${SITE_URL}?lang=ko`} />
      <link rel="alternate" hrefLang="pt" href={`${SITE_URL}?lang=pt`} />
      <link rel="alternate" hrefLang="es" href={`${SITE_URL}?lang=es`} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />

      {/* ── Open Graph ──────────────────────────────────────────── */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={seo.ogLocale} />
      <meta property="og:site_name" content="FIFA World Cup 2026" />

      {/* ── Twitter / X Card ────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@FIFAWorldCup" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* ── PWA / Mobile Theme ──────────────────────────────────── */}
      <meta name="theme-color" content="#020A1B" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="WC 2026" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      {/* ── Sport-Specific Meta ─────────────────────────────────── */}
      <meta name="news_keywords" content="FIFA,World Cup 2026,football,soccer,WorldCup2026,USA,Canada,Mexico,MetLife,Azteca" />
      <meta name="category" content="Sports / Football / FIFA World Cup" />

      {/* ── JSON-LD Structured Data ─────────────────────────────── */}
      <script type="application/ld+json">{buildJsonLd(lang)}</script>
    </Helmet>
  );
}
