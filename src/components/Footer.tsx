import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Radio, Heart, Shield, Volume2 } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations;

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white">
                Sport<span className="text-emerald-400">Pulse</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footer.description[language]}
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
              <Volume2 className="w-3.5 h-3.5" />
              <span>{t.footer.accessibility[language]}</span>
            </div>
          </div>

          {/* Quick Nav (1 col) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {t.footer.quickLinks[language]}
            </h4>
            <ul className="space-y-2">
              <li><a href="#live-arena" className="hover:text-emerald-400 transition-colors">{t.nav.liveArena[language]}</a></li>
              <li><a href="#matches-countdown" className="hover:text-emerald-400 transition-colors">{t.nav.matchesCountdown[language]}</a></li>
              <li><a href="#search-filter" className="hover:text-emerald-400 transition-colors">{t.nav.searchFilter[language]}</a></li>
              <li><a href="#athlete-center" className="hover:text-emerald-400 transition-colors">{t.nav.athleteCenter[language]}</a></li>
            </ul>
          </div>

          {/* Modules (1 col) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Modullar / Modules
            </h4>
            <ul className="space-y-2">
              <li><a href="#standings" className="hover:text-emerald-400 transition-colors">{t.nav.standings[language]}</a></li>
              <li><a href="#fan-zone" className="hover:text-emerald-400 transition-colors">{t.nav.fanZone[language]}</a></li>
              <li><a href="#ticket-inquiry" className="hover:text-emerald-400 transition-colors">{t.nav.ticketInquiry[language]}</a></li>
              <li><a href="#news-hub" className="hover:text-emerald-400 transition-colors">{t.nav.newsHub[language]}</a></li>
            </ul>
          </div>

          {/* Supported Sports (1 col) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {t.footer.supportedSports[language]}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['Futbol', 'Basketbol', 'Tennis', 'MMA', 'Voleybol', 'Boks', 'E-Sports'].map((sp) => (
                <span key={sp} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-semibold">
                  {sp}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} SportPulse / SportOolami Platform. {t.footer.rights[language]}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400">{t.footer.privacy[language]}</a>
            <a href="#" className="hover:text-slate-400">{t.footer.terms[language]}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
