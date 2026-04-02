/**
 * Venues Service Layer
 *
 * Architecture: Next.js Migration Ready
 * ─────────────────────────────────────
 * This module abstracts all venue data access behind a service interface.
 * Every function is `async` so swapping static data for real API calls
 * requires zero changes in calling components.
 *
 * Next.js migration path:
 *   1. Replace the static import below with:
 *      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/venues`, {
 *        next: { revalidate: 3600 } // ISR — revalidate every hour
 *      });
 *      return res.json();
 *   2. Move this file to `app/lib/services/venues.service.ts`
 *   3. Call from Server Components or `generateStaticParams` directly.
 */

import { venues as _venues, Venue } from '../../src/app/data/venues';
// Re-export the type so consumers import from the service, not the data layer
export type { Venue };

// ─── Read Operations ─────────────────────────────────────────────────────────

/**
 * Get all 16 official match venues.
 *
 * Next.js equivalent:
 *   const data = await fetch('/api/venues').then(r => r.json());
 */
export async function getVenues(): Promise<Venue[]> {
  // TODO: Replace with API fetch for Next.js
  return Promise.resolve(_venues);
}

/**
 * Get a single venue by numeric ID.
 *
 * Next.js equivalent:
 *   const data = await fetch(`/api/venues/${id}`).then(r => r.json());
 */
export async function getVenueById(id: number): Promise<Venue | undefined> {
  // TODO: Replace with API fetch for Next.js
  return Promise.resolve(_venues.find(v => v.id === id));
}

/**
 * Get venues filtered by country.
 *
 * Next.js equivalent:
 *   const data = await fetch(`/api/venues?country=${country}`).then(r => r.json());
 */
export async function getVenuesByCountry(
  country: 'USA' | 'Canada' | 'Mexico'
): Promise<Venue[]> {
  // TODO: Replace with API fetch for Next.js
  return Promise.resolve(_venues.filter(v => v.country === country));
}

/**
 * Get venue statistics summary.
 * Useful for SEO meta descriptions and overview panels.
 */
export async function getVenueStats(): Promise<{
  total: number;
  byCountry: Record<string, number>;
  totalCapacity: number;
  largestVenue: Venue;
}> {
  const all = await getVenues();
  return {
    total: all.length,
    byCountry: {
      USA: all.filter(v => v.country === 'USA').length,
      Canada: all.filter(v => v.country === 'Canada').length,
      Mexico: all.filter(v => v.country === 'Mexico').length,
    },
    totalCapacity: all.reduce((sum, v) => sum + v.capacity, 0),
    largestVenue: all.reduce((max, v) => (v.capacity > max.capacity ? v : max), all[0]),
  };
}