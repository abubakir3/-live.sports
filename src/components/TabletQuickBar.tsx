import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Radio, Clock, PieChart, Volume2, Sparkles } from 'lucide-react';

interface TabletQuickBarProps {
  language: Language;
  isSpeaking: boolean;
  onVoiceTrigger: () => void;
}

export const TabletQuickBar: React.FC<TabletQuickBarProps> = ({
  language,
  isSpeaking,
  onVoiceTrigger
}) => {
  const t = translations;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-between">
        
        {/* Live Arena Anchor */}
        <a
          href="#live-arena"
          className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-400 hover:text-emerald-400 min-h-[44px] min-w-[44px]"
        >
          <Radio className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Arena</span>
        </a>

        {/* Matches Countdown */}
        <a
          href="#matches-countdown"
          className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-400 hover:text-cyan-400 min-h-[44px] min-w-[44px]"
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Vaqt</span>
        </a>

        {/* Center Floating Audio Voice Trigger */}
        <button
          onClick={onVoiceTrigger}
          className={`-mt-5 p-3.5 rounded-full shadow-2xl border-2 flex items-center justify-center transition-transform active:scale-95 ${
            isSpeaking
              ? 'bg-emerald-500 border-white text-slate-950 ring-4 ring-emerald-500/30 animate-pulse'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500 border-slate-900 text-slate-950'
          }`}
          aria-label="Voice Assistant"
        >
          <Sparkles className="w-5 h-5 fill-current" />
        </button>

        {/* Fan Zone Poll */}
        <a
          href="#fan-zone"
          className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-400 hover:text-amber-400 min-h-[44px] min-w-[44px]"
        >
          <PieChart className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Ovoz</span>
        </a>

        {/* News Hub */}
        <a
          href="#news-hub"
          className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-400 hover:text-emerald-400 min-h-[44px] min-w-[44px]"
        >
          <Volume2 className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Audio</span>
        </a>

      </div>
    </div>
  );
};
