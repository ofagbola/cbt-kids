import React from 'react';
import { Link } from 'react-router-dom';
import EmojiPicker from '@/components/cbt/EmojiPicker';

export default function CBTWelcome() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-primary">Welcome!! How are you feeling today?</h1>
      <div className="mb-6">
        <EmojiPicker />
      </div>
      <div className="flex gap-4 flex-wrap">
        <Link to="/cbt/calm" className="underline text-primary">Calm Corner</Link>
        <Link to="/cbt/journal" className="underline text-primary">Journal</Link>
        <Link to="/cbt/adventure" className="underline text-primary">Choose Your Adventure</Link>
      </div>
    </div>
  );
}
