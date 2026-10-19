import React, { useState } from 'react';
import { Athlete, Language } from '../types';
import { translations } from '../data/translations';
import { UserCheck, Award, Calculator, Volume2, Sparkles, TrendingUp, Zap } from 'lucide-react';

interface AthleteCenterProps {
  athletes: Athlete[];
  language: Language;
  speakText: (text: string, lang?: Language) => void;
}

export const AthleteCenter: React.FC<AthleteCenterProps> = ({
  athletes,
  language,
  speakText
}) => {
  const t = translations;

  // Selected athlete for spotlight / calculator
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(athletes[0].id);

  // Calculator Form State
  const [calcInputs, setCalcInputs] = useState({
    athleteName: athletes[0].name,
    points: athletes[0].currentMatch.points,
    assists: athletes[0].currentMatch.assists,
    minutes: athletes[0].currentMatch.minutes,
    passes: athletes[0].currentMatch.passes,
    errors: athletes[0].currentMatch.errors
  });

  // Calculate Player Impact Rating (1 to 10 scale) & Efficiency %
  const calculateMetrics = () => {
    const { points, assists, minutes, passes, errors } = calcInputs;
    const safeMinutes = Math.max(1, minutes);

    // Weighted Formula for Sports Impact
    const rawRating = ((points * 2.2) + (assists * 1.6) + (passes * 0.08) - (errors * 1.4)) / (safeMinutes / 10) + 4.5;
    const impactRating = Math.min(10.0, Math.max(1.0, parseFloat(rawRating.toFixed(1))));

    // Efficiency % calculation
    const totalPositive = (points * 3) + (assists * 2) + passes;
    const totalNegative = (errors * 2.5) + (safeMinutes * 0.2);
    const efficiency = Math.min(99.4, Math.max(25.0, parseFloat(((totalPositive / (totalPositive + totalNegative + 1)) * 100).toFixed(1))));

    let tierLabel = t.athlete.tierAverage[language];
    let tierColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';

    if (impactRating >= 9.0) {
      tierLabel = t.athlete.tierElite[language];
      tierColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    } else if (impactRating >= 7.5) {
      tierLabel = t.athlete.tierGreat[language];
      tierColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
    } else if (impactRating < 5.0) {
      tierLabel = t.athlete.tierLow[language];
      tierColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }

    return { impactRating, efficiency, tierLabel, tierColor };
  };

  const { impactRating, efficiency, tierLabel, tierColor } = calculateMetrics();

  const handleLoadAthleteToCalc = (athlete: Athlete) => {
    setSelectedAthleteId(athlete.id);
    setCalcInputs({
      athleteName: athlete.name,
      points: athlete.currentMatch.points,
      assists: athlete.currentMatch.assists,
      minutes: athlete.currentMatch.minutes,
      passes: athlete.currentMatch.passes,
      errors: athlete.currentMatch.errors
    });
  };

  const handleSpeakAnalysis = () => {
    let msg = "";
    if (language === 'uz') {
      msg = `${calcInputs.athleteName} ko'rsatkichlari: O'yinchi ta'sir reytingi ${impactRating} ball. Samaradorlik indeksi ${efficiency} foiz. Baholash darajasi: ${tierLabel}.`;
    } else if (language === 'ru') {
      msg = `Анализ эффективности спортсмена ${calcInputs.athleteName}: Рейтинг влияния ${impactRating} из 10. Индекс полезности ${efficiency} процентов. Статус: ${tierLabel}.`;
    } else {
      msg = `Performance analysis for ${calcInputs.athleteName}: Player Impact Rating is ${impactRating} out of 10. Efficiency index is ${efficiency} percent. Classification: ${tierLabel}.`;
    }
    speakText(msg, language);
  };

  return (
    <section id="athlete-center" className="py-12 md:py-16 scroll-mt-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              {t.athlete.badge[language]}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {t.athlete.title[language]}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {t.athlete.subtitle[language]}
          </p>
        </div>

        {/* Featured Athlete Cards (Horizontal Carousel / Grid for Tablet & Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {athletes.map((athlete) => {
            const isSelected = athlete.id === selectedAthleteId;
            return (
              <div
                key={athlete.id}
                onClick={() => handleLoadAthleteToCalc(athlete)}
                className={`rounded-2xl border p-5 cursor-pointer transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500 shadow-2xl ring-1 ring-emerald-500/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  {/* Photo & Badge */}
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800">
                    <img
                      src={athlete.avatar}
                      alt={athlete.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase border border-slate-700">
                      #{athlete.number} · {athlete.sport}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {athlete.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mb-3">
                    {athlete.team}
                  </p>

                  {/* Current Match Live Metrics */}
                  <div className="grid grid-cols-3 gap-1.5 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 mb-3 text-center">
                    <div>
                      <span className="block text-xs font-mono font-bold text-white">
                        {athlete.currentMatch.points}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Ochko/Gol</span>
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-emerald-400">
                        {athlete.currentMatch.assists}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Assist</span>
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-cyan-400">
                        {athlete.currentMatch.rating}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Reyting</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {isSelected ? "Kalkulyatorda faol ✓" : "Kalkulyatorga yuklash"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Athlete Performance Calculator Container */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-extrabold text-white">
                  {t.athlete.badge[language]}: PIR Formula
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                O'yinchi ko'rsatkichlarini o'zgartirib, real vaqtda ta'sir koeffitsientini hisoblang.
              </p>
            </div>

            <button
              onClick={handleSpeakAnalysis}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all shrink-0 active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.athlete.listenAnalysis[language]}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Sliders & Number Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Athlete Name input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Sportchi Ismi / Athlete
                </label>
                <input
                  type="text"
                  value={calcInputs.athleteName}
                  onChange={(e) => setCalcInputs({ ...calcInputs, athleteName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Grid of 4 numeric sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Goals / Points */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-300">{t.athlete.goalsPoints[language]}</span>
                    <span className="font-mono text-emerald-400 text-sm">{calcInputs.points}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={calcInputs.points}
                    onChange={(e) => setCalcInputs({ ...calcInputs, points: parseInt(e.target.value) || 0 })}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Assists */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-300">{t.athlete.assists[language]}</span>
                    <span className="font-mono text-cyan-400 text-sm">{calcInputs.assists}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={calcInputs.assists}
                    onChange={(e) => setCalcInputs({ ...calcInputs, assists: parseInt(e.target.value) || 0 })}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                {/* Minutes Played */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-300">{t.athlete.minutesPlayed[language]}</span>
                    <span className="font-mono text-amber-400 text-sm">{calcInputs.minutes}'</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="120"
                    value={calcInputs.minutes}
                    onChange={(e) => setCalcInputs({ ...calcInputs, minutes: parseInt(e.target.value) || 1 })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Passes Completed */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-300">{t.athlete.passesRebounds[language]}</span>
                    <span className="font-mono text-purple-400 text-sm">{calcInputs.passes}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={calcInputs.passes}
                    onChange={(e) => setCalcInputs({ ...calcInputs, passes: parseInt(e.target.value) || 0 })}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                {/* Errors / Turnovers */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 sm:col-span-2">
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-slate-300">{t.athlete.errorsTurnovers[language]}</span>
                    <span className="font-mono text-rose-400 text-sm">{calcInputs.errors}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={calcInputs.errors}
                    onChange={(e) => setCalcInputs({ ...calcInputs, errors: parseInt(e.target.value) || 0 })}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Output Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {t.athlete.pirScore[language]}
              </span>

              {/* Big Score Gauge */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-900/60 shadow-inner">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white tabular-nums">
                    {impactRating}
                  </span>
                </div>
                <div className="absolute -bottom-2 px-3 py-1 rounded-full text-[11px] font-black uppercase border shadow-lg">
                  <span className={tierColor}>{tierLabel}</span>
                </div>
              </div>

              {/* Efficiency Bar */}
              <div className="w-full mt-6 space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">{t.athlete.efficiency[language]}</span>
                  <span className="font-mono text-emerald-400 tabular-nums">{efficiency}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                    style={{ width: `${efficiency}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80 w-full flex items-center justify-between text-[11px] text-slate-400">
                <span>Model: Formula v2.4</span>
                <span className="text-emerald-400 font-bold">Aniq tahlil ✓</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
