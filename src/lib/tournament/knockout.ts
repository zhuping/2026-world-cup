import { knockoutRounds } from '@/app/data/teams';
import type { BracketRound, BracketTeam } from '@/app/data/teams';
import type { MatchScore } from '@/lib/scores/types';

function applyScore(team: BracketTeam, score: number, winner: boolean): BracketTeam {
  return {
    ...team,
    score,
    winner,
  };
}

function getWinner(score: MatchScore, side: 'home' | 'away') {
  const explicitWinner = side === 'home' ? score.homeWinner : score.awayWinner;
  if (typeof explicitWinner === 'boolean') return explicitWinner;

  if (score.status !== 'finished') return false;
  return side === 'home'
    ? score.homeScore > score.awayScore
    : score.awayScore > score.homeScore;
}

export function buildKnockoutRoundsFromScores(scores: Record<string, MatchScore>): BracketRound[] {
  return knockoutRounds.map((round) => ({
    ...round,
    matches: round.matches.map((match) => {
      const score = scores[match.id];
      if (!score) return match;

      const played = score.status === 'finished';

      return {
        ...match,
        played: played || score.status === 'live',
        team1: applyScore(match.team1, score.homeScore, getWinner(score, 'home')),
        team2: applyScore(match.team2, score.awayScore, getWinner(score, 'away')),
        penalty: match.penalty,
      };
    }),
  }));
}
