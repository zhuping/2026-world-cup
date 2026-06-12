import { useMemo, useState } from 'react';
import type { Group } from '../data/teams';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';
import { useLiveTournamentData } from '../hooks/useLiveTournamentData';
import { getTeamName } from '../i18n/teamNames';
import { GROUP_STAGE_START } from '../data/matches';

function TeamRow({
  team,
  rank,
  hasStarted,
}: {
  team: Group['teams'][number];
  rank: number;
  hasStarted: boolean;
}) {
  const { lang } = useLanguage();
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);
  const isQualified = hasStarted && rank <= 2;
  const displayName = getTeamName(team.nameEn, lang as any);
  const played = hasStarted ? team.played : 0;
  const gd = hasStarted ? team.gd : 0;
  const points = hasStarted ? team.points : 0;
  const won = hasStarted ? team.won : 0;
  const drawn = hasStarted ? team.drawn : 0;
  const lost = hasStarted ? team.lost : 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile
          ? '18px 24px 1fr 26px 26px 26px'
          : '20px 28px 1fr 32px 32px 32px 32px',
        alignItems: 'center',
        gap: isMobile ? '4px' : '6px',
        padding: isMobile ? '7px 10px' : '8px 12px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        background: hovered
          ? 'rgba(255,255,255,0.07)'
          : isQualified
            ? 'rgba(0,154,68,0.05)'
            : 'transparent',
        borderLeft: isQualified ? '2px solid #009A4460' : '2px solid transparent',
      }}
    >
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '14px',
          color: isQualified ? '#009A44' : 'rgba(255,255,255,0.3)',
          textAlign: 'center',
        }}
      >
        {rank}
      </span>
      <span style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: 1 }}>
        {team.flag}
      </span>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: 700,
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {displayName}
        </div>
        {!isMobile && (
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              color: 'rgba(255,255,255,0.3)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {team.nameEn}
          </div>
        )}
      </div>
      <span
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: isMobile ? '13px' : '14px',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
        }}
      >
        {played}
      </span>
      <span
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: isMobile ? '13px' : '14px',
          color: gd > 0 ? '#00CC66' : gd < 0 ? '#FF4444' : 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          fontWeight: 600,
        }}
      >
        {gd > 0 ? `+${gd}` : gd}
      </span>
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: isMobile ? '16px' : '17px',
          color: isQualified ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
          textAlign: 'center',
          background: isQualified ? 'rgba(0,51,160,0.4)' : 'transparent',
          borderRadius: '4px',
          padding: '1px 4px',
        }}
      >
        {points}
      </span>
      {!isMobile && (
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'center',
          }}
        >
          {won}-{drawn}-{lost}
        </span>
      )}
    </div>
  );
}

function GroupCard({
  group,
  hasStarted,
}: {
  group: Group;
  hasStarted: boolean;
}) {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);
  const sortedTeams = useMemo(
    () =>
      [...group.teams].sort((a, b) =>
        b.points !== a.points ? b.points - a.points : b.gd !== a.gd ? b.gd - a.gd : b.gf - a.gf
      ),
    [group.teams]
  );
  const groupLabel = t.group.groupLabel.replace('{name}', group.name);
  const playedMatches = hasStarted
    ? Math.floor(group.teams.reduce((sum, team) => sum + team.played, 0) / 2)
    : 0;

  const playedLabel = useMemo(() => {
    switch (lang) {
      case 'zh':
        return `已赛${playedMatches}场`;
      case 'ja':
        return `${playedMatches}試合消化`;
      case 'ko':
        return `${playedMatches}경기 진행`;
      case 'pt':
        return `${playedMatches} jogos disputados`;
      case 'es':
        return `${playedMatches} partidos jugados`;
      case 'en':
      default:
        return `${playedMatches} matches played`;
    }
  }, [lang, playedMatches]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(10, 20, 45, 0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        boxShadow: hovered
          ? '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,51,160,0.3)'
          : '0 4px 16px rgba(0,0,0,0.3)',
        transform: hovered && !isMobile ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      <div
        style={{
          padding: '10px 14px 8px',
          background: 'linear-gradient(135deg, rgba(0,51,160,0.3) 0%, rgba(0,154,68,0.15) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D72828, #0033A0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '14px',
                color: 'white',
                lineHeight: 1,
              }}
            >
              {group.name}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.5px',
            }}
          >
            {groupLabel}
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          {playedLabel}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '18px 24px 1fr 26px 26px 26px'
            : '20px 28px 1fr 32px 32px 32px 32px',
          gap: isMobile ? '4px' : '6px',
          padding: '5px 10px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {(isMobile
          ? [t.group.headerRank, '', t.group.headerTeam, t.group.headerPlayed, t.group.headerGD, t.group.headerPoints]
          : [t.group.headerRank, '', t.group.headerTeam, t.group.headerPlayed, t.group.headerGD, t.group.headerPoints, t.group.headerRecord]
        ).map((header, index) => (
          <span
            key={`${group.name}-${index}`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '9px',
              color: 'rgba(255,255,255,0.3)',
              textAlign: index === 0 || index > 2 ? 'center' : 'left',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            {header}
          </span>
        ))}
      </div>

      <div style={{ padding: '2px 0' }}>
        {sortedTeams.map((team, index) => (
          <TeamRow
            key={team.nameEn}
            team={team}
            rank={index + 1}
            hasStarted={hasStarted}
          />
        ))}
      </div>

      <div
        style={{
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#009A44',
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          {t.group.advanceHint}
        </span>
      </div>
    </div>
  );
}

export function GroupStage() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { groups } = useLiveTournamentData();
  const hasStarted = useMemo(() => {
    const now = new Date();
    const start = new Date(`${GROUP_STAGE_START}T19:00:00Z`);
    return now >= start;
  }, []);

  const stats = [
    { label: t.group.statsTeams, value: '48', unit: t.group.statsTeamsUnit },
    { label: t.group.statsGroups, value: '12', unit: t.group.statsGroupsUnit },
    { label: t.group.statsMatches, value: '72', unit: t.group.statsMatchesUnit },
    { label: t.group.statsQualifiers, value: '32', unit: t.group.statsQualifiersUnit },
  ];

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile
          ? 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))'
          : 'repeat(auto-fill, minmax(270px, 1fr))',
        gap: isMobile ? '12px' : '18px',
        padding: '0 0 16px',
      }}>
        {groups.map((group) => (
          <GroupCard
            key={group.name}
            group={group}
            hasStarted={hasStarted}
          />
        ))}
      </div>

      <div style={{
        display: 'flex', gap: '0', flexWrap: 'wrap', justifyContent: 'center',
        marginTop: '8px', padding: '12px 16px',
        background: 'rgba(10,20,45,0.4)', borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto',
      }}>
        {stats.map((stat, i) => (
          <div key={stat.label} style={{
            textAlign: 'center', padding: isMobile ? '6px 16px' : '8px 24px',
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            minWidth: isMobile ? '80px' : '100px',
          }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '22px' : '28px', color: '#FFFFFF', letterSpacing: '1px', lineHeight: 1 }}>
              {stat.value}
              {stat.unit && <span style={{ fontSize: isMobile ? '12px' : '15px', color: 'rgba(255,255,255,0.4)', marginLeft: '2px' }}>{stat.unit}</span>}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? '10px' : '12px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
