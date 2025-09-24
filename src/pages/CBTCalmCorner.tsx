import React from 'react';
import CBTShell from '@/components/cbt/CBTShell';
import BreathingExercise from '@/components/cbt/BreathingExercise';
import DiceRandomizer from '@/components/cbt/DiceRandomizer';
import WorksheetLinks from '@/components/cbt/WorksheetLinks';

export default function CBTCalmCorner() {
  return (
    <CBTShell>
      <div className="space-y-6">
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h1 className="font-heading text-2xl md:text-4xl font-bold mb-2 text-purple-700">Calm Corner</h1>
          <p className="text-gray-700">Breathe, reset, try a quick activity.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
            <h2 className="font-subheading text-xl font-semibold mb-2">5-4-3-2-1 Breathing</h2>
            <BreathingExercise />
          </div>
          <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
            <h2 className="font-subheading text-xl font-semibold mb-2">Mindfulness Dice</h2>
            <DiceRandomizer />
          </div>
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <WorksheetLinks />
        </div>
      </div>
    </CBTShell>
  );
}
