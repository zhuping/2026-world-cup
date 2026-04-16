import { useState, useMemo } from 'react';
import { venues, Venue } from '../data/venues';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';

const USA_PATH =
  'M 192,156 L 540,156 L 684,187 L 768,202 L 876,176 L 840,234 L 792,270 L 780,301 L 708,343 L 720,399 L 696,363 L 624,353 L 600,363 L 516,394 L 480,374 L 432,363 L 396,343 L 348,343 L 276,327 L 264,312 L 240,280 L 192,244 L 192,156 Z';
const CANADA_PATH =
  'M 0,0 L 960,0 L 960,180 L 876,176 L 768,202 L 684,187 L 540,156 L 192,156 L 120,94 L 84,94 L 0,62 Z';
const MEXICO_PATH =
  'M 276,327 L 348,343 L 396,343 L 432,363 L 480,374 L 516,394 L 516,436 L 540,460 L 576,478 L 600,467 L 600,446 L 624,446 L 636,450 L 624,480 L 600,498 L 576,510 L 516,498 L 468,470 L 420,456 L 396,420 L 360,390 L 312,355 L 300,343 L 276,327 Z';

const COUNTRY_COLOR: Record<string, string> = {
  USA: '#0033A0',
  Canada: '#D72828',
  Mexico: '#009A44',
};

const COUNTRY_LABEL_COLOR: Record<string, string> = {
  USA: '#7aaaee',
  Canada: '#FF7777',
  Mexico: '#44DD88',
};

function VenueInfoCard({
  venue,
  isMobile,
  onClose,
}: {
  venue: Venue;
  isMobile: boolean;
  onClose: () => void;
}) {
  const { t, lang } = useLanguage();
  const color = COUNTRY_COLOR[venue.country];
  const labelColor = COUNTRY_LABEL_COLOR[venue.country];
  const venueName = lang === 'zh' ? venue.nameZh : venue.nameEn;
  const countryLabel = t.venue.countryLabels[venue.country];
  const flagMap: Record<string, string> = { USA: '🇺🇸', Canada: '🇨🇦', Mexico: '🇲🇽' };

  const cardStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        bottom: '16px',
        left: '12px',
        right: '12px',
        zIndex: 500,
        animation: 'slideUp 0.22s ease',
      }
    : {
        pointerEvents: 'none',
      };

  return (
    <div style={cardStyle}>
      <div style={{
        background: 'rgba(4, 16, 40, 0.96)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${color}60`,
        borderRadius: '14px',
        padding: '14px 16px',
        boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px ${color}30`,
      }}>
        <div style={{ height: '3px', borderRadius: '2px', background: `linear-gradient(90deg, ${color}, transparent)`, marginBottom: '10px' }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Country badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: `${color}20`, border: `1px solid ${color}50`,
              borderRadius: '4px', padding: '2px 8px', marginBottom: '7px',
            }}>
              <span style={{ fontSize: '11px' }}>{flagMap[venue.country]}</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '1px', color: labelColor, textTransform: 'uppercase' }}>{countryLabel}</span>
            </div>
            {/* Name */}
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '17px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '2px' }}>{venueName}</div>
            {lang !== 'zh' && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>{venue.nameEn}</div>
            )}
            {lang === 'zh' && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>{venue.nameEn}</div>
            )}
            {/* City */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
              <span style={{ color: labelColor, fontSize: '12px' }}>📍</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{venue.cityZh} · {venue.city}</span>
            </div>
            {/* Address */}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, marginBottom: '8px' }}>{venue.address}</div>
            {/* Capacity */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase' }}>{t.venue.capacity}</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '17px', color: labelColor, letterSpacing: '1px' }}>{venue.capacity.toLocaleString()}</span>
            </div>
          </div>
          {/* Close button (mobile) */}
          {isMobile && (
            <button onClick={onClose} style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer',
              color: 'rgba(255,255,255,0.6)', fontSize: '14px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
          )}
        </div>
      </div>
    </div>
  );
}

function VenueMarker({
  venue,
  onHover,
  onLeave,
  onClick,
  isHovered,
  isSelected,
}: {
  venue: Venue;
  onHover: (v: Venue) => void;
  onLeave: () => void;
  onClick: (v: Venue) => void;
  isHovered: boolean;
  isSelected: boolean;
}) {
  const color = COUNTRY_COLOR[venue.country];
  const isActive = isHovered || isSelected;

  return (
    <g transform={`translate(${venue.svgX}, ${venue.svgY})`}>
      <g
        style={{
          cursor: 'pointer',
          transition: 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive ? 'translate(0px, -5px) scale(1.18)' : 'translate(0px, 0px) scale(1)',
          transformOrigin: '0px 0px',
          transformBox: 'fill-box' as any,
        }}
        onMouseEnter={() => onHover(venue)}
        onMouseLeave={onLeave}
        onClick={() => onClick(venue)}
      >
        {/* Pulse ring */}
        <circle r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.25">
          <animate attributeName="r" values="12;20;12" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0;0.35" dur="2.5s" repeatCount="indefinite" />
        </circle>
        {isActive && <circle r="15" fill={color} opacity="0.18" />}
        <circle r="10" fill={color} stroke="white" strokeWidth="1.8" opacity={isActive ? 1 : 0.88} />
        <line x1="-5" y1="0" x2="5" y2="0" stroke="white" strokeWidth="0.8" opacity="0.45" />
        <line x1="0" y1="-5" x2="0" y2="5" stroke="white" strokeWidth="0.8" opacity="0.45" />
        <circle r="5" fill="white" opacity="0.10" />
        <circle r="2.5" fill="white" opacity="0.9" />
      </g>
    </g>
  );
}

export function VenueMap() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [hoveredVenue, setHoveredVenue] = useState<Venue | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  // Stable star positions using deterministic values
  const stars = useMemo(() =>
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: ((i * 137.508) % 100),
      top: ((i * 97.31) % 100),
      size: i % 5 === 0 ? 2 : 1,
      opacity: 0.15 + (i % 7) * 0.05,
    })), []);

  // Desktop tooltip positioning
  const getTooltipStyle = (venue: Venue): React.CSSProperties => {
    const leftPct = (venue.svgX / 960) * 100;
    const topPct = (venue.svgY / 540) * 100;
    const anchorRight = leftPct > 68;
    const anchorBottom = topPct > 62;
    return {
      position: 'absolute',
      left: anchorRight ? 'auto' : `calc(${leftPct}% + 22px)`,
      right: anchorRight ? `calc(${100 - leftPct}% + 22px)` : 'auto',
      top: anchorBottom ? 'auto' : `calc(${topPct}% - 8px)`,
      bottom: anchorBottom ? `calc(${100 - topPct}% + 22px)` : 'auto',
      zIndex: 30,
      animation: 'tooltipIn 0.18s ease',
      minWidth: '230px',
      maxWidth: '280px',
    };
  };

  return (
    <section
      id="venues"
      style={{
        // minHeight: '100vh',
        background: 'linear-gradient(180deg, #020A1B 0%, #030F24 60%, #020A1B 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '104px 0 32px' : '116px 0 40px',
      }}
    >
      {/* Background stars */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {stars.map(star => (
          <div key={star.id} style={{
            position: 'absolute', left: `${star.left}%`, top: `${star.top}%`,
            width: `${star.size}px`, height: `${star.size}px`,
            borderRadius: '50%', background: 'white', opacity: star.opacity,
          }} />
        ))}
      </div>

      {/* Gradient orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50%', height: '50%', background: 'radial-gradient(ellipse, rgba(0,51,160,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50%', height: '50%', background: 'radial-gradient(ellipse, rgba(215,40,40,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: isMobile ? '20px' : '28px', position: 'relative', zIndex: 10, padding: '0 16px' }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '12px', letterSpacing: '4px', color: '#009A44', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
          {t.venue.sectionSubtitle}
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: isMobile ? 'clamp(22px, 7vw, 36px)' : 'clamp(32px, 4vw, 56px)',
          letterSpacing: '3px', margin: 0, lineHeight: 1.1,
          background: 'linear-gradient(90deg, #D72828, #FFFFFF 40%, #009A44)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {t.venue.sectionTitle}
        </h1>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? '11px' : '13px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>
          {t.venue.sectionDesc}
        </div>
      </div>

      {/* Map Container */}
      <div style={{ position: 'relative', width: '100%' }}>

        {/* Desktop tooltip */}
        {!isMobile && hoveredVenue && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
            <div style={getTooltipStyle(hoveredVenue)}>
              <VenueInfoCard venue={hoveredVenue} isMobile={false} onClose={() => {}} />
            </div>
          </div>
        )}

        {/* SVG Map */}
        <svg
          viewBox="0 0 960 540"
          style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 4px 32px rgba(0,0,0,0.6))' }}
          onClick={() => { if (isMobile) setSelectedVenue(null); }}
        >
          <defs>
            <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#021222" />
              <stop offset="100%" stopColor="#031830" />
            </linearGradient>
            <linearGradient id="usaGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0033A0" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0044CC" stopOpacity="0.14" />
            </linearGradient>
            <linearGradient id="canadaGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D72828" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#FF3333" stopOpacity="0.10" />
            </linearGradient>
            <linearGradient id="mexicoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#009A44" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#00CC55" stopOpacity="0.14" />
            </linearGradient>
            <pattern id="grid" width="48" height="27" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 27" fill="none" stroke="rgba(100,150,255,0.04)" strokeWidth="0.5" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="960" height="540" fill="url(#oceanGrad)" />
          <rect width="960" height="540" fill="url(#grid)" />
          <path d={CANADA_PATH} fill="url(#canadaGrad)" stroke="#D72828" strokeWidth="0.8" strokeOpacity="0.35" />
          <path d={USA_PATH} fill="url(#usaGrad)" stroke="#0033A0" strokeWidth="0.8" strokeOpacity="0.5" />
          <path d={MEXICO_PATH} fill="url(#mexicoGrad)" stroke="#009A44" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="420" y="115" textAnchor="middle" fill="#FF6666" fillOpacity="0.5" fontSize="13" fontFamily="Rajdhani, sans-serif" fontWeight="600" letterSpacing="4">CANADA</text>
          <text x="500" y="300" textAnchor="middle" fill="#6699DD" fillOpacity="0.5" fontSize="14" fontFamily="Rajdhani, sans-serif" fontWeight="600" letterSpacing="4">UNITED STATES</text>
          <text x="460" y="440" textAnchor="middle" fill="#33CC77" fillOpacity="0.5" fontSize="11" fontFamily="Rajdhani, sans-serif" fontWeight="600" letterSpacing="3">MEXICO</text>
          <g filter="url(#glow)">
            {venues.map(venue => (
              <VenueMarker
                key={venue.id}
                venue={venue}
                onHover={v => !isMobile && setHoveredVenue(v)}
                onLeave={() => !isMobile && setHoveredVenue(null)}
                onClick={v => { if (isMobile) { setSelectedVenue(prev => prev?.id === v.id ? null : v); } }}
                isHovered={hoveredVenue?.id === venue.id}
                isSelected={selectedVenue?.id === venue.id}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: isMobile ? '8px' : '16px',
        marginTop: isMobile ? '14px' : '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '0 12px',
      }}>
        {[
          { country: 'USA', flag: '🇺🇸', label: t.venue.legendUSA, color: '#7aaaee' },
          { country: 'Canada', flag: '🇨🇦', label: t.venue.legendCanada, color: '#FF7777' },
          { country: 'Mexico', flag: '🇲🇽', label: t.venue.legendMexico, color: '#44DD88' },
        ].map(item => (
          <div key={item.country} style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${item.color}25`,
            borderRadius: '8px',
            padding: isMobile ? '5px 10px' : '7px 14px',
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COUNTRY_COLOR[item.country], border: '2px solid white', flexShrink: 0 }} />
            <span style={{ fontSize: isMobile ? '13px' : '16px' }}>{item.flag}</span>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: isMobile ? '12px' : '14px', fontWeight: 600, color: item.color, letterSpacing: '0.5px' }}>{item.label}</span>
          </div>
        ))}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          padding: isMobile ? '5px 10px' : '7px 14px',
        }}>
          <span style={{ fontSize: '13px' }}>💡</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? '11px' : '12px', color: 'rgba(255,255,255,0.35)' }}>
            {isMobile ? t.venue.tapHint : t.venue.hoverHint}
          </span>
        </div>
      </div>

      {/* Mobile bottom sheet tooltip */}
      {isMobile && selectedVenue && (
        <VenueInfoCard venue={selectedVenue} isMobile={true} onClose={() => setSelectedVenue(null)} />
      )}

      <style>{`
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateY(4px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}