import React, { useState, useEffect } from 'react';
import { MatchItem, Language } from '../types';
import { translations } from '../data/translations';
import { Clock, Bell, Check, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface LiveScoresAndCountdownProps {
  matches: MatchItem[];
  activeMatchId: string;
  setActiveMatchId: (id: string) => void;
  language: Language;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const LiveScoresAndCountdown: React.FC<LiveScoresAndCountdownProps> = ({
  matches,
  activeMatchId,
  setActiveMatchId,
  language
}) => {
  const t = translations;
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Time remaining calculator for upcoming matches
  const [countdowns, setCountdowns] = useState<Record<string, TimeRemaining>>({});

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const updated: Record<string, TimeRemaining> = {};

      matches.forEach((m) => {
        const target = new Date(m.scheduledTime).getTime();
        const diff = Math.max(0, target - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        updated[m.id] = { days, hours, minutes, seconds };
      });

      setCountdowns(updated);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [matches]);

  const handleToggleReminder = (match: MatchItem) => {
    setReminders((prev) => {
      const next = !prev[match.id];
      const msg = next 
        ? `${match.homeTeam.name} vs ${match.awayTeam.name}: ${t.common.reminderSet[language]}`
        : "Eslatma bekor qilindi / Reminder removed";
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3000);
      return { ...prev, [match.id]: next };
    });
  };

  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const liveMatches = matches.filter(m => m.status === 'live');

  return (
    <section id="matches-countdown" className="py-12 md:py-16 scroll-mt-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/30 animate-bounce">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {t.countdown.badge[language]}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {t.countdown.title[language]}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {t.countdown.subtitle[language]}
          </p>
        </div>

        {/* Live Score Horizontal Timeline Widget */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Jonli Hisoblar Lentasi / Live Scores
            </span>
            <span className="text-xs text-slate-400">
              {liveMatches.length} Faol o'yinlar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {liveMatches.map((m) => {
              const isActive = m.id === activeMatchId;
              return (
                <div
                  key={m.id}
                  onClick={() => setActiveMatchId(m.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/40 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-2">
                    <span className="truncate max-w-[120px]">{m.league}</span>
                    <span className="text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      {m.periodText}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-lg">{m.homeTeam.flag}</span>
                      <span className="text-xs font-bold text-white truncate">{m.homeTeam.shortName}</span>
                    </div>
                    <span className="font-mono font-black text-base text-white px-2 tabular-nums">
                      {m.homeScore}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-t border-slate-800/60">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-lg">{m.awayTeam.flag}</span>
                      <span className="text-xs font-bold text-white truncate">{m.awayTeam.shortName}</span>
                    </div>
                    <span className="font-mono font-black text-base text-white px-2 tabular-nums">
                      {m.awayScore}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate">{m.venue}</span>
                    <span className="text-emerald-400 font-bold hover:underline">
                      Arena →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Countdown Cards for Upcoming Super Matches */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Kutilayotgan O'yinlar Taymerlari (Dynamic Countdown)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((m) => {
              const cd = countdowns[m.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
              const isReminded = reminders[m.id];

              return (
                <div
                  key={m.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-xl overflow-hidden flex flex-col justify-between transition-all group"
                >
                  {/* Card Header & League */}
                  <div className="p-5 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                        {m.sport.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {m.dateLabel}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-300 truncate mb-4">
                      {m.league}
                    </p>

                    {/* Rivals Display */}
                    <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                      <div className="flex-1 text-center">
                        <div className="text-2xl mb-1">{m.homeTeam.flag}</div>
                        <div className="text-xs font-extrabold text-white line-clamp-1">{m.homeTeam.name}</div>
                      </div>

                      <div className="px-3 text-xs font-black text-slate-400 uppercase">
                        VS
                      </div>

                      <div className="flex-1 text-center">
                        <div className="text-2xl mb-1">{m.awayTeam.flag}</div>
                        <div className="text-xs font-extrabold text-white line-clamp-1">{m.awayTeam.name}</div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Countdown Section (Days, Hours, Minutes, Seconds) */}
                  <div className="px-5 py-4 bg-slate-950/40 border-y border-slate-800">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {t.countdown.startsIn[language]}
                    </span>

                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="block text-lg font-black text-emerald-400 font-mono tabular-nums">
                          {String(cd.days).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                          {t.common.days[language]}
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="block text-lg font-black text-white font-mono tabular-nums">
                          {String(cd.hours).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                          {t.common.hours[language]}
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="block text-lg font-black text-white font-mono tabular-nums">
                          {String(cd.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                          {t.common.mins[language]}
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="block text-lg font-black text-cyan-400 font-mono tabular-nums">
                          {String(cd.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                          {t.common.secs[language]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Remind Me & View Details */}
                  <div className="p-4 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleReminder(m)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                        isReminded
                          ? 'bg-emerald-500 text-slate-950 shadow-md'
                          : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {isReminded ? <Check className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                      <span>{isReminded ? t.common.reminderSet[language] : t.common.remindMe[language]}</span>
                    </button>

                    <a
                      href="#ticket-inquiry"
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors min-h-[44px] flex items-center justify-center"
                    >
                      {t.nav.ticketInquiry[language]}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
