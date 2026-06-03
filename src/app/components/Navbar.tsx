'use client'; // Next.js directive — no-op in Vite, marks client boundary for migration

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TRANSLATIONS, LangCode } from '../i18n/translations';
import { useIsMobile, useMediaQuery } from '../hooks/useIsMobile';
import wc26Logo from '../../assets/images/WC26_Logo.avif';

// ─── Constants ───────────────────────────────────────────────────────────────
const ANNOUNCEMENT_MSGS = [
  '⚽  2026 FIFA World Cup  ·  11 Jun – 19 Jul 2026',
  '🏟  16 Venues  ·  USA · Canada · Mexico',
  '🌍  48 Teams  ·  12 Groups  ·  104 Matches',
  '🏆  Grand Final — MetLife Stadium, New Jersey  ·  19 Jul 2026',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % ANNOUNCEMENT_MSGS.length);
        setFade(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(90deg, #0033A0 0%, #031A50 40%, #0A1432 60%, #0033A0 100%)',
      borderBottom: '1px solid rgba(0,51,160,0.4)',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Tricolor edge accents */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#D72828' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', background: '#009A44' }} />

      <span style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '1.5px',
        color: 'rgba(255,255,255,0.85)',
        transition: 'opacity 0.3s ease',
        opacity: fade ? 1 : 0,
        userSelect: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 'calc(100vw - 40px)',
        textAlign: 'center',
      }}>
        {ANNOUNCEMENT_MSGS[idx]}
      </span>
    </div>
  );
}

function NavButton({
  label,
  sublabel,
  onClick,
  active,
}: {
  label: string;
  sublabel?: string;
  onClick: () => void;
  active?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isHighlit = hovered || active;

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: isHighlit ? 'rgba(0,51,160,0.18)' : 'none',
        border: `1px solid ${isHighlit ? 'rgba(0,51,160,0.55)' : 'transparent'}`,
        color: isHighlit ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '15px',
        fontWeight: 600,
        letterSpacing: '0.8px',
        padding: sublabel ? '6px 16px 5px' : '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1px',
      }}
    >
      <span>{label}</span>
      {sublabel && (
        <span style={{
          fontSize: '9px',
          fontFamily: "'Inter', sans-serif",
          color: isHighlit ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.25)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontWeight: 400,
          lineHeight: 1,
        }}>{sublabel}</span>
      )}
    </button>
  );
}

function Divider() {
  return (
    <div style={{
      width: '1px',
      height: '32px',
      background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)',
      margin: '0 4px',
      flexShrink: 0,
    }} />
  );
}

// Tournament key dates (UTC). Kickoff: opening match Mexico vs South Africa
// at Estadio Azteca on 2026-06-11. Final: MetLife Stadium on 2026-07-19.
const KICKOFF_UTC = Date.UTC(2026, 5, 11, 20, 0, 0); // Jun 11 2026 20:00 UTC
const FINAL_UTC = Date.UTC(2026, 6, 19, 20, 0, 0);   // Jul 19 2026 20:00 UTC

function computeCountdown(nowMs: number): { days: number; label: string } {
  if (nowMs < KICKOFF_UTC) {
    const days = Math.ceil((KICKOFF_UTC - nowMs) / (1000 * 60 * 60 * 24));
    return { days, label: 'TO KICKOFF' };
  }
  if (nowMs < FINAL_UTC) {
    const days = Math.ceil((FINAL_UTC - nowMs) / (1000 * 60 * 60 * 24));
    return { days, label: 'TO FINAL' };
  }
  return { days: 0, label: 'FINISHED' };
}

function CountdownBadge() {
  // Live countdown: compute on mount + refresh hourly to cross midnight smoothly.
  // Use a `mounted` flag to avoid SSR/CSR hydration mismatches.
  const [mounted, setMounted] = useState(false);
  const [info, setInfo] = useState(() => computeCountdown(KICKOFF_UTC - 1));

  useEffect(() => {
    const tick = () => setInfo(computeCountdown(Date.now()));
    tick();
    setMounted(true);
    const id = setInterval(tick, 60 * 1000); // refresh every minute
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4px 12px',
        background: 'rgba(215,40,40,0.12)',
        border: '1px solid rgba(215,40,40,0.3)',
        borderRadius: '8px',
        cursor: 'default',
      }}
      title={`${info.days} days ${info.label.toLowerCase()}`}
      aria-live="polite"
    >
      <span
        suppressHydrationWarning
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '20px',
          color: '#FF5555',
          letterSpacing: '1px',
          lineHeight: 1,
        }}
      >
        {mounted ? info.days : '—'}
      </span>
      <span
        suppressHydrationWarning
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '8px',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginTop: '1px',
          whiteSpace: 'nowrap',
        }}
      >
        {mounted ? info.label : 'DAYS'}
      </span>
    </div>
  );
}

function LangOption({
  code, data, current, setLang,
}: {
  code: LangCode;
  data: { langName: string; langFlag: string };
  current: LangCode;
  setLang: (c: LangCode) => void;
}) {
  const isActive = code === current;
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => setLang(code)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        padding: '9px 12px',
        background: isActive ? 'rgba(0,51,160,0.28)' : hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      <span style={{ fontSize: '18px', lineHeight: 1, width: '22px' }}>{data.langFlag}</span>
      <span style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '15px',
        fontWeight: isActive ? 700 : 500,
        color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
        letterSpacing: '0.5px',
        flex: 1,
        textAlign: 'left',
      }}>{data.langName}</span>
      {isActive && <span style={{ color: '#009A44', fontSize: '14px' }}>✓</span>}
    </button>
  );
}

function LangSwitcher({
  lang, open, setOpen, setLang, langOptions, compact = false,
}: {
  lang: LangCode;
  open: boolean;
  setOpen: (v: boolean) => void;
  setLang: (c: LangCode) => void;
  langOptions: [LangCode, { langName: string; langFlag: string }][];
  compact?: boolean;
}) {
  const currentLang = TRANSLATIONS[lang];

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: open ? 'rgba(0,51,160,0.28)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${open ? 'rgba(0,51,160,0.55)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '8px',
          padding: compact ? '6px 8px' : '7px 12px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '16px', lineHeight: 1 }}>{currentLang.langFlag}</span>
        {!compact && (
          <span style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.5px',
          }}>{currentLang.langName}</span>
        )}
        <span style={{
          color: 'rgba(255,255,255,0.35)',
          fontSize: '9px',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'none',
          display: 'inline-block',
        }}>▼</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: '0',
          background: 'rgba(4, 14, 40, 0.98)',
          border: '1px solid rgba(0,51,160,0.4)',
          borderRadius: '14px',
          padding: '8px',
          boxShadow: '0 12px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,51,160,0.2)',
          zIndex: 400,
          minWidth: '170px',
          animation: 'dropdownIn 0.18s ease',
        }}>
          {langOptions.map(([code, data]) => {
            const isActive = code === lang;
            const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
            // Strip any existing language prefix (e.g., /zh, /en, /es) from the start of the path
            const strippedPath = currentPath.replace(/^\/(zh|en|ja|ko|pt|es)(\/|$)/, '/');
            // Re-construct the URL. If the code is 'en' (default), we just use the stripped path.
            const newPath = code === 'en' ? strippedPath : `/${code}${strippedPath === '/' ? '' : strippedPath}`;
            
            return (
              <a
                key={code}
                href={newPath}
                style={{ textDecoration: 'none', display: 'block' }}
                onClick={(e) => {
                  // Let the browser perform a hard navigation to the new language URL.
                  // This ensures Next.js Server Components receive the new `lang` parameter
                  // and re-render everything with the correct translation context.
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '9px 12px',
                    background: isActive ? 'rgba(0,51,160,0.28)' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => !isActive && (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontSize: '18px', lineHeight: 1, width: '22px' }}>{data.langFlag}</span>
                  <span style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '15px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                    letterSpacing: '0.5px',
                    flex: 1,
                    textAlign: 'left',
                  }}>{data.langName}</span>
                  {isActive && <span style={{ color: '#009A44', fontSize: '14px' }}>✓</span>}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery('(max-width: 1023px)');
  const isWide = useMediaQuery('(min-width: 1440px)');
  const isUltraWide = useMediaQuery('(min-width: 1920px)');

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      // Active section detection
      const sections = ['venues', 'schedule', 'tournament'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!menuOpen && !langOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen, langOpen]);

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setLangOpen(false);
  };

  const langOptions = Object.entries(TRANSLATIONS) as [LangCode, { langName: string; langFlag: string }][];

  // ── Layout constants ────────────────────────────────────────────
  const navH = isMobile ? 60 : isWide ? 80 : 72;
  const maxW = isUltraWide ? '1760px' : isWide ? '1600px' : '1440px';
  const padX = isUltraWide ? '60px' : isWide ? '40px' : 'clamp(16px, 3vw, 32px)';

  const navLinks = [
    { label: t.nav.venueMap, sublabel: 'VENUES', id: 'venues' },
    { label: t.nav.schedule, sublabel: 'SCHEDULE', id: 'schedule' },
    { label: t.nav.groupStage, sublabel: 'GROUP STAGE', id: 'tournament' },
    { label: t.nav.knockout, sublabel: 'KNOCKOUT', id: 'tournament' },
  ];

  const isSolid = scrolled || menuOpen;

  // Compute home URL based on language to keep users in the same locale
  const homeHref = lang === 'en' ? '/' : `/${lang}`;

  return (
    <header ref={navRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200 }}>
      {/* Announcement bar — always visible */}
      <AnnouncementBar />

      {/* Main nav bar */}
      <nav
        style={{
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
          background: isSolid ? 'rgba(2, 8, 24, 0.96)' : 'rgba(2, 8, 24, 0.2)',
          backdropFilter: isSolid ? 'blur(24px) saturate(160%)' : 'blur(8px)',
          borderBottom: isSolid ? '1px solid rgba(0,51,160,0.22)' : '1px solid rgba(255,255,255,0.04)',
          boxShadow: isSolid ? '0 4px 32px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div style={{
          maxWidth: maxW,
          margin: '0 auto',
          padding: `0 ${padX}`,
          height: `${navH}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>

          {/* ── Logo ─────────────────────────────────────────────── */}
          <Link
            href={homeHref}
            style={{
              display: 'flex', alignItems: 'center',
              gap: isWide ? '14px' : '10px',
              cursor: 'pointer', flexShrink: 0,
              textDecoration: 'none',
            }}
            aria-label="FIFA World Cup 2026 Home"
          >
            <Image
              src={wc26Logo}
              alt="FIFA World Cup 2026"
              priority
              style={{
                width: 'auto',
                height: isWide ? '52px' : isMobile ? '38px' : '46px',
                display: 'block',
                objectFit: 'contain',
                filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))',
              }}
            />

            {/* Wide screen: separator + year badge */}
            {isWide && !isMobile && (
              <>
                <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '38px',
                  color: 'rgba(255,255,255,0.06)',
                  letterSpacing: '2px',
                  lineHeight: 1,
                  userSelect: 'none',
                }}>2026</div>
              </>
            )}
          </Link>

          {/* ── Desktop Nav ──────────────────────────────────────── */}
          {!isTablet && (
            <div style={{ display: 'flex', alignItems: 'center', gap: isWide ? '6px' : '2px', flex: 1, justifyContent: 'center' }}>
              {navLinks.map((item, i) => (
                <NavButton
                  key={i}
                  label={item.label}
                  sublabel={isWide ? item.sublabel : undefined}
                  onClick={() => scrollTo(item.id)}
                  active={activeSection === item.id}
                />
              ))}
            </div>
          )}

          {/* ── Desktop Right Controls ───────────────────────────── */}
          {!isTablet && (
            <div style={{ display: 'flex', alignItems: 'center', gap: isWide ? '10px' : '6px', flexShrink: 0 }}>
              <Divider />

              {/* Country flags */}
              <div style={{ display: 'flex', gap: isWide ? '6px' : '4px', alignItems: 'center' }}>
                {['🇺🇸', '🇨🇦', '🇲🇽'].map((flag, i) => (
                  <span key={i} style={{ fontSize: isWide ? '20px' : '17px', lineHeight: 1, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>{flag}</span>
                ))}
              </div>

              <Divider />

              <LangSwitcher
                lang={lang}
                open={langOpen}
                setOpen={setLangOpen}
                setLang={(code) => { setLang(code); setLangOpen(false); }}
                langOptions={langOptions}
                compact={!isWide}
              />

              {/* Countdown badge — only on wide screens */}
              {isWide && (
                <>
                  <Divider />
                  <CountdownBadge />
                </>
              )}
            </div>
          )}

          {/* ── Tablet / Mobile Controls ──────────────────────────── */}
          {isTablet && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LangSwitcher
                lang={lang}
                open={langOpen}
                setOpen={(v) => { setLangOpen(v); if (v) setMenuOpen(false); }}
                setLang={(code) => { setLang(code); setLangOpen(false); }}
                langOptions={langOptions}
                compact={isMobile}
              />
              {/* Hamburger */}
              <button
                onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
                aria-label={menuOpen ? t.nav.close : t.nav.menu}
                aria-expanded={menuOpen}
                style={{
                  background: menuOpen ? 'rgba(0,51,160,0.3)' : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${menuOpen ? 'rgba(0,51,160,0.5)' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: '8px',
                  width: '42px', height: '42px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '5px', cursor: 'pointer',
                  transition: 'all 0.2s', padding: '0',
                }}
              >
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    display: 'block', width: '18px', height: '2px',
                    background: '#fff', borderRadius: '2px',
                    transition: 'all 0.25s',
                    transform: menuOpen
                      ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                        : i === 1 ? 'scaleX(0)'
                        : 'rotate(-45deg) translate(5px, -5px)'
                      : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }} />
                ))}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Mobile / Tablet Dropdown Menu ───────────────────────── */}
      {isTablet && (
        <div style={{
          maxHeight: menuOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
          background: 'rgba(2, 8, 24, 0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: menuOpen ? '1px solid rgba(0,51,160,0.2)' : 'none',
        }}>
          <div style={{ padding: '16px 20px 24px', maxWidth: maxW, margin: '0 auto' }}>
            {/* Nav links */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: '4px', marginBottom: '20px' }}>
              {navLinks.map((item, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,51,160,0.15)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                >
                  <span style={{ fontSize: '20px' }}>
                    {i === 0 ? '🗺️' : i === 1 ? '📅' : i === 2 ? '📊' : '🏆'}
                  </span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '17px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>{item.label}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.sublabel}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Stats strip */}
            <div style={{
              display: 'flex', gap: '0',
              background: 'rgba(255,255,255,0.03)', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}>
              {[
                { v: '48', l: 'Teams' },
                { v: '16', l: 'Venues' },
                { v: '104', l: 'Matches' },
                { v: '3', l: 'Nations' },
              ].map((stat, i, arr) => (
                <div key={stat.l} style={{
                  flex: 1, padding: '12px 8px', textAlign: 'center',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#FFFFFF', letterSpacing: '1px', lineHeight: 1 }}>{stat.v}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>{stat.l}</div>
                </div>
              ))}
            </div>

            {/* Flags */}
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
              {['🇺🇸', '🇨🇦', '🇲🇽'].map((f, i) => (
                <span key={i} style={{ fontSize: '28px', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))' }}>{f}</span>
              ))}
              <div style={{ height: '28px', width: '1px', background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>2026</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </header>
  );
}
