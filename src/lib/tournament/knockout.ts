import { knockoutRounds } from '@/app/data/teams';
import type { BracketMatch, BracketRound, BracketTeam } from '@/app/data/teams';
import type { MatchScore } from '@/lib/scores/types';

function applyScore(
  team: BracketTeam,
  score: number,
  winner: boolean,
  penaltyScore?: number
): BracketTeam {
  return {
    ...team,
    score,
    winner,
    penaltyScore,
  };
}

function cloneMatch(match: BracketMatch): BracketMatch {
  return {
    ...match,
    team1: { ...match.team1 },
    team2: { ...match.team2 },
  };
}

function getWinner(score: MatchScore, side: 'home' | 'away') {
  const explicitWinner = side === 'home' ? score.homeWinner : score.awayWinner;
  if (score.status !== 'finished') return false;
  if (typeof explicitWinner === 'boolean') return explicitWinner;

  return side === 'home'
    ? score.homeScore > score.awayScore
    : score.awayScore > score.homeScore;
}

function getMatchWinner(match: BracketMatch) {
  if (!match.played) return null;
  if (match.team1.winner) return match.team1;
  if (match.team2.winner) return match.team2;
  return null;
}

function advanceWinner(rounds: BracketRound[], roundIndex: number, matchIndex: number) {
  const nextRound = rounds[roundIndex + 1];
  const winner = getMatchWinner(rounds[roundIndex].matches[matchIndex]);
  if (!nextRound || !winner) return;

  const nextMatch = nextRound.matches[Math.floor(matchIndex / 2)];
  if (!nextMatch) return;

  const nextSlot = matchIndex % 2 === 0 ? 'team1' : 'team2';
  if (!nextMatch[nextSlot].tbd) return;

  nextMatch[nextSlot] = {
    flag: winner.flag,
    nameZh: winner.nameZh,
    nameEn: winner.nameEn,
  };
}

export function buildKnockoutRoundsFromScores(scores: Record<string, MatchScore>): BracketRound[] {
  const rounds = knockoutRounds.map((round) => ({
    ...round,
    matches: round.matches.map(cloneMatch),
  }));

  rounds.forEach((round, roundIndex) => {
    round.matches = round.matches.map((match, matchIndex) => {
      const score = scores[match.id];
      if (!score || score.status === 'scheduled') {
        advanceWinner(rounds, roundIndex, matchIndex);
        return match;
      }

      const played = score.status === 'finished';
      const team1PenaltyScore = score.homePenaltyScore ?? match.penaltyScores?.team1;
      const team2PenaltyScore = score.awayPenaltyScore ?? match.penaltyScores?.team2;

      const scoredMatch = {
        ...match,
        played: played || score.status === 'live',
        team1: applyScore(match.team1, score.homeScore, getWinner(score, 'home'), team1PenaltyScore),
        team2: applyScore(match.team2, score.awayScore, getWinner(score, 'away'), team2PenaltyScore),
        penalty: match.penalty,
        penaltyScores:
          team1PenaltyScore !== undefined && team2PenaltyScore !== undefined
            ? { team1: team1PenaltyScore, team2: team2PenaltyScore }
            : match.penaltyScores,
      };

      rounds[roundIndex].matches[matchIndex] = scoredMatch;
      advanceWinner(rounds, roundIndex, matchIndex);

      return scoredMatch;
    });
  });

  return rounds;
}
