import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, ArrowLeft } from 'lucide-react';
import cbtContent from '@/data/cbt-content.json';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'question' | 'response' | 'suggestion';
}

interface CBTChatProps {
  selectedCategory: any;
  onClose: () => void;
}

export default function CBTChat({ selectedCategory, onClose }: CBTChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize with contextual greeting
  useEffect(() => {
    const contextualGreeting = getContextualGreeting(selectedCategory);
    setMessages([{
      id: '1',
      text: contextualGreeting,
      isBot: true,
      timestamp: new Date(),
      type: 'response'
    }]);
  }, [selectedCategory]);

  const getContextualGreeting = (category: any) => {
    const greetings = {
      'anxious': `Hi! I'm here to help you work through feeling anxious. I can see you're dealing with "${category.example}". Let's explore what's going through your mind and find some helpful ways to feel calmer. What thoughts are you having about this situation?`,
      'mistake': `Hello! I'm here to help you work through making a mistake. Everyone makes mistakes - it's part of learning! Let's talk about "${category.example}" and explore your thoughts, feelings, and how you can move forward. What's going through your mind right now?`,
      'friend': `Hi there! I'm here to help you work through friend troubles. I can see you're dealing with "${category.example}". Let's explore your thoughts and feelings about this situation and find some helpful ways to handle it. What are you thinking about this?`,
      'overwhelmed': `Hello! I'm here to help you when you feel overwhelmed. I can see you're dealing with "${category.example}". Let's break this down together and explore your thoughts, feelings, and find some calming strategies. What's going through your mind?`,
      'sad': `Hi! I'm here to help you work through feeling sad. I can see you're dealing with "${category.example}". It's okay to feel sad sometimes. Let's explore your thoughts and feelings and find some ways to help you feel better. What are you thinking about this situation?`,
      'angry': `Hello! I'm here to help you work through feeling angry. I can see you're dealing with "${category.example}". Feeling angry is normal, but let's explore your thoughts and find healthy ways to handle these feelings. What's going through your mind right now?`
    };
    
    return greetings[category.id] || `Hi! I'm here to help you work through "${category.label}". Let's start by exploring your thoughts, feelings, and behaviors together. What's going on for you right now?`;
  };
  const [inputText, setInputText] = useState('');
  const [currentStep, setCurrentStep] = useState<'thoughts' | 'feelings' | 'behaviors' | 'complete'>('thoughts');
  const [userThought, setUserThought] = useState('');
  const [userFeeling, setUserFeeling] = useState('');
  const [userBehavior, setUserBehavior] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string, step: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Detect cognitive distortions in user's thoughts
    const detectDistortions = (message: string) => {
      const distortionKeywords = {
        'catastrophize': ['ruin', 'worst', 'disaster', 'terrible', 'never', 'always'],
        'blackwhite': ['perfect', 'failure', 'always', 'never', 'all or nothing'],
        'mindread': ['they think', 'know what they feel', 'assume', 'must hate'],
        'fortune': ['never', 'always', 'forever', 'will never'],
        'should': ['should', 'must', 'ought to'],
        'labeling': ['stupid', 'dumb', 'bad', 'terrible person']
      };
      
      const detectedDistortions = [];
      for (const [distortionId, keywords] of Object.entries(distortionKeywords)) {
        if (keywords.some(keyword => lowerMessage.includes(keyword))) {
          const distortion = cbtContent.distortions.find(d => d.id === distortionId);
          if (distortion) detectedDistortions.push(distortion);
        }
      }
      return detectedDistortions;
    };

    // Generate empathetic responses
    const empatheticResponses = [
      "I can really hear how difficult this is for you.",
      "That sounds really challenging. I'm here to help.",
      "I understand why you'd feel that way.",
      "That must be really hard to deal with.",
      "I can see this is really affecting you."
    ];

    const randomEmpathy = empatheticResponses[Math.floor(Math.random() * empatheticResponses.length)];
    
    switch (step) {
      case 'thoughts':
        if (lowerMessage.includes('think') || lowerMessage.includes('thought') || lowerMessage.length > 10) {
          setUserThought(userMessage);
          const detectedDistortions = detectDistortions(userMessage);
          
          let responseText = `${randomEmpathy} You're thinking "${userMessage}". `;
          
          if (detectedDistortions.length > 0) {
            const distortion = detectedDistortions[0];
            responseText += `I notice you might be experiencing ${distortion.name.toLowerCase()}. `;
            responseText += `Instead of thinking "${distortion.example}", you could try: "${distortion.reframe}". `;
          }
          
          responseText += "Now let's explore how this thought makes you feel. What emotions are coming up for you right now?";
          
          setCurrentStep('feelings');
          return {
            text: responseText,
            suggestions: cbtContent.feelings.map(f => f.name)
          };
        }
        return {
          text: "I'm here to listen. Can you tell me more about what's going through your mind? What thoughts are you having about this situation?",
          suggestions: ['I think I made a mistake', 'I think everyone is better than me', 'I think something bad will happen']
        };

      case 'feelings':
        const matchingFeeling = cbtContent.feelings.find(f => 
          lowerMessage.includes(f.name.toLowerCase()) || 
          lowerMessage.includes(f.emoji) ||
          f.name.toLowerCase().includes(lowerMessage.split(' ')[0])
        );
        
        if (matchingFeeling) {
          setUserFeeling(matchingFeeling.name);
          setCurrentStep('behaviors');
          
          let responseText = `${randomEmpathy} You're feeling ${matchingFeeling.name} ${matchingFeeling.emoji}. `;
          responseText += `That's a completely normal reaction to what you're thinking. `;
          responseText += `Now let's talk about what you did or want to do. How did you respond to this situation?`;
          
          return {
            text: responseText,
            suggestions: ['I yelled at someone', 'I ran away', 'I cried', 'I tried to ignore it', 'I asked for help']
          };
        }
        return {
          text: "I understand you're having some strong feelings. Can you tell me more about what you're experiencing? What emotions are you feeling right now?",
          suggestions: cbtContent.feelings.map(f => f.name)
        };

      case 'behaviors':
        setUserBehavior(userMessage);
        setCurrentStep('complete');
        
        let responseText = `Thank you for being so honest about what you did. `;
        responseText += `You responded by ${userMessage}. `;
        responseText += `That's understandable given how you were feeling. `;
        
        if (userFeeling) {
          const feeling = cbtContent.feelings.find(f => f.name === userFeeling);
          if (feeling && feeling.strategies.length > 0) {
            responseText += `For next time when you feel ${userFeeling}, you could try: ${feeling.strategies[0]}. `;
          }
        }
        
        responseText += `You've done amazing work exploring your thoughts, feelings, and behaviors!`;
        
        return {
          text: responseText,
          suggestions: ['What could I try differently?', 'How can I handle this better?', 'What strategies might help?', 'Can you help me practice?']
        };

      case 'complete':
        if (lowerMessage.includes('differently') || lowerMessage.includes('better') || lowerMessage.includes('strategies')) {
          return {
            text: `Great question! Here are some helpful strategies for next time: 1) Take 3 deep breaths before reacting, 2) Ask yourself "Is this thought really true?", 3) Try to find one positive thing about the situation, 4) Talk to a trusted adult or friend. Would you like to practice any of these?`,
            suggestions: ['Practice deep breathing', 'Practice thought checking', 'Try another problem', 'I want to learn more']
          };
        }
        return {
          text: "You've completed a full CBT exploration! You're learning so much about how your thoughts, feelings, and behaviors work together. Would you like to try another problem or learn more about coping strategies?",
          suggestions: ['Try another problem', 'Learn coping strategies', 'Practice thought reframing', 'I want to learn more']
        };

      default:
        return {
          text: "I'm here to help you work through this! Can you tell me more about what's on your mind? What's the situation you'd like to explore?",
          suggestions: ['I had a fight with my friend', 'I am worried about school', 'I made a mistake', 'I feel overwhelmed']
        };
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
      type: 'question'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get bot response
    setTimeout(() => {
      const response = getBotResponse(inputText, currentStep);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        type: 'response'
      };

      setMessages(prev => [...prev, botMessage]);

      // Add suggestions if any
      if (response.suggestions.length > 0) {
        setTimeout(() => {
          const suggestionMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "Here are some options:",
            isBot: true,
            timestamp: new Date(),
            type: 'suggestion'
          };
          setMessages(prev => [...prev, suggestionMessage]);
        }, 500);
      }
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 border-1 border-black">
      <motion.div
        className="rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(128, 128, 128, 1)'
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-black" />
            </div>
            <div>
                <h3 className="font-semibold text-gray-800 font-subheading">CBT Assistant</h3>
              <p className="text-sm text-gray-600">{selectedCategory.label}</p>
            </div>
          </div>
          <Button onClick={onClose} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isBot
                    ? 'text-gray-800'
                    : 'bg-blue-500 text-black'
                }`} style={message.isBot ? {
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                } : {}}>
                  <div className="flex items-start gap-2">
                    {message.isBot && (
                      <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Suggestions */}
          {messages.length > 0 && messages[messages.length - 1].type === 'suggestion' && (
            <motion.div
              className="flex flex-wrap gap-2 justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {(() => {
                const lastMessage = messages[messages.length - 2];
                if (lastMessage?.type === 'response') {
                  const response = getBotResponse('', currentStep);
                  return response.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-gray-700 hover:opacity-80 transition-opacity"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {suggestion}
                    </Button>
                  ));
                }
                return null;
              })()}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/30">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your response..."
              className="flex-1 focus:border-blue-500"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}