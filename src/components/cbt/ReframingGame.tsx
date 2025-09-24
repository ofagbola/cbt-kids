import React, { useMemo, useState } from 'react';
import data from '@/data/tea-content.json';

export default function ReframingGame() {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const items = useMemo(() => data.scenarios.flatMap(s => s.thoughts.map(t => ({
    scenario: s.title,
    thought: t.text,
    reframes: s.reframes
  }))), []);

  const item = items[current % items.length];
  const handlePick = (reframe: string) => {
    setScore(score + 1);
    setCurrent(current + 1);
  };

  return (
    <div>
      <div className="text-sm text-gray-600 mb-2">Scenario: {item.scenario}</div>
      <div className="p-3 rounded border mb-3">Negative thought: “{item.thought}”</div>
      <div className="grid gap-2 md:grid-cols-3">
        {item.reframes.map((r) => (
          <button key={r} onClick={() => handlePick(r)} className="p-2 rounded border hover:bg-purple-50 text-sm text-left">{r}</button>
        ))}
      </div>
      <div className="mt-3 text-sm text-gray-600">Score: {score}</div>
    </div>
  );
}
