import { knockoutRounds as fallbackKnockoutRounds, BracketMatch, BracketRound, BracketTeam } from '../data/teams';
import { useLanguage } from '../contexts/LanguageContext';
import { getTeamName } from '../i18n/teamNames';
import { useIsMobile, useMediaQuery } from '../hooks/useIsMobile';

const MATCH_H = 88;
const MATCH_GAP = 16;
const MATCH_W = 132;
const FINAL_MATCH_W = 164;
const ROUND_COL_W = 146;
const CONNECTOR_W = 14;
const CENTER_W = 164;
const DESKTOP_BRACKET_W = ROUND_COL_W * 8 + CENTER_W;

function formatTeamScore(score: number, penaltyScore: number | undefined) {
  if (penaltyScore === undefined) return String(score);
  return `${score}（${penaltyScore}）`;
}

function TeamSlot({ team, score, isWinner, played }: {
  team: BracketTeam;
  score?: number;
  isWinner?: boolean;
  played?: boolean;
}) {
  const { lang, t } = useLanguage();
  const displayName = team.tbd
    ? t.knockout.tbd
    : getTeamName(team.nameEn, lang);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px',
      background: isWinner ? 'rgba(0,51,160,0.25)' : 'transparent',
      borderLeft: isWinner ? '3px solid #0033A0' : '3px solid transparent',
    }}>
      <span style={{ fontSize: '15px', lineHeight: 1, flexShrink: 0, width: '20px' }}>
        {team.tbd ? '❓' : team.flag}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: '13px', fontWeight: 700,
          color: team.tbd ? 'rgba(255,255,255,0.3)' : isWinner ? '#fff' : 'rgba(255,255,255,0.78)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.2,
        }}>{displayName}</div>
      </div>
      {played && score !== undefined && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: team.penaltyScore !== undefined ? '15px' : '19px', color: isWinner ? '#FFFFFF' : 'rgba(255,255,255,0.35)', letterSpacing: team.penaltyScore !== undefined ? '0' : '1px', lineHeight: 1, whiteSpace: 'nowrap' }}>
            {formatTeamScore(score, team.penaltyScore)}
          </span>
        </div>
      )}
    </div>
  );
}

function MatchCard({ match, isFinal = false }: { match: BracketMatch; isFinal?: boolean }) {
  return (
    <div style={{
      background: 'rgba(8,16,40,0.9)',
      border: isFinal ? '1px solid rgba(192,160,32,0.55)' : match.played ? '1px solid rgba(0,51,160,0.35)' : '1px solid rgba(255,255,255,0.09)',
      borderRadius: '10px', overflow: 'hidden',
      boxShadow: isFinal ? '0 0 24px rgba(192,160,32,0.18), 0 4px 16px rgba(0,0,0,0.4)' : '0 2px 12px rgba(0,0,0,0.3)',
      width: isFinal ? `${FINAL_MATCH_W}px` : `${MATCH_W}px`,
      position: 'relative',
    }}>
      {isFinal && <div style={{ height: '2px', background: 'linear-gradient(90deg, #D72828, #C0A020, #009A44)' }} />}
      {!isFinal && match.played && <div style={{ height: '2px', background: 'linear-gradient(90deg, #0033A0, transparent)' }} />}
      {!isFinal && !match.played && <div style={{ height: '2px', background: 'linear-gradient(90deg, #009A44, transparent)' }} />}

      <TeamSlot team={match.team1} score={match.team1.score} isWinner={match.team1.winner} played={match.played} />
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 8px' }} />
      <TeamSlot team={match.team2} score={match.team2.score} isWinner={match.team2.winner} played={match.played} />

      {match.date && (
        <div style={{ padding: '4px 10px', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: isFinal ? 'rgba(192,160,32,0.8)' : match.played ? 'rgba(0,154,68,0.7)' : 'rgba(255,255,255,0.3)' }}>{match.date}</span>
        </div>
      )}
    </div>
  );
}

function getRoundMeta(t: ReturnType<typeof useLanguage>['t']) {
  return [
    { name: t.knockout.roundOf32, nameEn: t.knockout.roundOf32En, progress: t.knockout.progressR32, color: '#7C3AED' },
    { name: t.knockout.roundOf16, nameEn: t.knockout.roundOf16En, progress: t.knockout.progressR16, color: '#0033A0' },
    { name: t.knockout.quarterFinals, nameEn: t.knockout.quarterFinalsEn, progress: t.knockout.progressQF, color: '#D72828' },
    { name: t.knockout.semiFinals, nameEn: t.knockout.semiFinalsEn, progress: t.knockout.progressSF, color: '#009A44' },
    { name: t.knockout.final, nameEn: t.knockout.finalEn, progress: t.knockout.progressFinal, color: '#C0A020' },
  ];
}

type DisplayRound = {
  name: string;
  nameEn: string;
  color: string;
  matches: BracketMatch[];
};

function hasKnownTeams(round: BracketRound | undefined) {
  return Boolean(round?.matches.some((match) => !match.team1.tbd && !match.team2.tbd));
}

function hasRoundStarted(round: BracketRound, now = new Date()) {
  return round.matches.some((match) => match.date && new Date(`${match.date}T00:00:00Z`) <= now);
}

const RoundLabel = ({ name, nameEn, color }: { name: string; nameEn: string; color: string }) => (
  <div style={{ marginBottom: '12px', padding: '4px 14px', background: `${color}15`, border: `1px solid ${color}40`, borderRadius: '16px', alignSelf: 'center' }}>
    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', color, letterSpacing: '2px', textAlign: 'center' }}>{name}</div>
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>{nameEn}</div>
  </div>
);

// Full bracket for desktop
function DesktopBracket({ rounds }: { rounds: BracketRound[] }) {
  const { t } = useLanguage();
  const roundMeta = getRoundMeta(t);
  const roundCountBeforeFinal = rounds.length - 1;
  const firstRoundMatchesPerSide = (rounds[0]?.matches.length ?? 0) / 2;
  const finalRound = rounds[rounds.length - 1];

  const unitH = MATCH_H + MATCH_GAP;
  const totalH = firstRoundMatchesPerSide * unitH - MATCH_GAP;

  const getRoundPositions = (ri: number) => {
    const count = firstRoundMatchesPerSide / Math.pow(2, ri);
    const slotSize = unitH * Math.pow(2, ri);
    return Array.from({ length: count }, (_, i) => i * slotSize + slotSize / 2 - MATCH_H / 2);
  };

  const leftRounds: DisplayRound[] = rounds.slice(0, -1).map((round, ri) => ({
    name: roundMeta[ri]?.name ?? round.name,
    nameEn: roundMeta[ri]?.nameEn ?? round.nameEn,
    color: roundMeta[ri]?.color ?? '#0033A0',
    matches: round.matches.slice(0, round.matches.length / 2),
  }));

  const rightRounds: DisplayRound[] = rounds.slice(0, -1).map((round, ri) => ({
    name: roundMeta[ri]?.name ?? round.name,
    nameEn: roundMeta[ri]?.nameEn ?? round.nameEn,
    color: roundMeta[ri]?.color ?? '#0033A0',
    matches: round.matches.slice(round.matches.length / 2),
  }));

  const LeftRoundCol = ({ round, ri }: { round: DisplayRound; ri: number }) => {
    const positions = getRoundPositions(ri);
    const slotSize = unitH * Math.pow(2, ri);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <RoundLabel {...round} />
        <div style={{ position: 'relative', height: `${totalH}px`, width: `${ROUND_COL_W}px` }}>
          {round.matches.map((match, mi) => (
            <div key={match.id}>
              <div style={{ position: 'absolute', top: `${positions[mi]}px`, left: '0', right: `${CONNECTOR_W}px` }}>
                <MatchCard match={match} />
              </div>
              {ri < leftRounds.length - 1 && (
                <>
                  <div style={{ position: 'absolute', top: `${positions[mi] + MATCH_H / 2}px`, right: '0', width: `${CONNECTOR_W}px`, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
                  {mi % 2 === 0 && <div style={{ position: 'absolute', right: '0', top: `${positions[mi] + MATCH_H / 2}px`, width: '1px', height: `${slotSize}px`, background: 'rgba(255,255,255,0.12)' }} />}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const RightRoundCol = ({ round, ri }: { round: DisplayRound; ri: number }) => {
    const positions = getRoundPositions(ri);
    const slotSize = unitH * Math.pow(2, ri);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <RoundLabel {...round} />
        <div style={{ position: 'relative', height: `${totalH}px`, width: `${ROUND_COL_W}px` }}>
          {round.matches.map((match, mi) => (
            <div key={match.id}>
              <div style={{ position: 'absolute', top: `${positions[mi]}px`, left: `${CONNECTOR_W}px`, right: '0' }}>
                <MatchCard match={match} />
              </div>
              {ri < rightRounds.length - 1 && (
                <>
                  <div style={{ position: 'absolute', top: `${positions[mi] + MATCH_H / 2}px`, left: '0', width: `${CONNECTOR_W}px`, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
                  {mi % 2 === 0 && <div style={{ position: 'absolute', left: '0', top: `${positions[mi] + MATCH_H / 2}px`, width: '1px', height: `${slotSize}px`, background: 'rgba(255,255,255,0.12)' }} />}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '0', width: `${DESKTOP_BRACKET_W}px`, maxWidth: '100%' }}>
      {leftRounds.map((round, ri) => <LeftRoundCol key={round.nameEn} round={round} ri={ri} />)}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: `${CENTER_W}px`, flexShrink: 0 }}>
        <div style={{ height: '51px', marginBottom: '12px' }} />
        <div style={{ position: 'relative', height: `${totalH}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', padding: '6px 16px', background: 'rgba(192,160,32,0.12)', border: '1px solid rgba(192,160,32,0.45)', borderRadius: '16px', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '14px', marginRight: '4px' }}>🏆</span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: '#C0A020', letterSpacing: '3px' }}>{roundMeta[roundCountBeforeFinal]?.name ?? t.knockout.final}</span>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: 'rgba(192,160,32,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>{roundMeta[roundCountBeforeFinal]?.nameEn ?? t.knockout.finalEn}</div>
          </div>
          <div style={{ position: 'absolute', top: `${totalH / 2}px`, left: '0', width: '8px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ position: 'absolute', top: `${totalH / 2}px`, right: '0', width: '8px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <MatchCard match={finalRound.matches[0]} isFinal={true} />
            {finalRound.matches[0].venue && (
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'rgba(192,160,32,0.6)', textAlign: 'center', maxWidth: '200px' }}>
                {t.knockout.venueLabel} {finalRound.matches[0].venue}
              </div>
            )}
          </div>
        </div>
      </div>

      {[...rightRounds].reverse().map((round, ri) => <RightRoundCol key={round.nameEn} round={round} ri={rightRounds.length - 1 - ri} />)}
    </div>
  );
}

// Simplified mobile list view
function MobileBracket({ rounds }: { rounds: BracketRound[] }) {
  const { t, lang } = useLanguage();
  const roundMeta = getRoundMeta(t);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {rounds.map((round, ri) => (
        <div key={round.nameEn}>
          {/* Round label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${roundMeta[ri]?.color ?? '#0033A0'}, transparent)` }} />
            <div style={{ padding: '4px 14px', background: `${roundMeta[ri]?.color ?? '#0033A0'}18`, border: `1px solid ${roundMeta[ri]?.color ?? '#0033A0'}40`, borderRadius: '16px' }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', color: roundMeta[ri]?.color ?? '#0033A0', letterSpacing: '2px' }}>{roundMeta[ri]?.name ?? round.name}</span>
            </div>
            <div style={{ flex: 1, height: '1px', background: `linear-gradient(270deg, ${roundMeta[ri]?.color ?? '#0033A0'}, transparent)` }} />
          </div>
          {/* Matches */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {round.matches.map(match => {
              const t1Name = match.team1.tbd ? t.knockout.tbd : getTeamName(match.team1.nameEn, lang);
              const t2Name = match.team2.tbd ? t.knockout.tbd : getTeamName(match.team2.nameEn, lang);
              const isFinal = ri === rounds.length - 1;

              return (
                <div key={match.id} style={{
                  background: 'rgba(8,16,40,0.88)',
                  border: isFinal ? '1px solid rgba(192,160,32,0.45)' : match.played ? '1px solid rgba(0,51,160,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: isFinal ? '0 0 16px rgba(192,160,32,0.12)' : '0 2px 8px rgba(0,0,0,0.3)',
                }}>
                  {isFinal && <div style={{ height: '2px', background: 'linear-gradient(90deg, #D72828, #C0A020, #009A44)' }} />}
                  {!isFinal && match.played && <div style={{ height: '2px', background: 'linear-gradient(90deg, #0033A0, transparent)' }} />}
                  {!isFinal && !match.played && <div style={{ height: '2px', background: 'linear-gradient(90deg, #009A44, transparent)' }} />}

                  {/* Team 1 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', background: match.team1.winner ? 'rgba(0,51,160,0.2)' : 'transparent', borderLeft: match.team1.winner ? '3px solid #0033A0' : '3px solid transparent' }}>
                    <span style={{ fontSize: '18px', width: '24px' }}>{match.team1.tbd ? '❓' : match.team1.flag}</span>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '15px', fontWeight: 700, flex: 1, color: match.team1.winner ? '#fff' : 'rgba(255,255,255,0.78)' }}>{t1Name}</span>
                    {match.played && match.team1.score !== undefined && (
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: match.team1.penaltyScore !== undefined ? '18px' : '22px', color: match.team1.winner ? '#fff' : 'rgba(255,255,255,0.35)', letterSpacing: match.team1.penaltyScore !== undefined ? '0' : '1px', whiteSpace: 'nowrap' }}>
                          {formatTeamScore(match.team1.score, match.team1.penaltyScore)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 10px' }} />

                  {/* Team 2 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', background: match.team2.winner ? 'rgba(0,51,160,0.2)' : 'transparent', borderLeft: match.team2.winner ? '3px solid #0033A0' : '3px solid transparent' }}>
                    <span style={{ fontSize: '18px', width: '24px' }}>{match.team2.tbd ? '❓' : match.team2.flag}</span>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '15px', fontWeight: 700, flex: 1, color: match.team2.winner ? '#fff' : 'rgba(255,255,255,0.78)' }}>{t2Name}</span>
                    {match.played && match.team2.score !== undefined && (
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: match.team2.penaltyScore !== undefined ? '18px' : '22px', color: match.team2.winner ? '#fff' : 'rgba(255,255,255,0.35)', letterSpacing: match.team2.penaltyScore !== undefined ? '0' : '1px', whiteSpace: 'nowrap' }}>
                        {formatTeamScore(match.team2.score, match.team2.penaltyScore)}
                      </span>
                    )}
                  </div>

                  {(match.date || isFinal) && (
                    <div style={{ padding: '5px 12px', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: isFinal ? 'rgba(192,160,32,0.8)' : match.played ? 'rgba(0,154,68,0.7)' : 'rgba(255,255,255,0.3)' }}>{match.date}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function KnockoutBracket({ rounds = fallbackKnockoutRounds }: { rounds?: BracketRound[] }) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const useListLayout = useMediaQuery('(max-width: 1390px)');
  const roundMeta = getRoundMeta(t);

  const progressItems = rounds.map((round, index) => {
    const allPlayed = round.matches.every((match) => match.played);
    const somePlayed = round.matches.some((match) => match.played);
    const roundDone = allPlayed || hasKnownTeams(rounds[index + 1]);
    const inProgress = !roundDone && (somePlayed || hasRoundStarted(round));
    const upcoming = !roundDone && !inProgress && hasKnownTeams(round);

    return {
      label: roundMeta[index]?.progress ?? round.name,
      value: roundDone ? t.tournament.statusDone : inProgress ? t.tournament.statusLive : upcoming ? t.tournament.statusUpcoming : t.tournament.statusTBD,
      color: roundDone ? '#009A44' : inProgress || upcoming ? '#D72828' : '#C0A020',
      icon: roundDone ? '✓' : inProgress || upcoming ? '▶' : '⏳',
    };
  });

  return (
    <div>
      {isMobile || useListLayout ? (
        <MobileBracket rounds={rounds} />
      ) : (
        <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', paddingBottom: '8px' }}>
          <div style={{ width: `${DESKTOP_BRACKET_W}px` }}>
            <DesktopBracket rounds={rounds} />
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '0',
        marginTop: '24px', padding: isMobile ? '12px 8px' : '16px',
        background: 'rgba(10,20,45,0.4)', borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden',
        flexWrap: isMobile || useListLayout ? 'wrap' : 'nowrap',
        rowGap: '8px',
      }}>
        {progressItems.map((item, i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ padding: isMobile ? '6px 12px' : '8px 16px', textAlign: 'center', minWidth: isMobile ? '80px' : '110px' }}>
              <div style={{ fontSize: '14px', marginBottom: '3px' }}>{item.icon}</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: isMobile ? '11px' : '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>{item.label}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: item.color }}>{item.value}</div>
            </div>
            {i < progressItems.length - 1 && (
              <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px', flexShrink: 0 }}>→</div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
