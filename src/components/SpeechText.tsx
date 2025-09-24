import React from 'react';
import { useHoverSpeech } from '@/hooks/useSpeechAssistance';

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
  const textToSpeak = speechText || (typeof children === 'string' ? children : '');
  const hoverProps = useHoverSpeech(textToSpeak, { rate, pitch, volume });

  return (
    <span 
      className={`cursor-pointer hover:text-blue-600 transition-colors duration-200 ${className}`}
      {...hoverProps}
    >
      {children}
    </span>
  );
}