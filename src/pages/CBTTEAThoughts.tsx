import React from 'react';
import CBTShell from '@/components/cbt/CBTShell';
import ThoughtSorterGameNew from '@/components/cbt/ThoughtSorterGameNew';
import MatchThoughtsGame from '@/components/cbt/MatchThoughtsGame';
import ThoughtReframingGame from '@/components/cbt/ThoughtReframingGame';

export default function CBTTEAThoughts() {
  return (
    <CBTShell>
      <div className="max-w-5xl space-y-6">
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h1 className="font-heading text-2xl md:text-4xl font-bold mb-2 text-purple-700">Thoughts</h1>
          <p className="text-gray-700">Thoughts are the words, images, and ideas that are constantly running through our minds daily. They help us make sense of the world around us and can influence how we feel and act.</p>
          <p className="text-gray-700 mt-2">As you may know our brains sometimes get stuck in certain ways of thinking, which can affect how we feel. Interestingly enough, thoughts have patterns and many have special names.</p>
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h2 className="font-subheading font-semibold mb-2">Thought Sorter Game</h2>
          <ThoughtSorterGameNew />
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h2 className="font-subheading font-semibold mb-2">Match: Thoughts Game</h2>
          <MatchThoughtsGame />
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h2 className="font-subheading font-semibold mb-2">Thought Reframing Game</h2>
          <ThoughtReframingGame />
        </div>
      </div>
    </CBTShell>
  );
}
