import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import teaContent from '@/data/tea-content.json';

interface ThoughtCard {
  id: string;
  text: string;
  correctCategory: string;
  isDragging?: boolean;
}

export default function MatchThoughtsGame() {
  const categories = ['C', 'P', 'BW'];
  const categoryLabels: Record<string, string> = {
    'C': 'Catastrophizing',
    'P': 'Personalization',
    'BW': 'All or Nothing Thinking'
  };

  const [thoughts, setThoughts] = useState<ThoughtCard[]>([]);
  const [placedThoughts, setPlacedThoughts] = useState<Record<string, string>>({});
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const allThoughts: ThoughtCard[] = [];
    
    // Get all thoughts from scenarios with their correct labels
    teaContent.scenarios.forEach((scenario) => {
      scenario.thoughts.forEach((thought, index) => {
        allThoughts.push({
          id: `${scenario.id}-${index}`,
          text: thought.text,
          correctCategory: thought.label
        });
      });
    });

    // Add additional thoughts from the distortions
    teaContent.distortions.forEach((distortion) => {
      distortion.examples.forEach((example, index) => {
        allThoughts.push({
          id: `${distortion.id}-extra-${index}`,
          text: example,
          correctCategory: distortion.id
        });
      });
    });

    // Shuffle and take a subset for the game
    const shuffled = allThoughts.sort(() => Math.random() - 0.5);
    setThoughts(shuffled.slice(0, 12)); // Use 12 thoughts
    setPlacedThoughts({});
    setGameComplete(false);
    setScore(0);
  };

  const handleDragStart = (thought: ThoughtCard) => {
    // Set dragging state
  };

  const handleDragEnd = () => {
    // Clear dragging state
  };

  const handleDrop = (category: string, thought: ThoughtCard) => {
    setPlacedThoughts(prev => ({
      ...prev,
      [thought.id]: category
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    thoughts.forEach(thought => {
      if (placedThoughts[thought.id]) {
        total++;
        if (placedThoughts[thought.id] === thought.correctCategory) {
          correct++;
        }
      }
    });

    setScore(total > 0 ? Math.round((correct / total) * 100) : 0);
    setGameComplete(true);
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  const unplacedThoughts = thoughts.filter(thought => !placedThoughts[thought.id]);
  const placedThoughtsByCategory = {
    'C': thoughts.filter(t => placedThoughts[t.id] === 'C'),
    'P': thoughts.filter(t => placedThoughts[t.id] === 'P'),
    'BW': thoughts.filter(t => placedThoughts[t.id] === 'BW')
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">🎯 Match: Thoughts Game</h3>
        <p className="text-gray-600">
          Drag each thought to its correct thinking pattern category!
        </p>
      </div>

      {/* Category Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category}
            className="min-h-64 p-4 border-2 border-dashed rounded-2xl"
            style={{
              backgroundColor: category === 'C' ? 'rgba(239, 68, 68, 0.1)' : 
                             category === 'P' ? 'rgba(59, 130, 246, 0.1)' : 
                             'rgba(168, 85, 247, 0.1)',
              borderColor: category === 'C' ? 'rgba(239, 68, 68, 0.5)' : 
                          category === 'P' ? 'rgba(59, 130, 246, 0.5)' : 
                          'rgba(168, 85, 247, 0.5)'
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const thoughtId = e.dataTransfer.getData('thoughtId');
              const thought = thoughts.find(t => t.id === thoughtId);
              if (thought) {
                handleDrop(category, thought);
              }
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center mb-4">
              <h4 className="text-lg font-semibold mb-2">{categoryLabels[category]}</h4>
            </div>
            
            <div className="space-y-2">
              <AnimatePresence>
                {placedThoughtsByCategory[category].map((thought) => (
                  <motion.div
                    key={thought.id}
                    className="p-3 bg-white rounded-lg shadow-sm border cursor-move"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('thoughtId', thought.id);
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-sm text-gray-800">{thought.text}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Unplaced Thoughts */}
      {unplacedThoughts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50"
        >
          <h4 className="font-semibold text-gray-800 mb-3">Drag these thoughts to a category:</h4>
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

      {/* Score Display */}
      {gameComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-300"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">
              {score === 100 ? '🎉' : score >= 80 ? '🌟' : score >= 60 ? '👍' : '💪'}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Your Score: {score}%
            </h3>
            <p className="text-gray-600 mb-6">
              {score === 100 
                ? 'Perfect! You mastered these thinking patterns!' 
                : score >= 80 
                ? 'Great job! You really understand these concepts!' 
                : score >= 60 
                ? 'Good work! Keep practicing to improve!'
                : 'Keep trying! You\'re learning important skills!'}
            </p>
            <div className="space-x-4">
              <Button onClick={initializeGame} className="bg-blue-500 hover:bg-blue-600">
                Play Again
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

