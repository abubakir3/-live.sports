import React, { useState } from 'react';
import { MatchItem, SportType, Language } from '../types';
import { translations } from '../data/translations';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Radio, 
  Activity, 
  ShieldAlert, 
  Flame,
  PlusCircle,
  Clock
} from 'lucide-react';

interface LiveArenaProps {
  matches: MatchItem[];
  activeMatchId: string;
  setActiveMatchId: (id: string) => void;
  selectedSport: SportType;
  setSelectedSport: (sport: SportType) => void;
  language: Language;
  speakText: (text: string, lang?: Language) => void;
  onSimulateScore: (matchId: string) => void;
}

export const LiveArena: React.FC<LiveArenaProps> = ({
  matches,
  activeMatchId,
  setActiveMatchId,
  selectedSport,
  setSelectedSport,
  language,
  speakText,
  onSimulateScore
}) => {
  const t = translations;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Find currently active match
  const currentMatch = matches.find(m => m.id === activeMatchId) || matches[0];

  const sportsList: { type: SportType; label: string; icon: string }[] = [
    { type: 'all', label: t.sports.all[language], icon: 'fa-solid fa-layer-group' },
    { type: 'football', label: t.sports.football[language], icon: 'fa-solid fa-futbol' },
    { type: 'basketball', label: t.sports.basketball[language], icon: 'fa-solid fa-basketball' },
    { type: 'tennis', label: t.sports.tennis[language], icon: 'fa-solid fa-baseball' },
    { type: 'mma', label: t.sports.mma[language], icon: 'fa-solid fa-hand-fist' },
    { type: 'volleyball', label: t.sports.volleyball[language], icon: 'fa-solid fa-volleyball' },
    { type: 'boxing', label: t.sports.boxing[language], icon: 'fa-solid fa-mitten' },
    { type: 'esports', label: t.sports.esports[language], icon: 'fa-solid fa-gamepad' }
  ];

  // Filter matches for the selector
  const availableMatches = matches.filter(m => selectedSport === 'all' || m.sport === selectedSport);

  const handleAudioCommentary = () => {
    let text = "";
    if (language === 'uz') {
      text = currentMatch.audioDescriptionUz;
    } else if (language === 'ru') {
      text = currentMatch.audioDescriptionRu;
    } else {
      text = currentMatch.audioDescriptionEn;
    }
    speakText(text, language);
  };

  return (
    <section id="live-arena" className="py-12 md:py-16 scroll-mt-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                {t.arena.badge[language]}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentMatch.league}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {t.arena.title[language]}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {t.arena.subtitle[language]}
            </p>
          </div>

          {/* Quick Audio Commentary Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleAudioCommentary}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.audio.liveCommentary[language]}</span>
            </button>
          </div>
        </div>

        {/* Sports Selector Tabs (Touch-friendly horizontal scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
          {sportsList.map((sport) => {
            const isActive = selectedSport === sport.type;
            return (
              <button
                key={sport.type}
                onClick={() => {
                  setSelectedSport(sport.type);
                  // If current match doesn't match new sport filter, switch to first matching
                  const firstMatch = matches.find(m => sport.type === 'all' || m.sport === sport.type);
                  if (firstMatch) setActiveMatchId(firstMatch.id);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <i className={`${sport.icon} text-sm`}></i>
                <span>{sport.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Grid: Interactive Player & Real-time Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Video & Live Scoreboard Arena (8 Cols on Desktop) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Live Player Container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
              {/* Background Broadcast Image */}
              <img
                src={currentMatch.previewImage}
                alt={`${currentMatch.homeTeam.name} vs ${currentMatch.awayTeam.name}`}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100 filter brightness-75'}`}
                referrerPolicy="no-referrer"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70 pointer-events-none" />

              {/* Top Bar of the Video Player: Live Indicator, Resolution & Fullscreen */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-black text-[11px] tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    {t.common.live[language]}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 text-xs font-mono">
                    {currentMatch.periodText}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-900/80 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                    {t.arena.quality[language]}
                  </span>
                  <button 
                    onClick={() => setIsVideoMuted(!isVideoMuted)}
                    className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                  >
                    {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => alert("Simulation Fullscreen mode activated.")}
                    className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Centered Big Scoreboard Lockup */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between max-w-xl mx-auto z-10 px-4 py-6 rounded-2xl bg-slate-950/60 backdrop-blur-md border border-slate-800/80 shadow-2xl">
                
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-lg mb-2">
                    {currentMatch.homeTeam.flag}
                  </div>
                  <span className="font-extrabold text-sm sm:text-base text-white line-clamp-1">
                    {currentMatch.homeTeam.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold uppercase">
                    {currentMatch.homeTeam.shortName}
                  </span>
                </div>

                {/* Score & Pulse */}
                <div className="flex flex-col items-center px-4">
                  <div className="flex items-center gap-3 text-3xl sm:text-5xl font-black tracking-tight text-white font-mono tabular-nums">
                    <span>{currentMatch.homeScore}</span>
                    <span className="text-emerald-400 text-2xl sm:text-3xl">:</span>
                    <span>{currentMatch.awayScore}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <Clock className="w-3 h-3 animate-spin" />
                    <span>{currentMatch.periodText}</span>
                  </div>
                </div>

                {/* Away Team */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-lg mb-2">
                    {currentMatch.awayTeam.flag}
                  </div>
                  <span className="font-extrabold text-sm sm:text-base text-white line-clamp-1">
                    {currentMatch.awayTeam.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold uppercase">
                    {currentMatch.awayTeam.shortName}
                  </span>
                </div>
              </div>

              {/* Bottom Interactive Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                    {currentMatch.venue}
                  </span>
                </div>

                {/* Test Action: Simulate Goal / Point Button */}
                <button
                  onClick={() => onSimulateScore(currentMatch.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all active:scale-95"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{t.arena.simulateGoal[language]}</span>
                </button>
              </div>
            </div>

            {/* Quick Switch Match Carousel Cards */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {availableMatches.map((m) => {
                const isSelected = m.id === activeMatchId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveMatchId(m.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left shrink-0 transition-all min-w-[220px] ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500 ring-1 ring-emerald-500/50'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg">{m.homeTeam.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {m.homeTeam.shortName} vs {m.awayTeam.shortName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {m.homeScore} - {m.awayScore} · {m.status === 'live' ? 'LIVE' : m.dateLabel}
                      </div>
                    </div>
                    {m.status === 'live' && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Match Statistics & Timeline (4 Cols on Desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Real-time Match Stats Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Statistika / Analytics
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {currentMatch.league}
                </span>
              </div>

              {/* Stats Bars */}
              <div className="space-y-4">
                
                {/* Possession */}
                {currentMatch.stats.homePossession !== undefined && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-emerald-400 font-mono">{currentMatch.stats.homePossession}%</span>
                      <span className="text-slate-400 text-[11px]">{t.arena.possession[language]}</span>
                      <span className="text-cyan-400 font-mono">{currentMatch.stats.awayPossession}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 flex overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-500" 
                        style={{ width: `${currentMatch.stats.homePossession}%` }}
                      />
                      <div 
                        className="bg-cyan-500 h-full transition-all duration-500" 
                        style={{ width: `${currentMatch.stats.awayPossession}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Shots on Target */}
                {currentMatch.stats.homeShots !== undefined && currentMatch.stats.awayShots !== undefined && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-white font-mono">{currentMatch.stats.homeShots}</span>
                      <span className="text-slate-400 text-[11px]">{t.arena.shotsOnTarget[language]}</span>
                      <span className="text-white font-mono">{currentMatch.stats.awayShots}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-800 flex overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all" 
                        style={{ width: `${(currentMatch.stats.homeShots / Math.max(1, currentMatch.stats.homeShots + currentMatch.stats.awayShots)) * 100}%` }}
                      />
                      <div 
                        className="bg-cyan-500 h-full transition-all" 
                        style={{ width: `${(currentMatch.stats.awayShots / Math.max(1, currentMatch.stats.homeShots + currentMatch.stats.awayShots)) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Fouls */}
                {currentMatch.stats.homeFouls !== undefined && (
                  <div className="flex items-center justify-between text-xs py-1 border-t border-slate-800/60 font-semibold">
                    <span className="font-mono text-slate-200">{currentMatch.stats.homeFouls}</span>
                    <span className="text-slate-400 text-[11px]">{t.arena.fouls[language]}</span>
                    <span className="font-mono text-slate-200">{currentMatch.stats.awayFouls}</span>
                  </div>
                )}

                {/* Corners */}
                {currentMatch.stats.homeCorners !== undefined && (
                  <div className="flex items-center justify-between text-xs py-1 border-t border-slate-800/60 font-semibold">
                    <span className="font-mono text-slate-200">{currentMatch.stats.homeCorners}</span>
                    <span className="text-slate-400 text-[11px]">{t.arena.corners[language]}</span>
                    <span className="font-mono text-slate-200">{currentMatch.stats.awayCorners}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Live Events Timeline Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  {t.arena.timelineTitle[language]}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">
                  {currentMatch.events.length} Voqealar
                </span>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
                {currentMatch.events.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">
                    Uchrashuv voqealari boshlanishi kutilmoqda.
                  </p>
                ) : (
                  currentMatch.events.map((ev) => (
                    <div key={ev.id} className="flex items-start gap-3 text-xs bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                      <span className="font-mono font-bold text-emerald-400 shrink-0 text-xs mt-0.5">
                        {ev.minute}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 font-bold text-white">
                          <span>{ev.player}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({ev.team === 'home' ? currentMatch.homeTeam.shortName : currentMatch.awayTeam.shortName})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5">
                          {ev.description}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
