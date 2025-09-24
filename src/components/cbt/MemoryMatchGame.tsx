import React, { useMemo, useState } from 'react';
import data from '@/data/tea-content.json';

type Card = { id: string; type: 's' | 'c'; text: string; pairId: string };

export default function MemoryMatchGame() {
  const cards = useMemo(() => {
    const pairs = data.scenarios.map(s => ({ id: s.id, situation: s.title, coping: s.coping[0] }));
    const flat: Card[] = pairs.flatMap(p => ([
      { id: p.id + '-s', type: 's', text: p.situation, pairId: p.id },
      { id: p.id + '-c', type: 'c', text: p.coping, pairId: p.id },
    ]));
    // shuffle
    for (let i=flat.length-1;i>0;i--) { const j = Math.floor(Math.random()*(i+1)); [flat[i], flat[j]] = [flat[j], flat[i]]; }
    return flat;
  }, []);

  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());

  const flip = (id: string) => {
    if (matched.has(id) || flipped.includes(id)) return;
    const next = [...flipped, id];
    setFlipped(next);
    if (next.length === 2) {
      const [a, b] = next;
      const A = cards.find(c => c.id === a)!;
      const B = cards.find(c => c.id === b)!;
      if (A.pairId === B.pairId && A.type !== B.type) {
        const newMatched = new Set(matched);
        newMatched.add(a); newMatched.add(b);
        setMatched(newMatched);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map(card => {
        const isUp = flipped.includes(card.id) || matched.has(card.id);
        return (
          <button key={card.id} onClick={() => flip(card.id)} className={`p-3 rounded border h-24 text-sm ${isUp ? 'bg-white' : 'bg-purple-100'} overflow-hidden`}> 
            {isUp ? card.text : 'Flip'}
          </button>
        );
      })}
    </div>
  );
}
