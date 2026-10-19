import { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from '../types';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeText, setActiveText] = useState('');
  const [supported, setSupported] = useState(false);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveText('');
      currentUtteranceRef.current = null;
    }
  }, []);

  const speak = useCallback((text: string, lang: Language = 'uz') => {
    if (!text || isMuted) return;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      currentUtteranceRef.current = utterance;

      // Select appropriate voice based on language
      const voices = window.speechSynthesis.getVoices();
      let targetLang = 'uz-UZ';
      if (lang === 'ru') targetLang = 'ru-RU';
      if (lang === 'en') targetLang = 'en-US';

      utterance.lang = targetLang;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Try finding matching voice
      if (voices.length > 0) {
        const matchingVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetLang.slice(0, 2).toLowerCase()));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setActiveText(text);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setActiveText('');
        currentUtteranceRef.current = null;
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        setIsSpeaking(false);
        setActiveText('');
        currentUtteranceRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('TTS error:', err);
      setIsSpeaking(false);
      setActiveText('');
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (next) {
        stop();
      }
      return next;
    });
  }, [stop]);

  return {
    isSpeaking,
    isMuted,
    activeText,
    supported,
    speak,
    stop,
    toggleMute
  };
}
