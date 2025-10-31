import React, { useMemo, useState } from 'react';
import data from '@/data/tea-content.json';

// Simple puzzle: drag labels (Thoughts, Emotions, Actions) to definitions
const TARGETS = [
  { id: 'T', label: 'Thoughts', def: 'What we think' },
  { id: 'E', label: 'Emotions', def: 'How we feel' },
  { id: 'A', label: 'Actions', def: 'What we do' }
];

export default function TEACheck() {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const labels = useMemo(() => TARGETS.map(t => t.label), []);

  const place = (label: string, id: string) => {
    setPlaced({ ...placed, [id]: label });
  };

  const correct = TARGETS.filter(t => placed[t.id] === t.label).length;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="text-sm text-gray-600">Drag a label onto a definition:</div>
        <div className="flex gap-2 flex-wrap">
          {labels.map(l => (
            <button key={l} className="px-3 py-1 rounded border bg-white/70 text-sm" draggable onDragStart={(e)=>{ e.dataTransfer.setData('text/plain', l); }}>{l}</button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {TARGETS.map(t => (
          <div key={t.id} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>place(e.dataTransfer.getData('text/plain'), t.id)} className={`p-3 rounded border min-h-14 bg-white/70 ${placed[t.id] ? 'border-purple-300' : ''}`}>
            <div className="text-xs text-gray-500">{t.label}</div>
            <div className="text-sm">{t.def}</div>
            {placed[t.id] && <div className="mt-2 text-xs">You placed: <b>{placed[t.id]}</b></div>}
          </div>
        ))}
        <div className="text-sm text-gray-600">Correct: {correct} / {TARGETS.length}</div>
      </div>
    </div>
  );
}
