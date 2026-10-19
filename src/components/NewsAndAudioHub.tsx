import React, { useState } from 'react';
import { NewsArticle, Language } from '../types';
import { translations } from '../data/translations';
import { Newspaper, Volume2, Square, Sparkles, Clock, Share2 } from 'lucide-react';

interface NewsAndAudioHubProps {
  articles: NewsArticle[];
  language: Language;
  isSpeaking: boolean;
  activeText: string;
  speakText: (text: string, lang?: Language) => void;
  stopVoice: () => void;
}

export const NewsAndAudioHub: React.FC<NewsAndAudioHubProps> = ({
  articles,
  language,
  isSpeaking,
  activeText,
  speakText,
  stopVoice
}) => {
  const t = translations;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: t.news.allNews[language] },
    { id: 'breaking', label: t.news.breaking[language] },
    { id: 'transfers', label: t.news.transfers[language] },
    { id: 'report', label: t.news.report[language] },
    { id: 'analysis', label: t.news.analysis[language] }
  ];

  const filteredArticles = articles.filter(a => selectedCategory === 'all' || a.category === selectedCategory);

  const handleListenArticle = (article: NewsArticle) => {
    const title = article.title[language];
    const summary = article.summary[language];
    const fullText = `${title}. ${summary}`;

    if (isSpeaking && currentlyPlayingId === article.id) {
      stopVoice();
      setCurrentlyPlayingId(null);
    } else {
      setCurrentlyPlayingId(article.id);
      speakText(fullText, language);
    }
  };

  return (
    <section id="news-hub" className="py-12 md:py-16 scroll-mt-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <Newspaper className="w-3.5 h-3.5" />
                {t.news.badge[language]}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {t.news.title[language]}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {t.news.subtitle[language]}
            </p>
          </div>
        </div>

        {/* Category Pills (Touch friendly horizontal scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[44px] ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* News Cards Grid (Responsive 1-to-2-to-3 Column Layout for Tablet and iPad) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const isPlayingThis = isSpeaking && currentlyPlayingId === article.id;

            return (
              <div
                key={article.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-xl overflow-hidden flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={article.image}
                      alt={article.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase border border-slate-800">
                      {article.category} · {article.sport}
                    </div>

                    {/* Active Voice Playing Animation on thumbnail */}
                    {isPlayingThis && (
                      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center gap-1">
                        <span className="w-1.5 h-6 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-10 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-7 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{article.timestamp[language]}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                      {article.title[language]}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {article.summary[language]}
                    </p>
                  </div>
                </div>

                {/* Footer Actions: Web Speech API Listen Trigger & Share */}
                <div className="p-4 pt-0 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleListenArticle(article)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                      isPlayingThis
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                        : 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30'
                    }`}
                  >
                    {isPlayingThis ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>{t.audio.stopVoice[language]}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>{t.audio.readListen[language]}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: article.title[language],
                          text: article.summary[language],
                          url: window.location.href
                        }).catch(() => {});
                      } else {
                        alert("Havola nusxalandi / Link copied!");
                      }
                    }}
                    title="Ulashish / Share"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
