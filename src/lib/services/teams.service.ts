/**
 * Teams & Tournament Service Layer
 *
 * Architecture: Next.js Migration Ready
 * ─────────────────────────────────────
 * Abstracts all tournament data access. Calling components are fully decoupled
 * from the data source — swap the TODO lines for fetch() calls when connecting
 * a real backend or CMS.
 *
 * Next.js migration path:
 *   1. Replace static imports with:
 *      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/groups`, {
 *        next: { revalidate: 300 } // ISR — revalidate every 5 min during live matches
 *      });
 *   2. Move this file to `app/lib/services/teams.service.ts`
 *   3. Use in Server Components, generateStaticParams, or Route Handlers.
 *
 * Recommended API Route structure (Next.js App Router):
 *   app/api/groups/route.ts          → GET /api/groups
 *   app/api/groups/[name]/route.ts   → GET /api/groups/A
 *   app/api/knockout/route.ts        → GET /api/knockout
 *   app/api/knockout/[round]/route.ts
 */

import {
  groups as _groups,
  knockoutRounds as _knockoutRounds,
  Group,
  BracketRound,
  BracketMatch,
  Team,
} from '../../src/app/data/teams';

// Re-export types from service layer
export type { Group, BracketRound, BracketMatch, Team };

// ─── Group Stage ─────────────────────────────────────────────────────────────

/**
 * Get all 12 groups with standings.
 *
 * Next.js equivalent:
 *   const data = await fetch('/api/groups').then(r => r.json());
 */
export async function getGroups(): Promise<Group[]> {
  // TODO: Replace with API fetch for Next.js
  return Promise.resolve(_groups);
}

/**
 * Get a single group by letter (A–L).
 *
 * Next.js equivalent:
 *   const data = await fetch(`/api/groups/${name}`).then(r => r.json());
 */
export async function getGroupByName(name: string): Promise<Group | undefined> {
  // TODO: Replace with API fetch for Next.js
  return Promise.resolve(_groups.find(g => g.name === name));
}

/**
 * Get sorted standings for a group (points → GD → GF).
 */
export async function getGroupStandings(name: string): Promise<Team[]> {
  const group = await getGroupByName(name);
  if (!group) return [];
  return [...group.teams].sort((a, b) =>
    b.points !== a.points
      ? b.points - a.points
      : b.gd !== a.gd
      ? b.gd - a.gd
      : b.gf - a.gf
  );
}

// ─── Knockout Stage ───────────────────────────────────────────────────────────

/**
 * Get all knockout rounds.
 *
 * Next.js equivalent:
 *   const data = await fetch('/api/knockout').then(r => r.json());
 */
export async function getKnockoutRounds(): Promise<BracketRound[]> {
  // TODO: Replace with API fetch for Next.js
  return Promise.resolve(_knockoutRounds);
}

/**
 * Get a specific knockout round by English name.
 *
 * Next.js equivalent:
 *   const data = await fetch(`/api/knockout/${roundName}`).then(r => r.json());
 */
export async function getKnockoutRound(nameEn: string): Promise<BracketRound | undefined> {
  // TODO: Replace with API fetch for Next.js
  return Promise.resolve(_knockoutRounds.find(r => r.nameEn === nameEn));
}

/**
 * Get a specific match by ID.
 *
 * Next.js equivalent:
 *   const data = await fetch(`/api/matches/${matchId}`).then(r => r.json());
 */
export async function getMatchById(matchId: string): Promise<BracketMatch | undefined> {
  // TODO: Replace with API fetch for Next.js
  for (const round of _knockoutRounds) {
    const match = round.matches.find(m => m.id === matchId);
    if (match) return match;
  }
  return undefined;
}

/**
 * Get tournament summary statistics.
 * Used for SEO meta descriptions and stat banners.
 */
export async function getTournamentStats(): Promise<{
  totalTeams: number;
  totalGroups: number;
  groupMatches: number;
  knockoutMatches: number;
  completedMatches: number;
  upcomingMatches: number;
}> {
  const [groups, rounds] = await Promise.all([getGroups(), getKnockoutRounds()]);
  const allMatches = rounds.flatMap(r => r.matches);

  return {
    totalTeams: groups.length * 4,
    totalGroups: groups.length,
    groupMatches: groups.length * 6,
    knockoutMatches: allMatches.length,
    completedMatches: allMatches.filter(m => m.played).length,
    upcomingMatches: allMatches.filter(m => !m.played).length,
  };
}