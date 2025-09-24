import React from 'react';
import CBTShell from '@/components/cbt/CBTShell';

export default function CBTHelp() {
  return (
    <CBTShell>
      <div className="max-w-4xl p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
        <h1 className="font-heading text-2xl md:text-4xl font-bold mb-2 text-purple-700">Help</h1>
        <p className="text-gray-700 mb-4">This site helps kids learn CBT: Thoughts, Emotions, Actions. Choose a page to begin.</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Use Calm Corner to breathe and reset</li>
          <li>Try the games to learn TEA skills</li>
          <li>Write in your Journal any time</li>
        </ul>
        <p className="text-gray-700 mt-4">Need help? Email <a href="mailto:mindfulyouth101@gmail.com" className="underline text-purple-700">mindfulyouth101@gmail.com</a>.</p>
      </div>
    </CBTShell>
  );
}
