import React, { useState, useMemo } from 'react';
import { MatchItem, SportType, Language } from '../types';
import { translations } from '../data/translations';
import { Search, Filter, RotateCcw, Radio, Calendar, MapPin, Trophy } from 'lucide-react';

interface SearchAndFiltersProps {
  matches: MatchItem[];
  activeMatchId: string;
  setActiveMatchId: (id: string) => void;
  language: Language;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  matches,
  activeMatchId,
  setActiveMatchId,
  language
}) => {
  const t = translations;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  // Unique lists for dropdowns
  const leagues = useMemo(() => {
    return ['all', ...Array.from(new Set(matches.map(m => m.league)))];
  }, [matches]);

  const countries = useMemo(() => {
    return ['all', ...Array.from(new Set(matches.map(m => m.country)))];
  }, [matches]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedSport('all');
    setSelectedLeague('all');
    setSelectedDate('all');
    setSelectedStatus('all');
    setSelectedCountry('all');
  };

  // Filter logic
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      // Search text filter
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchText = `${m.homeTeam.name} ${m.awayTeam.name} ${m.league} ${m.country} ${m.venue} ${m.sport}`.toLowerCase();
        if (!matchText.includes(q)) return false;
      }

      // Sport filter
      if (selectedSport !== 'all' && m.sport !== selectedSport) return false;

      // League filter
      if (selectedLeague !== 'all' && m.league !== selectedLeague) return false;

      // Status filter
      if (selectedStatus !== 'all' && m.status !== selectedStatus) return false;

      // Country filter
      if (selectedCountry !== 'all' && m.country !== selectedCountry) return false;

      // Date filter
      if (selectedDate === 'today' && !m.dateLabel.toLowerCase().includes('today')) return false;
      if (selectedDate === 'tomorrow' && !m.dateLabel.toLowerCase().includes('tomorrow')) return false;
      if (selectedDate === 'weekend' && (!m.dateLabel.toLowerCase().includes('saturday') && !m.dateLabel.toLowerCase().includes('sunday'))) return false;

      return true;
    });
  }, [matches, searchQuery, selectedSport, selectedLeague, selectedDate, selectedStatus, selectedCountry]);

  return (
    <section id="search-filter" className="py-12 md:py-16 scroll-mt-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                {t.search.badge[language]}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {t.search.title[language]}
            </h2>
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={resetAllFilters}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.common.clearFilters[language]}</span>
          </button>
        </div>

        {/* Real-time Instant Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-emerald-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search.placeholder[language]}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 shadow-xl transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Global Parameter Filter Pills & Selectors */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 mb-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Parametrlar bo'yicha saralash / Parameter Filters</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* By Sport */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                {t.search.bySport[language]}
              </label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                aria-label={t.search.bySport[language]}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="all">{t.sports.all[language]}</option>
                <option value="football">{t.sports.football[language]}</option>
                <option value="basketball">{t.sports.basketball[language]}</option>
                <option value="tennis">{t.sports.tennis[language]}</option>
                <option value="mma">{t.sports.mma[language]}</option>
                <option value="volleyball">{t.sports.volleyball[language]}</option>
                <option value="boxing">{t.sports.boxing[language]}</option>
                <option value="esports">{t.sports.esports[language]}</option>
              </select>
            </div>

            {/* By League */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                {t.search.byLeague[language]}
              </label>
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                aria-label={t.search.byLeague[language]}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="all">{t.common.all[language]}</option>
                {leagues.filter(l => l !== 'all').map(lg => (
                  <option key={lg} value={lg}>{lg}</option>
                ))}
              </select>
            </div>

            {/* By Live Status */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                {t.search.byStatus[language]}
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                aria-label={t.search.byStatus[language]}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="all">{t.common.all[language]}</option>
                <option value="live">{t.common.live[language]}</option>
                <option value="upcoming">{t.common.upcoming[language]}</option>
              </select>
            </div>

            {/* By Date */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                {t.search.byDate[language]}
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                aria-label={t.search.byDate[language]}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="all">{t.common.all[language]}</option>
                <option value="today">{t.common.today[language]}</option>
                <option value="tomorrow">{t.common.tomorrow[language]}</option>
                <option value="weekend">{t.common.weekend[language]}</option>
              </select>
            </div>

            {/* By Country */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                {t.search.byCountry[language]}
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                aria-label={t.search.byCountry[language]}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="all">{t.common.all[language]}</option>
                {countries.filter(c => c !== 'all').map(cnt => (
                  <option key={cnt} value={cnt}>{cnt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-slate-300">
            <span className="text-emerald-400 font-mono text-sm">{filteredMatches.length}</span> {t.search.matchesFound[language]}
          </span>
        </div>

        {/* Filtered Matches Grid (Adaptive 2-to-3 Column Responsive Grid for iPad & Tablet) */}
        {filteredMatches.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
            <p className="text-slate-400 text-sm font-medium">{t.common.noResults[language]}</p>
            <button
              onClick={resetAllFilters}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              {t.common.clearFilters[language]}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((m) => {
              const isSelected = m.id === activeMatchId;
              return (
                <div
                  key={m.id}
                  className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-xl ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Header: Sport & Status */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-bold text-slate-400 uppercase tracking-wider">
                        {m.sport} · {m.country}
                      </span>
                      {m.status === 'live' ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-black text-[10px] uppercase flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                          LIVE {m.periodText}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">
                          {m.dateLabel}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white mb-4 line-clamp-1">
                      {m.league}
                    </h4>

                    {/* Teams & Scores */}
                    <div className="space-y-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{m.homeTeam.flag}</span>
                          <span className="text-xs font-bold text-white">{m.homeTeam.name}</span>
                        </div>
                        <span className="font-mono font-black text-sm text-white tabular-nums">
                          {m.homeScore}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-800/60 pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{m.awayTeam.flag}</span>
                          <span className="text-xs font-bold text-white">{m.awayTeam.name}</span>
                        </div>
                        <span className="font-mono font-black text-sm text-white tabular-nums">
                          {m.awayScore}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Venue & Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                    <span className="text-slate-400 truncate max-w-[150px]">{m.venue}</span>
                    <button
                      onClick={() => {
                        setActiveMatchId(m.id);
                        const el = document.getElementById('live-arena');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold transition-all min-h-[36px]"
                    >
                      {isSelected ? "Ko'rilmoqda ✓" : "Maydonda ko'rish →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
