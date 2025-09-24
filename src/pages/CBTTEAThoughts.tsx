import React from 'react';
import CBTShell from '@/components/cbt/CBTShell';
import ThoughtSorterGame from '@/components/cbt/ThoughtSorterGame';
import ReframingGame from '@/components/cbt/ReframingGame';

export default function CBTTEAThoughts() {
  return (
    <CBTShell>
      <div className="max-w-5xl space-y-6">
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h1 className="font-heading text-2xl md:text-4xl font-bold mb-2 text-purple-700">Thoughts</h1>
          <p className="text-gray-700">Thoughts are the stories our brain tells us. Sometimes they can be tricky! Let’s spot them and sort them.</p>
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h2 className="font-subheading font-semibold mb-2">Sorting Game</h2>
          <ThoughtSorterGame />
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h2 className="font-subheading font-semibold mb-2">Reframing Game</h2>
          <ReframingGame />
        </div>
      </div>
    </CBTShell>
  );
}
