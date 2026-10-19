import React, { useState } from 'react';
import { Language, MatchItem } from '../types';
import { translations } from '../data/translations';
import { PieChart, Ticket, CheckCircle, AlertCircle, Send, Sparkles, X } from 'lucide-react';

interface FanZoneProps {
  matches: MatchItem[];
  language: Language;
}

export const FanZone: React.FC<FanZoneProps> = ({ matches, language }) => {
  const t = translations;

  // Poll state
  const [pollVotes, setPollVotes] = useState({
    teamA: 3420,
    draw: 980,
    teamB: 2950
  });
  const [userVoted, setUserVoted] = useState<string | null>(null);

  const totalVotes = pollVotes.teamA + pollVotes.draw + pollVotes.teamB;
  const pctA = Math.round((pollVotes.teamA / totalVotes) * 100);
  const pctDraw = Math.round((pollVotes.draw / totalVotes) * 100);
  const pctB = 100 - pctA - pctDraw;

  const handleVote = (choice: 'teamA' | 'draw' | 'teamB') => {
    if (userVoted === choice) return;
    setPollVotes(prev => ({
      ...prev,
      [choice]: prev[choice] + 1
    }));
    setUserVoted(choice);
  };

  // Ticket Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    matchId: matches[0]?.id || '',
    category: 'standard',
    ticketsCount: 2,
    notes: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = t.fanZone.errorRequired[language];
    } else if (formData.fullName.trim().length < 3) {
      errors.fullName = "Ismingiz kamida 3 belgidan iborat bo'lishi kerak.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = t.fanZone.errorRequired[language];
    } else if (!emailRegex.test(formData.email)) {
      errors.email = t.fanZone.errorEmail[language];
    }

    if (!formData.ticketsCount || formData.ticketsCount < 1) {
      errors.ticketsCount = t.fanZone.errorTickets[language];
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const generatedCode = 'SP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setBookingRef(generatedCode);
      setIsSuccessModalOpen(true);
    }
  };

  const selectedMatch = matches.find(m => m.id === formData.matchId) || matches[0];

  return (
    <section id="fan-zone" className="py-12 md:py-16 scroll-mt-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t.fanZone.badge[language]}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {t.nav.fanZone[language]} & {t.nav.ticketInquiry[language]}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Muxlislar ovoz berish markazi va rasmiy uchrashuv chiptalariga buyurtma berish portali.
          </p>
        </div>

        {/* 2-Column Split: Prediction Poll + Ticket Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Match Winner Prediction Poll (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <PieChart className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Jonli So'rovnoma / Live Fan Poll
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              {t.fanZone.pollTitle[language]}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {t.fanZone.pollSubtitle[language]}
            </p>

            {/* Rivals Banner */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6 flex items-center justify-between text-center">
              <div className="flex-1">
                <div className="text-2xl mb-1">🇪🇸</div>
                <div className="text-xs font-black text-white">Real Madrid</div>
              </div>
              <div className="px-2 font-mono font-bold text-slate-500 text-xs">VS</div>
              <div className="flex-1">
                <div className="text-2xl mb-1">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
                <div className="text-xs font-black text-white">Manchester City</div>
              </div>
            </div>

            {/* Voting Buttons */}
            <div className="space-y-3 mb-6">
              {/* Option A */}
              <button
                onClick={() => handleVote('teamA')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all min-h-[48px] ${
                  userVoted === 'teamA'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 ring-1 ring-emerald-500'
                    : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <span className="text-xs font-bold">1. Real Madrid g'alabasi</span>
                <span className="font-mono font-bold text-xs">{pctA}% ({pollVotes.teamA})</span>
              </button>

              {/* Option Draw */}
              <button
                onClick={() => handleVote('draw')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all min-h-[48px] ${
                  userVoted === 'draw'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 ring-1 ring-emerald-500'
                    : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <span className="text-xs font-bold">X. Durang natija</span>
                <span className="font-mono font-bold text-xs">{pctDraw}% ({pollVotes.draw})</span>
              </button>

              {/* Option B */}
              <button
                onClick={() => handleVote('teamB')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all min-h-[48px] ${
                  userVoted === 'teamB'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 ring-1 ring-emerald-500'
                    : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <span className="text-xs font-bold">2. Man City g'alabasi</span>
                <span className="font-mono font-bold text-xs">{pctB}% ({pollVotes.teamB})</span>
              </button>
            </div>

            {/* Animated Percentage Breakdown Visual Bar */}
            <div className="space-y-2">
              <div className="h-3 rounded-full bg-slate-950 flex overflow-hidden border border-slate-800">
                <div style={{ width: `${pctA}%` }} className="bg-emerald-500 transition-all duration-500" />
                <div style={{ width: `${pctDraw}%` }} className="bg-amber-400 transition-all duration-500" />
                <div style={{ width: `${pctB}%` }} className="bg-cyan-500 transition-all duration-500" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{t.fanZone.totalVotes[language]} <strong className="text-white font-mono">{totalVotes.toLocaleString()}</strong></span>
                {userVoted && <span className="text-emerald-400 font-bold">{t.fanZone.votedThankYou[language]}</span>}
              </div>
            </div>
          </div>

          {/* Column 2: Ticket Inquiry & Feedback Form (7 Cols) */}
          <div id="ticket-inquiry" className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl scroll-mt-24">
            <div className="flex items-center gap-2 mb-2">
              <Ticket className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Rasmiy Chiptalar / Official Tickets
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              {t.fanZone.ticketTitle[language]}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {t.fanZone.ticketSubtitle[language]}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    {t.fanZone.fullName[language]} *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t.fanZone.fullNamePlaceholder[language]}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      formErrors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    {t.fanZone.email[language]} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.fanZone.emailPlaceholder[language]}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      formErrors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Match Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  {t.fanZone.selectMatch[language]}
                </label>
                <select
                  value={formData.matchId}
                  onChange={(e) => setFormData({ ...formData, matchId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {matches.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.homeTeam.name} vs {m.awayTeam.name} ({m.league} · {m.dateLabel})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Ticket Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    {t.fanZone.ticketCategory[language]}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="standard">{t.fanZone.categoryStandard[language]}</option>
                    <option value="vip">{t.fanZone.categoryVIP[language]}</option>
                    <option value="fanzone">{t.fanZone.categoryFanZone[language]}</option>
                    <option value="press">{t.fanZone.categoryPress[language]}</option>
                  </select>
                </div>

                {/* Number of Tickets */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    {t.fanZone.ticketCount[language]}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.ticketsCount}
                    onChange={(e) => setFormData({ ...formData, ticketsCount: parseInt(e.target.value) || 1 })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-xs text-white focus:outline-none ${
                      formErrors.ticketsCount ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {formErrors.ticketsCount && (
                    <p className="text-[11px] text-rose-400 mt-1">{formErrors.ticketsCount}</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  {t.fanZone.notes[language]}
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t.fanZone.notesPlaceholder[language]}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Send className="w-4 h-4" />
                <span>{t.fanZone.submitTicket[language]}</span>
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Success Modal Popup */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSuccessModalOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-center z-10 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-black text-white mb-2">
              {t.fanZone.modalSuccessTitle[language]}
            </h4>

            <p className="text-xs text-slate-300 mb-6">
              {t.fanZone.modalSuccessText[language]}
            </p>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left space-y-2 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Buyurtma Kodi:</span>
                <span className="font-mono font-bold text-emerald-400">{bookingRef}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Mijoz:</span>
                <span className="font-bold text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">O'yin:</span>
                <span className="font-bold text-white truncate max-w-[200px]">{selectedMatch.homeTeam.shortName} vs {selectedMatch.awayTeam.shortName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Chiptalar soni:</span>
                <span className="font-bold text-cyan-400">{formData.ticketsCount} ta ({formData.category.toUpperCase()})</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSuccessModalOpen(false);
                setFormData({
                  fullName: '',
                  email: '',
                  matchId: matches[0]?.id || '',
                  category: 'standard',
                  ticketsCount: 2,
                  notes: ''
                });
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all min-h-[44px]"
            >
              {t.fanZone.closeModal[language]}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
