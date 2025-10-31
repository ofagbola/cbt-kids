import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import teaContent from '@/data/tea-content.json';

interface ReframePair {
  id: string;
  unhelpful: string;
  positive: string;
  incorrect?: string;
}

export default function ThoughtReframingGame() {
  const [reframes, setReframes] = useState<ReframePair[]>([]);
  const [selectedThought, setSelectedThought] = useState<ReframePair | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState(false);

  React.useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const allReframes = teaContent.thoughtReframes.map((pair, index) => ({
      id: `reframe-${index}`,
      unhelpful: pair.unhelpful,
      positive: pair.positive,
      incorrect: undefined
    }));

    // Shuffle and take 8 pairs
    const shuffled = allReframes.sort(() => Math.random() - 0.5);
    setReframes(shuffled.slice(0, 8));
    setSelectedThought(null);
    setScore(0);
    setGameComplete(false);
  };

  const handleSelectThought = (thought: ReframePair) => {
    setSelectedThought(thought);
  };

  const handleMatchPositive = (positive: string) => {
    if (!selectedThought) return;

    if (selectedThought.positive === positive) {
      // Correct match!
      setScore(score + 1);
      setReframes(prev => prev.map(r => 
        r.id === selectedThought.id ? { ...r, incorrect: positive } : r
      ));
    } else {
      // Incorrect match
      setReframes(prev => prev.map(r => 
        r.id === selectedThought.id ? { ...r, incorrect: positive } : r
      ));
    }

    setSelectedThought(null);

    // Check if game is complete
    if (reframes.every(r => r.incorrect !== undefined || r.id === selectedThought.id)) {
      setGameComplete(true);
    }
  };

  const currentReframe = selectedThought;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">🔄 Thought Reframing Game</h3>
        <p className="text-gray-600">
          Match unhelpful thoughts with positive replacements!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unhelpful Thoughts Column */}
        <motion.div
          className="p-6 rounded-2xl border-2 border-red-200 bg-red-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">❌</div>
            <h4 className="text-lg font-semibold text-red-800">Unhelpful Thought</h4>
            <p className="text-sm text-red-600">Click to select</p>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {reframes.map((reframe) => (
              <motion.button
                key={reframe.id}
                onClick={() => handleSelectThought(reframe)}
                className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                  currentReframe?.id === reframe.id
                    ? 'bg-red-300 border-2 border-red-500 shadow-lg'
                    : reframe.incorrect
                    ? 'bg-gray-300 opacity-50'
                    : 'bg-white border border-red-200 hover:bg-red-100'
                }`}
                whileHover={currentReframe?.id !== reframe.id ? { scale: 1.02 } : {}}
                disabled={!!reframe.incorrect}
              >
                {reframe.unhelpful}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Positive Thoughts Column */}
        <motion.div
          className="p-6 rounded-2xl border-2 border-green-200 bg-green-50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="text-lg font-semibold text-green-800">Positive Thought</h4>
            <p className="text-sm text-green-600">Click to match</p>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {reframes
                .map(r => r.positive)
                .filter((v, i, a) => a.indexOf(v) === i) // Get unique positive thoughts
                .map((positive) => (
                  <motion.button
                    key={positive}
                    onClick={() => handleMatchPositive(positive)}
                    className="w-full text-left p-3 rounded-lg text-sm bg-white border border-green-200 hover:bg-green-100 transition-all"
                    whileHover={{ scale: 1.02 }}
                    disabled={!currentReframe}
                  >
                    {positive}
                  </motion.button>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Score Display */}
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800">
          Score: {score} / {reframes.length}
        </div>
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
              <div className="text-6xl mb-4">
                {score === reframes.length ? '🎉' : score >= reframes.length * 0.8 ? '🌟' : '💪'}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Game Complete!
              </h3>
              <p className="text-gray-600 mb-6">
                {score === reframes.length 
                  ? 'Perfect! You mastered reframing thoughts!' 
                  : score >= reframes.length * 0.8
                  ? 'Great job! You really understand how to reframe thoughts!'
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
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-purple-800 mb-2">💡 How to Play:</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Click an unhelpful thought from the left column</li>
            <li>• Click the matching positive thought from the right column</li>
            <li>• Match all pairs correctly!</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

