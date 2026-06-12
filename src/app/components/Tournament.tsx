import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GroupStage } from './GroupStage';
import { KnockoutBracket } from './KnockoutBracket';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';
import { useLiveTournamentData } from '../hooks/useLiveTournamentData';
import { GROUP_STAGE_START } from '../data/matches';

type TabType = 'group' | 'knockout';

export function Tournament() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { groups, knockoutRounds } = useLiveTournamentData();
  const [activeTab, setActiveTab] = useState<TabType>('group');
  const [direction, setDirection] = useState<1 | -1>(1);

  const tabs = [
    { id: 'group' as TabType, labelZh: t.tournament.groupStageTab, labelEn: t.tournament.groupStageEn, icon: '📊' },
    { id: 'knockout' as TabType, labelZh: t.tournament.knockoutTab, labelEn: t.tournament.knockoutEn, icon: '🏆' },
  ];

  const handleTabChange = (tab: TabType) => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    const newIndex = tabs.findIndex(t => t.id === tab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(tab);
  };

  // Compute real tournament data
  const hasStarted = useMemo(() => {
    const now = new Date();
    const start = new Date(`${GROUP_STAGE_START}T19:00:00Z`);
    return now >= start;
  }, []);

  const { completedMatches, qualifiedTeams } = useMemo(() => {
    if (!hasStarted) return { completedMatches: 0, qualifiedTeams: 0 };

    const totalPlayed = groups.reduce(
      (sum, g) => sum + g.teams.reduce((s, t) => s + t.played, 0),
      0
    );
    const completedMatches = Math.floor(totalPlayed / 2);

    const qualifiedTeams = groups.reduce((sum, g) => {
      const allPlayed = g.teams.every((t) => t.played === 3);
      return sum + (allPlayed ? 2 : 0);
    }, 0);

    return { completedMatches, qualifiedTeams };
  }, [hasStarted]);

  const groupStatusItems = [
    {
      label: t.tournament.completedLabel,
      value: hasStarted ? String(completedMatches) : '0',
      color: '#009A44',
    },
    {
      label: t.tournament.groupsLabel,
      value: hasStarted ? String(groups.length) : '0',
      color: '#0033A0',
    },
    {
      label: t.tournament.qualifiedLabel,
      value: hasStarted ? String(qualifiedTeams) : '0',
      color: '#D72828',
    },
  ];

  const getKnockoutStatus = (matches: (typeof knockoutRounds)[0]['matches']) => {
    if (!hasStarted) return { value: '0', color: '#C0A020' };
    const allPlayed = matches.every((m) => m.played);
    const somePlayed = matches.some((m) => m.played);
    if (allPlayed) return { value: t.tournament.statusDone, color: '#009A44' };
    if (somePlayed) return { value: t.tournament.statusUpcoming, color: '#D72828' };
    return { value: t.tournament.statusTBD, color: '#C0A020' };
  };

  const knockoutStatusItems = [
    { label: t.knockout.roundOf16, ...getKnockoutStatus(knockoutRounds[0].matches) },
    { label: t.knockout.quarterFinals, ...getKnockoutStatus(knockoutRounds[1].matches) },
    { label: t.knockout.semiFinals, ...getKnockoutStatus(knockoutRounds[2].matches) },
    { label: t.knockout.final, ...getKnockoutStatus(knockoutRounds[3].matches) },
  ];

  return (
    <section
      id="tournament"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #020A1B 0%, #030C20 100%)',
        padding: isMobile ? '72px 0 48px' : '96px 0 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #0033A0, #D72828, #009A44, transparent)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(ellipse, rgba(0,51,160,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: `0 clamp(12px, 3vw, 24px)` }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '28px' : '44px' }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '12px', letterSpacing: '4px', color: '#D72828', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
            {t.tournament.sectionSubtitle}
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 'clamp(28px, 8vw, 44px)' : 'clamp(36px, 5vw, 56px)', letterSpacing: '4px', color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1 }}>
            {t.tournament.sectionTitle}
          </h2>
          <div style={{ width: '56px', height: '3px', background: 'linear-gradient(90deg, #D72828, #0033A0, #009A44)', borderRadius: '2px', margin: '0 auto' }} />
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? '20px' : '32px' }}>
          <div style={{
            display: 'inline-flex',
            background: 'rgba(10,20,45,0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            padding: '5px',
            gap: '4px',
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '420px' : 'none',
          }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    position: 'relative',
                    flex: isMobile ? 1 : 'none',
                    padding: isMobile ? '10px 16px' : '12px 32px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    background: isActive ? 'linear-gradient(135deg, #0033A0 0%, #0044CC 100%)' : 'transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isActive ? '0 4px 16px rgba(0,51,160,0.4)' : 'none',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: 1 }}>{tab.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: isMobile ? '15px' : '18px', fontWeight: 700, color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', lineHeight: 1.2, transition: 'color 0.3s', whiteSpace: 'nowrap' }}>
                        {tab.labelZh}
                      </div>
                      {!isMobile && (
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: isActive ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.22)', letterSpacing: '1px', textTransform: 'uppercase', transition: 'color 0.3s' }}>
                          {tab.labelEn}
                        </div>
                      )}
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      style={{ position: 'absolute', bottom: '6px', left: '50%', width: '16px', height: '3px', background: 'rgba(255,255,255,0.65)', borderRadius: '2px', transform: 'translateX(-50%)' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '6px' : '16px', marginBottom: isMobile ? '20px' : '28px', flexWrap: 'wrap' }}>
          {(activeTab === 'group' ? groupStatusItems : knockoutStatusItems).map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: isMobile ? '4px 10px' : '6px 14px',
              background: `${item.color}10`, border: `1px solid ${item.color}30`, borderRadius: '8px',
            }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? '13px' : '15px', color: item.color, letterSpacing: '1px', whiteSpace: 'nowrap' }}>{item.value}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? '10px' : '12px', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: direction * 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -36 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {activeTab === 'group' ? <GroupStage /> : <KnockoutBracket />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
