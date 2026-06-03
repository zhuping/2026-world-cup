/**
 * Multilingual SEO metadata, optimized for the 2026 FIFA World Cup
 * Google trending keywords across the USA / Canada / Mexico region
 * (kickoff: June 11 2026; final: July 19 2026 at MetLife Stadium).
 *
 * Trending themes incorporated (past-week trending in NA region):
 *   - "World Cup 2026 tickets" / "ticket prices"
 *   - "World Cup 2026 schedule" / "fixtures" / "match schedule"
 *   - "World Cup 2026 groups" / "group of death" / "draw results"
 *   - "host cities" + individual cities (NYC, LA, Dallas, Atlanta, Toronto, Vancouver, Mexico City)
 *   - "World Cup streaming" / "where to watch"
 *   - "World Cup 2026 opening match" / "Mexico vs South Africa"
 *   - "World Cup 2026 final" / "MetLife Stadium"
 *   - "Brazil vs Morocco" / "France vs Senegal" / "Netherlands vs Japan"
 */

import type { Locale } from '../seo.config';

export interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface SeoBundle {
  /** Used as <title> on the home page (full title). */
  defaultTitle: string;
  /** Template for inner pages: `%s | <siteTitle>`. */
  titleTemplate: string;
  siteTitle: string;
  /** Default description used when a page does not define its own. */
  description: string;
  /** Comma-joined keyword list. */
  keywords: string[];
  /** Per-page overrides (slug -> SEO). */
  pages: {
    home: PageSeo;
    venues: PageSeo;
    metlife: PageSeo;
    azteca: PageSeo;
    tournamentFormat: PageSeo;
    travelGuide: PageSeo;
  };
}

// ── EN (United States / Canada English / global default) ──────────────────────
const en: SeoBundle = {
  defaultTitle:
    '2026 FIFA World Cup: Schedule, Tickets, Groups, Host Cities & Venues',
  titleTemplate: '%s | 2026 FIFA World Cup Hub',
  siteTitle: '2026 FIFA World Cup Hub',
  description:
    'Your 2026 FIFA World Cup hub for the USA, Canada & Mexico tournament (June 11 – July 19, 2026). Live group stage standings, knockout bracket, full match schedule, all 16 host cities & venues, the MetLife Stadium final, and travel & ticket guides for fans.',
  keywords: [
    '2026 FIFA World Cup',
    'World Cup 2026',
    'World Cup 2026 schedule',
    'World Cup 2026 tickets',
    'World Cup 2026 fixtures',
    'World Cup 2026 groups',
    'World Cup 2026 draw',
    'World Cup 2026 host cities',
    'World Cup 2026 venues',
    'World Cup 2026 stadiums',
    'World Cup 2026 streaming',
    'where to watch World Cup 2026',
    'World Cup 2026 opening match',
    'World Cup 2026 final',
    'MetLife Stadium World Cup',
    'Estadio Azteca',
    'USA Canada Mexico World Cup',
    'June 11 2026 World Cup',
    'July 19 2026 World Cup final',
    '48 team World Cup',
    'FIFA 2026',
  ],
  pages: {
    home: {
      title:
        '2026 FIFA World Cup: Schedule, Tickets, Groups, Host Cities & Venues',
      description:
        'Official-style hub for the 2026 FIFA World Cup (USA · Canada · Mexico, June 11 – July 19, 2026). Browse the full match schedule, group stage standings for all 12 groups, the complete knockout bracket, every host city and the 16 official venues from MetLife Stadium to Estadio Azteca.',
      keywords: [
        '2026 FIFA World Cup',
        'World Cup 2026 schedule',
        'World Cup 2026 tickets',
        'World Cup 2026 groups',
        'World Cup 2026 host cities',
        'World Cup 2026 fixtures',
        'World Cup 2026 streaming',
        'World Cup 2026 opening match',
        'Mexico vs South Africa June 11',
        '2026 World Cup final MetLife',
        '48 team World Cup format',
      ],
    },
    venues: {
      title: '2026 World Cup Host Cities & Venues: All 16 Stadiums',
      description:
        'Complete 2026 FIFA World Cup venue guide: all 16 host stadiums across 11 US cities (New York/NJ, LA, Dallas, Atlanta, Houston, Miami, Philadelphia, San Francisco Bay Area, Kansas City, Seattle, Boston), 3 in Mexico (Mexico City, Guadalajara, Monterrey) and 2 in Canada (Toronto, Vancouver). Capacities, host roles and the venues hosting the opening match and final.',
      keywords: [
        'World Cup 2026 venues',
        'World Cup 2026 host cities',
        'World Cup 2026 stadiums',
        '16 host cities World Cup 2026',
        'MetLife Stadium',
        'AT&T Stadium World Cup',
        'SoFi Stadium World Cup',
        'Mercedes-Benz Stadium',
        'NRG Stadium Houston',
        'Hard Rock Stadium Miami',
        'Lincoln Financial Field',
        "Levi's Stadium",
        'GEHA Field at Arrowhead',
        'Lumen Field Seattle',
        'Gillette Stadium Boston',
        'BMO Field Toronto',
        'BC Place Vancouver',
        'Estadio Azteca Mexico City',
        'Estadio Akron Guadalajara',
        'Estadio BBVA Monterrey',
      ],
    },
    metlife: {
      title: 'MetLife Stadium: 2026 FIFA World Cup Final Venue (July 19)',
      description:
        'MetLife Stadium in East Rutherford, New Jersey will host the 2026 FIFA World Cup Final on July 19, 2026. Capacity ~82,500. Get directions from New York City, transit and match-day tips for the biggest match of World Cup 2026.',
      keywords: [
        'MetLife Stadium World Cup 2026',
        '2026 World Cup final venue',
        'July 19 2026 World Cup final',
        'MetLife Stadium tickets',
        'MetLife Stadium capacity',
        'New York World Cup 2026',
        'New Jersey World Cup 2026',
        'East Rutherford Stadium',
      ],
    },
    azteca: {
      title: 'Estadio Azteca: 2026 FIFA World Cup Opening Match Venue',
      description:
        'Estadio Azteca in Mexico City hosts the 2026 FIFA World Cup opening match on June 11, 2026 (Mexico vs South Africa). Capacity ~87,500. The only stadium to host three World Cups (1970, 1986, 2026). Travel and transit guide for fans.',
      keywords: [
        'Estadio Azteca World Cup 2026',
        '2026 World Cup opening match',
        'June 11 2026 World Cup',
        'Mexico vs South Africa June 11',
        'Estadio Azteca capacity',
        'Mexico City World Cup 2026',
        'Estadio Azteca tickets',
        'Tres mundiales Azteca',
      ],
    },
    tournamentFormat: {
      title: '2026 World Cup Format Explained: 48 Teams, 12 Groups, 104 Matches',
      description:
        'How the 48-team 2026 FIFA World Cup works: 12 groups of 4, top 2 plus the 8 best third-placed teams advance to a new Round of 32, then Round of 16, Quarter-finals, Semi-finals and the Final. 104 matches in total — full format breakdown.',
      keywords: [
        '2026 World Cup format',
        '48 team World Cup',
        'World Cup 2026 groups',
        'World Cup 2026 Round of 32',
        '2026 World Cup knockout',
        '104 matches World Cup 2026',
        'World Cup 2026 group stage',
        'World Cup 2026 third place advance',
        'group of death World Cup 2026',
      ],
    },
    travelGuide: {
      title: '2026 World Cup Travel Guide: Flights, Hotels, Transit & Tips',
      description:
        'Plan your 2026 FIFA World Cup trip across the USA, Canada and Mexico. Time zones, inter-city flights, host city transit, hotel booking strategy, visa & border tips (ESTA, eTA), and how to follow your team across multiple match locations.',
      keywords: [
        'World Cup 2026 travel guide',
        'World Cup 2026 hotels',
        'World Cup 2026 flights',
        'World Cup 2026 transportation',
        'USA Canada Mexico travel',
        'World Cup 2026 visa ESTA eTA',
        'host city transit World Cup',
        'World Cup 2026 itinerary',
      ],
    },
  },
};

// ── ES (Mexico / Latin America) ───────────────────────────────────────────────
const es: SeoBundle = {
  defaultTitle:
    'Copa Mundial FIFA 2026: Calendario, Boletos, Grupos, Sedes y Estadios',
  titleTemplate: '%s | Mundial 2026 EE.UU. · Canadá · México',
  siteTitle: 'Mundial 2026 EE.UU. · Canadá · México',
  description:
    'Guía del Mundial FIFA 2026 (EE.UU., Canadá y México · 11 jun – 19 jul 2026). Calendario completo, tabla de la fase de grupos, cuadro de eliminatorias, las 16 sedes oficiales y los estadios del partido inaugural y la final (Estadio Azteca y MetLife Stadium).',
  keywords: [
    'Mundial 2026',
    'Copa Mundial FIFA 2026',
    'Mundial 2026 calendario',
    'Mundial 2026 boletos',
    'Mundial 2026 grupos',
    'Mundial 2026 sedes',
    'Mundial 2026 estadios',
    'Mundial 2026 sorteo',
    'Mundial 2026 partido inaugural',
    'Mundial 2026 final',
    'Estadio Azteca Mundial 2026',
    'México vs Sudáfrica 11 junio',
    'EE.UU. Canadá México fútbol',
    'Mundial 48 equipos',
  ],
  pages: {
    home: {
      title:
        'Copa Mundial FIFA 2026: Calendario, Boletos, Grupos, Sedes y Estadios',
      description:
        'Tu guía del Mundial FIFA 2026 en EE.UU., Canadá y México (11 jun – 19 jul). Calendario, fase de grupos, eliminatorias, las 16 sedes oficiales, el partido inaugural en el Estadio Azteca y la final en MetLife Stadium.',
      keywords: [
        'Mundial 2026',
        'Mundial 2026 calendario',
        'Mundial 2026 partidos',
        'Mundial 2026 boletos',
        'Mundial 2026 grupos',
        'Mundial 2026 sedes',
        'México vs Sudáfrica 11 junio',
        'final Mundial 2026 MetLife',
      ],
    },
    venues: {
      title: 'Sedes y Estadios del Mundial 2026: las 16 ciudades anfitrionas',
      description:
        'Las 16 sedes oficiales del Mundial FIFA 2026: 11 ciudades en EE.UU. (NY/NJ, LA, Dallas, Atlanta, Houston, Miami, Filadelfia, Bahía de SF, Kansas City, Seattle, Boston), 3 en México (CDMX, Guadalajara, Monterrey) y 2 en Canadá (Toronto, Vancouver).',
      keywords: [
        'sedes Mundial 2026',
        'estadios Mundial 2026',
        'ciudades anfitrionas Mundial 2026',
        'Estadio Azteca',
        'Estadio Akron Guadalajara',
        'Estadio BBVA Monterrey',
        'MetLife Stadium',
      ],
    },
    metlife: {
      title: 'MetLife Stadium: Sede de la Final del Mundial 2026 (19 julio)',
      description:
        'MetLife Stadium (East Rutherford, Nueva Jersey) será la sede de la final del Mundial FIFA 2026 el 19 de julio. Capacidad ~82,500. Cómo llegar desde Nueva York y consejos para el día del partido.',
      keywords: [
        'MetLife Stadium Mundial 2026',
        'final Mundial 2026',
        '19 julio 2026 final',
        'Nueva York Mundial 2026',
        'Nueva Jersey Mundial 2026',
      ],
    },
    azteca: {
      title: 'Estadio Azteca: Sede del Partido Inaugural del Mundial 2026',
      description:
        'El Estadio Azteca (Ciudad de México) recibirá el partido inaugural del Mundial FIFA 2026 el 11 de junio: México vs Sudáfrica. Capacidad ~87,500. Único estadio en albergar tres Mundiales (1970, 1986, 2026).',
      keywords: [
        'Estadio Azteca Mundial 2026',
        'partido inaugural Mundial 2026',
        '11 junio Mundial 2026',
        'México vs Sudáfrica',
        'Ciudad de México Mundial',
        'tres mundiales Azteca',
      ],
    },
    tournamentFormat: {
      title: 'Formato del Mundial 2026: 48 selecciones, 12 grupos, 104 partidos',
      description:
        'Cómo funciona el nuevo Mundial de 48 selecciones: 12 grupos de 4, los 2 primeros y los 8 mejores terceros avanzan a 32avos, después octavos, cuartos, semifinales y final.',
      keywords: [
        'formato Mundial 2026',
        'Mundial 48 equipos',
        'fase de grupos Mundial 2026',
        '32avos Mundial 2026',
        'eliminatorias Mundial 2026',
        '104 partidos Mundial 2026',
        'grupo de la muerte Mundial 2026',
      ],
    },
    travelGuide: {
      title: 'Guía de Viaje Mundial 2026: vuelos, hoteles, transporte',
      description:
        'Planea tu viaje al Mundial 2026 en EE.UU., Canadá y México. Husos horarios, vuelos entre sedes, transporte público en cada ciudad, estrategia de hoteles y trámites de visado (ESTA, eTA).',
      keywords: [
        'guía viaje Mundial 2026',
        'hoteles Mundial 2026',
        'vuelos Mundial 2026',
        'transporte Mundial 2026',
        'visa ESTA eTA Mundial',
      ],
    },
  },
};

// ── PT (Brazil) ───────────────────────────────────────────────────────────────
const pt: SeoBundle = {
  defaultTitle:
    'Copa do Mundo FIFA 2026: Tabela, Ingressos, Grupos, Sedes e Estádios',
  titleTemplate: '%s | Copa do Mundo 2026 EUA · Canadá · México',
  siteTitle: 'Copa do Mundo 2026 EUA · Canadá · México',
  description:
    'Guia da Copa do Mundo FIFA 2026 (EUA, Canadá e México · 11 jun a 19 jul 2026). Tabela completa, classificação da fase de grupos, chaveamento das eliminatórias, as 16 sedes oficiais e os estádios do jogo de abertura e da final (Estadio Azteca e MetLife Stadium). Brasil x Marrocos, sorteo e ingressos.',
  keywords: [
    'Copa do Mundo 2026',
    'Copa do Mundo FIFA 2026',
    'Copa 2026 tabela',
    'Copa 2026 ingressos',
    'Copa 2026 grupos',
    'Copa 2026 sedes',
    'Copa 2026 estádios',
    'sorteio Copa 2026',
    'Brasil x Marrocos Copa 2026',
    'Copa 2026 abertura',
    'Copa 2026 final',
    'Estadio Azteca',
    'MetLife Stadium',
    'EUA Canadá México futebol',
    'Copa 48 seleções',
  ],
  pages: {
    home: {
      title:
        'Copa do Mundo FIFA 2026: Tabela, Ingressos, Grupos, Sedes e Estádios',
      description:
        'Seu guia da Copa do Mundo 2026 nos EUA, Canadá e México (11/06 a 19/07). Tabela, fase de grupos, eliminatórias, 16 sedes oficiais, jogo de abertura no Estadio Azteca e final no MetLife Stadium. Brasil x Marrocos é um dos confrontos da fase de grupos.',
      keywords: [
        'Copa do Mundo 2026',
        'Copa 2026 tabela',
        'Copa 2026 ingressos',
        'Copa 2026 grupos',
        'Brasil x Marrocos',
        'Copa 2026 sedes',
        'final Copa 2026 MetLife',
      ],
    },
    venues: {
      title: 'Sedes e Estádios da Copa 2026: as 16 cidades-sede',
      description:
        'As 16 sedes oficiais da Copa do Mundo FIFA 2026: 11 cidades nos EUA (NY/NJ, LA, Dallas, Atlanta, Houston, Miami, Filadélfia, Baía de SF, Kansas City, Seattle, Boston), 3 no México (CDMX, Guadalajara, Monterrey) e 2 no Canadá (Toronto, Vancouver).',
      keywords: [
        'sedes Copa 2026',
        'estádios Copa 2026',
        'cidades sede Copa 2026',
        'Estadio Azteca',
        'MetLife Stadium',
        'BMO Field Toronto',
        'BC Place Vancouver',
      ],
    },
    metlife: {
      title: 'MetLife Stadium: sede da final da Copa 2026 (19 de julho)',
      description:
        'O MetLife Stadium (East Rutherford, Nova Jersey) sediará a final da Copa do Mundo FIFA 2026 em 19 de julho. Capacidade ~82.500. Como chegar desde Nova York e dicas para o dia do jogo.',
      keywords: [
        'MetLife Stadium Copa 2026',
        'final Copa 2026',
        '19 julho 2026 final',
        'Nova York Copa 2026',
      ],
    },
    azteca: {
      title: 'Estadio Azteca: sede do jogo de abertura da Copa 2026',
      description:
        'O Estadio Azteca (Cidade do México) recebe o jogo de abertura da Copa do Mundo FIFA 2026 em 11 de junho: México x África do Sul. Único estádio a sediar três Copas (1970, 1986, 2026).',
      keywords: [
        'Estadio Azteca Copa 2026',
        'abertura Copa 2026',
        '11 de junho Copa 2026',
        'México x África do Sul',
        'tres Mundiales Azteca',
      ],
    },
    tournamentFormat: {
      title: 'Formato da Copa 2026: 48 seleções, 12 grupos, 104 jogos',
      description:
        'Como funciona a Copa de 48 seleções: 12 grupos de 4, os 2 primeiros e os 8 melhores terceiros avançam para uma nova fase de 32, depois oitavas, quartas, semifinais e final.',
      keywords: [
        'formato Copa 2026',
        'Copa 48 seleções',
        'fase de grupos Copa 2026',
        'fase de 32 Copa 2026',
        'eliminatórias Copa 2026',
      ],
    },
    travelGuide: {
      title: 'Guia de Viagem Copa 2026: voos, hotéis, transporte',
      description:
        'Planeje sua viagem para a Copa 2026 nos EUA, Canadá e México. Fusos horários, voos entre sedes, transporte público em cada cidade e dicas de visto (ESTA, eTA).',
      keywords: [
        'guia viagem Copa 2026',
        'hotéis Copa 2026',
        'voos Copa 2026',
        'visto ESTA eTA Copa',
      ],
    },
  },
};

// ── ZH (Chinese) ──────────────────────────────────────────────────────────────
const zh: SeoBundle = {
  defaultTitle: '2026 FIFA 世界杯：赛程、门票、分组、主办城市与场馆',
  titleTemplate: '%s | 2026 FIFA 世界杯（美加墨）',
  siteTitle: '2026 FIFA 世界杯（美加墨）',
  description:
    '2026 FIFA 世界杯一站式指南（美国·加拿大·墨西哥，2026 年 6 月 11 日至 7 月 19 日）：完整赛程、12 组小组赛积分、淘汰赛对阵图、16 座主办城市与场馆、阿兹特克球场揭幕战和大都会人寿球场决赛信息、门票与观赛攻略。',
  keywords: [
    '2026世界杯',
    'FIFA世界杯2026',
    '2026世界杯赛程',
    '2026世界杯门票',
    '2026世界杯分组',
    '2026世界杯抽签',
    '2026世界杯场馆',
    '2026世界杯主办城市',
    '美加墨世界杯',
    '世界杯揭幕战',
    '墨西哥vs南非',
    '世界杯决赛 大都会人寿球场',
    '阿兹特克球场',
    '48队世界杯',
    '世界杯直播',
  ],
  pages: {
    home: {
      title: '2026 FIFA 世界杯：赛程、门票、分组、主办城市与场馆',
      description:
        '2026 FIFA 世界杯一站式指南：6 月 11 日揭幕、7 月 19 日决赛。提供完整赛程、小组赛积分、十六强至决赛淘汰赛对阵图、16 座主办城市与场馆、阿兹特克球场揭幕战与大都会人寿球场决赛攻略。',
      keywords: [
        '2026世界杯',
        '2026世界杯赛程',
        '2026世界杯门票',
        '2026世界杯分组',
        '2026世界杯主办城市',
        '墨西哥vs南非揭幕战',
        '世界杯决赛',
        '美加墨世界杯',
      ],
    },
    venues: {
      title: '2026 世界杯主办城市与场馆：16 座官方球场',
      description:
        '2026 世界杯 16 座官方比赛场馆：美国 11 座（纽约/新泽西、洛杉矶、达拉斯、亚特兰大、休斯顿、迈阿密、费城、旧金山湾区、堪萨斯城、西雅图、波士顿）、墨西哥 3 座（墨西哥城、瓜达拉哈拉、蒙特雷）、加拿大 2 座（多伦多、温哥华）。',
      keywords: [
        '2026世界杯场馆',
        '2026世界杯主办城市',
        '世界杯球场',
        '大都会人寿球场',
        'AT&T球场',
        'SoFi球场',
        'BMO球场 多伦多',
        'BC Place 温哥华',
        '阿兹特克球场',
        'Akron球场 瓜达拉哈拉',
      ],
    },
    metlife: {
      title: '大都会人寿球场：2026 世界杯决赛球场（7 月 19 日）',
      description:
        '位于新泽西州东卢瑟福的大都会人寿球场（MetLife Stadium）将举办 2026 FIFA 世界杯决赛，时间为 2026 年 7 月 19 日。容量约 82,500。提供从纽约市的交通指引和决赛日观赛贴士。',
      keywords: [
        '大都会人寿球场',
        'MetLife Stadium',
        '2026世界杯决赛',
        '7月19日 决赛',
        '纽约 世界杯',
      ],
    },
    azteca: {
      title: '阿兹特克球场：2026 世界杯揭幕战球场（6 月 11 日）',
      description:
        '位于墨西哥城的阿兹特克球场（Estadio Azteca）将举办 2026 FIFA 世界杯揭幕战（墨西哥 vs 南非，6 月 11 日）。容量约 87,500，是史上唯一三届承办世界杯（1970、1986、2026）的球场。',
      keywords: [
        '阿兹特克球场',
        'Estadio Azteca',
        '2026世界杯揭幕战',
        '6月11日 揭幕战',
        '墨西哥vs南非',
        '墨西哥城世界杯',
      ],
    },
    tournamentFormat: {
      title: '2026 世界杯赛制：48 队、12 组、104 场比赛',
      description:
        '2026 世界杯 48 队全新赛制详解：12 个小组每组 4 队，每组前两名加 8 个成绩最佳的小组第三名共 32 队晋级新增的 32 强，随后 16 强、8 强、4 强与决赛。共 104 场比赛。',
      keywords: [
        '2026世界杯赛制',
        '48队世界杯',
        '小组赛',
        '32强',
        '淘汰赛',
        '104场比赛',
        '世界杯死亡之组',
      ],
    },
    travelGuide: {
      title: '2026 世界杯观赛旅行攻略：机票、酒店、交通',
      description:
        '美加墨观赛行程规划：跨时区赛程提醒、跨城航班、各主办城市公共交通、酒店预订策略、签证（ESTA / eTA）准备。',
      keywords: [
        '2026世界杯旅行攻略',
        '2026世界杯酒店',
        '2026世界杯机票',
        '2026世界杯交通',
        '美加墨签证',
      ],
    },
  },
};

// ── JA (Japan) ────────────────────────────────────────────────────────────────
const ja: SeoBundle = {
  defaultTitle:
    '2026 FIFA ワールドカップ：日程、チケット、組分け、開催都市・会場',
  titleTemplate: '%s | 2026 FIFA ワールドカップ（米加墨）',
  siteTitle: '2026 FIFA ワールドカップ（米加墨）',
  description:
    '2026 FIFA ワールドカップ完全ガイド（アメリカ・カナダ・メキシコ／2026 年 6 月 11 日〜7 月 19 日）。日程、グループステージ順位、決勝トーナメント表、16 開催都市・会場、メトライフ・スタジアムでの決勝、開幕戦のアステカ・スタジアム、日本代表の組（オランダ）情報まで。',
  keywords: [
    '2026ワールドカップ',
    'FIFAワールドカップ2026',
    'ワールドカップ2026 日程',
    'ワールドカップ2026 チケット',
    'ワールドカップ2026 組分け',
    'ワールドカップ2026 抽選',
    'ワールドカップ2026 会場',
    'ワールドカップ2026 開催都市',
    '米加墨ワールドカップ',
    '日本代表 ワールドカップ2026',
    'オランダ対日本',
    'メトライフ・スタジアム',
    'アステカ・スタジアム',
    '48チーム ワールドカップ',
  ],
  pages: {
    home: {
      title:
        '2026 FIFA ワールドカップ：日程、チケット、組分け、開催都市・会場',
      description:
        '米加墨ワールドカップ 2026（6/11〜7/19）の総合ガイド。日程、グループステージ、決勝トーナメント、16 開催都市・会場、開幕戦と決勝、日本代表（オランダ戦）情報。',
      keywords: [
        '2026ワールドカップ',
        'ワールドカップ2026 日程',
        'ワールドカップ2026 チケット',
        'ワールドカップ2026 組分け',
        '日本代表 ワールドカップ',
        'オランダ対日本',
        '米加墨 ワールドカップ',
      ],
    },
    venues: {
      title: '2026 ワールドカップ開催都市・会場：16 スタジアム',
      description:
        '2026 FIFA ワールドカップの 16 公式会場：アメリカ 11 都市、メキシコ 3 都市（メキシコシティ・グアダラハラ・モンテレイ）、カナダ 2 都市（トロント・バンクーバー）。',
      keywords: [
        'ワールドカップ2026 会場',
        '開催都市 ワールドカップ2026',
        'メトライフ・スタジアム',
        'アステカ・スタジアム',
      ],
    },
    metlife: {
      title: 'メトライフ・スタジアム：2026 ワールドカップ決勝会場（7/19）',
      description:
        'ニュージャージー州イーストラザフォードのメトライフ・スタジアムが 2026 FIFA ワールドカップ決勝（2026/7/19）を開催。収容約 82,500。',
      keywords: [
        'メトライフ・スタジアム',
        '2026ワールドカップ決勝',
        '7月19日 決勝',
        'ニューヨーク ワールドカップ',
      ],
    },
    azteca: {
      title: 'アステカ・スタジアム：2026 ワールドカップ開幕戦会場（6/11）',
      description:
        'メキシコシティのアステカ・スタジアムが 2026 FIFA ワールドカップ開幕戦（メキシコ対南アフリカ、6/11）を開催。収容約 87,500。',
      keywords: [
        'アステカ・スタジアム',
        '2026ワールドカップ開幕戦',
        '6月11日 開幕戦',
        'メキシコ対南アフリカ',
      ],
    },
    tournamentFormat: {
      title: '2026 ワールドカップ大会方式：48 チーム・12 組・104 試合',
      description:
        '48 チーム化の新方式：12 組 × 4 チーム、各組上位 2 チームと成績最良の 3 位 8 チームが新設のラウンド 32 へ進出、以降ラウンド 16・準々決勝・準決勝・決勝。',
      keywords: [
        'ワールドカップ2026 大会方式',
        '48チーム ワールドカップ',
        'グループステージ',
        'ラウンド32',
        '決勝トーナメント',
      ],
    },
    travelGuide: {
      title: '2026 ワールドカップ旅行ガイド：航空券・ホテル・移動',
      description:
        '米加墨観戦旅行のプランニング：時差、都市間フライト、公共交通、ホテル戦略、ESTA / eTA 等の入国手続き。',
      keywords: [
        'ワールドカップ2026 旅行',
        'ワールドカップ2026 ホテル',
        'ESTA eTA',
        '米加墨 入国',
      ],
    },
  },
};

// ── KO (Korea) ────────────────────────────────────────────────────────────────
const ko: SeoBundle = {
  defaultTitle:
    '2026 FIFA 월드컵: 일정·티켓·조 편성·개최 도시·경기장',
  titleTemplate: '%s | 2026 FIFA 월드컵 (미국·캐나다·멕시코)',
  siteTitle: '2026 FIFA 월드컵 (미국·캐나다·멕시코)',
  description:
    '2026 FIFA 월드컵 종합 가이드 (미국·캐나다·멕시코, 2026년 6월 11일~7월 19일). 전체 일정, 조별리그 순위, 결선 토너먼트 대진표, 16개 개최 도시 및 경기장, 한국 대표팀(체코·멕시코·남아공) 정보, MetLife Stadium 결승, Estadio Azteca 개막전 안내.',
  keywords: [
    '2026 월드컵',
    'FIFA 월드컵 2026',
    '2026 월드컵 일정',
    '2026 월드컵 티켓',
    '2026 월드컵 조편성',
    '2026 월드컵 조추첨',
    '2026 월드컵 경기장',
    '2026 월드컵 개최도시',
    '미국 캐나다 멕시코 월드컵',
    '한국 월드컵 2026',
    '한국 대 체코',
    'MetLife Stadium',
    'Estadio Azteca',
    '48개국 월드컵',
  ],
  pages: {
    home: {
      title: '2026 FIFA 월드컵: 일정·티켓·조 편성·개최 도시·경기장',
      description:
        '2026 FIFA 월드컵(미국·캐나다·멕시코, 6/11~7/19) 종합 가이드. 일정, 조별리그, 결선 토너먼트, 16개 개최 도시·경기장, 한국 대표팀 일정, 개막전과 결승 정보를 한 곳에서 확인하세요.',
      keywords: [
        '2026 월드컵',
        '2026 월드컵 일정',
        '2026 월드컵 티켓',
        '2026 월드컵 조편성',
        '한국 월드컵 2026',
        '한국 대 체코',
        '미국 캐나다 멕시코 월드컵',
      ],
    },
    venues: {
      title: '2026 월드컵 개최 도시·경기장: 16개 공식 스타디움',
      description:
        '2026 FIFA 월드컵 16개 공식 경기장: 미국 11개 도시, 멕시코 3개 도시(멕시코시티·과달라하라·몬테레이), 캐나다 2개 도시(토론토·밴쿠버).',
      keywords: [
        '2026 월드컵 경기장',
        '월드컵 개최도시',
        'MetLife 스타디움',
        '아스테카 스타디움',
      ],
    },
    metlife: {
      title: 'MetLife 스타디움: 2026 월드컵 결승 경기장(7/19)',
      description:
        '뉴저지주 이스트러더퍼드의 MetLife 스타디움이 2026 FIFA 월드컵 결승(2026/7/19)을 개최합니다. 수용 인원 약 82,500.',
      keywords: [
        'MetLife 스타디움',
        '2026 월드컵 결승',
        '7월 19일 결승',
        '뉴욕 월드컵',
      ],
    },
    azteca: {
      title: '아스테카 스타디움: 2026 월드컵 개막전 경기장(6/11)',
      description:
        '멕시코시티의 아스테카 스타디움이 2026 FIFA 월드컵 개막전(멕시코 대 남아프리카공화국, 6/11)을 개최합니다. 수용 인원 약 87,500.',
      keywords: [
        '아스테카 스타디움',
        '2026 월드컵 개막전',
        '6월 11일 개막전',
        '멕시코 대 남아공',
      ],
    },
    tournamentFormat: {
      title: '2026 월드컵 대회 방식: 48개국, 12개 조, 104경기',
      description:
        '48개국 새 방식: 12개 조×4팀, 각 조 1·2위와 3위 중 8팀이 신설 32강에 진출, 이후 16강·8강·4강·결승.',
      keywords: [
        '2026 월드컵 대회방식',
        '48개국 월드컵',
        '조별리그',
        '32강',
        '결선 토너먼트',
      ],
    },
    travelGuide: {
      title: '2026 월드컵 여행 가이드: 항공권·호텔·교통',
      description:
        '미국·캐나다·멕시코 관전 여행 계획. 시차, 도시 간 항공편, 도시별 대중교통, 호텔 전략, ESTA / eTA 입국 절차.',
      keywords: [
        '2026 월드컵 여행',
        '월드컵 호텔',
        'ESTA eTA',
        '미국 입국',
      ],
    },
  },
};

export const SEO_DICT: Record<Locale, SeoBundle> = { en, es, pt, zh, ja, ko };

export function getSeo(locale: string): SeoBundle {
  const code = (locale || 'en').toLowerCase() as Locale;
  return SEO_DICT[code] || SEO_DICT.en;
}
