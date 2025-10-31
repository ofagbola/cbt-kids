import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import teaContent from '@/data/tea-content.json';

interface ActionCard {
  id: string;
  feeling: string;
  action: string;
  isDragging?: boolean;
}

export default function ActionMatchGame() {
  const [feelings, setFeelings] = useState<ActionCard[]>([]);
  const [actions, setActions] = useState<ActionCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const allPairs = teaContent.actionMatches.map((pair, index) => ({
      id: `${pair.feeling}-${index}`,
      feeling: pair.feeling,
      action: pair.action
    }));

    const shuffled = allPairs.sort(() => Math.random() - 0.5);
    const gamePairs = shuffled.slice(0, 6); // Use 6 pairs

    setFeelings(gamePairs.map(p => ({
      id: p.id,
      feeling: p.feeling,
      action: p.action
    })));

    // Shuffle actions separately
    setActions([...gamePairs].sort(() => Math.random() - 0.5).map(p => ({
      id: p.id,
      feeling: p.feeling,
      action: p.action
    })));

    setMatchedPairs({});
    setSelectedFeeling(null);
    setGameComplete(false);
    setScore(0);
  };

  const handleFeelingClick = (feelingId: string) => {
    setSelectedFeeling(selectedFeeling === feelingId ? null : feelingId);
  };

  const handleActionClick = (action: ActionCard) => {
    if (!selectedFeeling) return;

    const feelingCard = feelings.find(f => f.id === selectedFeeling);
    if (!feelingCard) return;

    if (feelingCard.action === action.action) {
      // Correct match
      setMatchedPairs(prev => ({
        ...prev,
        [selectedFeeling]: action.id
      }));
      setScore(score + 1);
      
      // Check if game is complete
      if (Object.keys(matchedPairs).length + 1 === feelings.length) {
        setGameComplete(true);
      }
    }

    setSelectedFeeling(null);
  };

  const unmatchedFeelings = feelings.filter(f => !matchedPairs[f.id]);
  const matchedFeelings = feelings.filter(f => matchedPairs[f.id]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">🎯 Action Match Game</h3>
        <p className="text-gray-600">
          Match each feeling with a helpful action!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feelings Column */}
        <motion.div
          className="p-6 rounded-2xl border-2 border-blue-200 bg-blue-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">😊</div>
            <h4 className="text-lg font-semibold text-blue-800">How You're Feeling</h4>
            <p className="text-sm text-blue-600">Click to select</p>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {unmatchedFeelings.map((feeling) => (
              <motion.button
                key={feeling.id}
                onClick={() => handleFeelingClick(feeling.id)}
                className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                  selectedFeeling === feeling.id
                    ? 'bg-blue-300 border-2 border-blue-500 shadow-lg'
                    : 'bg-white border border-blue-200 hover:bg-blue-100'
                }`}
                whileHover={selectedFeeling !== feeling.id ? { scale: 1.02 } : {}}
              >
                {feeling.feeling}
              </motion.button>
            ))}
            <AnimatePresence>
              {matchedFeelings.map((feeling) => (
                <motion.button
                  key={feeling.id}
                  className="w-full text-left p-3 rounded-lg text-sm bg-green-200 border border-green-400 opacity-60 line-through"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {feeling.feeling}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Actions Column */}
        <motion.div
          className="p-6 rounded-2xl border-2 border-green-200 bg-green-50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">✨</div>
            <h4 className="text-lg font-semibold text-green-800">Helpful Actions</h4>
            <p className="text-sm text-green-600">Click to match</p>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {actions.map((action) => {
              const isMatched = Object.values(matchedPairs).includes(action.id);
              return (
                <motion.button
                  key={action.id}
                  onClick={() => handleActionClick(action)}
                  className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                    isMatched
                      ? 'bg-green-200 border border-green-400 opacity-60'
                      : 'bg-white border border-green-200 hover:bg-green-100'
                  }`}
                  whileHover={!isMatched ? { scale: 1.02 } : {}}
                  disabled={isMatched}
                >
                  {action.action}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Score Display */}
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800">
          Matched: {score} / {feelings.length}
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
                {score === feelings.length ? '🎉' : score >= feelings.length * 0.8 ? '🌟' : '💪'}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Great Job!
              </h3>
              <p className="text-gray-600 mb-6">
                {score === feelings.length 
                  ? 'Perfect! You matched all the actions correctly!' 
                  : score >= feelings.length * 0.8
                  ? 'Excellent! You really understand helpful actions!'
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
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 How to Play:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Click a feeling from the left column</li>
            <li>• Click the matching helpful action from the right column</li>
            <li>• Match all pairs correctly!</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

