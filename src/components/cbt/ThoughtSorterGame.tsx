import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HELPFUL_THOUGHTS = [
  "I can learn from this mistake",
  "I'm doing my best",
  "This feeling will pass",
  "I can ask for help",
  "I'm proud of trying",
  "Tomorrow is a new day"
];

const UNHELPFUL_THOUGHTS = [
  "I'm terrible at everything",
  "This is all my fault",
  "Nothing ever goes right",
  "I'll never be good enough",
  "Everyone hates me",
  "I should give up"
];

interface ThoughtCard {
  id: string;
  text: string;
  isHelpful: boolean;
  isDragging?: boolean;
}

export default function ThoughtSorterGame() {
  const [thoughts, setThoughts] = useState<ThoughtCard[]>(() => {
    const helpful = HELPFUL_THOUGHTS.map((text, index) => ({
      id: `helpful-${index}`,
      text,
      isHelpful: true
    }));
    const unhelpful = UNHELPFUL_THOUGHTS.map((text, index) => ({
      id: `unhelpful-${index}`,
      text,
      isHelpful: false
    }));
    return [...helpful, ...unhelpful].sort(() => Math.random() - 0.5);
  });

  const [draggedThought, setDraggedThought] = useState<ThoughtCard | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const handleDragStart = (thought: ThoughtCard) => {
    setDraggedThought(thought);
  };

  const handleDragEnd = () => {
    setDraggedThought(null);
  };

  const handleDrop = (targetIsHelpful: boolean) => {
    if (!draggedThought) return;

    setThoughts(prev => 
      prev.map(thought => 
        thought.id === draggedThought.id 
          ? { ...thought, isHelpful: targetIsHelpful }
          : thought
      )
    );

    // Check if game is complete
    const allCorrect = thoughts.every(thought => {
      if (thought.id === draggedThought.id) {
        return targetIsHelpful === HELPFUL_THOUGHTS.includes(thought.text);
      }
      return thought.isHelpful === HELPFUL_THOUGHTS.includes(thought.text);
    });

    if (allCorrect) {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    const helpful = HELPFUL_THOUGHTS.map((text, index) => ({
      id: `helpful-${index}`,
      text,
      isHelpful: true
    }));
    const unhelpful = UNHELPFUL_THOUGHTS.map((text, index) => ({
      id: `unhelpful-${index}`,
      text,
      isHelpful: false
    }));
    setThoughts([...helpful, ...unhelpful].sort(() => Math.random() - 0.5));
    setGameComplete(false);
  };

  const helpfulThoughts = thoughts.filter(t => t.isHelpful);
  const unhelpfulThoughts = thoughts.filter(t => !t.isHelpful);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">🧠 Thought Sorter Game</h3>
        <p className="text-gray-600">
          Drag the thoughts into the correct boxes! Helpful thoughts make us feel better, 
          unhelpful thoughts make us feel worse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Helpful Thoughts Box */}
        <motion.div
          className="min-h-96 p-4 border-2 border-dashed border-green-300 rounded-2xl bg-green-50"
          onDrop={() => handleDrop(true)}
          onDragOver={(e) => e.preventDefault()}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="text-lg font-semibold text-green-800">Helpful Thoughts</h4>
            <p className="text-sm text-green-600">These make us feel better</p>
          </div>
          
          <div className="space-y-2">
            <AnimatePresence>
              {helpfulThoughts.map((thought) => (
                <motion.div
                  key={thought.id}
                  className="p-3 bg-white rounded-lg shadow-sm border border-green-200 cursor-move"
                  draggable
                  onDragStart={() => handleDragStart(thought)}
                  onDragEnd={handleDragEnd}
                  whileHover={{ scale: 1.05 }}
                  whileDrag={{ scale: 1.1, rotate: 5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-sm text-gray-800">{thought.text}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Unhelpful Thoughts Box */}
        <motion.div
          className="min-h-96 p-4 border-2 border-dashed border-red-300 rounded-2xl bg-red-50"
          onDrop={() => handleDrop(false)}
          onDragOver={(e) => e.preventDefault()}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">❌</div>
            <h4 className="text-lg font-semibold text-red-800">Unhelpful Thoughts</h4>
            <p className="text-sm text-red-600">These make us feel worse</p>
          </div>
          
          <div className="space-y-2">
            <AnimatePresence>
              {unhelpfulThoughts.map((thought) => (
                <motion.div
                  key={thought.id}
                  className="p-3 bg-white rounded-lg shadow-sm border border-red-200 cursor-move"
                  draggable
                  onDragStart={() => handleDragStart(thought)}
                  onDragEnd={handleDragEnd}
                  whileHover={{ scale: 1.05 }}
                  whileDrag={{ scale: 1.1, rotate: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-sm text-gray-800">{thought.text}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Game Complete Modal */}
      <AnimatePresence>
        {gameComplete && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Excellent Work!</h3>
              <p className="text-gray-600 mb-6">
                You've sorted all the thoughts correctly! You're getting really good at 
                recognizing which thoughts help you feel better.
              </p>
              <div className="space-y-3">
                <Button onClick={resetGame} className="w-full bg-blue-500 hover:bg-blue-600">
                  Play Again
                </Button>
                <Button onClick={() => setGameComplete(false)} variant="outline" className="w-full">
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-800 mb-2">💡 How to Play:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Drag thoughts from one box to the other</li>
            <li>• Helpful thoughts make us feel confident and happy</li>
            <li>• Unhelpful thoughts make us feel sad or worried</li>
            <li>• Try to sort all thoughts correctly!</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}