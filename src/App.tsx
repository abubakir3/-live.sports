import React, { useState, useEffect } from 'react';
import { Language, SportType, MatchItem } from './types';
import { initialMatches, featuredAthletes, newsArticles } from './data/sportsData';
import { translations } from './data/translations';
import { useSpeech } from './hooks/useSpeech';

import { Navbar } from './components/Navbar';
import { LiveArena } from './components/LiveArena';
import { LiveScoresAndCountdown } from './components/LiveScoresAndCountdown';
import { SearchAndFilters } from './components/SearchAndFilters';
import { AthleteCenter } from './components/AthleteCenter';
import { TournamentStandings } from './components/TournamentStandings';
import { FanZone } from './components/FanZone';
import { NewsAndAudioHub } from './components/NewsAndAudioHub';
import { TabletQuickBar } from './components/TabletQuickBar';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('uz');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedSport, setSelectedSport] = useState<SportType>('all');
  const [matches, setMatches] = useState<MatchItem[]>(initialMatches);
  const [activeMatchId, setActiveMatchId] = useState<string>(initialMatches[0].id);

  const { isSpeaking, isMuted, activeText, speak, stop, toggleMute } = useSpeech();

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
    }
  }, [darkMode]);

  // Real-time Goal/Score Simulation handler
  const handleSimulateScore = (matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;

        const isHomeGoal = Math.random() > 0.4;
        const newHomeScore = isHomeGoal ? m.homeScore + 1 : m.homeScore;
        const newAwayScore = !isHomeGoal ? m.awayScore + 1 : m.awayScore;
        const currentMinute = (m.minuteNumber || 70) + 1;

        const scoringTeam = isHomeGoal ? m.homeTeam.name : m.awayTeam.name;
        const scoringPlayer = isHomeGoal ? 'Hujumchi' : 'Yarimhimoyachi';

        const newEvent = {
          id: 'ev-' + Date.now(),
          minute: `${currentMinute}'`,
          type: 'goal' as const,
          team: isHomeGoal ? ('home' as const) : ('away' as const),
          player: scoringPlayer,
          description: `Super zarba bilan hisob o'zgardi! ${newHomeScore} - ${newAwayScore}`
        };

        const updatedMatch = {
          ...m,
          homeScore: newHomeScore,
          awayScore: newAwayScore,
          minuteNumber: currentMinute,
          periodText: `${currentMinute}' 2-bo'lim`,
          events: [newEvent, ...m.events]
        };

        // Trigger TTS voice announcement for goal
        let announceText = "";
        if (language === 'uz') {
          announceText = `Gool! ${scoringTeam} hisobni o'zgartirdi. Yangi hisob: ${m.homeTeam.name} ${newHomeScore}, ${m.awayTeam.name} ${newAwayScore}.`;
        } else if (language === 'ru') {
          announceText = `Гоол! ${scoringTeam} забивает гол. Счет: ${m.homeTeam.name} ${newHomeScore}, ${m.awayTeam.name} ${newAwayScore}.`;
        } else {
          announceText = `Goal! ${scoringTeam} scores. New score: ${m.homeTeam.name} ${newHomeScore}, ${m.awayTeam.name} ${newAwayScore}.`;
        }
        speak(announceText, language);

        return updatedMatch;
      })
    );
  };

  // Quick Voice Assistant Trigger (from Tablet Quick Bar or Top button)
  const handleTabletVoiceTrigger = () => {
    const active = matches.find(m => m.id === activeMatchId) || matches[0];
    let msg = "";
    if (language === 'uz') {
      msg = `Jonli yangilanish: ${active.homeTeam.name} ${active.homeScore}, ${active.awayTeam.name} ${active.awayScore}. O'yin vaqti: ${active.periodText}.`;
    } else if (language === 'ru') {
      msg = `Текущий счет: ${active.homeTeam.name} ${active.homeScore}, ${active.awayTeam.name} ${active.awayScore}. Время: ${active.periodText}.`;
    } else {
      msg = `Live score update: ${active.homeTeam.name} ${active.homeScore}, ${active.awayTeam.name} ${active.awayScore}. Game time: ${active.periodText}.`;
    }
    speak(msg, language);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Module 1: Top Bar & Navigation */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isSpeaking={isSpeaking}
        isMuted={isMuted}
        toggleMute={toggleMute}
        speakText={speak}
      />

      <main className="relative">
        
        {/* Module 2: Live Streaming & Multi-Sport Arena */}
        <LiveArena
          matches={matches}
          activeMatchId={activeMatchId}
          setActiveMatchId={setActiveMatchId}
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          language={language}
          speakText={speak}
          onSimulateScore={handleSimulateScore}
        />

        {/* Module 3: Live Scores & Next Match Countdown */}
        <LiveScoresAndCountdown
          matches={matches}
          activeMatchId={activeMatchId}
          setActiveMatchId={setActiveMatchId}
          language={language}
        />

        {/* Module 4: Fast Search & Global Parameters Filter */}
        <SearchAndFilters
          matches={matches}
          activeMatchId={activeMatchId}
          setActiveMatchId={setActiveMatchId}
          language={language}
        />

        {/* Module 5: Athlete Performance & Stats Center */}
        <AthleteCenter
          athletes={featuredAthletes}
          language={language}
          speakText={speak}
        />

        {/* Module 6: Interactive Tournament Tables & Standings */}
        <TournamentStandings
          language={language}
        />

        {/* Module 7: User Interactive Forms & Fan Zone */}
        <FanZone
          matches={matches}
          language={language}
        />

        {/* Module 8: Live Audio Commentary & News Hub */}
        <NewsAndAudioHub
          articles={newsArticles}
          language={language}
          isSpeaking={isSpeaking}
          activeText={activeText}
          speakText={speak}
          stopVoice={stop}
        />

      </main>

      {/* Dedicated Tablet & Mobile Thumb-Zone Quick Bar */}
      <TabletQuickBar
        language={language}
        isSpeaking={isSpeaking}
        onVoiceTrigger={handleTabletVoiceTrigger}
      />

      {/* Footer */}
      <Footer language={language} />

    </div>
  );
}
