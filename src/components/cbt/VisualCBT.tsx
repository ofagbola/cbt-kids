import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, User, ArrowLeft, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import cbtContent from '@/data/cbt-content.json';
import teaContent from '@/data/tea-content.json';
import FloatingImages from '@/components/FloatingImages';
import SpeechText from '@/components/SpeechText';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type: 'response' | 'thought' | 'feeling' | 'behavior';
  suggestions?: string[];
  emojiOptions?: { emoji: string; label: string; value: string }[];
}

interface Category {
  id: string;
  label: string;
  example?: string;
}

interface VisualCBTProps {
  selectedCategory: Category;
  onClose: () => void;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

export default function VisualCBT({ selectedCategory, onClose }: VisualCBTProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentStep, setCurrentStep] = useState<'thoughts' | 'feelings' | 'behaviors' | 'complete'>('thoughts');
  const [userThought, setUserThought] = useState('');
  const [userFeeling, setUserFeeling] = useState('');
  const [userBehavior, setUserBehavior] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown }).webkitSpeechRecognition || (window as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown }).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition() as SpeechRecognitionInstance;
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: { results: { 0: { 0: { transcript: string } } } }) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  // Initialize with contextual greeting
  useEffect(() => {
    const contextualGreeting = getContextualGreeting(selectedCategory);
    setMessages([{
      id: '1',
      text: contextualGreeting,
      isBot: true,
      timestamp: new Date(),
      type: 'response',
      emojiOptions: getEmojiOptions('thoughts')
    }]);
  }, [selectedCategory]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getContextualGreeting = (category: Category) => {
    // Check if we have a detailed scenario in teaContent
    const detailedScenario = teaContent.scenarios.find(s => s.id === category.id);
    
    if (detailedScenario) {
      return `Hi! I can help with "${category.label}". I can see you're dealing with something tough. Let's explore what thoughts you might be having about this situation.`;
    }
    
    // Fallback for other categories
    const greetings = {
      'anxious': `Hi! I'm here to help with your worries. Let's talk about "${category.example}". What are you thinking?`,
      'mistake': `Hello! Everyone makes mistakes - it's okay! Let's talk about "${category.example}". What's on your mind?`,
      'friend': `Hi! Let's work through friend troubles together. What happened with "${category.example}"?`,
      'overwhelmed': `Hello! Feeling overwhelmed is tough. Let's break it down together. What's bothering you?`,
      'sad': `Hi! It's okay to feel sad sometimes. Let's talk about "${category.example}". What are you thinking?`,
      'angry': `Hello! Feeling angry is normal. Let's find healthy ways to handle it. What's going on?`
    };
    
    return greetings[category.id] || `Hi! Let's work through "${category.label}" together. What's happening?`;
  };

  const getEmojiOptions = (step: string) => {
    switch (step) {
      case 'thoughts':
        return [
          { emoji: '😰', label: 'Worried', value: 'I am worried about what might happen' },
          { emoji: '😔', label: 'Sad', value: 'I feel sad about this situation' },
          { emoji: '😡', label: 'Angry', value: 'I am angry about what happened' },
          { emoji: '😰', label: 'Scared', value: 'I am scared of what might happen' },
          { emoji: '😕', label: 'Confused', value: 'I am confused about this situation' },
          { emoji: '😤', label: 'Frustrated', value: 'I am frustrated with this situation' }
        ];
      case 'feelings':
        return cbtContent.feelings.map(feeling => ({
          emoji: feeling.emoji,
          label: feeling.name,
          value: feeling.name
        }));
      case 'behaviors':
        return [
          { emoji: '😭', label: 'Cried', value: 'I cried about it' },
          { emoji: '😤', label: 'Yelled', value: 'I yelled at someone' },
          { emoji: '🏃', label: 'Ran away', value: 'I ran away from the situation' },
          { emoji: '🤗', label: 'Asked for help', value: 'I asked someone for help' },
          { emoji: '😐', label: 'Ignored it', value: 'I tried to ignore it' },
          { emoji: '💭', label: 'Thought about it', value: 'I thought about what to do' }
        ];
      default:
        return [];
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled) return;
    
    if (synthRef.current) {
      window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

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
      "I hear you.",
      "That sounds tough.",
      "I understand.",
      "That must be hard.",
      "I'm here to help."
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
            responseText += `This might be ${distortion.name.toLowerCase()}. `;
            responseText += `Try thinking: "${distortion.reframe}". `;
          }
          
          responseText += "How does this thought make you feel?";
          
          setCurrentStep('feelings');
          return {
            text: responseText,
            emojiOptions: getEmojiOptions('feelings')
          };
        }
        return {
          text: "Tell me what you're thinking. What's on your mind?",
          emojiOptions: getEmojiOptions('thoughts')
        };

      case 'feelings': {
        const matchingFeeling = cbtContent.feelings.find(f => 
          lowerMessage.includes(f.name.toLowerCase()) || 
          lowerMessage.includes(f.emoji) ||
          f.name.toLowerCase().includes(lowerMessage.split(' ')[0])
        );
        
        if (matchingFeeling) {
          setUserFeeling(matchingFeeling.name);
          setCurrentStep('behaviors');
          
          let responseText = `${randomEmpathy} You feel ${matchingFeeling.name} ${matchingFeeling.emoji}. `;
          responseText += `That's normal! `;
          responseText += `What did you do?`;
          
          return {
            text: responseText,
            emojiOptions: getEmojiOptions('behaviors')
          };
        }
        return {
          text: "What are you feeling? Choose an emotion:",
          emojiOptions: getEmojiOptions('feelings')
        };
      }

      case 'behaviors': {
        setUserBehavior(userMessage);
        setCurrentStep('complete');
        
        let responseText = `You did: ${userMessage}. `;
        responseText += `That's okay! `;
        
        if (userFeeling) {
          const feeling = cbtContent.feelings.find(f => f.name === userFeeling);
          if (feeling && feeling.strategies.length > 0) {
            responseText += `Next time you feel ${userFeeling}, try: ${feeling.strategies[0]}. `;
          }
        }
        
        responseText += `Great job! 🎉`;
        
        return {
          text: responseText,
          emojiOptions: [
            { emoji: '🎉', label: 'Celebrate', value: 'I want to celebrate!' },
            { emoji: '🔄', label: 'Try Again', value: 'I want to try another problem' },
            { emoji: '💡', label: 'Learn More', value: 'I want to learn more strategies' },
            { emoji: '🏆', label: 'Practice', value: 'I want to practice more' }
          ]
        };
      }

      case 'complete':
        if (lowerMessage.includes('differently') || lowerMessage.includes('better') || lowerMessage.includes('strategies')) {
          return {
            text: `Here are some helpful tips: 1) Take 3 deep breaths, 2) Ask "Is this true?", 3) Find one good thing, 4) Talk to someone. Want to practice?`,
            emojiOptions: [
              { emoji: '🫁', label: 'Breathing', value: 'Practice deep breathing' },
              { emoji: '🤔', label: 'Thought Check', value: 'Practice thought checking' },
              { emoji: '✨', label: 'Positive', value: 'Find positive things' },
              { emoji: '👥', label: 'Talk', value: 'Talk to someone' }
            ]
          };
        }
        return {
          text: "You did great! 🎉 Want to try another problem or learn more?",
          emojiOptions: [
            { emoji: '🔄', label: 'Try Again', value: 'Try another problem' },
            { emoji: '💡', label: 'Learn More', value: 'Learn coping strategies' },
            { emoji: '🎯', label: 'Practice', value: 'Practice thought reframing' },
            { emoji: '📚', label: 'More Info', value: 'I want to learn more' }
          ]
        };

      default:
        return {
          text: "I'm here to help! What's bothering you?",
          emojiOptions: getEmojiOptions('thoughts')
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
      type: 'thought'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    const botResponse = getBotResponse(userMessage.text, currentStep);

    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        type: 'response',
        emojiOptions: botResponse.emojiOptions
      };
      
      setMessages((prev) => [...prev, newMessage]);
      
      // Speak the bot response
      speakText(botResponse.text);
    }, 500);
  };

  const handleEmojiClick = (emojiOption: { emoji: string; label: string; value: string }) => {
    setInputText(emojiOption.value);
    // Auto-send the message
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <FloatingImages />
      <motion.div
        className="rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col relative z-10"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
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
          <div className="flex items-center gap-2">
            <Button 
              onClick={toggleVoice} 
              variant="outline" 
              size="sm"
              className={voiceEnabled ? 'bg-green-100' : 'bg-red-100'}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button onClick={onClose} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
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
                    <p className="text-sm font-body">
                      <SpeechText>{message.text}</SpeechText>
                    </p>
                    {message.emojiOptions && message.emojiOptions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.emojiOptions.map((option, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleEmojiClick(option)}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-lg">{option.emoji}</span>
                            <span className="text-gray-700">{option.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                  {!message.isBot && (
                    <User className="w-4 h-4 mt-1 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-white/30 flex items-center gap-2">
          <Button
            onClick={isListening ? stopListening : startListening}
            variant="outline"
            size="sm"
            className={isListening ? 'bg-red-100 animate-pulse' : 'bg-blue-100'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response or use voice..."
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
            Send
          </Button>
        </div>
      </motion.div>
    </div>
  );
}