import { useState } from 'react';
import { groups } from '../data/teams';
import { useLanguage } from '../contexts/LanguageContext';
import { getTeamName } from '../i18n/teamNames';
import { useIsMobile } from '../hooks/useIsMobile';

function TeamRow({ team, rank }: { team: typeof groups[0]['teams'][0]; rank: number }) {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);
  const isQualified = rank <= 2;
  const displayName = getTeamName(team.nameEn, lang);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '18px 24px 1fr 26px 26px 26px' : '20px 28px 1fr 32px 32px 32px 32px',
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
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', color: isQualified ? '#009A44' : 'rgba(255,255,255,0.3)', textAlign: 'center' }}>{rank}</span>
      <span style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: 1 }}>{team.flag}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: isMobile ? '13px' : '14px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</div>
        {!isMobile && (
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{team.nameEn}</div>
        )}
      </div>
      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: isMobile ? '13px' : '14px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>{team.played}</span>
      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: isMobile ? '13px' : '14px', color: team.gd > 0 ? '#00CC66' : team.gd < 0 ? '#FF4444' : 'rgba(255,255,255,0.5)', textAlign: 'center', fontWeight: 600 }}>
        {team.gd > 0 ? `+${team.gd}` : team.gd}
      </span>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '16px' : '17px', color: isQualified ? '#FFFFFF' : 'rgba(255,255,255,0.6)', textAlign: 'center', background: isQualified ? 'rgba(0,51,160,0.4)' : 'transparent', borderRadius: '4px', padding: '1px 4px' }}>{team.points}</span>
      {!isMobile && (
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>{team.won}-{team.drawn}-{team.lost}</span>
      )}
    </div>
  );
}

function GroupCard({ group }: { group: typeof groups[0] }) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);
  const sortedTeams = [...group.teams].sort((a, b) => b.points !== a.points ? b.points - a.points : b.gd !== a.gd ? b.gd - a.gd : b.gf - a.gf);
  const groupLabel = t.group.groupLabel.replace('{name}', group.name);

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
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,51,160,0.3)' : '0 4px 16px rgba(0,0,0,0.3)',
        transform: hovered && !isMobile ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {/* Header */}
      <div style={{ padding: '10px 14px 8px', background: 'linear-gradient(135deg, rgba(0,51,160,0.3) 0%, rgba(0,154,68,0.15) 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #D72828, #0033A0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', color: 'white', lineHeight: 1 }}>{group.name}</span>
          </div>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>{groupLabel}</span>
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{t.group.roundsPlayed}</div>
      </div>

      {/* Table Header */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '18px 24px 1fr 26px 26px 26px' : '20px 28px 1fr 32px 32px 32px 32px', gap: isMobile ? '4px' : '6px', padding: '5px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {(isMobile
          ? [t.group.headerRank, '', t.group.headerTeam, t.group.headerPlayed, t.group.headerGD, t.group.headerPoints]
          : [t.group.headerRank, '', t.group.headerTeam, t.group.headerPlayed, t.group.headerGD, t.group.headerPoints, t.group.headerRecord]
        ).map((h, i) => (
          <span key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.3)', textAlign: i === 0 || i > 2 ? 'center' : 'left', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</span>
        ))}
      </div>

      <div style={{ padding: '2px 0' }}>
        {sortedTeams.map((team, i) => (
          <TeamRow key={team.nameEn} team={team} rank={i + 1} />
        ))}
      </div>

      <div style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#009A44' }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{t.group.advanceHint}</span>
      </div>
    </div>
  );
}

export function GroupStage() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

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
        {groups.map(group => <GroupCard key={group.name} group={group} />)}
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
