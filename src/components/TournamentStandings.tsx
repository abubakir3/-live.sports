import React, { useState } from 'react';
import { StandingRow, Language } from '../types';
import { standingsData } from '../data/sportsData';
import { translations } from '../data/translations';
import { Table, Trophy, Search, ChevronRight } from 'lucide-react';

interface TournamentStandingsProps {
  language: Language;
}

export const TournamentStandings: React.FC<TournamentStandingsProps> = ({ language }) => {
  const t = translations;
  const [activeTab, setActiveTab] = useState<'superleague' | 'ucl' | 'nba' | 'atp'>('superleague');
  const [filterQuery, setFilterQuery] = useState('');

  const currentRows: StandingRow[] = standingsData[activeTab] || [];

  const filteredRows = currentRows.filter((r) =>
    r.team.toLowerCase().includes(filterQuery.toLowerCase().trim())
  );

  return (
    <section id="standings" className="py-12 md:py-16 scroll-mt-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                {t.standings.badge[language]}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {t.standings.title[language]}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {t.standings.subtitle[language]}
            </p>
          </div>

          {/* Quick search inside table */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Jamoani qidirish..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Tournament Tabs (Touch friendly segmented buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
          <button
            onClick={() => { setActiveTab('superleague'); setFilterQuery(''); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
              activeTab === 'superleague'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            🇺🇿 O'zbekiston Superligasi
          </button>
          <button
            onClick={() => { setActiveTab('ucl'); setFilterQuery(''); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
              activeTab === 'ucl'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            ⭐ UEFA Champions League
          </button>
          <button
            onClick={() => { setActiveTab('nba'); setFilterQuery(''); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
              activeTab === 'nba'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            🏀 NBA League
          </button>
          <button
            onClick={() => { setActiveTab('atp'); setFilterQuery(''); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
              activeTab === 'atp'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            🎾 ATP World Tour
          </button>
        </div>

        {/* Standings Table Container (Horizontal scroll on tablet/mobile) */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4 text-center w-12">{t.standings.rank[language]}</th>
                  <th className="py-3.5 px-4">{t.standings.team[language]}</th>
                  <th className="py-3.5 px-3 text-center">{t.standings.played[language]}</th>
                  <th className="py-3.5 px-3 text-center">{t.standings.won[language]}</th>
                  <th className="py-3.5 px-3 text-center">{t.standings.draw[language]}</th>
                  <th className="py-3.5 px-3 text-center">{t.standings.lost[language]}</th>
                  <th className="py-3.5 px-3 text-center">{t.standings.diff[language]}</th>
                  <th className="py-3.5 px-4 text-center text-emerald-400">{t.standings.points[language]}</th>
                  <th className="py-3.5 px-4 text-center">{t.standings.form[language]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredRows.map((row) => {
                  const isTopThree = row.rank <= 3;
                  return (
                    <tr
                      key={row.rank}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isTopThree ? 'bg-emerald-500/[0.02]' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-mono font-black ${
                            row.rank === 1
                              ? 'bg-amber-400 text-slate-950 shadow-md'
                              : row.rank === 2
                              ? 'bg-slate-300 text-slate-950'
                              : row.rank === 3
                              ? 'bg-amber-600 text-white'
                              : 'text-slate-400'
                          }`}
                        >
                          {row.rank}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{row.badge}</span>
                          <span>{row.team}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono text-slate-300">{row.played}</td>
                      <td className="py-3.5 px-3 text-center font-mono text-emerald-400 font-bold">{row.won}</td>
                      <td className="py-3.5 px-3 text-center font-mono text-slate-400">{row.draw}</td>
                      <td className="py-3.5 px-3 text-center font-mono text-rose-400">{row.lost}</td>
                      <td className="py-3.5 px-3 text-center font-mono text-slate-300">{row.goalsDiff}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-black text-sm text-emerald-400 tabular-nums">
                        {row.points}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {row.form.map((f, idx) => (
                            <span
                              key={idx}
                              className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center font-mono ${
                                f === 'W'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : f === 'D'
                                  ? 'bg-slate-700/50 text-slate-300 border border-slate-600/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span>
              1-3 O'rinlar: Chempionlar Ligasi / Pley-off saralash zonasi
            </span>
            <span className="font-mono text-[11px]">Yangilandi: Bugun, 15:45</span>
          </div>
        </div>

      </div>
    </section>
  );
};
