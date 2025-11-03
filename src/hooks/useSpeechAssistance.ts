import { useRef, useEffect, useState } from 'react';

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

export function useSpeechAssistance() {
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | undefined>(undefined);
  const [isSecure, setIsSecure] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    // Check if we're on HTTPS (required for Speech Recognition)
    setIsSecure(window.location.protocol === 'https:' || window.location.hostname === 'localhost');
    
    // Check if Speech Recognition is supported
    setSpeechSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  // Resolve voices asynchronously (some browsers load them lazily)
  useEffect(() => {
    const ensureVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        voiceRef.current = getChildFriendlyVoice();
      }
    };
    ensureVoices();
    window.speechSynthesis.onvoiceschanged = ensureVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null as unknown as () => void;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speak = (text: string, options: SpeechOptions = {}) => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    if (synthRef.current) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate ?? 0.85;
    utterance.pitch = options.pitch ?? 1.25;
    utterance.volume = options.volume ?? 0.85;
    
    utterance.voice = options.voice || voiceRef.current || getChildFriendlyVoice();

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (synthRef.current) {
      window.speechSynthesis.cancel();
    }
  };

  const getVoices = () => {
    return window.speechSynthesis.getVoices();
  };

  const getChildFriendlyVoice = () => {
    const voices = getVoices();
    if (!voices || voices.length === 0) return undefined as unknown as SpeechSynthesisVoice;
    const prefer = (
      [
        'child', 'kid', 'boy', 'girl', 'junior', // generic child-like hints
        'Ava', 'Allison', 'Salli', 'Kendra', // common lighter/younger-sounding voices
        'Karen', 'Samantha', 'Tessa', 'Victoria', // macOS lighter voices
      ]
    );
    const byName = voices.find(v => prefer.some(p => v.name.toLowerCase().includes(p.toLowerCase())));
    const byLang = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('en'));
    return byName || byLang || voices[0];
  };

  return {
    speak,
    stop,
    getVoices,
    getChildFriendlyVoice,
    isSecure,
    speechSupported
  };
}

// Hook for hover speech assistance
export function useHoverSpeech(text: string, options?: SpeechOptions) {
  const { speak, stop, getChildFriendlyVoice } = useSpeechAssistance();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start speaking after a short delay
    timeoutRef.current = setTimeout(() => {
      const voice = getChildFriendlyVoice();
      speak(text, { ...options, voice });
    }, 300);
  };

  const handleMouseLeave = () => {
    // Clear timeout if mouse leaves before speaking
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    stop();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stop();
    };
  }, [stop]);

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  };
}