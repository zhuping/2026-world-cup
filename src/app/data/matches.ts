export interface ScheduleMatch {
  id: string;
  group: string;
  matchday: number;
  date: string;       // YYYY-MM-DD (UTC date)
  timeUtc: string;    // HH:MM (UTC)
  homeFlag: string;
  homeNameEn: string;
  awayFlag: string;
  awayNameEn: string;
  venueId: number;    // references Venue.id in venues.ts
  simultaneous?: boolean;
}

export interface ScorableMatch {
  id: string;
  date: string;
  timeUtc?: string;
  homeNameEn: string;
  awayNameEn: string;
}

export const groupStageMatches: ScheduleMatch[] = [
  // -- June 11 ---------------------------------------------------------------
  { id: 'm-01', group: 'A', matchday: 1, date: '2026-06-11', timeUtc: '19:00', homeFlag: '🇲🇽', homeNameEn: 'Mexico',          awayFlag: '🇿🇦', awayNameEn: 'South Africa',           venueId: 14 },
  // -- June 12 ---------------------------------------------------------------
  { id: 'm-02', group: 'A', matchday: 1, date: '2026-06-12', timeUtc: '02:00', homeFlag: '🇰🇷', homeNameEn: 'Korea Republic',  awayFlag: '🇨🇿', awayNameEn: 'Czechia',                venueId: 15 },
  { id: 'm-03', group: 'B', matchday: 1, date: '2026-06-12', timeUtc: '19:00', homeFlag: '🇨🇦', homeNameEn: 'Canada',          awayFlag: '🇧🇦', awayNameEn: 'Bosnia and Herzegovina',  venueId: 13 },
  // -- June 13 ---------------------------------------------------------------
  { id: 'm-04', group: 'D', matchday: 1, date: '2026-06-13', timeUtc: '01:00', homeFlag: '🇺🇸', homeNameEn: 'USA',             awayFlag: '🇵🇾', awayNameEn: 'Paraguay',               venueId: 3  },
  { id: 'm-08', group: 'B', matchday: 1, date: '2026-06-13', timeUtc: '19:00', homeFlag: '🇶🇦', homeNameEn: 'Qatar',           awayFlag: '🇨🇭', awayNameEn: 'Switzerland',            venueId: 4  },
  { id: 'm-07', group: 'C', matchday: 1, date: '2026-06-13', timeUtc: '22:00', homeFlag: '🇧🇷', homeNameEn: 'Brazil',          awayFlag: '🇲🇦', awayNameEn: 'Morocco',                venueId: 1  },
  // -- June 14 ---------------------------------------------------------------
  { id: 'm-05', group: 'C', matchday: 1, date: '2026-06-14', timeUtc: '01:00', homeFlag: '🇭🇹', homeNameEn: 'Haiti',           awayFlag: '🏴', awayNameEn: 'Scotland',               venueId: 8  },
  { id: 'm-06', group: 'D', matchday: 1, date: '2026-06-14', timeUtc: '04:00', homeFlag: '🇦🇺', homeNameEn: 'Australia',       awayFlag: '🇹🇷', awayNameEn: 'Türkiye',                venueId: 12 },
  { id: 'm-10', group: 'E', matchday: 1, date: '2026-06-14', timeUtc: '17:00', homeFlag: '🇩🇪', homeNameEn: 'Germany',         awayFlag: '🇨🇼', awayNameEn: 'Curaçao',                venueId: 10 },
  { id: 'm-11', group: 'F', matchday: 1, date: '2026-06-14', timeUtc: '20:00', homeFlag: '🇳🇱', homeNameEn: 'Netherlands',     awayFlag: '🇯🇵', awayNameEn: 'Japan',                  venueId: 2  },
  { id: 'm-09', group: 'E', matchday: 1, date: '2026-06-14', timeUtc: '23:00', homeFlag: '🇨🇮', homeNameEn: 'Côte d\'Ivoire',   awayFlag: '🇪🇨', awayNameEn: 'Ecuador',                venueId: 7  },
  // -- June 15 ---------------------------------------------------------------
  { id: 'm-12', group: 'F', matchday: 1, date: '2026-06-15', timeUtc: '02:00', homeFlag: '🇸🇪', homeNameEn: 'Sweden',          awayFlag: '🇹🇳', awayNameEn: 'Tunisia',                venueId: 16 },
  { id: 'm-14', group: 'H', matchday: 1, date: '2026-06-15', timeUtc: '16:00', homeFlag: '🇪🇸', homeNameEn: 'Spain',           awayFlag: '🇨🇻', awayNameEn: 'Cabo Verde',             venueId: 5  },
  { id: 'm-16', group: 'G', matchday: 1, date: '2026-06-15', timeUtc: '19:00', homeFlag: '🇧🇪', homeNameEn: 'Belgium',         awayFlag: '🇪🇬', awayNameEn: 'Egypt',                  venueId: 11 },
  { id: 'm-13', group: 'H', matchday: 1, date: '2026-06-15', timeUtc: '22:00', homeFlag: '🇸🇦', homeNameEn: 'Saudi Arabia',    awayFlag: '🇺🇾', awayNameEn: 'Uruguay',                venueId: 9  },
  // -- June 16 ---------------------------------------------------------------
  { id: 'm-15', group: 'G', matchday: 1, date: '2026-06-16', timeUtc: '01:00', homeFlag: '🇮🇷', homeNameEn: 'IR Iran',         awayFlag: '🇳🇿', awayNameEn: 'New Zealand',            venueId: 3  },
  { id: 'm-17', group: 'I', matchday: 1, date: '2026-06-16', timeUtc: '19:00', homeFlag: '🇫🇷', homeNameEn: 'France',          awayFlag: '🇸🇳', awayNameEn: 'Senegal',                venueId: 1  },
  { id: 'm-18', group: 'I', matchday: 1, date: '2026-06-16', timeUtc: '22:00', homeFlag: '🇮🇶', homeNameEn: 'Iraq',            awayFlag: '🇳🇴', awayNameEn: 'Norway',                 venueId: 8  },
  // -- June 17 ---------------------------------------------------------------
  { id: 'm-19', group: 'J', matchday: 1, date: '2026-06-17', timeUtc: '01:00', homeFlag: '🇦🇷', homeNameEn: 'Argentina',       awayFlag: '🇩🇿', awayNameEn: 'Algeria',                venueId: 6  },
  { id: 'm-20', group: 'J', matchday: 1, date: '2026-06-17', timeUtc: '04:00', homeFlag: '🇦🇹', homeNameEn: 'Austria',         awayFlag: '🇯🇴', awayNameEn: 'Jordan',                 venueId: 4  },
  { id: 'm-23', group: 'K', matchday: 1, date: '2026-06-17', timeUtc: '17:00', homeFlag: '🇵🇹', homeNameEn: 'Portugal',        awayFlag: '🇨🇩', awayNameEn: 'Congo DR',               venueId: 10 },
  { id: 'm-22', group: 'L', matchday: 1, date: '2026-06-17', timeUtc: '20:00', homeFlag: '🏴', homeNameEn: 'England',         awayFlag: '🇭🇷', awayNameEn: 'Croatia',                venueId: 2  },
  { id: 'm-21', group: 'L', matchday: 1, date: '2026-06-17', timeUtc: '23:00', homeFlag: '🇬🇭', homeNameEn: 'Ghana',           awayFlag: '🇵🇦', awayNameEn: 'Panama',                 venueId: 13 },
  // -- June 18 ---------------------------------------------------------------
  { id: 'm-24', group: 'K', matchday: 1, date: '2026-06-18', timeUtc: '02:00', homeFlag: '🇺🇿', homeNameEn: 'Uzbekistan',      awayFlag: '🇨🇴', awayNameEn: 'Colombia',               venueId: 14 },
  { id: 'm-25', group: 'A', matchday: 2, date: '2026-06-18', timeUtc: '16:00', homeFlag: '🇨🇿', homeNameEn: 'Czechia',         awayFlag: '🇿🇦', awayNameEn: 'South Africa',           venueId: 5  },
  { id: 'm-26', group: 'B', matchday: 2, date: '2026-06-18', timeUtc: '19:00', homeFlag: '🇨🇭', homeNameEn: 'Switzerland',     awayFlag: '🇧🇦', awayNameEn: 'Bosnia and Herzegovina',  venueId: 3  },
  { id: 'm-27', group: 'B', matchday: 2, date: '2026-06-18', timeUtc: '22:00', homeFlag: '🇨🇦', homeNameEn: 'Canada',          awayFlag: '🇶🇦', awayNameEn: 'Qatar',                  venueId: 12 },
  // -- June 19 ---------------------------------------------------------------
  { id: 'm-28', group: 'A', matchday: 2, date: '2026-06-19', timeUtc: '01:00', homeFlag: '🇲🇽', homeNameEn: 'Mexico',          awayFlag: '🇰🇷', awayNameEn: 'Korea Republic',         venueId: 15 },
  { id: 'm-32', group: 'D', matchday: 2, date: '2026-06-19', timeUtc: '19:00', homeFlag: '🇺🇸', homeNameEn: 'USA',             awayFlag: '🇦🇺', awayNameEn: 'Australia',              venueId: 11 },
  { id: 'm-30', group: 'C', matchday: 2, date: '2026-06-19', timeUtc: '22:00', homeFlag: '🏴', homeNameEn: 'Scotland',        awayFlag: '🇲🇦', awayNameEn: 'Morocco',                venueId: 8  },
  // -- June 20 ---------------------------------------------------------------
  { id: 'm-29', group: 'C', matchday: 2, date: '2026-06-20', timeUtc: '00:30', homeFlag: '🇧🇷', homeNameEn: 'Brazil',          awayFlag: '🇭🇹', awayNameEn: 'Haiti',                  venueId: 7  },
  { id: 'm-31', group: 'D', matchday: 2, date: '2026-06-20', timeUtc: '03:00', homeFlag: '🇹🇷', homeNameEn: 'Türkiye',         awayFlag: '🇵🇾', awayNameEn: 'Paraguay',               venueId: 4  },
  { id: 'm-35', group: 'F', matchday: 2, date: '2026-06-20', timeUtc: '17:00', homeFlag: '🇳🇱', homeNameEn: 'Netherlands',     awayFlag: '🇸🇪', awayNameEn: 'Sweden',                 venueId: 10 },
  { id: 'm-33', group: 'E', matchday: 2, date: '2026-06-20', timeUtc: '20:00', homeFlag: '🇩🇪', homeNameEn: 'Germany',         awayFlag: '🇨🇮', awayNameEn: 'Côte d\'Ivoire',          venueId: 13 },
  // -- June 21 ---------------------------------------------------------------
  { id: 'm-34', group: 'E', matchday: 2, date: '2026-06-21', timeUtc: '00:00', homeFlag: '🇪🇨', homeNameEn: 'Ecuador',         awayFlag: '🇨🇼', awayNameEn: 'Curaçao',                venueId: 6  },
  { id: 'm-36', group: 'F', matchday: 2, date: '2026-06-21', timeUtc: '04:00', homeFlag: '🇹🇳', homeNameEn: 'Tunisia',         awayFlag: '🇯🇵', awayNameEn: 'Japan',                  venueId: 16 },
  { id: 'm-38', group: 'H', matchday: 2, date: '2026-06-21', timeUtc: '16:00', homeFlag: '🇪🇸', homeNameEn: 'Spain',           awayFlag: '🇸🇦', awayNameEn: 'Saudi Arabia',           venueId: 5  },
  { id: 'm-39', group: 'G', matchday: 2, date: '2026-06-21', timeUtc: '19:00', homeFlag: '🇧🇪', homeNameEn: 'Belgium',         awayFlag: '🇮🇷', awayNameEn: 'IR Iran',                venueId: 3  },
  { id: 'm-37', group: 'H', matchday: 2, date: '2026-06-21', timeUtc: '22:00', homeFlag: '🇺🇾', homeNameEn: 'Uruguay',         awayFlag: '🇨🇻', awayNameEn: 'Cabo Verde',             venueId: 9  },
  // -- June 22 ---------------------------------------------------------------
  { id: 'm-40', group: 'G', matchday: 2, date: '2026-06-22', timeUtc: '01:00', homeFlag: '🇳🇿', homeNameEn: 'New Zealand',     awayFlag: '🇪🇬', awayNameEn: 'Egypt',                  venueId: 12 },
  { id: 'm-43', group: 'J', matchday: 2, date: '2026-06-22', timeUtc: '17:00', homeFlag: '🇦🇷', homeNameEn: 'Argentina',       awayFlag: '🇦🇹', awayNameEn: 'Austria',                venueId: 2  },
  { id: 'm-42', group: 'I', matchday: 2, date: '2026-06-22', timeUtc: '21:00', homeFlag: '🇫🇷', homeNameEn: 'France',          awayFlag: '🇮🇶', awayNameEn: 'Iraq',                   venueId: 7  },
  // -- June 23 ---------------------------------------------------------------
  { id: 'm-41', group: 'I', matchday: 2, date: '2026-06-23', timeUtc: '00:00', homeFlag: '🇳🇴', homeNameEn: 'Norway',          awayFlag: '🇸🇳', awayNameEn: 'Senegal',                venueId: 1  },
  { id: 'm-44', group: 'J', matchday: 2, date: '2026-06-23', timeUtc: '03:00', homeFlag: '🇯🇴', homeNameEn: 'Jordan',          awayFlag: '🇩🇿', awayNameEn: 'Algeria',                venueId: 4  },
  { id: 'm-47', group: 'K', matchday: 2, date: '2026-06-23', timeUtc: '17:00', homeFlag: '🇵🇹', homeNameEn: 'Portugal',        awayFlag: '🇺🇿', awayNameEn: 'Uzbekistan',             venueId: 10 },
  { id: 'm-45', group: 'L', matchday: 2, date: '2026-06-23', timeUtc: '20:00', homeFlag: '🏴', homeNameEn: 'England',         awayFlag: '🇬🇭', awayNameEn: 'Ghana',                  venueId: 8  },
  { id: 'm-46', group: 'L', matchday: 2, date: '2026-06-23', timeUtc: '23:00', homeFlag: '🇵🇦', homeNameEn: 'Panama',          awayFlag: '🇭🇷', awayNameEn: 'Croatia',                venueId: 13 },
  // -- June 24 ---------------------------------------------------------------
  { id: 'm-48', group: 'K', matchday: 2, date: '2026-06-24', timeUtc: '02:00', homeFlag: '🇨🇴', homeNameEn: 'Colombia',        awayFlag: '🇨🇩', awayNameEn: 'Congo DR',               venueId: 15 },
  { id: 'm-51', group: 'B', matchday: 3, date: '2026-06-24', timeUtc: '19:00', homeFlag: '🇨🇭', homeNameEn: 'Switzerland',     awayFlag: '🇨🇦', awayNameEn: 'Canada',                 venueId: 12, simultaneous: true },
  { id: 'm-52', group: 'B', matchday: 3, date: '2026-06-24', timeUtc: '19:00', homeFlag: '🇧🇦', homeNameEn: 'Bosnia and Herzegovina',  awayFlag: '🇶🇦', awayNameEn: 'Qatar',                  venueId: 11, simultaneous: true },
  { id: 'm-49', group: 'C', matchday: 3, date: '2026-06-24', timeUtc: '22:00', homeFlag: '🏴', homeNameEn: 'Scotland',        awayFlag: '🇧🇷', awayNameEn: 'Brazil',                 venueId: 9 , simultaneous: true },
  { id: 'm-50', group: 'C', matchday: 3, date: '2026-06-24', timeUtc: '22:00', homeFlag: '🇲🇦', homeNameEn: 'Morocco',         awayFlag: '🇭🇹', awayNameEn: 'Haiti',                  venueId: 5 , simultaneous: true },
  // -- June 25 ---------------------------------------------------------------
  { id: 'm-53', group: 'A', matchday: 3, date: '2026-06-25', timeUtc: '01:00', homeFlag: '🇨🇿', homeNameEn: 'Czechia',         awayFlag: '🇲🇽', awayNameEn: 'Mexico',                 venueId: 14, simultaneous: true },
  { id: 'm-54', group: 'A', matchday: 3, date: '2026-06-25', timeUtc: '01:00', homeFlag: '🇿🇦', homeNameEn: 'South Africa',    awayFlag: '🇰🇷', awayNameEn: 'Korea Republic',         venueId: 16, simultaneous: true },
  { id: 'm-55', group: 'E', matchday: 3, date: '2026-06-25', timeUtc: '20:00', homeFlag: '🇨🇼', homeNameEn: 'Curaçao',         awayFlag: '🇨🇮', awayNameEn: 'Côte d\'Ivoire',          venueId: 7 , simultaneous: true },
  { id: 'm-56', group: 'E', matchday: 3, date: '2026-06-25', timeUtc: '20:00', homeFlag: '🇪🇨', homeNameEn: 'Ecuador',         awayFlag: '🇩🇪', awayNameEn: 'Germany',                venueId: 1 , simultaneous: true },
  { id: 'm-57', group: 'F', matchday: 3, date: '2026-06-25', timeUtc: '23:00', homeFlag: '🇯🇵', homeNameEn: 'Japan',           awayFlag: '🇸🇪', awayNameEn: 'Sweden',                 venueId: 2 , simultaneous: true },
  { id: 'm-58', group: 'F', matchday: 3, date: '2026-06-25', timeUtc: '23:00', homeFlag: '🇹🇳', homeNameEn: 'Tunisia',         awayFlag: '🇳🇱', awayNameEn: 'Netherlands',            venueId: 6 , simultaneous: true },
  // -- June 26 ---------------------------------------------------------------
  { id: 'm-59', group: 'D', matchday: 3, date: '2026-06-26', timeUtc: '02:00', homeFlag: '🇹🇷', homeNameEn: 'Türkiye',         awayFlag: '🇺🇸', awayNameEn: 'USA',                    venueId: 3 , simultaneous: true },
  { id: 'm-60', group: 'D', matchday: 3, date: '2026-06-26', timeUtc: '02:00', homeFlag: '🇵🇾', homeNameEn: 'Paraguay',        awayFlag: '🇦🇺', awayNameEn: 'Australia',              venueId: 4 , simultaneous: true },
  { id: 'm-61', group: 'I', matchday: 3, date: '2026-06-26', timeUtc: '19:00', homeFlag: '🇳🇴', homeNameEn: 'Norway',          awayFlag: '🇫🇷', awayNameEn: 'France',                 venueId: 8 , simultaneous: true },
  { id: 'm-62', group: 'I', matchday: 3, date: '2026-06-26', timeUtc: '19:00', homeFlag: '🇸🇳', homeNameEn: 'Senegal',         awayFlag: '🇮🇶', awayNameEn: 'Iraq',                   venueId: 13, simultaneous: true },
  // -- June 27 ---------------------------------------------------------------
  { id: 'm-65', group: 'H', matchday: 3, date: '2026-06-27', timeUtc: '00:00', homeFlag: '🇨🇻', homeNameEn: 'Cabo Verde',      awayFlag: '🇸🇦', awayNameEn: 'Saudi Arabia',           venueId: 10, simultaneous: true },
  { id: 'm-66', group: 'H', matchday: 3, date: '2026-06-27', timeUtc: '00:00', homeFlag: '🇺🇾', homeNameEn: 'Uruguay',         awayFlag: '🇪🇸', awayNameEn: 'Spain',                  venueId: 15, simultaneous: true },
  { id: 'm-63', group: 'G', matchday: 3, date: '2026-06-27', timeUtc: '03:00', homeFlag: '🇪🇬', homeNameEn: 'Egypt',           awayFlag: '🇮🇷', awayNameEn: 'IR Iran',                venueId: 11, simultaneous: true },
  { id: 'm-64', group: 'G', matchday: 3, date: '2026-06-27', timeUtc: '03:00', homeFlag: '🇳🇿', homeNameEn: 'New Zealand',     awayFlag: '🇧🇪', awayNameEn: 'Belgium',                venueId: 12, simultaneous: true },
  { id: 'm-67', group: 'L', matchday: 3, date: '2026-06-27', timeUtc: '21:00', homeFlag: '🇵🇦', homeNameEn: 'Panama',          awayFlag: '🏴', awayNameEn: 'England',                venueId: 1 , simultaneous: true },
  { id: 'm-68', group: 'L', matchday: 3, date: '2026-06-27', timeUtc: '21:00', homeFlag: '🇭🇷', homeNameEn: 'Croatia',         awayFlag: '🇬🇭', awayNameEn: 'Ghana',                  venueId: 7 , simultaneous: true },
  { id: 'm-71', group: 'K', matchday: 3, date: '2026-06-27', timeUtc: '23:30', homeFlag: '🇨🇴', homeNameEn: 'Colombia',        awayFlag: '🇵🇹', awayNameEn: 'Portugal',               venueId: 9 , simultaneous: true },
  { id: 'm-72', group: 'K', matchday: 3, date: '2026-06-27', timeUtc: '23:30', homeFlag: '🇨🇩', homeNameEn: 'Congo DR',        awayFlag: '🇺🇿', awayNameEn: 'Uzbekistan',             venueId: 5 , simultaneous: true },
  // -- June 28 ---------------------------------------------------------------
  { id: 'm-69', group: 'J', matchday: 3, date: '2026-06-28', timeUtc: '02:00', homeFlag: '🇩🇿', homeNameEn: 'Algeria',         awayFlag: '🇦🇹', awayNameEn: 'Austria',                venueId: 6 , simultaneous: true },
  { id: 'm-70', group: 'J', matchday: 3, date: '2026-06-28', timeUtc: '02:00', homeFlag: '🇯🇴', homeNameEn: 'Jordan',          awayFlag: '🇦🇷', awayNameEn: 'Argentina',              venueId: 2 , simultaneous: true },
];

export const GROUP_STAGE_START = '2026-06-11';
export const GROUP_STAGE_END   = '2026-06-28';

export const matchDates = [...new Set(groupStageMatches.map(m => m.date))].sort();

export const roundOf32ScheduleMatches: ScheduleMatch[] = [
  { id: 'r32-73', group: 'R32', matchday: 32, date: '2026-06-28', timeUtc: '23:00', homeFlag: '🇨🇦', homeNameEn: 'Canada', awayFlag: '🇿🇦', awayNameEn: 'South Africa', venueId: 3 },
  { id: 'r32-74', group: 'R32', matchday: 32, date: '2026-06-29', timeUtc: '16:00', homeFlag: '🇩🇪', homeNameEn: 'Germany', awayFlag: '🇵🇾', awayNameEn: 'Paraguay', venueId: 8 },
  { id: 'r32-76', group: 'R32', matchday: 32, date: '2026-06-29', timeUtc: '19:00', homeFlag: '🇧🇷', homeNameEn: 'Brazil', awayFlag: '🇯🇵', awayNameEn: 'Japan', venueId: 10 },
  { id: 'r32-75', group: 'R32', matchday: 32, date: '2026-06-30', timeUtc: '02:00', homeFlag: '🇳🇱', homeNameEn: 'Netherlands', awayFlag: '🇲🇦', awayNameEn: 'Morocco', venueId: 16 },
  { id: 'r32-77', group: 'R32', matchday: 32, date: '2026-06-30', timeUtc: '21:00', homeFlag: '🇫🇷', homeNameEn: 'France', awayFlag: '🇸🇪', awayNameEn: 'Sweden', venueId: 1 },
  { id: 'r32-78', group: 'R32', matchday: 32, date: '2026-06-30', timeUtc: '17:00', homeFlag: '🇨🇮', homeNameEn: "Cote d'Ivoire", awayFlag: '🇳🇴', awayNameEn: 'Norway', venueId: 2 },
  { id: 'r32-79', group: 'R32', matchday: 32, date: '2026-07-01', timeUtc: '01:00', homeFlag: '🇲🇽', homeNameEn: 'Mexico', awayFlag: '🇪🇨', awayNameEn: 'Ecuador', venueId: 14 },
  { id: 'r32-80', group: 'R32', matchday: 32, date: '2026-07-01', timeUtc: '16:00', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', homeNameEn: 'England', awayFlag: '🇨🇩', awayNameEn: 'DR Congo', venueId: 5 },
  { id: 'r32-81', group: 'R32', matchday: 32, date: '2026-07-01', timeUtc: '20:00', homeFlag: '🇧🇪', homeNameEn: 'Belgium', awayFlag: '🇸🇳', awayNameEn: 'Senegal', venueId: 11 },
  { id: 'r32-82', group: 'R32', matchday: 32, date: '2026-07-02', timeUtc: '00:00', homeFlag: '🇺🇸', homeNameEn: 'USA', awayFlag: '🇧🇦', awayNameEn: 'Bosnia & Herzegovina', venueId: 4 },
  { id: 'r32-83', group: 'R32', matchday: 32, date: '2026-07-02', timeUtc: '19:00', homeFlag: '🇪🇸', homeNameEn: 'Spain', awayFlag: '🇦🇹', awayNameEn: 'Austria', venueId: 3 },
  { id: 'r32-85', group: 'R32', matchday: 32, date: '2026-07-03', timeUtc: '03:00', homeFlag: '🇨🇭', homeNameEn: 'Switzerland', awayFlag: '🇩🇿', awayNameEn: 'Algeria', venueId: 12 },
  { id: 'r32-86', group: 'R32', matchday: 32, date: '2026-07-03', timeUtc: '22:00', homeFlag: '🇦🇷', homeNameEn: 'Argentina', awayFlag: '🇨🇻', awayNameEn: 'Cape Verde', venueId: 9 },
  { id: 'r32-84', group: 'R32', matchday: 32, date: '2026-07-02', timeUtc: '23:00', homeFlag: '🇵🇹', homeNameEn: 'Portugal', awayFlag: '🇭🇷', awayNameEn: 'Croatia', venueId: 13 },
  { id: 'r32-87', group: 'R32', matchday: 32, date: '2026-07-04', timeUtc: '01:30', homeFlag: '🇨🇴', homeNameEn: 'Colombia', awayFlag: '🇬🇭', awayNameEn: 'Ghana', venueId: 6 },
  { id: 'r32-88', group: 'R32', matchday: 32, date: '2026-07-03', timeUtc: '18:00', homeFlag: '🇦🇺', homeNameEn: 'Australia', awayFlag: '🇪🇬', awayNameEn: 'Egypt', venueId: 2 },
];

export const knockoutScheduleMatches: ScheduleMatch[] = [
  { id: 'qf-1', group: 'QF', matchday: 8, date: '2026-07-09', timeUtc: '20:00', homeFlag: '🇫🇷', homeNameEn: 'France', awayFlag: '🇲🇦', awayNameEn: 'Morocco', venueId: 8 },
  { id: 'qf-2', group: 'QF', matchday: 8, date: '2026-07-10', timeUtc: '19:00', homeFlag: '🇪🇸', homeNameEn: 'Spain', awayFlag: '🇧🇪', awayNameEn: 'Belgium', venueId: 3 },
  { id: 'qf-3', group: 'QF', matchday: 8, date: '2026-07-11', timeUtc: '21:00', homeFlag: '🇳🇴', homeNameEn: 'Norway', awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayNameEn: 'England', venueId: 9 },
  { id: 'qf-4', group: 'QF', matchday: 8, date: '2026-07-12', timeUtc: '01:00', homeFlag: '🇦🇷', homeNameEn: 'Argentina', awayFlag: '🇨🇭', awayNameEn: 'Switzerland', venueId: 6 },
];

export const knockoutStageMatches: ScorableMatch[] = [
  ...roundOf32ScheduleMatches,
  ...knockoutScheduleMatches,
].map((match) => ({
  id: match.id,
  date: match.date,
  timeUtc: match.timeUtc,
  homeNameEn: match.homeNameEn,
  awayNameEn: match.awayNameEn,
}));

export const scorableMatches: ScorableMatch[] = [
  ...groupStageMatches,
  ...knockoutStageMatches,
];
