'use client'
/**
 * App.tsx — Application Root
 *
 * Next.js migration guide:
 * ─────────────────────────
 * 1. Move LanguageProvider to `app/providers.tsx` (client component)
 * 2. Move SEOHead logic to `app/layout.tsx` using the Metadata API
 * 3. Move HelmetProvider wrapping to `app/providers.tsx`
 * 4. Each "section" becomes a separate page or a `<section>` inside `page.tsx`
 * 5. Data fetching in VenueMap / Tournament moves to their parent Server Components
 *
 * File structure for Next.js App Router:
 *   app/
 *     layout.tsx          ← RootLayout with metadata, fonts, providers
 *     page.tsx            ← Home (renders VenueMap + Tournament)
 *     providers.tsx       ← 'use client' — HelmetProvider, LanguageProvider
 *     lib/services/       ← venues.service.ts, teams.service.ts (already created)
 *     components/         ← All existing components (add 'use client' as needed)
 */

import '../styles/fonts.css';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { SEOHead } from './components/SEOHead';
import { Navbar } from './components/Navbar';
import { VenueMap } from './components/VenueMap';
import { Tournament } from './components/Tournament';
import { HomeContent } from './components/HomeContent';
import { ClientLayout } from './components/ClientLayout';

export default function App() {
  return (
    <ClientLayout>
      <VenueMap />

      {/* Section divider — tricolor strip */}
      <div
        aria-hidden="true"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #D72828 20%, #0033A0 50%, #009A44 80%, transparent 100%)',
          opacity: 0.6,
        }}
      />

      <Tournament />
      
      <HomeContent />
    </ClientLayout>
  );
}
