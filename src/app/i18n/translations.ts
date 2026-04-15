export type LangCode = 'zh' | 'en' | 'ja' | 'ko' | 'pt' | 'es';

export interface Translation {
  langName: string;
  langFlag: string;
  nav: {
    venueMap: string;
    tournament: string;
    groupStage: string;
    knockout: string;
    menu: string;
    close: string;
    language: string;
  };
  venue: {
    sectionSubtitle: string;
    sectionTitle: string;
    sectionDesc: string;
    capacity: string;
    hoverHint: string;
    tapHint: string;
    legendUSA: string;
    legendCanada: string;
    legendMexico: string;
    countryLabels: { USA: string; Canada: string; Mexico: string };
    closeCard: string;
  };
  tournament: {
    sectionSubtitle: string;
    sectionTitle: string;
    groupStageTab: string;
    groupStageEn: string;
    knockoutTab: string;
    knockoutEn: string;
    completedLabel: string;
    completedValue: string;
    groupsLabel: string;
    groupsValue: string;
    qualifiedLabel: string;
    qualifiedValue: string;
    statusDone: string;
    statusUpcoming: string;
    statusTBD: string;
  };
  group: {
    roundsPlayed: string;
    headerRank: string;
    headerTeam: string;
    headerPlayed: string;
    headerGD: string;
    headerPoints: string;
    headerRecord: string;
    advanceHint: string;
    groupLabel: string;
    statsTeams: string;
    statsTeamsUnit: string;
    statsGroups: string;
    statsGroupsUnit: string;
    statsMatches: string;
    statsMatchesUnit: string;
    statsQualifiers: string;
    statsQualifiersUnit: string;
  };
  knockout: {
    roundOf16: string;
    roundOf16En: string;
    quarterFinals: string;
    quarterFinalsEn: string;
    semiFinals: string;
    semiFinalsEn: string;
    final: string;
    finalEn: string;
    tbd: string;
    scrollHint: string;
    penalties: string;
    progressR16: string;
    progressQF: string;
    progressSF: string;
    progressFinal: string;
    progressDone: string;
    progressUpcoming: string;
    progressDate: string;
    legendAdvanced: string;
    legendEliminated: string;
    legendUpcoming: string;
    legendFinal: string;
    venueLabel: string;
  };
  footer: {
    disclaimer: string;
    venuesUSA: string;
    venuesCanada: string;
    venuesMexico: string;
  };
}

const zh: Translation = {
  langName: '中文',
  langFlag: '🇨🇳',
  nav: {
    venueMap: '场馆地图',
    tournament: '赛事进程',
    groupStage: '小组赛',
    knockout: '淘汰赛',
    menu: '菜单',
    close: '关闭',
    language: '语言',
  },
  venue: {
    sectionSubtitle: 'USA · Canada · Mexico · 2026',
    sectionTitle: '2026 FIFA 世界杯 赛事场馆',
    sectionDesc: '美国 11座 · 加拿大 2座 · 墨西哥 3座 · 共 16 座比赛场馆',
    capacity: '容量',
    hoverHint: '鼠标悬停查看场馆详情',
    tapHint: '点击场馆图标查看详情',
    legendUSA: '美国 · 11座场馆',
    legendCanada: '加拿大 · 2座场馆',
    legendMexico: '墨西哥 · 3座场馆',
    countryLabels: { USA: 'UNITED STATES', Canada: 'CANADA', Mexico: 'MEXICO' },
    closeCard: '关闭',
  },
  tournament: {
    sectionSubtitle: 'Tournament Progress',
    sectionTitle: '赛事进程',
    groupStageTab: '小组赛',
    groupStageEn: 'Group Stage',
    knockoutTab: '淘汰赛',
    knockoutEn: 'Knockout Stage',
    completedLabel: '已完成',
    completedValue: '72场',
    groupsLabel: '小组',
    groupsValue: 'A-L · 12组',
    qualifiedLabel: '晋级',
    qualifiedValue: '32队出线',
    statusDone: '已结束',
    statusUpcoming: '即将进行',
    statusTBD: '待定',
  },
  group: {
    roundsPlayed: '已赛3轮',
    headerRank: '#',
    headerTeam: '球队',
    headerPlayed: '赛',
    headerGD: '净胜',
    headerPoints: '积分',
    headerRecord: '胜平负',
    advanceHint: '前2名晋级淘汰赛',
    groupLabel: '第 {name} 组',
    statsTeams: '参赛球队',
    statsTeamsUnit: '支',
    statsGroups: '小组数量',
    statsGroupsUnit: '个',
    statsMatches: '小组赛场次',
    statsMatchesUnit: '场',
    statsQualifiers: '晋级名额',
    statsQualifiersUnit: '队',
  },
  knockout: {
    roundOf16: '十六强',
    roundOf16En: 'Round of 16',
    quarterFinals: '八强',
    quarterFinalsEn: 'Quarter Finals',
    semiFinals: '四强',
    semiFinalsEn: 'Semi Finals',
    final: '决赛',
    finalEn: 'Grand Final',
    tbd: '待定',
    scrollHint: '← 左右滑动查看完整赛程 →',
    penalties: '点球',
    progressR16: '十六强 (8场)',
    progressQF: '八强 (4场)',
    progressSF: '四强 (2场)',
    progressFinal: '决赛 (1场)',
    progressDone: '已结束',
    progressUpcoming: '即将进行',
    progressDate: '7月19日',
    legendAdvanced: '晋级',
    legendEliminated: '淘汰',
    legendUpcoming: '待定场次',
    legendFinal: '决赛',
    venueLabel: '📍',
  },
  footer: {
    disclaimer: '仅供信息展示参考用途',
    venuesUSA: '11座美国场馆',
    venuesCanada: '2座加拿大场馆',
    venuesMexico: '3座墨西哥场馆',
  },
};

const en: Translation = {
  langName: 'English',
  langFlag: '🇺🇸',
  nav: {
    venueMap: 'Venues',
    tournament: 'Tournament',
    groupStage: 'Group Stage',
    knockout: 'Knockout',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
  },
  venue: {
    sectionSubtitle: 'USA · Canada · Mexico · 2026',
    sectionTitle: '2026 FIFA World Cup Venues',
    sectionDesc: 'USA 11 · Canada 2 · Mexico 3 · 16 Official Match Venues',
    capacity: 'Capacity',
    hoverHint: 'Hover over a marker to see venue details',
    tapHint: 'Tap a marker to see venue details',
    legendUSA: 'USA · 11 Venues',
    legendCanada: 'Canada · 2 Venues',
    legendMexico: 'Mexico · 3 Venues',
    countryLabels: { USA: 'UNITED STATES', Canada: 'CANADA', Mexico: 'MEXICO' },
    closeCard: 'Close',
  },
  tournament: {
    sectionSubtitle: 'Tournament Progress',
    sectionTitle: 'Tournament',
    groupStageTab: 'Group Stage',
    groupStageEn: 'Group Stage',
    knockoutTab: 'Knockout',
    knockoutEn: 'Knockout Stage',
    completedLabel: 'Completed',
    completedValue: '72 Matches',
    groupsLabel: 'Groups',
    groupsValue: 'A–L · 12 Groups',
    qualifiedLabel: 'Qualified',
    qualifiedValue: '32 Teams',
    statusDone: 'Finished',
    statusUpcoming: 'Upcoming',
    statusTBD: 'TBD',
  },
  group: {
    roundsPlayed: '3 Rounds Played',
    headerRank: '#',
    headerTeam: 'Team',
    headerPlayed: 'P',
    headerGD: 'GD',
    headerPoints: 'Pts',
    headerRecord: 'W-D-L',
    advanceHint: 'Top 2 advance to Knockout',
    groupLabel: 'Group {name}',
    statsTeams: 'Teams',
    statsTeamsUnit: '',
    statsGroups: 'Groups',
    statsGroupsUnit: '',
    statsMatches: 'Group Matches',
    statsMatchesUnit: '',
    statsQualifiers: 'Qualifiers',
    statsQualifiersUnit: '',
  },
  knockout: {
    roundOf16: 'Round of 16',
    roundOf16En: 'Round of 16',
    quarterFinals: 'Quarter Finals',
    quarterFinalsEn: 'Quarter Finals',
    semiFinals: 'Semi Finals',
    semiFinalsEn: 'Semi Finals',
    final: 'Final',
    finalEn: 'Grand Final',
    tbd: 'TBD',
    scrollHint: '← Scroll to see full bracket →',
    penalties: 'Pen.',
    progressR16: 'Round of 16 (8)',
    progressQF: 'Quarter Finals (4)',
    progressSF: 'Semi Finals (2)',
    progressFinal: 'Final (1)',
    progressDone: 'Finished',
    progressUpcoming: 'Upcoming',
    progressDate: 'Jul 19',
    legendAdvanced: 'Advanced',
    legendEliminated: 'Eliminated',
    legendUpcoming: 'Upcoming',
    legendFinal: 'Final',
    venueLabel: '📍',
  },
  footer: {
    disclaimer: 'For informational purposes only',
    venuesUSA: '11 USA Venues',
    venuesCanada: '2 Canada Venues',
    venuesMexico: '3 Mexico Venues',
  },
};

const ja: Translation = {
  langName: '日本語',
  langFlag: '🇯🇵',
  nav: {
    venueMap: '会場マップ',
    tournament: 'トーナメント',
    groupStage: 'グループステージ',
    knockout: 'ノックアウト',
    menu: 'メニュー',
    close: '閉じる',
    language: '言語',
  },
  venue: {
    sectionSubtitle: 'USA · Canada · Mexico · 2026',
    sectionTitle: '2026 FIFA ワールドカップ 試合会場',
    sectionDesc: 'アメリカ 11会場 · カナダ 2会場 · メキシコ 3会場 · 全16試合会場',
    capacity: '収容人数',
    hoverHint: 'マーカーにカーソルを合わせると詳細が表示されます',
    tapHint: 'マーカーをタップすると詳細が表示されます',
    legendUSA: 'アメリカ · 11会場',
    legendCanada: 'カナダ · 2会場',
    legendMexico: 'メキシコ · 3会場',
    countryLabels: { USA: 'UNITED STATES', Canada: 'CANADA', Mexico: 'MEXICO' },
    closeCard: '閉じる',
  },
  tournament: {
    sectionSubtitle: 'トーナメント進行状況',
    sectionTitle: 'トーナメント',
    groupStageTab: 'グループステージ',
    groupStageEn: 'Group Stage',
    knockoutTab: 'ノックアウト',
    knockoutEn: 'Knockout Stage',
    completedLabel: '完了',
    completedValue: '72試合',
    groupsLabel: 'グループ',
    groupsValue: 'A〜L · 12グループ',
    qualifiedLabel: '進出',
    qualifiedValue: '32チーム',
    statusDone: '終了',
    statusUpcoming: '近日開催',
    statusTBD: '未定',
  },
  group: {
    roundsPlayed: '3節消化',
    headerRank: '#',
    headerTeam: 'チーム',
    headerPlayed: '試',
    headerGD: '得失差',
    headerPoints: 'PT',
    headerRecord: '勝分負',
    advanceHint: '上位2チームがノックアウトステージへ進出',
    groupLabel: 'グループ {name}',
    statsTeams: '参加チーム',
    statsTeamsUnit: 'チーム',
    statsGroups: 'グループ数',
    statsGroupsUnit: '',
    statsMatches: 'グループステージ試合数',
    statsMatchesUnit: '試合',
    statsQualifiers: '進出チーム数',
    statsQualifiersUnit: 'チーム',
  },
  knockout: {
    roundOf16: 'ラウンド16',
    roundOf16En: 'Round of 16',
    quarterFinals: '準々決勝',
    quarterFinalsEn: 'Quarter Finals',
    semiFinals: '準決勝',
    semiFinalsEn: 'Semi Finals',
    final: '決勝',
    finalEn: 'Grand Final',
    tbd: '未定',
    scrollHint: '← スクロールしてトーナメント表を表示 →',
    penalties: 'PK',
    progressR16: 'ラウンド16 (8試合)',
    progressQF: '準々決勝 (4試合)',
    progressSF: '準決勝 (2試合)',
    progressFinal: '決勝 (1試合)',
    progressDone: '終了',
    progressUpcoming: '近日開催',
    progressDate: '7月19日',
    legendAdvanced: '進出',
    legendEliminated: '敗退',
    legendUpcoming: '未定試合',
    legendFinal: '決勝',
    venueLabel: '📍',
  },
  footer: {
    disclaimer: '情報提供目的のみ',
    venuesUSA: 'アメリカ 11会場',
    venuesCanada: 'カナダ 2会場',
    venuesMexico: 'メキシコ 3会場',
  },
};

const ko: Translation = {
  langName: '한국어',
  langFlag: '🇰🇷',
  nav: {
    venueMap: '경기장 지도',
    tournament: '토너먼트',
    groupStage: '조별리그',
    knockout: '결선',
    menu: '메뉴',
    close: '닫기',
    language: '언어',
  },
  venue: {
    sectionSubtitle: 'USA · Canada · Mexico · 2026',
    sectionTitle: '2026 FIFA 월드컵 경기장',
    sectionDesc: '미국 11개 · 캐나다 2개 · 멕시코 3개 · 총 16개 공식 경기장',
    capacity: '수용인원',
    hoverHint: '마커에 마우스를 올리면 경기장 정보를 확인할 수 있습니다',
    tapHint: '마커를 탭하면 경기장 정보를 확인할 수 있습니다',
    legendUSA: '미국 · 11개 경기장',
    legendCanada: '캐나다 · 2개 경기장',
    legendMexico: '멕시코 · 3개 경기장',
    countryLabels: { USA: 'UNITED STATES', Canada: 'CANADA', Mexico: 'MEXICO' },
    closeCard: '닫기',
  },
  tournament: {
    sectionSubtitle: '토너먼트 진행 현황',
    sectionTitle: '토너먼트',
    groupStageTab: '조별리그',
    groupStageEn: 'Group Stage',
    knockoutTab: '결선 토너먼트',
    knockoutEn: 'Knockout Stage',
    completedLabel: '완료',
    completedValue: '72경기',
    groupsLabel: '조',
    groupsValue: 'A~L · 12개 조',
    qualifiedLabel: '진출',
    qualifiedValue: '32팀',
    statusDone: '종료',
    statusUpcoming: '예정',
    statusTBD: '미정',
  },
  group: {
    roundsPlayed: '3라운드 소화',
    headerRank: '#',
    headerTeam: '팀',
    headerPlayed: '경기',
    headerGD: '득실',
    headerPoints: '승점',
    headerRecord: '승무패',
    advanceHint: '상위 2팀이 결선 토너먼트 진출',
    groupLabel: '{name}조',
    statsTeams: '참가 팀',
    statsTeamsUnit: '팀',
    statsGroups: '조 수',
    statsGroupsUnit: '개',
    statsMatches: '조별리그 경기 수',
    statsMatchesUnit: '경기',
    statsQualifiers: '진출 팀 수',
    statsQualifiersUnit: '팀',
  },
  knockout: {
    roundOf16: '16강',
    roundOf16En: 'Round of 16',
    quarterFinals: '8강',
    quarterFinalsEn: 'Quarter Finals',
    semiFinals: '4강',
    semiFinalsEn: 'Semi Finals',
    final: '결승',
    finalEn: 'Grand Final',
    tbd: '미정',
    scrollHint: '← 스크롤하여 대진표 전체 보기 →',
    penalties: '승부차기',
    progressR16: '16강 (8경기)',
    progressQF: '8강 (4경기)',
    progressSF: '4강 (2경기)',
    progressFinal: '결승 (1경기)',
    progressDone: '종료',
    progressUpcoming: '예정',
    progressDate: '7월 19일',
    legendAdvanced: '진출',
    legendEliminated: '탈락',
    legendUpcoming: '예정 경기',
    legendFinal: '결승',
    venueLabel: '📍',
  },
  footer: {
    disclaimer: '정보 제공 목적',
    venuesUSA: '미국 11개 경기장',
    venuesCanada: '캐나다 2개 경기장',
    venuesMexico: '멕시코 3개 경기장',
  },
};

const pt: Translation = {
  langName: 'Português',
  langFlag: '🇧🇷',
  nav: {
    venueMap: 'Estádios',
    tournament: 'Torneio',
    groupStage: 'Fase de Grupos',
    knockout: 'Eliminatórias',
    menu: 'Menu',
    close: 'Fechar',
    language: 'Idioma',
  },
  venue: {
    sectionSubtitle: 'EUA · Canadá · México · 2026',
    sectionTitle: 'Estádios da Copa do Mundo FIFA 2026',
    sectionDesc: 'EUA 11 · Canadá 2 · México 3 · 16 Estádios Oficiais',
    capacity: 'Capacidade',
    hoverHint: 'Passe o mouse sobre um marcador para ver detalhes do estádio',
    tapHint: 'Toque em um marcador para ver detalhes do estádio',
    legendUSA: 'EUA · 11 Estádios',
    legendCanada: 'Canadá · 2 Estádios',
    legendMexico: 'México · 3 Estádios',
    countryLabels: { USA: 'ESTADOS UNIDOS', Canada: 'CANADÁ', Mexico: 'MÉXICO' },
    closeCard: 'Fechar',
  },
  tournament: {
    sectionSubtitle: 'Progresso do Torneio',
    sectionTitle: 'Torneio',
    groupStageTab: 'Fase de Grupos',
    groupStageEn: 'Group Stage',
    knockoutTab: 'Eliminatórias',
    knockoutEn: 'Knockout Stage',
    completedLabel: 'Concluídas',
    completedValue: '72 Partidas',
    groupsLabel: 'Grupos',
    groupsValue: 'A–L · 12 Grupos',
    qualifiedLabel: 'Classificados',
    qualifiedValue: '32 Equipes',
    statusDone: 'Encerrado',
    statusUpcoming: 'Em breve',
    statusTBD: 'A definir',
  },
  group: {
    roundsPlayed: '3 Rodadas Disputadas',
    headerRank: '#',
    headerTeam: 'Seleção',
    headerPlayed: 'J',
    headerGD: 'SG',
    headerPoints: 'Pts',
    headerRecord: 'V-E-D',
    advanceHint: 'As 2 primeiras classificam para as eliminatórias',
    groupLabel: 'Grupo {name}',
    statsTeams: 'Seleções',
    statsTeamsUnit: '',
    statsGroups: 'Grupos',
    statsGroupsUnit: '',
    statsMatches: 'Partidas de Grupos',
    statsMatchesUnit: '',
    statsQualifiers: 'Classificados',
    statsQualifiersUnit: '',
  },
  knockout: {
    roundOf16: 'Oitavas de Final',
    roundOf16En: 'Round of 16',
    quarterFinals: 'Quartas de Final',
    quarterFinalsEn: 'Quarter Finals',
    semiFinals: 'Semifinais',
    semiFinalsEn: 'Semi Finals',
    final: 'Final',
    finalEn: 'Grand Final',
    tbd: 'A definir',
    scrollHint: '← Deslize para ver o chaveamento completo →',
    penalties: 'Pên.',
    progressR16: 'Oitavas (8)',
    progressQF: 'Quartas (4)',
    progressSF: 'Semifinais (2)',
    progressFinal: 'Final (1)',
    progressDone: 'Encerrado',
    progressUpcoming: 'Em breve',
    progressDate: '19 de Jul',
    legendAdvanced: 'Classificado',
    legendEliminated: 'Eliminado',
    legendUpcoming: 'A realizar',
    legendFinal: 'Final',
    venueLabel: '📍',
  },
  footer: {
    disclaimer: 'Apenas para fins informativos',
    venuesUSA: '11 Estádios nos EUA',
    venuesCanada: '2 Estádios no Canadá',
    venuesMexico: '3 Estádios no México',
  },
};

const es: Translation = {
  langName: 'Español',
  langFlag: '🇪🇸',
  nav: {
    venueMap: 'Estadios',
    tournament: 'Torneo',
    groupStage: 'Fase de Grupos',
    knockout: 'Eliminatorias',
    menu: 'Menú',
    close: 'Cerrar',
    language: 'Idioma',
  },
  venue: {
    sectionSubtitle: 'EE.UU. · Canadá · México · 2026',
    sectionTitle: 'Estadios de la Copa del Mundo FIFA 2026',
    sectionDesc: 'EE.UU. 11 · Canadá 2 · México 3 · 16 Estadios Oficiales',
    capacity: 'Capacidad',
    hoverHint: 'Pasa el ratón sobre un marcador para ver detalles del estadio',
    tapHint: 'Toca un marcador para ver detalles del estadio',
    legendUSA: 'EE.UU. · 11 Estadios',
    legendCanada: 'Canadá · 2 Estadios',
    legendMexico: 'México · 3 Estadios',
    countryLabels: { USA: 'ESTADOS UNIDOS', Canada: 'CANADÁ', Mexico: 'MÉXICO' },
    closeCard: 'Cerrar',
  },
  tournament: {
    sectionSubtitle: 'Progreso del Torneo',
    sectionTitle: 'Torneo',
    groupStageTab: 'Fase de Grupos',
    groupStageEn: 'Group Stage',
    knockoutTab: 'Eliminatorias',
    knockoutEn: 'Knockout Stage',
    completedLabel: 'Completados',
    completedValue: '72 Partidos',
    groupsLabel: 'Grupos',
    groupsValue: 'A–L · 12 Grupos',
    qualifiedLabel: 'Clasificados',
    qualifiedValue: '32 Equipos',
    statusDone: 'Finalizado',
    statusUpcoming: 'Próximamente',
    statusTBD: 'Por definir',
  },
  group: {
    roundsPlayed: '3 Jornadas Jugadas',
    headerRank: '#',
    headerTeam: 'Selección',
    headerPlayed: 'J',
    headerGD: 'DG',
    headerPoints: 'Pts',
    headerRecord: 'G-E-P',
    advanceHint: 'Los 2 primeros avanzan a la fase eliminatoria',
    groupLabel: 'Grupo {name}',
    statsTeams: 'Selecciones',
    statsTeamsUnit: '',
    statsGroups: 'Grupos',
    statsGroupsUnit: '',
    statsMatches: 'Partidos de Fase de Grupos',
    statsMatchesUnit: '',
    statsQualifiers: 'Clasificados',
    statsQualifiersUnit: '',
  },
  knockout: {
    roundOf16: 'Octavos de Final',
    roundOf16En: 'Round of 16',
    quarterFinals: 'Cuartos de Final',
    quarterFinalsEn: 'Quarter Finals',
    semiFinals: 'Semifinales',
    semiFinalsEn: 'Semi Finals',
    final: 'Final',
    finalEn: 'Grand Final',
    tbd: 'Por definir',
    scrollHint: '← Desliza para ver el cuadro completo →',
    penalties: 'Pen.',
    progressR16: 'Octavos (8)',
    progressQF: 'Cuartos (4)',
    progressSF: 'Semifinales (2)',
    progressFinal: 'Final (1)',
    progressDone: 'Finalizado',
    progressUpcoming: 'Próximamente',
    progressDate: '19 Jul',
    legendAdvanced: 'Clasificado',
    legendEliminated: 'Eliminado',
    legendUpcoming: 'Por jugar',
    legendFinal: 'Final',
    venueLabel: '📍',
  },
  footer: {
    disclaimer: 'Solo con fines informativos',
    venuesUSA: '11 Estadios en EE.UU.',
    venuesCanada: '2 Estadios en Canadá',
    venuesMexico: '3 Estadios en México',
  },
};

export const TRANSLATIONS: Record<LangCode, Translation> = { zh, en, ja, ko, pt, es };

export const SUPPORTED_LANGS: LangCode[] = ['zh', 'en', 'ja', 'ko', 'pt', 'es'];

export function detectLanguage(): LangCode {
  try {
    const saved = localStorage.getItem('wc2026-lang') as LangCode;
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  } catch {}
  const nav = navigator.language || (navigator as any).userLanguage || 'en';
  const code = nav.split('-')[0].toLowerCase() as LangCode;
  return SUPPORTED_LANGS.includes(code) ? code : 'en';
}
