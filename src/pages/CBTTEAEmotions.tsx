import React from 'react';
import CBTShell from '@/components/cbt/CBTShell';
import EmotionSortGame from '@/components/cbt/EmotionSortGame';

export default function CBTTEAEmotions() {
  return (
    <CBTShell>
      <div className="max-w-5xl space-y-6">
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h1 className="font-heading text-2xl md:text-4xl font-bold mb-2 text-purple-700">Emotions</h1>
          <p className="text-gray-700">Emotions tell us how we feel inside. Let’s match situations to emotions!</p>
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <EmotionSortGame />
        </div>
      </div>
    </CBTShell>
  );
}
