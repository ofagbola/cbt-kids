// Comprehensive CBT content library for kids
// Cognitive distortions, coping strategies, and reframing examples

export interface CognitiveDistortion {
  name: string;
  description: string;
  example: string;
  reframe: string;
  emoji: string;
  keywords: string[];
}

export interface CopingStrategy {
  name: string;
  description: string;
  steps: string[];
  emoji: string;
  category: 'breathing' | 'grounding' | 'movement' | 'thinking' | 'social';
}

export interface ReframeExample {
  original: string;
  reframed: string;
  explanation: string;
}

// Cognitive Distortions (Thought Traps)
export const COGNITIVE_DISTORTIONS: CognitiveDistortion[] = [
  {
    name: "Catastrophizing",
    description: "Thinking the worst will happen",
    example: "If I fail this test, my whole life is ruined!",
    reframe: "It feels big now, but I can handle it step by step.",
    emoji: "🌪️",
    keywords: ["worst", "ruin", "disaster", "terrible", "awful", "horrible"]
  },
  {
    name: "Black-and-White Thinking",
    description: "Seeing only extremes, no middle ground",
    example: "I'm either perfect or I'm a total failure.",
    reframe: "I can make mistakes and still be awesome.",
    emoji: "⚫⚪",
    keywords: ["always", "never", "perfect", "failure", "all", "none", "everyone", "no one"]
  },
  {
    name: "Mind Reading",
    description: "Assuming you know what others are thinking",
    example: "They didn't talk to me, so they must hate me.",
    reframe: "Maybe they're having a tough day too—there could be other reasons.",
    emoji: "🧠👀",
    keywords: ["hate", "mad", "angry", "disappointed", "must", "probably", "definitely"]
  },
  {
    name: "Fortune Telling",
    description: "Predicting bad things will happen",
    example: "I know I'm going to mess up tomorrow.",
    reframe: "I can't predict the future, but I can prepare and do my best.",
    emoji: "🔮",
    keywords: ["going to", "will", "know", "sure", "definitely", "guaranteed"]
  },
  {
    name: "Should Statements",
    description: "Using 'should' to pressure yourself",
    example: "I should be better at this by now.",
    reframe: "I'm learning and growing at my own pace.",
    emoji: "📏",
    keywords: ["should", "must", "have to", "need to", "supposed to"]
  },
  {
    name: "Labeling",
    description: "Calling yourself names",
    example: "I'm such a loser.",
    reframe: "I made a mistake, but that doesn't make me a loser.",
    emoji: "🏷️",
    keywords: ["loser", "stupid", "dumb", "bad", "terrible", "awful", "worthless"]
  },
  {
    name: "Personalization",
    description: "Taking responsibility for things outside your control",
    example: "It's my fault my friend is sad.",
    reframe: "I care about my friend, but their feelings aren't my responsibility.",
    emoji: "👤",
    keywords: ["my fault", "because of me", "if only I", "I caused"]
  },
  {
    name: "Filtering",
    description: "Only noticing the negative parts",
    example: "Everyone else did better than me on the test.",
    reframe: "I did my best, and that's what matters most.",
    emoji: "🔍",
    keywords: ["but", "however", "except", "only", "just", "merely"]
  }
];

// Coping Strategies
export const COPING_STRATEGIES: CopingStrategy[] = [
  // Breathing Techniques
  {
    name: "5-4-3-2-1 Grounding",
    description: "Connect with your senses to feel calmer",
    steps: [
      "Name 5 things you can see",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell",
      "Name 1 thing you can taste"
    ],
    emoji: "🌍",
    category: "grounding"
  },
  {
    name: "Box Breathing",
    description: "Breathe in a square pattern",
    steps: [
      "Breathe in for 4 counts",
      "Hold for 4 counts",
      "Breathe out for 4 counts",
      "Hold for 4 counts",
      "Repeat 3-5 times"
    ],
    emoji: "📦",
    category: "breathing"
  },
  {
    name: "Belly Breathing",
    description: "Deep breathing to calm your body",
    steps: [
      "Put one hand on your belly",
      "Breathe in slowly through your nose",
      "Feel your belly rise",
      "Breathe out slowly through your mouth",
      "Repeat 5-10 times"
    ],
    emoji: "🫁",
    category: "breathing"
  },

  // Movement Techniques
  {
    name: "Butterfly Hugs",
    description: "Cross your arms and tap gently",
    steps: [
      "Cross your arms over your chest",
      "Tap your shoulders alternately",
      "Tap left shoulder, then right",
      "Continue for 30 seconds",
      "Take deep breaths while tapping"
    ],
    emoji: "🦋",
    category: "movement"
  },
  {
    name: "Progressive Muscle Relaxation",
    description: "Tense and release muscles to relax",
    steps: [
      "Start with your toes",
      "Squeeze tight for 5 seconds",
      "Release and feel the relaxation",
      "Move up to calves, thighs, belly",
      "Continue to shoulders and face"
    ],
    emoji: "💪",
    category: "movement"
  },
  {
    name: "Gentle Stretching",
    description: "Move your body to release tension",
    steps: [
      "Reach your arms up high",
      "Stretch to each side",
      "Roll your shoulders",
      "Shake out your hands",
      "Take deep breaths"
    ],
    emoji: "🤸",
    category: "movement"
  },

  // Thinking Techniques
  {
    name: "Positive Self-Talk",
    description: "Say kind things to yourself",
    steps: [
      "Think of something you're good at",
      "Say 'I can handle this'",
      "Remind yourself 'I'm learning'",
      "Say 'I'm doing my best'",
      "Repeat your favorite positive phrase"
    ],
    emoji: "💭",
    category: "thinking"
  },
  {
    name: "Count Your Blessings",
    description: "Think of things you're grateful for",
    steps: [
      "Think of 3 people who love you",
      "Name 2 things you're good at",
      "Remember 1 fun thing you did today",
      "Say 'I'm grateful for...'",
      "Feel the warmth in your heart"
    ],
    emoji: "🙏",
    category: "thinking"
  },
  {
    name: "Problem-Solving Steps",
    description: "Break big problems into small steps",
    steps: [
      "What exactly is the problem?",
      "What are 3 possible solutions?",
      "Which one feels most doable?",
      "What's the first tiny step?",
      "Try it and see what happens"
    ],
    emoji: "🧩",
    category: "thinking"
  },

  // Social Techniques
  {
    name: "Ask for Help",
    description: "Reach out to someone you trust",
    steps: [
      "Think of a trusted adult",
      "Tell them how you're feeling",
      "Ask for a hug or support",
      "Share what's bothering you",
      "Listen to their advice"
    ],
    emoji: "🤝",
    category: "social"
  },
  {
    name: "Write It Down",
    description: "Put your thoughts on paper",
    steps: [
      "Get paper and pen",
      "Write how you're feeling",
      "Write what's bothering you",
      "Write what you wish would happen",
      "Tear it up or keep it private"
    ],
    emoji: "📝",
    category: "thinking"
  }
];

// Feeling-specific coping strategies
export const FEELING_STRATEGIES: Record<string, CopingStrategy[]> = {
  angry: [
    COPING_STRATEGIES.find(s => s.name === "Box Breathing")!,
    COPING_STRATEGIES.find(s => s.name === "Progressive Muscle Relaxation")!,
    COPING_STRATEGIES.find(s => s.name === "Gentle Stretching")!,
    COPING_STRATEGIES.find(s => s.name === "Ask for Help")!
  ],
  nervous: [
    COPING_STRATEGIES.find(s => s.name === "5-4-3-2-1 Grounding")!,
    COPING_STRATEGIES.find(s => s.name === "Butterfly Hugs")!,
    COPING_STRATEGIES.find(s => s.name === "Belly Breathing")!,
    COPING_STRATEGIES.find(s => s.name === "Positive Self-Talk")!
  ],
  sad: [
    COPING_STRATEGIES.find(s => s.name === "Count Your Blessings")!,
    COPING_STRATEGIES.find(s => s.name === "Ask for Help")!,
    COPING_STRATEGIES.find(s => s.name === "Write It Down")!,
    COPING_STRATEGIES.find(s => s.name === "Gentle Stretching")!
  ],
  happy: [
    COPING_STRATEGIES.find(s => s.name === "Count Your Blessings")!,
    COPING_STRATEGIES.find(s => s.name === "Write It Down")!,
    COPING_STRATEGIES.find(s => s.name === "Positive Self-Talk")!
  ],
  tired: [
    COPING_STRATEGIES.find(s => s.name === "Gentle Stretching")!,
    COPING_STRATEGIES.find(s => s.name === "Belly Breathing")!,
    COPING_STRATEGIES.find(s => s.name === "Progressive Muscle Relaxation")!
  ],
  frustrated: [
    COPING_STRATEGIES.find(s => s.name === "Problem-Solving Steps")!,
    COPING_STRATEGIES.find(s => s.name === "Box Breathing")!,
    COPING_STRATEGIES.find(s => s.name === "Ask for Help")!,
    COPING_STRATEGIES.find(s => s.name === "Positive Self-Talk")!
  ]
};

// Reframing Examples
export const REFRAME_EXAMPLES: ReframeExample[] = [
  {
    original: "I'm terrible at math",
    reframed: "Math is challenging for me, and I'm learning",
    explanation: "Instead of labeling yourself, focus on the learning process"
  },
  {
    original: "Everyone is better than me",
    reframed: "I'm on my own journey and doing my best",
    explanation: "Compare yourself to your past self, not others"
  },
  {
    original: "I'll never get this right",
    reframed: "I'm still learning and improving",
    explanation: "Replace 'never' with 'not yet' - you're still growing"
  },
  {
    original: "They must think I'm weird",
    reframed: "I don't know what they're thinking, and that's okay",
    explanation: "We can't read minds, and most people are focused on themselves"
  },
  {
    original: "This is going to be a disaster",
    reframed: "This feels scary, but I can handle whatever happens",
    explanation: "Focus on your ability to cope rather than predicting doom"
  },
  {
    original: "I should be perfect",
    reframed: "I'm human and making mistakes is how I learn",
    explanation: "Perfection isn't realistic - learning from mistakes is valuable"
  }
];

// Helper functions
export const detectCognitiveDistortions = (text: string): CognitiveDistortion[] => {
  const detected: CognitiveDistortion[] = [];
  const lowerText = text.toLowerCase();
  
  COGNITIVE_DISTORTIONS.forEach(distortion => {
    const hasKeyword = distortion.keywords.some(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );
    if (hasKeyword) {
      detected.push(distortion);
    }
  });
  
  // If no specific distortions detected, return common ones
  return detected.length > 0 ? detected : COGNITIVE_DISTORTIONS.slice(0, 3);
};

export const getReframeSuggestions = (distortions: CognitiveDistortion[]): string[] => {
  return distortions.map(d => d.reframe);
};

export const getCopingStrategiesForFeeling = (feeling: string): CopingStrategy[] => {
  return FEELING_STRATEGIES[feeling] || [
    COPING_STRATEGIES.find(s => s.name === "5-4-3-2-1 Grounding")!,
    COPING_STRATEGIES.find(s => s.name === "Belly Breathing")!,
    COPING_STRATEGIES.find(s => s.name === "Ask for Help")!
  ];
};