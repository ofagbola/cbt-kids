import React, { useState, useEffect } from 'react';

const EMOJIS = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'calm', emoji: '😌', label: 'Calm' },
  { id: 'okay', emoji: '🙂', label: 'Okay' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'angry', emoji: '😠', label: 'Angry' },
];

export default function EmojiPicker({ onPick }: { onPick?: (id: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cbt.mood');
    if (saved) setSelected(saved);
  }, []);

  const choose = (id: string) => {
    setSelected(id);
    localStorage.setItem('cbt.mood', id);
    onPick?.(id);
  };

  return (
    <div className="flex gap-3 items-center">
      {EMOJIS.map((m) => (
        <button
          key={m.id}
          className={`text-3xl md:text-5xl transition-transform ${selected === m.id ? 'scale-110' : 'hover:scale-110'}`}
          aria-label={m.label}
          onClick={() => choose(m.id)}
        >
          {m.emoji}
        </button>
      ))}
    </div>
  );
}
