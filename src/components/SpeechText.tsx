import React, { useState, useEffect } from 'react';
import { useHoverSpeech } from '@/hooks/useSpeechAssistance';
import { getSettings } from '@/lib/storage';

interface SpeechTextProps {
  children: React.ReactNode;
  speechText?: string;
  className?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export default function SpeechText({ 
  children, 
  speechText, 
  className = '', 
  rate = 0.8, 
  pitch = 1.1, 
  volume = 0.7 
}: SpeechTextProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const textToSpeak = speechText || (typeof children === 'string' ? children : '');
  const hoverProps = useHoverSpeech(textToSpeak, { rate, pitch, volume });

  useEffect(() => {
    // Check settings on mount and when settings change
    const settings = getSettings();
    setSoundEnabled(settings.soundEnabled);

    // Listen for settings changes
    const handleStorageChange = () => {
      const settings = getSettings();
      setSoundEnabled(settings.soundEnabled);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab settings changes
    window.addEventListener('settingsChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('settingsChanged', handleStorageChange);
    };
  }, []);

  // Only apply hover props if sound is enabled
  const conditionalProps = soundEnabled ? hoverProps : {};

  return (
    <span 
      className={`${soundEnabled ? 'cursor-pointer hover:text-blue-600' : ''} transition-colors duration-200 ${className}`}
      {...conditionalProps}
    >
      {children}
    </span>
  );
}