import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import teaContent from '@/data/tea-content.json';
import CBTShell from '@/components/cbt/CBTShell';

export default function CBTScenarioDetail() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  
  const scenario = teaContent.scenarios.find(s => s.id === scenarioId);
  
  if (!scenario) {
    return (
      <CBTShell>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Scenario not found</h1>
          <Button onClick={() => navigate('/cbt')} className="mt-4">Back to Home</Button>
        </div>
      </CBTShell>
    );
  }

  const totalSlides = 8;
  
  const thoughtLabels: Record<string, string> = {
    'C': 'Catastrophizing',
    'P': 'Personalization',
    'BW': 'All or Nothing Thinking'
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
      case 2:
      case 3:
        // Scenario introduction and thoughts listing
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">{scenario.title}</h1>
              <p className="text-lg text-gray-600">
                Thoughts you might have:
              </p>
            </motion.div>
            
            <div className="grid gap-4">
              {scenario.thoughts.map((thought, index) => {
                const distortion = teaContent.distortions.find(d => d.id === thought.label);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-2 border-purple-300 bg-purple-50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {thought.label}
                          </div>
                          <div className="flex-1">
                            <p className="text-lg font-medium text-gray-800 mb-2">"{thought.text}"</p>
                            <p className="text-sm text-purple-700 font-semibold">{thoughtLabels[thought.label]}</p>
                            {currentSlide === 3 && distortion && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-3 p-3 bg-white rounded-lg border border-purple-200"
                              >
                                <p className="text-sm text-gray-700">{distortion.tip}</p>
                                <p className="text-sm font-medium text-purple-800 mt-1">
                                  Example: {distortion.description.split('.')[0]}.
                                </p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      
      case 4:
        // Thoughts are not facts introduction
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
                Remember: Thoughts are not Facts
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Thoughts… are any words, images, and ideas that run through your mind. As humans, we think constantly. 
                THOUGHTS help us make sense of the world around us and can influence how we feel and act. For example, 
                if you think, "I'm going to ace this test," you'll probably feel confident and do your best. But if you 
                think, "I'm terrible at this," you might feel anxious and not try as hard as a result.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We will learn how to IDENTIFY unhelpful thoughts, CHANGE unhelpful thoughts to positive ones, and ACT to 
                improve your mood.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-blue-800 mb-3">As you may know...</h3>
              <p className="text-base text-gray-700 mb-4">
                Our brains sometimes get stuck in certain ways of thinking, which can affect how we feel. 
                Interestingly enough, thoughts have patterns and many have special names.
              </p>
            </motion.div>
          </div>
        );

      case 5: {
        // Catastrophizing (C)
        const cDistortion = teaContent.distortions.find(d => d.id === 'C');
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-blue-50 border-2 border-blue-300 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-3">{cDistortion?.name}</h2>
              <p className="text-base text-gray-700 mb-3">{cDistortion?.description}</p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-lg font-semibold text-blue-700 mb-2">{cDistortion?.tip}</p>
              </div>
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">
                  Example: {cDistortion?.examples[0]}
                </p>
              </div>
            </motion.div>
          </div>
        );
      }

      case 6: {
        // Personalization (P)
        const pDistortion = teaContent.distortions.find(d => d.id === 'P');
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-orange-50 border-2 border-orange-300 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-orange-800 mb-3">{pDistortion?.name}</h2>
              <p className="text-base text-gray-700 mb-3">{pDistortion?.description}</p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-lg font-semibold text-orange-700 mb-2">{pDistortion?.tip}</p>
              </div>
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">
                  Example: {pDistortion?.examples[0]}
                </p>
              </div>
            </motion.div>
          </div>
        );
      }

      case 7: {
        // All or Nothing Thinking (BW)
        const bwDistortion = teaContent.distortions.find(d => d.id === 'BW');
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-purple-50 border-2 border-purple-300 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-purple-800 mb-3">{bwDistortion?.name}</h2>
              <p className="text-base text-gray-700 mb-3">{bwDistortion?.description}</p>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-lg font-semibold text-purple-700 mb-2">{bwDistortion?.tip}</p>
              </div>
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">
                  Example: {bwDistortion?.examples[0]}
                </p>
              </div>
            </motion.div>
          </div>
        );
      }

      case 8:
        // Ready for game
        return (
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl mb-6">🎮</div>
              <h2 className="text-3xl font-bold text-purple-700 mb-4">Ready to Play?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Let's test what you learned with a fun game!
              </p>
              <Button 
                onClick={() => navigate('/cbt/games')}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Start Thought Sorter Game
              </Button>
            </motion.div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <CBTShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i + 1 <= currentSlide ? 'bg-purple-600 w-8' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="min-h-96">
          {renderSlide()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-300">
          <Button
            onClick={() => {
              if (currentSlide > 1) {
                setCurrentSlide(currentSlide - 1);
              } else {
                navigate('/cbt');
              }
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentSlide === 1 ? 'Back to Scenarios' : 'Previous'}
          </Button>
          
          <span className="text-sm text-gray-600">
            Slide {currentSlide} of {totalSlides}
          </span>
          
          <Button
            onClick={() => {
              if (currentSlide < totalSlides) {
                setCurrentSlide(currentSlide + 1);
              }
            }}
            disabled={currentSlide >= totalSlides}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CBTShell>
  );
}

