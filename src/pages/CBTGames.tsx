import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FeelingDetective from '@/components/cbt/FeelingDetective';
import CBTPuzzle from '@/components/cbt/CBTPuzzle';
import ThoughtSorterGame from '@/components/cbt/ThoughtSorterGame';
import { useNavigate } from 'react-router-dom';

export default function CBTGames() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            onClick={() => navigate('/cbt')} 
            variant="outline"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to CBT
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 font-heading">🎮 CBT Games</h1>
        </div>

        {/* Games Container */}
        <motion.div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ThoughtSorterGame />
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2 font-subheading">Feeling Detective</h3>
            <FeelingDetective />
          </motion.div>

          <motion.div
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2 font-subheading">CBT Puzzle</h3>
            <CBTPuzzle />
          </motion.div>
        </div>
      </div>
    </div>
  );
}