import { groupStageMatches } from '@/app/data/matches';
import { groups as groupTemplates } from '@/app/data/teams';
import type { Group, Team } from '@/app/data/teams';
import type { MatchScore } from '@/lib/scores/types';

function cloneZeroTeam(team: Team): Team {
  return {
    ...team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    points: 0,
  };
}

export function buildGroupsFromScores(scores: Record<string, MatchScore>): Group[] {
  const groups = groupTemplates.map((group) => ({
    name: group.name,
    teams: group.teams.map(cloneZeroTeam),
  }));

  const teamMap = new Map<string, Team>();
  for (const group of groups) {
    for (const team of group.teams) {
      teamMap.set(team.nameEn, team);
    }
  }

  for (const match of groupStageMatches) {
    const score = scores[match.id];
    if (!score || score.status !== 'finished') continue;

    const home = teamMap.get(match.homeNameEn);
    const away = teamMap.get(match.awayNameEn);
    if (!home || !away) continue;

    home.played += 1;
    away.played += 1;
    home.gf += score.homeScore;
    home.ga += score.awayScore;
    away.gf += score.awayScore;
    away.ga += score.homeScore;

    if (score.homeScore > score.awayScore) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (score.homeScore < score.awayScore) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  }

  for (const group of groups) {
    for (const team of group.teams) {
      team.gd = team.gf - team.ga;
    }

    group.teams.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.nameEn.localeCompare(b.nameEn);
    });
  }

  return groups;
}
