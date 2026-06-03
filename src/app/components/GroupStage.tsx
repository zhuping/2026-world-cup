import { groups } from '../data/teams';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';
import { getTeamName } from '../i18n/teamNames';

function GroupCard({ groupName, teamIndexes }: { groupName: string; teamIndexes: number[] }) {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const groupLabel = t.group.groupLabel.replace('{name}', groupName);
  const group = groups.find((g) => g.name === groupName);

  return (
    <div
      style={{
        background: 'rgba(10, 20, 45, 0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ padding: '10px 14px 8px', background: 'linear-gradient(135deg, rgba(0,51,160,0.3) 0%, rgba(0,154,68,0.15) 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #D72828, #0033A0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', color: 'white', lineHeight: 1 }}>{groupName}</span>
          </div>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>{groupLabel}</span>
        </div>
      </div>

      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {teamIndexes.map((i) => {
          const team = group?.teams?.[i];
          const label = team ? getTeamName(team.nameEn, lang as any) : t.knockout.tbd;
          const flag = team?.flag || '❓';
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: isMobile ? '8px 10px' : '9px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '18px', lineHeight: 1, width: '22px' }}>{flag}</span>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: isMobile ? '14px' : '15px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{label}</span>
            </div>
          );
        })}
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
        {groups.map((g) => <GroupCard key={g.name} groupName={g.name} teamIndexes={[0, 1, 2, 3]} />)}
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
