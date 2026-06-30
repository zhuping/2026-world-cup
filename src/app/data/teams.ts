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
  penaltyScore?: number;
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
  penalty?: string;
  penaltyScores?: {
    team1: number;
    team2: number;
  };
}

export interface BracketRound {
  name: string;
  nameEn: string;
  matches: BracketMatch[];
}

const baseTeam = (flag: string, nameZh: string, nameEn: string): Team => ({
  flag,
  nameZh,
  nameEn,
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  gf: 0,
  ga: 0,
  gd: 0,
  points: 0,
});

export const groups: Group[] = [
  {
    name: 'A',
    teams: [
      { ...baseTeam('🇲🇽', '墨西哥', 'Mexico'), played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 0, gd: 2, points: 3 },
      { ...baseTeam('🇰🇷', '韩国', 'South Korea'), played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 1, gd: 1, points: 3 },
      { ...baseTeam('🇨🇿', '捷克', 'Czechia'), played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 2, gd: -1, points: 0 },
      { ...baseTeam('🇿🇦', '南非', 'South Africa'), played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 2, gd: -2, points: 0 },
    ],
  },
  { name: 'B', teams: [baseTeam('🇨🇦', '加拿大', 'Canada'), baseTeam('🇧🇦', '波黑', 'Bosnia & Herzegovina'), baseTeam('🇶🇦', '卡塔尔', 'Qatar'), baseTeam('🇨🇭', '瑞士', 'Switzerland')] },
  { name: 'C', teams: [baseTeam('🇧🇷', '巴西', 'Brazil'), baseTeam('🇲🇦', '摩洛哥', 'Morocco'), baseTeam('🇭🇹', '海地', 'Haiti'), baseTeam('🏴󠁧󠁢󠁳󠁣󠁴󠁿', '苏格兰', 'Scotland')] },
  { name: 'D', teams: [baseTeam('🇺🇸', '美国', 'USA'), baseTeam('🇵🇾', '巴拉圭', 'Paraguay'), baseTeam('🇦🇺', '澳大利亚', 'Australia'), baseTeam('🇹🇷', '土耳其', 'Turkey')] },
  { name: 'E', teams: [baseTeam('🇩🇪', '德国', 'Germany'), baseTeam('🇨🇼', '库拉索', 'Curacao'), baseTeam('🇨🇮', '科特迪瓦', 'Cote d\'Ivoire'), baseTeam('🇪🇨', '厄瓜多尔', 'Ecuador')] },
  { name: 'F', teams: [baseTeam('🇳🇱', '荷兰', 'Netherlands'), baseTeam('🇯🇵', '日本', 'Japan'), baseTeam('🇸🇪', '瑞典', 'Sweden'), baseTeam('🇹🇳', '突尼斯', 'Tunisia')] },
  { name: 'G', teams: [baseTeam('🇧🇪', '比利时', 'Belgium'), baseTeam('🇪🇬', '埃及', 'Egypt'), baseTeam('🇮🇷', '伊朗', 'Iran'), baseTeam('🇳🇿', '新西兰', 'New Zealand')] },
  { name: 'H', teams: [baseTeam('🇪🇸', '西班牙', 'Spain'), baseTeam('🇨🇻', '佛得角', 'Cape Verde'), baseTeam('🇸🇦', '沙特阿拉伯', 'Saudi Arabia'), baseTeam('🇺🇾', '乌拉圭', 'Uruguay')] },
  { name: 'I', teams: [baseTeam('🇫🇷', '法国', 'France'), baseTeam('🇸🇳', '塞内加尔', 'Senegal'), baseTeam('🇮🇶', '伊拉克', 'Iraq'), baseTeam('🇳🇴', '挪威', 'Norway')] },
  { name: 'J', teams: [baseTeam('🇦🇷', '阿根廷', 'Argentina'), baseTeam('🇩🇿', '阿尔及利亚', 'Algeria'), baseTeam('🇦🇹', '奥地利', 'Austria'), baseTeam('🇯🇴', '约旦', 'Jordan')] },
  { name: 'K', teams: [baseTeam('🇵🇹', '葡萄牙', 'Portugal'), baseTeam('🇨🇩', '民主刚果', 'DR Congo'), baseTeam('🇺🇿', '乌兹别克斯坦', 'Uzbekistan'), baseTeam('🇨🇴', '哥伦比亚', 'Colombia')] },
  { name: 'L', teams: [baseTeam('🏴󠁧󠁢󠁥󠁮󠁧󠁿', '英格兰', 'England'), baseTeam('🇭🇷', '克罗地亚', 'Croatia'), baseTeam('🇬🇭', '加纳', 'Ghana'), baseTeam('🇵🇦', '巴拿马', 'Panama')] },
];

const TBD_BRACKET_TEAM: BracketTeam = { flag: '❓', nameZh: '待定', nameEn: 'TBD', tbd: true };

const bracketTeam = (flag: string, nameZh: string, nameEn: string, extra?: Partial<BracketTeam>): BracketTeam => ({
  flag,
  nameZh,
  nameEn,
  ...extra,
});

const match = (id: string, extra?: Partial<BracketMatch>): BracketMatch => ({
  id,
  team1: TBD_BRACKET_TEAM,
  team2: TBD_BRACKET_TEAM,
  played: false,
  ...extra,
});

export const knockoutRounds: BracketRound[] = [
  {
    name: '三十二强',
    nameEn: 'Round of 32',
    matches: [
      match('r32-74', {
        team1: bracketTeam('🇩🇪', '德国', 'Germany'),
        team2: bracketTeam('🇵🇾', '巴拉圭', 'Paraguay'),
        date: '2026-06-30',
        venue: 'Gillette Stadium, Boston',
        penaltyScores: { team1: 3, team2: 4 },
      }),
      match('r32-77', {
        team1: bracketTeam('🇫🇷', '法国', 'France'),
        team2: bracketTeam('🇸🇪', '瑞典', 'Sweden'),
        date: '2026-07-01',
        venue: 'MetLife Stadium, NJ',
      }),
      match('r32-73', {
        team1: bracketTeam('🇨🇦', '加拿大', 'Canada'),
        team2: bracketTeam('🇿🇦', '南非', 'South Africa'),
        date: '2026-06-29',
        venue: 'SoFi Stadium, Los Angeles',
      }),
      match('r32-75', {
        team1: bracketTeam('🇳🇱', '荷兰', 'Netherlands'),
        team2: bracketTeam('🇲🇦', '摩洛哥', 'Morocco'),
        date: '2026-06-30',
        venue: 'Estadio BBVA, Monterrey',
      }),
      match('r32-83', {
        team1: bracketTeam('🇪🇸', '西班牙', 'Spain'),
        team2: bracketTeam('🇦🇹', '奥地利', 'Austria'),
        date: '2026-07-03',
        venue: 'SoFi Stadium, Los Angeles',
      }),
      match('r32-84', {
        team1: bracketTeam('🇵🇹', '葡萄牙', 'Portugal'),
        team2: bracketTeam('🇭🇷', '克罗地亚', 'Croatia'),
        date: '2026-07-03',
        venue: 'BMO Field, Toronto',
      }),
      match('r32-81', {
        team1: bracketTeam('🇧🇪', '比利时', 'Belgium'),
        team2: bracketTeam('🇸🇳', '塞内加尔', 'Senegal'),
        date: '2026-07-02',
        venue: 'Lumen Field, Seattle',
      }),
      match('r32-82', {
        team1: bracketTeam('🇺🇸', '美国', 'USA'),
        team2: bracketTeam('🇧🇦', '波黑', 'Bosnia & Herzegovina'),
        date: '2026-07-02',
        venue: "Levi's Stadium, San Francisco Bay Area",
      }),
      match('r32-76', {
        team1: bracketTeam('🇧🇷', '巴西', 'Brazil'),
        team2: bracketTeam('🇯🇵', '日本', 'Japan'),
        date: '2026-06-30',
        venue: 'NRG Stadium, Houston',
      }),
      match('r32-78', {
        team1: bracketTeam('🇨🇮', '科特迪瓦', "Cote d'Ivoire"),
        team2: bracketTeam('🇳🇴', '挪威', 'Norway'),
        date: '2026-07-01',
        venue: 'AT&T Stadium, Dallas',
      }),
      match('r32-79', {
        team1: bracketTeam('🇲🇽', '墨西哥', 'Mexico'),
        team2: bracketTeam('🇪🇨', '厄瓜多尔', 'Ecuador'),
        date: '2026-07-01',
        venue: 'Estadio Azteca, Mexico City',
      }),
      match('r32-80', {
        team1: bracketTeam('🏴󠁧󠁢󠁥󠁮󠁧󠁿', '英格兰', 'England'),
        team2: bracketTeam('🇨🇩', '民主刚果', 'DR Congo'),
        date: '2026-07-02',
        venue: 'Mercedes-Benz Stadium, Atlanta',
      }),
      match('r32-86', {
        team1: bracketTeam('🇦🇷', '阿根廷', 'Argentina'),
        team2: bracketTeam('🇨🇻', '佛得角', 'Cape Verde'),
        date: '2026-07-04',
        venue: 'Hard Rock Stadium, Miami',
      }),
      match('r32-88', {
        team1: bracketTeam('🇦🇺', '澳大利亚', 'Australia'),
        team2: bracketTeam('🇪🇬', '埃及', 'Egypt'),
        date: '2026-07-04',
        venue: 'AT&T Stadium, Dallas',
      }),
      match('r32-85', {
        team1: bracketTeam('🇨🇭', '瑞士', 'Switzerland'),
        team2: bracketTeam('🇩🇿', '阿尔及利亚', 'Algeria'),
        date: '2026-07-03',
        venue: 'BC Place, Vancouver',
      }),
      match('r32-87', {
        team1: bracketTeam('🇨🇴', '哥伦比亚', 'Colombia'),
        team2: bracketTeam('🇬🇭', '加纳', 'Ghana'),
        date: '2026-07-04',
        venue: 'Arrowhead Stadium, Kansas City',
      }),
    ],
  },
  { name: '十六强', nameEn: 'Round of 16', matches: Array.from({ length: 8 }, (_, i) => match(`r16-${i + 1}`)) },
  { name: '八强', nameEn: 'Quarter Finals', matches: Array.from({ length: 4 }, (_, i) => match(`qf-${i + 1}`)) },
  { name: '四强', nameEn: 'Semi Finals', matches: Array.from({ length: 2 }, (_, i) => match(`sf-${i + 1}`)) },
  { name: '决赛', nameEn: 'Final', matches: [match('final', { venue: 'MetLife Stadium, NJ', date: '2026-07-19' })] },
];
