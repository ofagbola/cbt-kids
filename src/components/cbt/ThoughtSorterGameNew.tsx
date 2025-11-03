import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import teaContent from '@/data/tea-content.json';

interface ThoughtCard {
  id: string;
  text: string;
  correctType: string;
}

export default function ThoughtSorterGameNew() {
  const [thoughts, setThoughts] = useState<ThoughtCard[]>([]);
  const [placedThoughts, setPlacedThoughts] = useState<Record<string, string>>({});
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showDescriptions, setShowDescriptions] = useState(true);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const helpfulThoughts = [
      "I can learn from this mistake",
      "I'm doing my best",
      "This feeling will pass",
      "I can ask for help",
      "I'm proud of trying",
      "Tomorrow is a new day",
      "Everyone makes mistakes",
      "I'm still growing and learning",
      "It's okay to not be perfect",
      "I can handle this challenge"
    ];

    const unhelpfulThoughts = [
      "I'm terrible at everything",
      "This is all my fault",
      "Nothing ever goes right",
      "I'll never be good enough",
      "Everyone hates me",
      "I should give up",
      "I'm a complete failure",
      "Nobody likes me",
      "This is always going to be awful",
      "I can't do anything right"
    ];

    const helpful = helpfulThoughts.map((text, index) => ({
      id: `helpful-${index}`,
      text,
      correctType: 'helpful'
    }));

    const unhelpful = unhelpfulThoughts.map((text, index) => ({
      id: `unhelpful-${index}`,
      text,
      correctType: 'unhelpful'
    }));

    setThoughts([...helpful, ...unhelpful].sort(() => Math.random() - 0.5));
    setPlacedThoughts({});
    setGameComplete(false);
    setScore(0);
  };

  const handleDrop = (type: string, thoughtId: string) => {
    setPlacedThoughts(prev => ({
      ...prev,
      [thoughtId]: type
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    const total = thoughts.length;

    thoughts.forEach(thought => {
      if (placedThoughts[thought.id] === thought.correctType) {
        correct++;
      }
    });

    const percentage = Math.round((correct / total) * 100);
    setScore(percentage);
    setGameComplete(true);
  };

  const helpfulThoughts = thoughts.filter(t => placedThoughts[t.id] === 'helpful');
  const unhelpfulThoughts = thoughts.filter(t => placedThoughts[t.id] === 'unhelpful');
  const unplacedThoughts = thoughts.filter(t => !placedThoughts[t.id]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">🧠 Thought Sorter Game</h3>
        <p className="text-gray-600">
          Drag the thoughts into the correct boxes! Helpful thoughts make us feel better, 
          unhelpful thoughts make us feel worse.
        </p>
      </div>

      {/* Helpful and Unhelpful Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="min-h-96 p-4 border-2 border-dashed border-green-300 rounded-2xl bg-green-50"
          onDrop={(e) => {
            e.preventDefault();
            const thoughtId = e.dataTransfer.getData('thoughtId');
            if (thoughtId) {
              handleDrop('helpful', thoughtId);
            }
          }}
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
                  onDragStart={(e) => {
                    e.dataTransfer.setData('thoughtId', thought.id);
                  }}
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

        <motion.div
          className="min-h-96 p-4 border-2 border-dashed border-red-300 rounded-2xl bg-red-50"
          onDrop={(e) => {
            e.preventDefault();
            const thoughtId = e.dataTransfer.getData('thoughtId');
            if (thoughtId) {
              handleDrop('unhelpful', thoughtId);
            }
          }}
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
                  onDragStart={(e) => {
                    e.dataTransfer.setData('thoughtId', thought.id);
                  }}
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

      {/* Unplaced Thoughts */}
      {unplacedThoughts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50"
        >
          <h4 className="font-semibold text-gray-800 mb-3">Drag these thoughts to a box:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {unplacedThoughts.map((thought) => (
              <motion.div
                key={thought.id}
                className="p-3 bg-white rounded-lg shadow-sm border cursor-move"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('thoughtId', thought.id);
                }}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1, rotate: 5 }}
              >
                <div className="text-sm text-gray-800">{thought.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Score Button */}
      {unplacedThoughts.length === 0 && !gameComplete && (
        <div className="text-center">
          <Button onClick={calculateScore} className="bg-blue-500 hover:bg-blue-600">
            Check My Score
          </Button>
        </div>
      )}

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
              <div className="text-6xl mb-4">
                {score === 100 ? '🎉' : score >= 80 ? '🌟' : '💪'}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Your Score: {score}%
              </h3>
              <p className="text-gray-600 mb-6">
                {score === 100 
                  ? 'Excellent Work! You sorted all the thoughts correctly!' 
                  : score >= 80
                  ? 'Great job! You really understand helpful vs unhelpful thoughts!'
                  : 'Good work! Keep practicing to improve!'}
              </p>
              <div className="space-y-3">
                <Button onClick={initializeGame} className="w-full bg-blue-500 hover:bg-blue-600">
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
            <li>• Drag thoughts from the middle area to the correct boxes</li>
            <li>• Helpful thoughts make us feel confident and happy</li>
            <li>• Unhelpful thoughts make us feel sad or worried</li>
            <li>• Try to sort all thoughts correctly!</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

