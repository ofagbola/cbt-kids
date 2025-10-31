import React from 'react';
import CBTShell from '@/components/cbt/CBTShell';
import ActionMatchGame from '@/components/cbt/ActionMatchGame';

export default function CBTTEAActions() {
  return (
    <CBTShell>
      <div className="max-w-5xl space-y-6">
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h1 className="font-heading text-2xl md:text-4xl font-bold mb-2 text-purple-700">Actions</h1>
          <p className="text-gray-700">You're almost there! So far, we've learned how to manage our thoughts and emotions. The last bit is actions!</p>
          <p className="text-gray-700 mt-2">We've learned that our thoughts can create emotions, but did you know that these emotions can make us do things, good or bad? For example, when you feel happy, you might smile or help someone out. But when you feel angry, what might you do? You might shout or do something hurtful.</p>
          <p className="text-gray-700 mt-2">When we control our emotions, we can avoid doing things that might hurt ourselves or others. For example, if you feel angry, instead of hitting someone or shouting, you can take deep breaths and talk about your feelings.</p>
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h2 className="font-subheading font-semibold mb-2">Action Match Game</h2>
          <ActionMatchGame />
        </div>
      </div>
    </CBTShell>
  );
}
