import { LangCode } from './translations';

// Team name translations keyed by English name
const teamNamesMap: Record<string, Partial<Record<LangCode, string>>> = {
  'USA':                   { zh: '美国',           ja: 'アメリカ',       ko: '미국',             es: 'EE.UU.',         pt: 'EUA' },
  'Uruguay':               { zh: '乌拉圭',         ja: 'ウルグアイ',     ko: '우루과이',         es: 'Uruguay',        pt: 'Uruguai' },
  'Bolivia':               { zh: '玻利维亚',       ja: 'ボリビア',       ko: '볼리비아',         es: 'Bolivia',        pt: 'Bolívia' },
  'Saudi Arabia':          { zh: '沙特阿拉伯',     ja: 'サウジアラビア', ko: '사우디아라비아',   es: 'Arabia Saudita', pt: 'Arábia Saudita' },
  'Canada':                { zh: '加拿大',         ja: 'カナダ',         ko: '캐나다',           es: 'Canadá',         pt: 'Canadá' },
  'Morocco':               { zh: '摩洛哥',         ja: 'モロッコ',       ko: '모로코',           es: 'Marruecos',      pt: 'Marrocos' },
  'Japan':                 { zh: '日本',           ja: '日本',           ko: '일본',             es: 'Japón',          pt: 'Japão' },
  'Guatemala':             { zh: '危地马拉',       ja: 'グアテマラ',     ko: '과테말라',         es: 'Guatemala',      pt: 'Guatemala' },
  'Mexico':                { zh: '墨西哥',         ja: 'メキシコ',       ko: '멕시코',           es: 'México',         pt: 'México' },
  'Poland':                { zh: '波兰',           ja: 'ポーランド',     ko: '폴란드',           es: 'Polonia',        pt: 'Polônia' },
  'Cameroon':              { zh: '喀麦隆',         ja: 'カメルーン',     ko: '카메룬',           es: 'Camerún',        pt: 'Camarões' },
  'Trinidad & Tobago':     { zh: '特立尼达和多巴哥', ja: 'トリニダード・トバゴ', ko: '트리니다드 토바고', es: 'Trinidad y Tobago', pt: 'Trinidad e Tobago' },
  'Brazil':                { zh: '巴西',           ja: 'ブラジル',       ko: '브라질',           es: 'Brasil',         pt: 'Brasil' },
  'Germany':               { zh: '德国',           ja: 'ドイツ',         ko: '독일',             es: 'Alemania',       pt: 'Alemanha' },
  'Switzerland':           { zh: '瑞士',           ja: 'スイス',         ko: '스위스',           es: 'Suiza',          pt: 'Suíça' },
  'New Zealand':           { zh: '新西兰',         ja: 'ニュージーランド', ko: '뉴질랜드',        es: 'Nueva Zelanda',  pt: 'Nova Zelândia' },
  'France':                { zh: '法国',           ja: 'フランス',       ko: '프랑스',           es: 'Francia',        pt: 'França' },
  'Argentina':             { zh: '阿根廷',         ja: 'アルゼンチン',   ko: '아르헨티나',       es: 'Argentina',      pt: 'Argentina' },
  'South Korea':           { zh: '韩国',           ja: '韓国',           ko: '대한민국',         es: 'Corea del Sur',  pt: 'Coreia do Sul' },
  'Honduras':              { zh: '洪都拉斯',       ja: 'ホンジュラス',   ko: '온두라스',         es: 'Honduras',       pt: 'Honduras' },
  'Spain':                 { zh: '西班牙',         ja: 'スペイン',       ko: '스페인',           es: 'España',         pt: 'Espanha' },
  'Colombia':              { zh: '哥伦比亚',       ja: 'コロンビア',     ko: '콜롬비아',         es: 'Colombia',       pt: 'Colômbia' },
  'Egypt':                 { zh: '埃及',           ja: 'エジプト',       ko: '이집트',           es: 'Egipto',         pt: 'Egito' },
  'El Salvador':           { zh: '萨尔瓦多',       ja: 'エルサルバドル', ko: '엘살바도르',       es: 'El Salvador',    pt: 'El Salvador' },
  'England':               { zh: '英格兰',         ja: 'イングランド',   ko: '잉글랜드',         es: 'Inglaterra',     pt: 'Inglaterra' },
  'Netherlands':           { zh: '荷兰',           ja: 'オランダ',       ko: '네덜란드',         es: 'Países Bajos',   pt: 'Países Baixos' },
  'Iraq':                  { zh: '伊拉克',         ja: 'イラク',         ko: '이라크',           es: 'Irak',           pt: 'Iraque' },
  'Costa Rica':            { zh: '哥斯达黎加',     ja: 'コスタリカ',     ko: '코스타리카',       es: 'Costa Rica',     pt: 'Costa Rica' },
  'Portugal':              { zh: '葡萄牙',         ja: 'ポルトガル',     ko: '포르투갈',         es: 'Portugal',       pt: 'Portugal' },
  'Belgium':               { zh: '比利时',         ja: 'ベルギー',       ko: '벨기에',           es: 'Bélgica',        pt: 'Bélgica' },
  'Nigeria':               { zh: '尼日利亚',       ja: 'ナイジェリア',   ko: '나이지리아',       es: 'Nigeria',        pt: 'Nigéria' },
  'Cuba':                  { zh: '古巴',           ja: 'キューバ',       ko: '쿠바',             es: 'Cuba',           pt: 'Cuba' },
  'Italy':                 { zh: '意大利',         ja: 'イタリア',       ko: '이탈리아',         es: 'Italia',         pt: 'Itália' },
  'Croatia':               { zh: '克罗地亚',       ja: 'クロアチア',     ko: '크로아티아',       es: 'Croacia',        pt: 'Croácia' },
  'Iran':                  { zh: '伊朗',           ja: 'イラン',         ko: '이란',             es: 'Irán',           pt: 'Irã' },
  'Panama':                { zh: '巴拿马',         ja: 'パナマ',         ko: '파나마',           es: 'Panamá',         pt: 'Panamá' },
  'Serbia':                { zh: '塞尔维亚',       ja: 'セルビア',       ko: '세르비아',         es: 'Serbia',         pt: 'Sérvia' },
  'Australia':             { zh: '澳大利亚',       ja: 'オーストラリア', ko: '호주',             es: 'Australia',      pt: 'Austrália' },
  'Senegal':               { zh: '塞内加尔',       ja: 'セネガル',       ko: '세네갈',           es: 'Senegal',        pt: 'Senegal' },
  'Jamaica':               { zh: '牙买加',         ja: 'ジャマイカ',     ko: '자메이카',         es: 'Jamaica',        pt: 'Jamaica' },
  'Denmark':               { zh: '丹麦',           ja: 'デンマーク',     ko: '덴마크',           es: 'Dinamarca',      pt: 'Dinamarca' },
  'Ecuador':               { zh: '厄瓜多尔',       ja: 'エクアドル',     ko: '에콰도르',         es: 'Ecuador',        pt: 'Equador' },
  'Ghana':                 { zh: '加纳',           ja: 'ガーナ',         ko: '가나',             es: 'Ghana',          pt: 'Gana' },
  'Bahrain':               { zh: '巴林',           ja: 'バーレーン',     ko: '바레인',           es: 'Baréin',         pt: 'Bahrein' },
  'Turkey':                { zh: '土耳其',         ja: 'トルコ',         ko: '튀르키예',         es: 'Turquía',        pt: 'Turquia' },
  'Chile':                 { zh: '智利',           ja: 'チリ',           ko: '칠레',             es: 'Chile',          pt: 'Chile' },
  'Algeria':               { zh: '阿尔及利亚',     ja: 'アルジェリア',   ko: '알제리',           es: 'Argelia',        pt: 'Argélia' },
  'South Africa':          { zh: '南非',           ja: '南アフリカ',     ko: '남아프리카공화국', es: 'Sudáfrica',      pt: 'África do Sul' },
  'TBD':                   { zh: '待定',           ja: '未定',           ko: '미정',             es: 'Por definir',    pt: 'A definir' },
};

export function getTeamName(nameEn: string, lang: LangCode): string {
  const entry = teamNamesMap[nameEn];
  if (!entry) return nameEn;
  return entry[lang] ?? entry['en'] ?? nameEn;
}

// Short team names for narrow bracket cards
const shortNamesMap: Record<string, Partial<Record<LangCode, string>>> = {
  'Trinidad & Tobago':  { en: 'Trin. & Tob.', ja: 'トリニダード', ko: '트리니다드', es: 'Trinidad', pt: 'Trinidad' },
  'Saudi Arabia':       { en: 'Saudi Arabia', ja: 'サウジ',       ko: '사우디',     es: 'Arabia S.', pt: 'Arábia S.' },
  'New Zealand':        { en: 'New Zealand',  ja: 'NZ',           ko: '뉴질랜드' },
  'El Salvador':        { en: 'El Salvador',  ja: 'エルサルバドル' },
  'Costa Rica':         { en: 'Costa Rica' },
  'South Africa':       { en: 'South Africa', ja: '南ア',          ko: '남아공' },
  'South Korea':        { en: 'South Korea',  ja: '韓国',          ko: '대한민국' },
  'Netherlands':        { en: 'Netherlands' },
};

export function getShortTeamName(nameEn: string, lang: LangCode): string {
  const short = shortNamesMap[nameEn]?.[lang];
  if (short) return short;
  return getTeamName(nameEn, lang);
}
