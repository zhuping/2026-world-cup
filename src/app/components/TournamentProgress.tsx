import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Calendar } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  nameEn: string;
  flag: string;
  group: string;
  points: number;
  goalDiff: number;
  rank: number;
}

interface BracketMatch {
  round: string;
  team1?: { name: string; nameEn: string; flag: string };
  team2?: { name: string; nameEn: string; flag: string };
  time?: string;
}

// 模拟小组赛数据
const groupStageTeams: Team[] = [
  // A组
  { id: '1', name: '卡塔尔', nameEn: 'Qatar', flag: '🇶🇦', group: 'A', points: 9, goalDiff: 5, rank: 1 },
  { id: '2', name: '厄瓜多尔', nameEn: 'Ecuador', flag: '🇪🇨', group: 'A', points: 6, goalDiff: 2, rank: 2 },
  { id: '3', name: '塞内加尔', nameEn: 'Senegal', flag: '🇸🇳', group: 'A', points: 3, goalDiff: -1, rank: 3 },
  { id: '4', name: '荷兰', nameEn: 'Netherlands', flag: '🇳🇱', group: 'A', points: 0, goalDiff: -6, rank: 4 },
  
  // B组
  { id: '5', name: '英格兰', nameEn: 'England', flag: '🏴󐁧󐁢󐁥󐁮󐁧󐁿', group: 'B', points: 7, goalDiff: 7, rank: 1 },
  { id: '6', name: '美国', nameEn: 'USA', flag: '🇺🇸', group: 'B', points: 5, goalDiff: 0, rank: 2 },
  { id: '7', name: '伊朗', nameEn: 'Iran', flag: '🇮🇷', group: 'B', points: 3, goalDiff: -3, rank: 3 },
  { id: '8', name: '威尔士', nameEn: 'Wales', flag: '🏴󐁧󐁢󐁷󐁬󐁳󐁿', group: 'B', points: 1, goalDiff: -4, rank: 4 },
  
  // C组
  { id: '9', name: '阿根廷', nameEn: 'Argentina', flag: '🇦🇷', group: 'C', points: 6, goalDiff: 3, rank: 1 },
  { id: '10', name: '波兰', nameEn: 'Poland', flag: '🇵🇱', group: 'C', points: 4, goalDiff: 0, rank: 2 },
  { id: '11', name: '墨西哥', nameEn: 'Mexico', flag: '🇲🇽', group: 'C', points: 4, goalDiff: -1, rank: 3 },
  { id: '12', name: '沙特阿拉伯', nameEn: 'Saudi Arabia', flag: '🇸🇦', group: 'C', points: 3, goalDiff: -2, rank: 4 },
  
  // D组
  { id: '13', name: '法国', nameEn: 'France', flag: '🇫🇷', group: 'D', points: 6, goalDiff: 3, rank: 1 },
  { id: '14', name: '澳大利亚', nameEn: 'Australia', flag: '🇦🇺', group: 'D', points: 6, goalDiff: -1, rank: 2 },
  { id: '15', name: '突尼斯', nameEn: 'Tunisia', flag: '🇹🇳', group: 'D', points: 4, goalDiff: 0, rank: 3 },
  { id: '16', name: '丹麦', nameEn: 'Denmark', flag: '🇩🇰', group: 'D', points: 1, goalDiff: -2, rank: 4 },

  // E组
  { id: '17', name: '日本', nameEn: 'Japan', flag: '🇯🇵', group: 'E', points: 6, goalDiff: 1, rank: 1 },
  { id: '18', name: '西班牙', nameEn: 'Spain', flag: '🇪🇸', group: 'E', points: 4, goalDiff: 6, rank: 2 },
  { id: '19', name: '德国', nameEn: 'Germany', flag: '🇩🇪', group: 'E', points: 4, goalDiff: -1, rank: 3 },
  { id: '20', name: '哥斯达黎加', nameEn: 'Costa Rica', flag: '🇨🇷', group: 'E', points: 3, goalDiff: -6, rank: 4 },

  // F组
  { id: '21', name: '摩洛哥', nameEn: 'Morocco', flag: '🇲🇦', group: 'F', points: 7, goalDiff: 3, rank: 1 },
  { id: '22', name: '克罗地亚', nameEn: 'Croatia', flag: '🇭🇷', group: 'F', points: 5, goalDiff: 3, rank: 2 },
  { id: '23', name: '比利时', nameEn: 'Belgium', flag: '🇧🇪', group: 'F', points: 4, goalDiff: -1, rank: 3 },
  { id: '24', name: '加拿大', nameEn: 'Canada', flag: '🇨🇦', group: 'F', points: 0, goalDiff: -5, rank: 4 },

  // G组
  { id: '25', name: '巴西', nameEn: 'Brazil', flag: '🇧🇷', group: 'G', points: 6, goalDiff: 2, rank: 1 },
  { id: '26', name: '瑞士', nameEn: 'Switzerland', flag: '🇨🇭', group: 'G', points: 6, goalDiff: 1, rank: 2 },
  { id: '27', name: '喀麦隆', nameEn: 'Cameroon', flag: '🇨🇲', group: 'G', points: 4, goalDiff: 0, rank: 3 },
  { id: '28', name: '塞尔维亚', nameEn: 'Serbia', flag: '🇷🇸', group: 'G', points: 1, goalDiff: -3, rank: 4 },

  // H组
  { id: '29', name: '葡萄牙', nameEn: 'Portugal', flag: '🇵🇹', group: 'H', points: 6, goalDiff: 2, rank: 1 },
  { id: '30', name: '韩国', nameEn: 'South Korea', flag: '🇰🇷', group: 'H', points: 4, goalDiff: 0, rank: 2 },
  { id: '31', name: '乌拉圭', nameEn: 'Uruguay', flag: '🇺🇾', group: 'H', points: 4, goalDiff: 0, rank: 3 },
  { id: '32', name: '加纳', nameEn: 'Ghana', flag: '🇬🇭', group: 'H', points: 3, goalDiff: -2, rank: 4 },
];

// 模拟淘汰赛对阵数据
const knockoutMatches: BracketMatch[] = [
  // 1/8决赛
  { round: '1/8决赛', team1: { name: '荷兰', nameEn: 'Netherlands', flag: '🇳🇱' }, team2: { name: '美国', nameEn: 'USA', flag: '🇺🇸' }, time: '12月3日 22:00' },
  { round: '1/8决赛', team1: { name: '阿根廷', nameEn: 'Argentina', flag: '🇦🇷' }, team2: { name: '澳大利亚', nameEn: 'Australia', flag: '🇦🇺' }, time: '12月4日 02:00' },
  { round: '1/8决赛', team1: { name: '法国', nameEn: 'France', flag: '🇫🇷' }, team2: { name: '波兰', nameEn: 'Poland', flag: '🇵🇱' }, time: '12月4日 22:00' },
  { round: '1/8决赛', team1: { name: '英格兰', nameEn: 'England', flag: '🏴󐁧󐁢󐁥󐁮󐁧󐁿' }, team2: { name: '塞内加尔', nameEn: 'Senegal', flag: '🇸🇳' }, time: '12月5日 02:00' },
  { round: '1/8决赛', team1: { name: '日本', nameEn: 'Japan', flag: '🇯🇵' }, team2: { name: '克罗地亚', nameEn: 'Croatia', flag: '🇭🇷' }, time: '12月5日 22:00' },
  { round: '1/8决赛', team1: { name: '巴西', nameEn: 'Brazil', flag: '🇧🇷' }, team2: { name: '韩国', nameEn: 'South Korea', flag: '🇰🇷' }, time: '12月6日 02:00' },
  { round: '1/8决赛', team1: { name: '摩洛哥', nameEn: 'Morocco', flag: '🇲🇦' }, team2: { name: '西班牙', nameEn: 'Spain', flag: '🇪🇸' }, time: '12月6日 22:00' },
  { round: '1/8决赛', team1: { name: '葡萄牙', nameEn: 'Portugal', flag: '🇵🇹' }, team2: { name: '瑞士', nameEn: 'Switzerland', flag: '🇨🇭' }, time: '12月7日 02:00' },
];

export function TournamentProgress() {
  const [activeTab, setActiveTab] = useState<'group' | 'knockout'>('group');

  const groups = Array.from(new Set(groupStageTeams.map(t => t.group))).sort();

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10" style={{ color: '#D72828' }} />
            <h2 className="text-4xl md:text-5xl" style={{ fontWeight: 700, color: '#0033A0' }}>
              赛事进程
            </h2>
          </div>
          <p className="text-lg text-gray-600">实时跟踪球队表现与淘汰赛对阵</p>
        </div>

        {/* 标签切换 */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('group')}
              className="relative px-8 py-3 rounded-xl transition-all duration-300"
              style={{
                fontWeight: 600,
                color: activeTab === 'group' ? '#fff' : '#666',
              }}
            >
              {activeTab === 'group' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #D72828, #0033A0)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">小组赛</span>
            </button>
            <button
              onClick={() => setActiveTab('knockout')}
              className="relative px-8 py-3 rounded-xl transition-all duration-300"
              style={{
                fontWeight: 600,
                color: activeTab === 'knockout' ? '#fff' : '#666',
              }}
            >
              {activeTab === 'knockout' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #0033A0, #009A44)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">淘汰赛</span>
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'group' ? (
            // 小组赛卡片
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {groups.map((group) => (
                <div
                  key={group}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4"
                  style={{
                    borderTopColor: group.charCodeAt(0) % 3 === 0 ? '#D72828' : group.charCodeAt(0) % 3 === 1 ? '#0033A0' : '#009A44',
                  }}
                >
                  <div className="p-6">
                    <h3
                      className="text-center mb-4 pb-3 border-b-2"
                      style={{
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: group.charCodeAt(0) % 3 === 0 ? '#D72828' : group.charCodeAt(0) % 3 === 1 ? '#0033A0' : '#009A44',
                      }}
                    >
                      {group}组
                    </h3>
                    <div className="space-y-3">
                      {groupStageTeams
                        .filter(team => team.group === group)
                        .sort((a, b) => a.rank - b.rank)
                        .map((team, index) => (
                          <motion.div
                            key={team.id}
                            whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            className="p-3 rounded-xl border-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="flex items-center justify-center w-8 h-8 rounded-full text-white"
                                style={{
                                  fontWeight: 700,
                                  fontSize: '0.875rem',
                                  background: index < 2 ? 'linear-gradient(135deg, #D72828, #0033A0)' : '#cbd5e1',
                                }}
                              >
                                {team.rank}
                              </div>
                              <div className="text-3xl">{team.flag}</div>
                              <div className="flex-1">
                                <div style={{ fontWeight: 600, color: '#1f2937' }}>{team.name}</div>
                                <div className="text-xs text-gray-500">{team.nameEn}</div>
                              </div>
                              <div className="text-right">
                                <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#0033A0' }}>
                                  {team.points}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {team.goalDiff > 0 ? '+' : ''}{team.goalDiff}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 淘汰赛树形图
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {knockoutMatches.map((match, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03, boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2"
                    style={{
                      borderColor: index % 3 === 0 ? '#D72828' : index % 3 === 1 ? '#0033A0' : '#009A44',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-200">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600" style={{ fontWeight: 600 }}>
                        {match.round}
                      </span>
                    </div>
                    
                    {match.team1 && (
                      <div className="mb-3 p-3 bg-white rounded-xl border-2 border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{match.team1.flag}</span>
                          <div>
                            <div style={{ fontWeight: 600, color: '#1f2937' }}>{match.team1.name}</div>
                            <div className="text-xs text-gray-500">{match.team1.nameEn}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-center my-2">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs text-white"
                        style={{
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #D72828, #0033A0)',
                        }}
                      >
                        VS
                      </span>
                    </div>

                    {match.team2 && (
                      <div className="mb-3 p-3 bg-white rounded-xl border-2 border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{match.team2.flag}</span>
                          <div>
                            <div style={{ fontWeight: 600, color: '#1f2937' }}>{match.team2.name}</div>
                            <div className="text-xs text-gray-500">{match.team2.nameEn}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {match.time && (
                      <div className="mt-4 text-center">
                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600" style={{ fontWeight: 600 }}>
                          {match.time}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
