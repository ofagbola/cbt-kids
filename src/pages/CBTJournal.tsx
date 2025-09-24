import React, { useEffect, useState } from 'react';
import CBTShell from '@/components/cbt/CBTShell';

type Entry = { id: string; text: string; createdAt: number };

export default function CBTJournal() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('cbt.journal');
    if (raw) setEntries(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('cbt.journal', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!text.trim()) return;
    setEntries([{ id: crypto.randomUUID(), text, createdAt: Date.now() }, ...entries]);
    setText('');
  };

  const remove = (id: string) => setEntries(entries.filter(e => e.id !== id));

  return (
    <CBTShell>
      <div className="space-y-6">
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h1 className="font-heading text-2xl md:text-4xl font-bold mb-2 text-purple-700">Journal</h1>
          <p className="text-gray-700">Write a little note to yourself. Your entries stay on this device.</p>
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <div className="flex gap-2 mb-4">
            <input className="flex-1 border rounded px-3 py-2" placeholder="Write your thoughts..." value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=> e.key==='Enter' && addEntry()} />
            <button className="px-4 py-2 rounded bg-purple-600 text-white" onClick={addEntry}>Save</button>
          </div>
          <div className="text-xs text-gray-600 mb-2">Entries: {entries.length}</div>
          <ul className="space-y-3">
            {entries.map(e => (
              <li key={e.id} className="p-3 rounded border bg-white/70">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-gray-500">{new Date(e.createdAt).toLocaleString()}</div>
                  <button className="text-xs text-red-600 underline" onClick={()=>remove(e.id)}>Delete</button>
                </div>
                <div className="whitespace-pre-wrap">{e.text}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CBTShell>
  );
}
