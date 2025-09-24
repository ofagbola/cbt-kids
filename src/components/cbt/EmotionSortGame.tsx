import React, { useMemo, useState } from 'react';
import data from '@/data/tea-content.json';

export default function EmotionSortGame() {
  const scenarios = useMemo(() => data.scenarios.map(s => ({ id: s.id, title: s.title, emotion: s.emotion })), []);
  const emotions = data.emotionChoices;
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const setEmotion = (id: string, emotion: string) => {
    setAnswers({ ...answers, [id]: emotion });
  };

  const correct = scenarios.filter(s => answers[s.id] === s.emotion).length;

  return (
    <div className="space-y-3">
      {scenarios.map(s => (
        <div key={s.id} className="p-3 rounded border">
          <div className="text-sm mb-2">{s.title}</div>
          <div className="flex flex-wrap gap-2">
            {emotions.map(e => (
              <button key={e} className={`px-3 py-1 rounded border text-sm ${answers[s.id]===e ? 'bg-purple-100 border-purple-300' : ''}`} onClick={() => setEmotion(s.id, e)}>{e}</button>
            ))}
          </div>
        </div>
      ))}
      <div className="text-sm text-gray-600">Correct: {correct} / {scenarios.length}</div>
    </div>
  );
}
