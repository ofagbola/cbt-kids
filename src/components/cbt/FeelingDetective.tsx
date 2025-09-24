import React, { useMemo, useState } from 'react';
import data from '@/data/tea-content.json';

export default function FeelingDetective() {
  const [index, setIndex] = useState(0);
  const items = useMemo(() => data.scenarios.map(s => ({ title: s.title, emotion: s.emotion })), []);
  const [guess, setGuess] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const current = items[index % items.length];
  const submit = (e: string) => {
    setGuess(e);
    if (e === current.emotion) setScore(score + 1);
    setTimeout(() => { setGuess(null); setIndex(index + 1); }, 700);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded border bg-white/70">
        <div className="text-sm text-gray-600 mb-1">Clue</div>
        <div className="font-medium">{current.title}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.emotionChoices.map(e => (
          <button key={e} onClick={()=>submit(e)} className={`px-3 py-2 rounded border text-sm ${guess===e ? (e===current.emotion ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300') : 'hover:bg-purple-50'}`}>{e}</button>
        ))}
      </div>
      <div className="text-sm text-gray-600">Score: {score}</div>
    </div>
  );
}
