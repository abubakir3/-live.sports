import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Radio, 
  Sparkles,
  ChevronDown,
  Activity
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isSpeaking: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  speakText: (text: string, lang?: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  isSpeaking,
  isMuted,
  toggleMute,
  speakText
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations;

  const navLinks = [
    { href: '#live-arena', label: t.nav.liveArena[language], icon: 'fa-solid fa-play' },
    { href: '#matches-countdown', label: t.nav.matchesCountdown[language], icon: 'fa-regular fa-clock' },
    { href: '#search-filter', label: t.nav.searchFilter[language], icon: 'fa-solid fa-magnifying-glass' },
    { href: '#athlete-center', label: t.nav.athleteCenter[language], icon: 'fa-solid fa-user-ninja' },
    { href: '#standings', label: t.nav.standings[language], icon: 'fa-solid fa-table-list' },
    { href: '#fan-zone', label: t.nav.fanZone[language], icon: 'fa-solid fa-chart-pie' },
    { href: '#news-hub', label: t.nav.newsHub[language], icon: 'fa-solid fa-newspaper' },
    { href: '#ticket-inquiry', label: t.nav.ticketInquiry[language], icon: 'fa-solid fa-ticket' }
  ];

  const handleVoiceWelcome = () => {
    let msg = "";
    if (language === 'uz') {
      msg = "SportPulse jonli platformasiga xush kelibsiz! Bugungi barcha markaziy o'yinlar hisobini ovozli tarzda tinglashingiz mumkin.";
    } else if (language === 'ru') {
      msg = "Добро пожаловать на платформу SportPulse! Вы можете прослушивать результаты матчей и новости в режиме онлайн.";
    } else {
      msg = "Welcome to SportPulse live platform! You can listen to live match scores, stats, and breaking commentary.";
    }
    speakText(msg, language);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 bg-slate-950/90 border-slate-800/80 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Brand Zone */}
          <a href="#" className="flex items-center gap-3 group shrink-0 focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Radio className="w-5 h-5 text-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-black tracking-tight text-white">
                  Sport<span className="text-emerald-400">Pulse</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide hidden lg:block -mt-0.5 font-medium">
                SportOolami Platform
              </p>
            </div>
          </a>

          {/* Desktop & Large Tablet Nav Links (Desktop Navigation) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 6).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-xs font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions Zone: Audio Voice Button, Lang Switcher, Theme Toggle, Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Audio Voice Assistant Trigger */}
            <button
              onClick={handleVoiceWelcome}
              title={t.audio.voiceAssistant[language]}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isSpeaking 
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/30' 
                  : 'bg-slate-900 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              {isSpeaking ? (
                <>
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-3 bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-0.5 h-3 bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-0.5 h-3 bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="hidden sm:inline">{t.audio.listening[language]}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="hidden md:inline">{t.audio.voiceAssistant[language]}</span>
                </>
              )}
            </button>

            {/* Audio Mute/Unmute toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? t.audio.unmute[language] : t.audio.mute[language]}
              className={`p-2.5 rounded-xl border transition-colors ${
                isMuted 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                  : 'bg-slate-900 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 text-xs font-bold hover:border-slate-600 transition-colors"
              >
                <span>
                  {language === 'uz' && '🇺🇿 UZ'}
                  {language === 'ru' && '🇷🇺 RU'}
                  {language === 'en' && '🇬🇧 EN'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1 z-50 overflow-hidden"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <button
                    onClick={() => { setLanguage('uz'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                      language === 'uz' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>🇺🇿 O'zbekcha</span>
                    {language === 'uz' && <span className="text-emerald-400 text-xs">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('ru'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                      language === 'ru' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>🇷🇺 Русский</span>
                    {language === 'ru' && <span className="text-emerald-400 text-xs">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                      language === 'en' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>🇬🇧 English</span>
                    {language === 'en' && <span className="text-emerald-400 text-xs">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Mobile & Tablet Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tablet & Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                    <Radio className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-bold text-white">SportPulse</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="space-y-1">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-colors min-h-[44px]"
                  >
                    <i className={`${item.icon} w-5 text-slate-400`}></i>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-slate-800 mt-6 space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs text-slate-400 font-medium">Til / Язык:</span>
                <div className="flex gap-1">
                  {(['uz', 'ru', 'en'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-bold uppercase ${
                        language === lang ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-center text-slate-400 pt-2">
                SportPulse Live Platform · {t.brandSubtitle[language]}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
