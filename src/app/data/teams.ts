export interface Team {
  flag: string;
  nameZh: string;
  nameEn: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export interface Group {
  name: string;
  teams: Team[];
}

export interface BracketTeam {
  flag: string;
  nameZh: string;
  nameEn: string;
  score?: number;
  winner?: boolean;
  tbd?: boolean;
}

export interface BracketMatch {
  id: string;
  team1: BracketTeam;
  team2: BracketTeam;
  date?: string;
  venue?: string;
  played?: boolean;
  penalty?: string; // e.g. "4-3" for penalty shootout
}

export interface BracketRound {
  name: string;
  nameEn: string;
  matches: BracketMatch[];
}

export const groups: Group[] = [
  {
    name: 'A',
    teams: [
      { flag: '🇺🇸', nameZh: '美国', nameEn: 'USA', played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 2, gd: 3, points: 7 },
      { flag: '🇺🇾', nameZh: '乌拉圭', nameEn: 'Uruguay', played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 3, gd: 2, points: 6 },
      { flag: '🇧🇴', nameZh: '玻利维亚', nameEn: 'Bolivia', played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 5, gd: -3, points: 1 },
      { flag: '🇸🇦', nameZh: '沙特阿拉伯', nameEn: 'Saudi Arabia', played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 3, gd: -2, points: 0 },
    ],
  },
  {
    name: 'B',
    teams: [
      { flag: '🇨🇦', nameZh: '加拿大', nameEn: 'Canada', played: 3, won: 3, drawn: 0, lost: 0, gf: 7, ga: 1, gd: 6, points: 9 },
      { flag: '🇲🇦', nameZh: '摩洛哥', nameEn: 'Morocco', played: 3, won: 1, drawn: 1, lost: 1, gf: 3, ga: 4, gd: -1, points: 4 },
      { flag: '🇯🇵', nameZh: '日本', nameEn: 'Japan', played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 3, gd: 1, points: 4 },
      { flag: '🇬🇹', nameZh: '危地马拉', nameEn: 'Guatemala', played: 3, won: 0, drawn: 0, lost: 3, gf: 0, ga: 6, gd: -6, points: 0 },
    ],
  },
  {
    name: 'C',
    teams: [
      { flag: '🇲🇽', nameZh: '墨西哥', nameEn: 'Mexico', played: 3, won: 2, drawn: 0, lost: 1, gf: 6, ga: 3, gd: 3, points: 6 },
      { flag: '🇵🇱', nameZh: '波兰', nameEn: 'Poland', played: 3, won: 1, drawn: 2, lost: 0, gf: 4, ga: 3, gd: 1, points: 5 },
      { flag: '🇨🇲', nameZh: '喀麦隆', nameEn: 'Cameroon', played: 3, won: 1, drawn: 1, lost: 1, gf: 3, ga: 4, gd: -1, points: 4 },
      { flag: '🇹🇹', nameZh: '特立尼达和多巴哥', nameEn: 'Trinidad & Tobago', played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 4, gd: -3, points: 1 },
    ],
  },
  {
    name: 'D',
    teams: [
      { flag: '🇧🇷', nameZh: '巴西', nameEn: 'Brazil', played: 3, won: 3, drawn: 0, lost: 0, gf: 8, ga: 1, gd: 7, points: 9 },
      { flag: '🇩🇪', nameZh: '德国', nameEn: 'Germany', played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 3, gd: 2, points: 6 },
      { flag: '🇨🇭', nameZh: '瑞士', nameEn: 'Switzerland', played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 5, gd: -2, points: 3 },
      { flag: '🇳🇿', nameZh: '新西兰', nameEn: 'New Zealand', played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 8, gd: -7, points: 0 },
    ],
  },
  {
    name: 'E',
    teams: [
      { flag: '🇫🇷', nameZh: '法国', nameEn: 'France', played: 3, won: 2, drawn: 1, lost: 0, gf: 6, ga: 2, gd: 4, points: 7 },
      { flag: '🇦🇷', nameZh: '阿根廷', nameEn: 'Argentina', played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 3, gd: 2, points: 6 },
      { flag: '🇰🇷', nameZh: '韩国', nameEn: 'South Korea', played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 5, gd: -3, points: 1 },
      { flag: '🇭🇳', nameZh: '洪都拉斯', nameEn: 'Honduras', played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 4, gd: -3, points: 0 },
    ],
  },
  {
    name: 'F',
    teams: [
      { flag: '🇪🇸', nameZh: '西班牙', nameEn: 'Spain', played: 3, won: 2, drawn: 1, lost: 0, gf: 7, ga: 1, gd: 6, points: 7 },
      { flag: '🇨🇴', nameZh: '哥伦比亚', nameEn: 'Colombia', played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 4, gd: 1, points: 6 },
      { flag: '🇪🇬', nameZh: '埃及', nameEn: 'Egypt', played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 5, gd: -3, points: 1 },
      { flag: '🇸🇻', nameZh: '萨尔瓦多', nameEn: 'El Salvador', played: 3, won: 0, drawn: 0, lost: 3, gf: 0, ga: 4, gd: -4, points: 0 },
    ],
  },
  {
    name: 'G',
    teams: [
      { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', nameZh: '英格兰', nameEn: 'England', played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 1, gd: 4, points: 7 },
      { flag: '🇳🇱', nameZh: '荷兰', nameEn: 'Netherlands', played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 4, gd: 0, points: 4 },
      { flag: '🇮🇶', nameZh: '伊拉克', nameEn: 'Iraq', played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 5, gd: -2, points: 3 },
      { flag: '🇨🇷', nameZh: '哥斯达黎加', nameEn: 'Costa Rica', played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 3, gd: -2, points: 0 },
    ],
  },
  {
    name: 'H',
    teams: [
      { flag: '🇵🇹', nameZh: '葡萄牙', nameEn: 'Portugal', played: 3, won: 3, drawn: 0, lost: 0, gf: 9, ga: 2, gd: 7, points: 9 },
      { flag: '🇧🇪', nameZh: '比利时', nameEn: 'Belgium', played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 5, gd: -1, points: 4 },
      { flag: '🇳🇬', nameZh: '尼日利亚', nameEn: 'Nigeria', played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 5, gd: -2, points: 3 },
      { flag: '🇨🇺', nameZh: '古巴', nameEn: 'Cuba', played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 5, gd: -4, points: 1 },
    ],
  },
  {
    name: 'I',
    teams: [
      { flag: '🇮🇹', nameZh: '意大利', nameEn: 'Italy', played: 3, won: 2, drawn: 1, lost: 0, gf: 6, ga: 2, gd: 4, points: 7 },
      { flag: '🇭🇷', nameZh: '克罗地亚', nameEn: 'Croatia', played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 4, gd: 0, points: 4 },
      { flag: '🇮🇷', nameZh: '伊朗', nameEn: 'Iran', played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 4, gd: -2, points: 3 },
      { flag: '🇵🇦', nameZh: '巴拿马', nameEn: 'Panama', played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 3, gd: -2, points: 0 },
    ],
  },
  {
    name: 'J',
    teams: [
      { flag: '🇷🇸', nameZh: '塞尔维亚', nameEn: 'Serbia', played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 3, gd: 2, points: 6 },
      { flag: '🇦🇺', nameZh: '澳大利亚', nameEn: 'Australia', played: 3, won: 1, drawn: 2, lost: 0, gf: 3, ga: 2, gd: 1, points: 5 },
      { flag: '🇸🇳', nameZh: '塞内加尔', nameEn: 'Senegal', played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 4, gd: 0, points: 4 },
      { flag: '🇯🇲', nameZh: '牙买加', nameEn: 'Jamaica', played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 4, gd: -3, points: 1 },
    ],
  },
  {
    name: 'K',
    teams: [
      { flag: '🇩🇰', nameZh: '丹麦', nameEn: 'Denmark', played: 3, won: 2, drawn: 1, lost: 0, gf: 6, ga: 2, gd: 4, points: 7 },
      { flag: '🇪🇨', nameZh: '厄瓜多尔', nameEn: 'Ecuador', played: 3, won: 2, drawn: 0, lost: 1, gf: 4, ga: 3, gd: 1, points: 6 },
      { flag: '🇬🇭', nameZh: '加纳', nameEn: 'Ghana', played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 4, gd: -2, points: 1 },
      { flag: '🇧🇭', nameZh: '巴林', nameEn: 'Bahrain', played: 3, won: 0, drawn: 0, lost: 3, gf: 0, ga: 3, gd: -3, points: 0 },
    ],
  },
  {
    name: 'L',
    teams: [
      { flag: '🇹🇷', nameZh: '土耳其', nameEn: 'Turkey', played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 2, gd: 3, points: 7 },
      { flag: '🇨🇱', nameZh: '智利', nameEn: 'Chile', played: 3, won: 1, drawn: 1, lost: 1, gf: 3, ga: 3, gd: 0, points: 4 },
      { flag: '🇩🇿', nameZh: '阿尔及利亚', nameEn: 'Algeria', played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 4, gd: -1, points: 3 },
      { flag: '🇿🇦', nameZh: '南非', nameEn: 'South Africa', played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 3, gd: -2, points: 0 },
    ],
  },
];

export const knockoutRounds: BracketRound[] = [
  {
    name: '十六强',
    nameEn: 'Round of 16',
    matches: [
      {
        id: 'r16-1',
        team1: { flag: '🇺🇸', nameZh: '美国', nameEn: 'USA', score: 2, winner: true },
        team2: { flag: '🇲🇦', nameZh: '摩洛哥', nameEn: 'Morocco', score: 1 },
        played: true,
      },
      {
        id: 'r16-2',
        team1: { flag: '🇧🇷', nameZh: '巴西', nameEn: 'Brazil', score: 3, winner: true },
        team2: { flag: '🇯🇵', nameZh: '日本', nameEn: 'Japan', score: 0 },
        played: true,
      },
      {
        id: 'r16-3',
        team1: { flag: '🇫🇷', nameZh: '法国', nameEn: 'France', score: 2, winner: true },
        team2: { flag: '🇨🇴', nameZh: '哥伦比亚', nameEn: 'Colombia', score: 0 },
        played: true,
      },
      {
        id: 'r16-4',
        team1: { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', nameZh: '英格兰', nameEn: 'England', score: 2, winner: true },
        team2: { flag: '🇧🇪', nameZh: '比利时', nameEn: 'Belgium', score: 1 },
        played: true,
      },
      {
        id: 'r16-5',
        team1: { flag: '🇨🇦', nameZh: '加拿大', nameEn: 'Canada', score: 0 },
        team2: { flag: '🇺🇾', nameZh: '乌拉圭', nameEn: 'Uruguay', score: 1, winner: true },
        played: true,
      },
      {
        id: 'r16-6',
        team1: { flag: '🇲🇽', nameZh: '墨西哥', nameEn: 'Mexico', score: 1, winner: true },
        team2: { flag: '🇩🇪', nameZh: '德国', nameEn: 'Germany', score: 1 },
        penalty: '4-3',
        played: true,
      },
      {
        id: 'r16-7',
        team1: { flag: '🇪🇸', nameZh: '西班牙', nameEn: 'Spain', score: 1 },
        team2: { flag: '🇦🇷', nameZh: '阿根廷', nameEn: 'Argentina', score: 2, winner: true },
        played: true,
      },
      {
        id: 'r16-8',
        team1: { flag: '🇵🇹', nameZh: '葡萄牙', nameEn: 'Portugal', score: 2, winner: true },
        team2: { flag: '🇳🇱', nameZh: '荷兰', nameEn: 'Netherlands', score: 0 },
        played: true,
      },
    ],
  },
  {
    name: '八强',
    nameEn: 'Quarter Finals',
    matches: [
      {
        id: 'qf-1',
        team1: { flag: '🇺🇸', nameZh: '美国', nameEn: 'USA', score: 1, winner: true },
        team2: { flag: '🇧🇷', nameZh: '巴西', nameEn: 'Brazil', score: 0 },
        played: true,
      },
      {
        id: 'qf-2',
        team1: { flag: '🇫🇷', nameZh: '法国', nameEn: 'France', score: 1, winner: true },
        team2: { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', nameZh: '英格兰', nameEn: 'England', score: 0 },
        played: true,
      },
      {
        id: 'qf-3',
        team1: { flag: '🇺🇾', nameZh: '乌拉圭', nameEn: 'Uruguay', score: 0 },
        team2: { flag: '🇲🇽', nameZh: '墨西哥', nameEn: 'Mexico', score: 2, winner: true },
        played: true,
      },
      {
        id: 'qf-4',
        team1: { flag: '🇦🇷', nameZh: '阿根廷', nameEn: 'Argentina', score: 1 },
        team2: { flag: '🇵🇹', nameZh: '葡萄牙', nameEn: 'Portugal', score: 2, winner: true },
        played: true,
      },
    ],
  },
  {
    name: '四强',
    nameEn: 'Semi Finals',
    matches: [
      {
        id: 'sf-1',
        team1: { flag: '🇺🇸', nameZh: '美国', nameEn: 'USA' },
        team2: { flag: '🇫🇷', nameZh: '法国', nameEn: 'France' },
        date: '2026年7月14日',
        played: false,
      },
      {
        id: 'sf-2',
        team1: { flag: '🇲🇽', nameZh: '墨西哥', nameEn: 'Mexico' },
        team2: { flag: '🇵🇹', nameZh: '葡萄牙', nameEn: 'Portugal' },
        date: '2026年7月15日',
        played: false,
      },
    ],
  },
  {
    name: '决赛',
    nameEn: 'Final',
    matches: [
      {
        id: 'final',
        team1: { flag: '🏆', nameZh: '待定', nameEn: 'TBD', tbd: true },
        team2: { flag: '🏆', nameZh: '待定', nameEn: 'TBD', tbd: true },
        date: '2026年7月19日',
        venue: '大都会人寿球场，纽约/新泽西',
        played: false,
      },
    ],
  },
];