import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  Home, 
  Gamepad2, 
  BookOpen, 
  Settings, 
  Mic, 
  MicOff,
  Send,
  Play,
  Pause,
  Volume2,
  Brain,
  Heart,
  Zap
} from 'lucide-react';
import cbtContent from '@/data/cbt-content.json';
import VisualCBT from '@/components/cbt/VisualCBT';
import FloatingImages from '@/components/FloatingImages';
import SpeechText from '@/components/SpeechText';
import CustomCursor from '@/components/CustomCursor';
import { useHoverBounce } from '@/lib/gsap';
import OnboardingCoach from '@/components/OnboardingCoach';
import { getSettings, saveSettings, AppSettings } from '@/lib/storage';

// Settings Component
function SettingsModal() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      return getSettings();
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        soundEnabled: false,
        animationsEnabled: true,
        reminderEnabled: true,
        theme: 'light'
      };
    }
  });
  const [open, setOpen] = useState(false);

  const handleSettingChange = (key: keyof AppSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          className="rounded-lg p-3 cursor-pointer transition-all w-full"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-6 h-6 text-gray-700" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Audio</label>
              <p className="text-xs text-muted-foreground">Enable sound effects and voice</p>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Animations</label>
              <p className="text-xs text-muted-foreground">Enable smooth animations</p>
            </div>
            <Switch
              checked={settings.animationsEnabled}
              onCheckedChange={(checked) => handleSettingChange('animationsEnabled', checked)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Sidebar Component
export function Sidebar() {
  const navigate = useNavigate();
  
  const icons = [
    { icon: Home, label: 'Home', onClick: () => navigate('/cbt') },
    { icon: Gamepad2, label: 'Games', onClick: () => navigate('/cbt/games') },
    { icon: BookOpen, label: 'Lessons', onClick: () => navigate('/cbt') },
    { icon: Settings, label: 'Settings', onClick: () => {} }
  ];

  return (
    <aside className="w-20 p-4 flex flex-col gap-3 rounded-2xl" style={{
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    }}>
      {icons.map((item, index) => (
        <div key={item.label}>
          {item.label === 'Settings' ? (
            <SettingsModal />
          ) : (
            <motion.button
              onClick={item.onClick}
              className="rounded-lg p-3 cursor-pointer transition-all w-full"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <item.icon className="w-6 h-6 text-gray-700" />
            </motion.button>
          )}
        </div>
      ))}
    </aside>
  );
}

// Mood Assessment Component
function MoodAssessment() {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('☀️');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { emoji: '😊', label: 'Happy', type: 'happy' },
    { emoji: '😐', label: 'Neutral', type: 'neutral' },
    { emoji: '😔', label: 'Sad', type: 'sad' },
    { emoji: '😰', label: 'Worried', type: 'worried' },
    { emoji: '😡', label: 'Angry', type: 'angry' }
  ];

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString(undefined, { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
    setDate(formattedDate);
    
    // Simple weather simulation
    const weathers = ['☀️', '⛅', '🌧️', '❄️'];
    setWeather(weathers[Math.floor(Math.random() * weathers.length)]);
  }, []);

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood.type);
    
    // Redirect based on mood
    setTimeout(() => {
      if (mood.type === 'happy' || mood.type === 'neutral') {
        // Happy and Neutral users go to calm corner or games
        const goToGames = Math.random() > 0.5;
        navigate(goToGames ? '/cbt/games' : '/cbt/calm');
      } else {
        // Sad/worried/angry users go to CBT scenarios
        // Scroll to scenarios section
        setTimeout(() => {
          const scenariosSection = document.getElementById('scenarios-section');
          scenariosSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }, 500);
  };

  return (
    <motion.div 
      className="p-6 rounded-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-purple-700 tracking-tight flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-600 text-white">🧠</span>
        <span className="drop-shadow-sm">
          <SpeechText>How are you feeling today?</SpeechText>
        </span>
      </h2>
      
      <div className="mt-6">
        <div className="flex flex-wrap gap-4 justify-center">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.type}
              onClick={() => handleMoodSelect(mood)}
              className={`p-4 rounded-2xl transition-all ${
                selectedMood === mood.type 
                  ? 'bg-purple-200 scale-105' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium text-gray-700">{mood.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <p className="text-sm text-gray-600">Today is {date}</p>
        <span className="text-lg">{weather}</span>
      </div>
    </motion.div>
  );
}

// Progress Tracker Component
function ProgressTracker() {
  const completedLessons = 12;
  const totalLessons = 36;
  const progress = (completedLessons / totalLessons) * 100;

  const skills = [
    { name: "Listening", level: "Intermediate", icon: "👂", progress: 60 },
    { name: "Cognition", level: "Intermediate", icon: "🧠", progress: 70 },
    { name: "Vocabulary", level: "Beginner", icon: "📚", progress: 40 },
    { name: "Social", level: "Intermediate", icon: "👥", progress: 55 },
  ];

  return (
    <motion.div
      className="p-6 rounded-2xl"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="font-semibold text-gray-800 mb-3 font-subheading">
        Overall Progress
      </div>
      <div className="text-sm text-gray-600 mb-2">
        {completedLessons} / {totalLessons} lessons completed
      </div>
      <Progress value={progress} className="h-3 mb-4" />
      <div className="text-sm text-gray-600 mb-3">30 mins per day</div>

      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <span className="text-lg">{skill.icon}</span>
            <div className="flex-1">
              <div className="text-xs font-medium">{skill.name}</div>
              <div className="text-xs text-gray-500">{skill.level}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Category Card Component
function CategoryCard({ category, onPick }) {
  const cardRef = useHoverBounce<HTMLButtonElement>();
  return (
    <div className="p-1 rounded-3xl border-4 border-dashed border-purple-700/80">
      <motion.button
        onClick={() => onPick(category)}
        className="w-full rounded-3xl"
        ref={cardRef}
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.06)",
        }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-5">
          <div>
            <div className="text-2xl font-bold text-gray-800 font-heading">
              {category.label}
            </div>
          </div>
          <div className="w-20 h-20 rounded-full bg-purple-700 text-white flex items-center justify-center">
            <span className="text-3xl">{category.emoji}</span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}

// CBT Triangle Component
function CBTTriangle() {
  return (
    <motion.div
      className="p-6 rounded-2xl"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="font-semibold text-gray-800 mb-3 flex items-center gap-2 font-subheading">
        <Brain className="w-5 h-5" />
        How CBT Works
      </div>
      <div className="text-sm text-gray-600 mb-4">
        The CBT triangle: Thoughts → Feelings → Behaviors
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
            T
          </div>
          <div>
            <div className="text-sm font-medium">Thoughts</div>
            <div className="text-xs text-gray-500">What we think</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
            F
          </div>
          <div>
            <div className="text-sm font-medium">Feelings</div>
            <div className="text-xs text-gray-500">How we feel</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
            B
          </div>
          <div>
            <div className="text-sm font-medium">Behaviors</div>
            <div className="text-xs text-gray-500">What we do</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Try the interactive example by choosing a category!
      </div>
    </motion.div>
  );
}

// Chat Bar Component
function ChatBar({ onSendMessage, isPlaying, onTogglePlay, voiceError, setVoiceError, settings }) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const quickSuggestions = [
    { text: "I'm worried about school tomorrow", emoji: "😰" },
    { text: "I had a fight with my friend", emoji: "😡" },
    { text: "I made a mistake and feel bad", emoji: "😔" },
    { text: "I feel overwhelmed with homework", emoji: "😵" },
    { text: "I'm sad about something", emoji: "😢" },
    { text: "I'm angry at my sibling", emoji: "😤" },
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown }).webkitSpeechRecognition || (window as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown }).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setVoiceError('Microphone access denied. Please allow microphone access for voice features.');
        } else if (event.error === 'network') {
          setVoiceError('Network error. Voice features require a secure connection (HTTPS).');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };
    } else {
      setVoiceError('Voice recognition not supported in this browser.');
    }
  }, [setVoiceError]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion.text);
    setShowSuggestions(false);
  };

  const startVoiceRecording = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setIsRecording(false);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 left-28 right-8 z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Quick Suggestions */}
      {showSuggestions && (
        <motion.div
          className="mb-4 p-4 rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="text-sm font-medium text-gray-700 mb-3 font-subheading">
            Quick suggestions:
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center gap-2 text-left p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{suggestion.emoji}</span>
                  <span>{suggestion.text}</span>
                </motion.button>
              ))}
            </div>
        </motion.div>
      )}

      <div
        className="p-4 rounded-2xl flex items-center gap-4"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {voiceError && (
          <div className="absolute -top-12 left-0 right-0 bg-yellow-100 border border-yellow-300 rounded-lg p-2 text-xs text-yellow-800">
            {voiceError}
          </div>
        )}
        {settings.soundEnabled && (
          <motion.button
            className={`rounded-full w-12 h-12 flex items-center justify-center ${
              isPlaying ? "bg-red-400" : "bg-green-400"
            } text-black shadow-md`}
            onClick={onTogglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </motion.button>
        )}

        {/* Wave Animation */}
        {settings.soundEnabled && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-blue-400 rounded-full"
                animate={{
                  height: isPlaying ? [4, 16, 4] : 4,
                }}
                transition={{
                  duration: 0.6,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}

        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write or say how you feel..."
            className="border-0 focus:ring-0 text-gray-800 pr-12"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          />
          <motion.button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowSuggestions(!showSuggestions)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            💡
          </motion.button>
        </div>

        <motion.button
          className={`rounded-full w-10 h-10 flex items-center justify-center ${
            isListening ? "bg-red-500 animate-pulse" : "bg-gray-200"
          } text-black`}
          onClick={isListening ? stopVoiceRecording : startVoiceRecording}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </motion.button>

        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Main App Component
export default function CBTApp() {
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [thought, setThought] = useState("");
  const [feeling, setFeeling] = useState(null);
  const [result, setResult] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [scenariosToShow, setScenariosToShow] = useState(6);
  const [settings] = useState<AppSettings>(() => {
    try {
      return getSettings();
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        soundEnabled: false,
        animationsEnabled: true,
        reminderEnabled: true,
        theme: 'light'
      };
    }
  });

  const handleCategoryPick = (category: { id: string; label: string; example: string; emoji: string; color: string }) => {
    setSelectedCategory(category);
    setShowChat(true);
  };

  const handleSendMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();

    // Enhanced keyword matching for better category detection
    const categoryKeywords = {
      anxious: [
        "anxious",
        "worried",
        "nervous",
        "scared",
        "afraid",
        "panic",
        "stress",
      ],
      mistake: ["mistake", "wrong", "error", "failed", "mess up", "screwed up"],
      friend: [
        "friend",
        "fight",
        "argue",
        "mad at",
        "upset with",
        "relationship",
      ],
      overwhelmed: [
        "overwhelmed",
        "too much",
        "can't handle",
        "stressed",
        "busy",
      ],
      sad: ["sad", "depressed", "down", "crying", "unhappy", "blue"],
      angry: ["angry", "mad", "furious", "rage", "irritated", "annoyed"],
    };

    // Find matching category based on keywords
    let matchingCategory = null;
    for (const [categoryId, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        matchingCategory = cbtContent.categories.find(
          (cat) => cat.id === categoryId
        );
        break;
      }
    }

    // Also check for direct category name matches
    if (!matchingCategory) {
      matchingCategory = cbtContent.categories.find(
        (cat) =>
          lowerMessage.includes(cat.label.toLowerCase()) ||
          lowerMessage.includes(cat.example.toLowerCase())
      );
    }

    if (matchingCategory) {
      handleCategoryPick(matchingCategory);
    } else {
      // Create custom category for the message with intelligent emoji selection
      let emoji = "💭";
      if (
        lowerMessage.includes("school") ||
        lowerMessage.includes("test") ||
        lowerMessage.includes("homework")
      ) {
        emoji = "📚";
      } else if (
        lowerMessage.includes("family") ||
        lowerMessage.includes("parent") ||
        lowerMessage.includes("mom") ||
        lowerMessage.includes("dad")
      ) {
        emoji = "👨‍👩‍👧‍👦";
      } else if (
        lowerMessage.includes("sport") ||
        lowerMessage.includes("game") ||
        lowerMessage.includes("play")
      ) {
        emoji = "⚽";
      }

      const customCategory = {
        id: "custom",
        label: "Your Situation",
        example: message,
        emoji: emoji,
        color: "bg-indigo-100 border-indigo-300",
      };
      handleCategoryPick(customCategory);
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetLesson = () => {
    setStep(0);
    setSelectedCategory(null);
    setThought("");
    setFeeling(null);
    setResult(null);
    setShowChat(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-200 via-sky-200 to-yellow-200 saturate-150 relative">
      <CustomCursor />
      <FloatingImages />
      <OnboardingCoach enabled showEveryTime />
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 relative z-10">
        <div className="col-span-1" data-onboard="sidebar">
          <Sidebar />
        </div>

        <div className="col-span-11">
          <div className="flex gap-6">
            <div className="flex-1">
              <MoodAssessment />

              <div className="mt-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  <Link to="/cbt/welcome" className="px-3 py-2 rounded bg-white/60 hover:bg-white/80 text-sm">Welcome</Link>
                  <Link to="/cbt/calm" className="px-3 py-2 rounded bg-white/60 hover:bg-white/80 text-sm">Calm Corner</Link>
                  <Link to="/cbt/journal" className="px-3 py-2 rounded bg-white/60 hover:bg-white/80 text-sm">Journal</Link>
                  <Link to="/cbt/help" className="px-3 py-2 rounded bg-white/60 hover:bg-white/80 text-sm">Help</Link>
                  <Link to="/cbt/thoughts" className="px-3 py-2 rounded bg-white/60 hover:bg-white/80 text-sm">Thoughts</Link>
                  <Link to="/cbt/emotions" className="px-3 py-2 rounded bg-white/60 hover:bg-white/80 text-sm">Emotions</Link>
                  <Link to="/cbt/actions" className="px-3 py-2 rounded bg-white/60 hover:bg-white/80 text-sm">Actions</Link>
                </div>
              
              <div className="mt-10" data-onboard="lessons" id="scenarios-section">
                <h2 className="text-xl font-bold text-gray-800 mb-4 font-heading">
                  What's bothering you today?
                </h2>

                {/* Scenarios Section */}
                <div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {cbtContent.categories.slice(0, scenariosToShow).map((category, index) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                        onPick={handleCategoryPick}
                      />
                    ))}
                  </div>
                  {scenariosToShow < cbtContent.categories.length && (
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline" 
                        className="bg-white/60 hover:bg-white/80"
                        onClick={() => {
                          // Show all remaining scenarios
                          setScenariosToShow(cbtContent.categories.length);
                        }}
                      >
                        View More Scenarios
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="mt-6">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="welcome"
                      className="p-6 rounded-2xl"
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "16px",
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(5px)",
                        WebkitBackdropFilter: "blur(5px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-4">🧠💭💖</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 font-heading">
                          Welcome to CBT for Kids!
                        </h3>
                        <p className="text-gray-600">
                          Select a category above or type your problem in the
                          chat bar below to start your CBT journey.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> */}
            </div>
            </div>

            {/* <aside className="w-96 space-y-4">
              <CBTTriangle />
              <ProgressTracker />
            </aside> */}
          </div>
        </div>
      </div>

      <div data-onboard="chatbar">
      <ChatBar
        onSendMessage={handleSendMessage}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        voiceError={voiceError}
        setVoiceError={setVoiceError}
        settings={settings}
      />
      </div>

      {/* Visual CBT Interface */}
      {showChat && selectedCategory && (
        <VisualCBT
          selectedCategory={selectedCategory}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}
