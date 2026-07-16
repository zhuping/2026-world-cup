export type LangCode = 'zh' | 'en' | 'ja' | 'ko' | 'pt' | 'es';

export interface Translation {
  langName: string;
  langFlag: string;
  nav: {
    venueMap: string;
    tournament: string;
    groupStage: string;
    knockout: string;
    schedule: string;
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
    statusLive: string;
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
    roundOf32: string;
    roundOf32En: string;
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
    progressR32: string;
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
  schedule: {
    sectionTitle: string;
    sectionSubtitle: string;
    matchdayLabel: string;
    noMatches: string;
    todayBtn: string;
    localTimeNote: string;
    simultaneousLabel: string;
    matchesCount: string;
    groupLabel: string;
    venueLabel: string;
    prevDay: string;
    nextDay: string;
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
    schedule: '赛程',
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
    statusLive: '进行中',
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
    advanceHint: '每组前2名与8个成绩最好的第三名晋级32强',
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
    roundOf32: '三十二强',
    roundOf32En: 'Round of 32',
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
    progressR32: '三十二强 (16场)',
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
  schedule: {
    sectionTitle: '决赛信息',
    sectionSubtitle: '2026 FIFA World Cup Final',
    matchdayLabel: '第 {n} 轮',
    noMatches: '本日暂无比赛',
    todayBtn: '回到今天',
    localTimeNote: '比赛时间已转换为您的本地时间',
    simultaneousLabel: '同组同时进行',
    matchesCount: '{n} 场比赛',
    groupLabel: '第 {name} 组',
    venueLabel: '场馆',
    prevDay: '上一天',
    nextDay: '下一天',
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
    schedule: 'Schedule',
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
    statusLive: 'In Progress',
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
    advanceHint: 'Top 2 plus the 8 best third-placed teams advance to the Round of 32',
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
    roundOf32: 'Round of 32',
    roundOf32En: 'Round of 32',
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
    progressR32: 'Round of 32 (16)',
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
  schedule: {
    sectionTitle: 'Final Information',
    sectionSubtitle: '2026 FIFA World Cup Final',
    matchdayLabel: 'Matchday {n}',
    noMatches: 'No matches on this day',
    todayBtn: 'Back to today',
    localTimeNote: 'Times shown in your local timezone',
    simultaneousLabel: 'Simultaneous',
    matchesCount: '{n} matches',
    groupLabel: 'Group {name}',
    venueLabel: 'Venue',
    prevDay: 'Previous day',
    nextDay: 'Next day',
  },
  footer: {
    disclaimer: 'For informational display purposes only',
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
    schedule: 'スケジュール',
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
    statusLive: '進行中',
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
    advanceHint: '各組上位2チームと成績最良の3位8チームがラウンド32へ進出',
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
    roundOf32: 'ラウンド32',
    roundOf32En: 'Round of 32',
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
    progressR32: 'ラウンド32 (16試合)',
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
  schedule: {
    sectionTitle: '決勝情報',
    sectionSubtitle: '2026 FIFA World Cup Final',
    matchdayLabel: '第{n}節',
    noMatches: '本日は試合がありません',
    todayBtn: '今日に戻る',
    localTimeNote: '時刻はお使いのタイムゾーンに変換されています',
    simultaneousLabel: '同時開催',
    matchesCount: '{n}試合',
    groupLabel: 'グループ{name}',
    venueLabel: '会場',
    prevDay: '前の日',
    nextDay: '次の日',
  },
  footer: {
    disclaimer: '情報表示の参考用のみ',
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
    schedule: '일정',
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
    statusLive: '진행 중',
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
    advanceHint: '각 조 1, 2위와 성적이 좋은 3위 8팀이 32강에 진출',
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
    roundOf32: '32강',
    roundOf32En: 'Round of 32',
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
    progressR32: '32강 (16경기)',
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
  schedule: {
    sectionTitle: '결승전 정보',
    sectionSubtitle: '2026 FIFA World Cup Final',
    matchdayLabel: '{n}라운드',
    noMatches: '오늘은 경기가 없습니다',
    todayBtn: '오늘로 돌아가기',
    localTimeNote: '현지 시간으로 표시됩니다',
    simultaneousLabel: '동시 진행',
    matchesCount: '{n}경기',
    groupLabel: '{name}조',
    venueLabel: '경기장',
    prevDay: '이전 날',
    nextDay: '다음 날',
  },
  footer: {
    disclaimer: '정보 제공 및 표시 참고용',
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
    schedule: 'Calendário',
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
    statusLive: 'Em andamento',
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
    advanceHint: 'As 2 primeiras e os 8 melhores terceiros avançam para a fase de 32',
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
    roundOf32: 'Fase de 32',
    roundOf32En: 'Round of 32',
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
    progressR32: 'Fase de 32 (16)',
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
  schedule: {
    sectionTitle: 'Informações da Final',
    sectionSubtitle: '2026 FIFA World Cup Final',
    matchdayLabel: 'Rodada {n}',
    noMatches: 'Sem partidas neste dia',
    todayBtn: 'Voltar para hoje',
    localTimeNote: 'Horários exibidos no seu fuso horário local',
    simultaneousLabel: 'Simultâneo',
    matchesCount: '{n} partidas',
    groupLabel: 'Grupo {name}',
    venueLabel: 'Estádio',
    prevDay: 'Dia anterior',
    nextDay: 'Próximo dia',
  },
  footer: {
    disclaimer: 'Apenas para fins informativos e de referência visual',
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
    schedule: 'Calendario',
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
    statusLive: 'En curso',
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
    advanceHint: 'Los 2 primeros y los 8 mejores terceros avanzan a la ronda de 32',
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
    roundOf32: 'Ronda de 32',
    roundOf32En: 'Round of 32',
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
    progressR32: 'Ronda de 32 (16)',
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
  schedule: {
    sectionTitle: 'Información de la Final',
    sectionSubtitle: '2026 FIFA World Cup Final',
    matchdayLabel: 'Jornada {n}',
    noMatches: 'No hay partidos este día',
    todayBtn: 'Volver a hoy',
    localTimeNote: 'Horarios en tu zona horaria local',
    simultaneousLabel: 'Simultáneo',
    matchesCount: '{n} partidos',
    groupLabel: 'Grupo {name}',
    venueLabel: 'Estadio',
    prevDay: 'Día anterior',
    nextDay: 'Día siguiente',
  },
  footer: {
    disclaimer: 'Solo para fines informativos y de referencia visual',
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
