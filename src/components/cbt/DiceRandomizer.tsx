import React, { useState } from 'react';

const ACTIVITIES = [
  'Take 5 deep breaths',
  'Name 5 things you see',
  'Stretch your arms',
  'Drink some water',
  'Draw something you like',
  'Tell yourself one kind thing',
];

export default function DiceRandomizer() {
  const [face, setFace] = useState(1);
  const [activity, setActivity] = useState<string | null>(null);

  const roll = () => {
    const n = Math.floor(Math.random() * 6) + 1;
    setFace(n);
    setActivity(ACTIVITIES[n - 1]);
  };

  return (
    <div>
      <button className="px-4 py-2 rounded bg-primary text-white mb-3" onClick={roll}>Roll Dice</button>
      <div className="w-16 h-16 grid place-items-center border rounded text-2xl mb-2">{face}</div>
      {activity && <div className="text-sm text-gray-700">Try: {activity}</div>}
    </div>
  );
}
