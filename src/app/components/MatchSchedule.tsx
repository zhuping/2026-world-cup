'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';
import { groupStageMatches, ScheduleMatch } from '../data/matches';
import { matchScores } from '../data/matchScores';
import { venues } from '../data/venues';
import { getTeamName } from '../i18n/teamNames';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getMatchLocalDate(match: ScheduleMatch): string {
  return formatLocalDateKey(new Date(`${match.date}T${match.timeUtc}:00Z`));
}

function getDefaultDate(matchDates: string[]): string {
  const today = formatLocalDateKey(new Date());
  if (today < matchDates[0]) return matchDates[0];
  if (today > matchDates[matchDates.length - 1]) return matchDates[matchDates.length - 1];
  return matchDates.includes(today) ? today : matchDates[0];
}

function formatLocalTime(date: string, timeUtc: string): string {
  const dt = new Date(`${date}T${timeUtc}:00Z`);
  return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDisplayDate(dateStr: string, lang: string): string {
  const localeMap: Record<string, string> = {
    zh: 'zh-CN', en: 'en-US', ja: 'ja-JP', ko: 'ko-KR', pt: 'pt-BR', es: 'es-MX',
  };
  const [year, month, day] = dateStr.split('-').map(Number);
  const dt = new Date(year, month - 1, day);
  return dt.toLocaleDateString(localeMap[lang] ?? 'en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });
}

function getLocalTzLabel(): string {
  const offset = -new Date().getTimezoneOffset();
  const h = Math.floor(Math.abs(offset) / 60);
  const m = Math.abs(offset) % 60;
  const sign = offset >= 0 ? '+' : '-';
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}

const GROUP_COLORS: Record<string, string> = {
  A: '#D72828', B: '#0033A0', C: '#009A44', D: '#C47200',
  E: '#7A1D9E', F: '#005B8E', G: '#B5461B', H: '#1B7A5E',
  I: '#6B1B1B', J: '#1B3E7A', K: '#3D7A1B', L: '#7A5E1B',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function GroupBadge({ group }: { group: string }) {
  const color = GROUP_COLORS[group] ?? '#0033A0';
  return (
    <div style={{
      background: color,
      color: '#fff',
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: '11px',
      letterSpacing: '1.5px',
      padding: '3px 8px',
      borderRadius: '5px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      GRP {group}
    </div>
  );
}

function TeamDisplay({
  flag, nameEn, lang, align = 'left',
}: {
  flag: string;
  nameEn: string;
  lang: string;
  align?: 'left' | 'right';
}) {
  const name = getTeamName(nameEn, lang as any);
  const isRight = align === 'right';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexDirection: isRight ? 'row-reverse' : 'row',
      flex: 1,
      minWidth: 0,
    }}>
      <span style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
        {flag}
      </span>
      <span style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '15px',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '0.3px',
        lineHeight: 1.2,
        textAlign: isRight ? 'right' : 'left',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    </div>
  );
}

function MatchCard({ match, lang, isMobile, tz }: {
  match: ScheduleMatch;
  lang: string;
  isMobile: boolean;
  tz: string;
}) {
  const venue = venues.find(v => v.id === match.venueId);
  const localTime = formatLocalTime(match.date, match.timeUtc);
  const countryEmoji = venue?.country === 'USA' ? '🇺🇸' : venue?.country === 'Canada' ? '🇨🇦' : '🇲🇽';
  const score = matchScores[match.id];
  const hasScore = Boolean(score);
  const statusLabel = score?.status === 'finished' ? 'FT' : score?.status === 'live' ? 'LIVE' : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {match.simultaneous && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(215,40,40,0.25), rgba(0,51,160,0.15))',
          borderBottom: '1px solid rgba(215,40,40,0.2)',
          padding: '4px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{ fontSize: '10px', color: '#FF9090', letterSpacing: '1.5px', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
            ⚡ SIMULTANEOUS · GROUP {match.group}
          </span>
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '10px' : '16px',
        padding: isMobile ? '14px 14px' : '18px 20px',
      }}>
        {/* Time block */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: isMobile ? '56px' : '68px',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? '22px' : '26px',
            color: '#FFFFFF',
            letterSpacing: '1px',
            lineHeight: 1,
          }}>{localTime}</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.5px',
            marginTop: '2px',
          }}>{tz}</span>
        </div>

        {/* Thin divider */}
        <div style={{ width: '1px', alignSelf: 'stretch', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

        {/* Group badge — desktop only */}
        {!isMobile && <GroupBadge group={match.group} />}

        {/* Teams */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '6px' : '12px',
          minWidth: 0,
        }}>
          <TeamDisplay flag={match.homeFlag} nameEn={match.homeNameEn} lang={lang} align="left" />

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: hasScore ? (isMobile ? '18px' : '22px') : (isMobile ? '14px' : '16px'),
            color: hasScore ? '#FFFFFF' : 'rgba(255,255,255,0.25)',
            letterSpacing: '1px',
            flexShrink: 0,
            minWidth: hasScore ? (isMobile ? '54px' : '68px') : undefined,
            textAlign: 'center',
            lineHeight: 1,
          }}>
            {hasScore ? `${score.homeScore}-${score.awayScore}` : 'VS'}
            {statusLabel && (
              <div style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '10px',
                color: score?.status === 'live' ? '#FF8C8C' : 'rgba(255,255,255,0.45)',
                marginTop: '4px',
                letterSpacing: '1px',
              }}>
                {statusLabel}
              </div>
            )}
          </div>

          <TeamDisplay flag={match.awayFlag} nameEn={match.awayNameEn} lang={lang} align="right" />
        </div>

        {/* Venue block — desktop */}
        {!isMobile && venue && (
          <>
            <div style={{ width: '1px', alignSelf: 'stretch', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              minWidth: '160px',
              maxWidth: '200px',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.3px',
                textAlign: 'right',
                lineHeight: 1.3,
              }}>{venue.nameEn}</span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.35)',
                marginTop: '2px',
                textAlign: 'right',
              }}>{countryEmoji} {lang === 'zh' ? venue.cityZh : venue.city}</span>
            </div>
          </>
        )}
      </div>

      {/* Venue row — mobile */}
      {isMobile && venue && (
        <div style={{
          padding: '8px 14px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}>
          {isMobile && <GroupBadge group={match.group} />}
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            color: 'rgba(255,255,255,0.35)',
            textAlign: 'right',
            flex: 1,
          }}>
            {countryEmoji} {lang === 'zh' ? venue.cityZh : venue.city} · {venue.nameEn}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MatchSchedule() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const matchDates = useMemo(
    () => [...new Set(groupStageMatches.map(getMatchLocalDate))].sort(),
    []
  );
  const [selectedDate, setSelectedDate] = useState(() => getDefaultDate(matchDates));
  const [direction, setDirection] = useState(1);
  const tz = getLocalTzLabel();

  const currentIndex = matchDates.indexOf(selectedDate);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < matchDates.length - 1;

  const todayStr = formatLocalDateKey(new Date());
  const todayInRange = matchDates.includes(todayStr);

  const navigate = useCallback((delta: number) => {
    const next = matchDates[currentIndex + delta];
    if (next) {
      setDirection(delta);
      setSelectedDate(next);
    }
  }, [currentIndex]);

  const matchesForDay = useMemo(
    () => groupStageMatches.filter(m => getMatchLocalDate(m) === selectedDate),
    [selectedDate]
  );

  const displayDate = formatDisplayDate(selectedDate, lang);

  // Group matches by UTC time slot for the day summary header
  const matchCount = matchesForDay.length;

  return (
    <section
      id="schedule"
      aria-label={t.schedule.sectionTitle}
      style={{
        background: 'linear-gradient(180deg, #020A1B 0%, #030D24 50%, #020A1B 100%)',
        padding: isMobile ? '48px 0 56px' : '72px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,51,160,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,51,160,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: `0 ${isMobile ? '16px' : '32px'}`,
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ── Section header ──────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(215,40,40,0.6)' }} />
            <span style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '3px',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
            }}>{t.schedule.sectionSubtitle}</span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(0,154,68,0.6)' }} />
          </div>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? '36px' : '52px',
            letterSpacing: '3px',
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1,
          }}>{t.schedule.sectionTitle}</h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '10px',
            letterSpacing: '0.5px',
          }}>
            June 11 – June 28, 2026 · 72 matches · 12 groups
          </p>
        </div>

        {/* ── Date Navigator ───────────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}>
          {/* Prev button */}
          <button
            onClick={() => navigate(-1)}
            disabled={!hasPrev}
            aria-label={t.schedule.prevDay}
            style={{
              width: isMobile ? '40px' : '48px',
              height: isMobile ? '40px' : '48px',
              borderRadius: '10px',
              background: hasPrev ? 'rgba(0,51,160,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${hasPrev ? 'rgba(0,51,160,0.4)' : 'rgba(255,255,255,0.06)'}`,
              color: hasPrev ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
              cursor: hasPrev ? 'pointer' : 'default',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            ‹
          </button>

          {/* Date display */}
          <div style={{
            flex: 1,
            background: 'rgba(0,51,160,0.12)',
            border: '1px solid rgba(0,51,160,0.25)',
            borderRadius: '12px',
            padding: isMobile ? '12px 16px' : '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}>
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: isMobile ? '20px' : '24px',
                color: '#FFFFFF',
                letterSpacing: '1.5px',
                lineHeight: 1,
              }}>{displayDate}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
                marginTop: '3px',
                letterSpacing: '0.3px',
              }}>
                {t.schedule.matchesCount.replace('{n}', String(matchCount))} ·{' '}
                {t.schedule.matchdayLabel.replace('{n}', String(matchesForDay[0]?.matchday ?? ''))}
              </div>
            </div>

            {/* Today button */}
            {todayInRange && selectedDate !== todayStr && (
              <button
                onClick={() => { setDirection(todayStr > selectedDate ? 1 : -1); setSelectedDate(todayStr); }}
                style={{
                  background: 'rgba(215,40,40,0.2)',
                  border: '1px solid rgba(215,40,40,0.4)',
                  borderRadius: '8px',
                  padding: '5px 12px',
                  color: '#FF8080',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {t.schedule.todayBtn}
              </button>
            )}

            {/* Progress indicator */}
            <div style={{
              display: 'flex',
              gap: '3px',
              flexShrink: 0,
              alignItems: 'center',
            }}>
              {matchDates.slice(0, 22).map((d, i) => (
                <div
                  key={d}
                  onClick={() => { setDirection(matchDates.indexOf(d) > currentIndex ? 1 : -1); setSelectedDate(d); }}
                  style={{
                    width: isMobile ? '4px' : '5px',
                    height: isMobile ? '4px' : '5px',
                    borderRadius: '50%',
                    background: d === selectedDate
                      ? '#FFFFFF'
                      : d < selectedDate
                      ? 'rgba(0,154,68,0.7)'
                      : 'rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'background 0.2s',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={() => navigate(1)}
            disabled={!hasNext}
            aria-label={t.schedule.nextDay}
            style={{
              width: isMobile ? '40px' : '48px',
              height: isMobile ? '40px' : '48px',
              borderRadius: '10px',
              background: hasNext ? 'rgba(0,51,160,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${hasNext ? 'rgba(0,51,160,0.4)' : 'rgba(255,255,255,0.06)'}`,
              color: hasNext ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
              cursor: hasNext ? 'pointer' : 'default',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            ›
          </button>
        </div>

        {/* Timezone note */}
        <div style={{
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.3px',
          marginBottom: '24px',
        }}>
          🕐 {t.schedule.localTimeNote} ({tz})
        </div>

        {/* ── Match List ───────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {matchesForDay.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '18px',
                letterSpacing: '1px',
              }}>
                {t.schedule.noMatches}
              </div>
            ) : (
              matchesForDay.map(match => (
                <MatchCard
                  key={match.id}
                  match={match}
                  lang={lang}
                  isMobile={isMobile}
                  tz={tz}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Day progress bar ─────────────────────────────────────────────── */}
        <div style={{
          marginTop: '32px',
          height: '2px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <motion.div
            animate={{ width: `${((currentIndex + 1) / matchDates.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #0033A0, #009A44)',
              borderRadius: '2px',
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '6px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.5px',
        }}>
          <span>Jun 11</span>
          <span>Day {currentIndex + 1} / {matchDates.length}</span>
          <span>Jun 28</span>
        </div>
      </div>
    </section>
  );
}
