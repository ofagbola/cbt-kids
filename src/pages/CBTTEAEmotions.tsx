import React from 'react';
import CBTShell from '@/components/cbt/CBTShell';
import EmotionSortGame from '@/components/cbt/EmotionSortGame';
import ThoughtReframingGame from '@/components/cbt/ThoughtReframingGame';

export default function CBTTEAEmotions() {
  return (
    <CBTShell>
      <div className="max-w-5xl space-y-6">
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h1 className="font-heading text-2xl md:text-4xl font-bold mb-2 text-purple-700">Emotions</h1>
          <p className="text-gray-700">What are Emotions? Emotions are feelings we experience, like happiness, sadness, anger, or fear, that come when we think about things happening around us. They help us understand how we feel about different situations, but sometimes they can feel really big or confusing.</p>
          <p className="text-gray-700 mt-2">Let's think about it like this: Imagine you're walking to school, and you see a friend who doesn't say 'hi' to you. If you think, 'Oh no, they must be mad at me,' you might start to feel sad or worried. But if you think, 'Maybe they didn't see me,' you might not feel upset at all.</p>
          <p className="text-gray-700 mt-2">Our thoughts are like a powerful engine that drives our emotions. Good thoughts can make us feel happy and strong, while negative thoughts can make us feel down and upset.</p>
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h2 className="font-subheading font-semibold mb-2">Emotion Match Game</h2>
          <EmotionSortGame />
        </div>
        <div className="p-6 rounded-2xl" style={{background:'rgba(255,255,255,0.2)',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0,0,0,0.1)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',border:'1px solid rgba(255,255,255,0.3)'}}>
          <h2 className="font-subheading font-semibold mb-2">Thought Reframing Game</h2>
          <ThoughtReframingGame />
        </div>
      </div>
    </CBTShell>
  );
}
