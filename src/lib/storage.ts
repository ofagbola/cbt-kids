// Local storage utilities for CBT Kids app
// Saves user progress, reflections, and completed journeys

export interface CBTJourney {
  id: string;
  timestamp: Date;
  problem: string;
  thought: string;
  feeling: string;
  behavior: string;
  plan: string;
  completed: boolean;
}

export interface UserProgress {
  totalJourneys: number;
  completedJourneys: number;
  favoriteStrategies: string[];
  lastActivity: Date;
}

const STORAGE_KEYS = {
  JOURNEYS: 'cbt-kids-journeys',
  PROGRESS: 'cbt-kids-progress',
  SETTINGS: 'cbt-kids-settings'
} as const;

// Journey management
export const saveJourney = (journey: Omit<CBTJourney, 'id' | 'timestamp'>): CBTJourney => {
  const newJourney: CBTJourney = {
    ...journey,
    id: `journey-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date()
  };

  const existingJourneys = getJourneys();
  const updatedJourneys = [...existingJourneys, newJourney];
  
  localStorage.setItem(STORAGE_KEYS.JOURNEYS, JSON.stringify(updatedJourneys));
  updateProgress();
  
  return newJourney;
};

export const getJourneys = (): CBTJourney[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.JOURNEYS);
    if (!stored) return [];
    
    const journeys = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return journeys.map((journey: any) => ({
      ...journey,
      timestamp: new Date(journey.timestamp)
    }));
  } catch (error) {
    console.error('Error loading journeys:', error);
    return [];
  }
};

export const getJourneyById = (id: string): CBTJourney | null => {
  const journeys = getJourneys();
  return journeys.find(journey => journey.id === id) || null;
};

// Progress tracking
export const updateProgress = (): UserProgress => {
  const journeys = getJourneys();
  const completedJourneys = journeys.filter(j => j.completed);
  
  const progress: UserProgress = {
    totalJourneys: journeys.length,
    completedJourneys: completedJourneys.length,
    favoriteStrategies: extractFavoriteStrategies(completedJourneys),
    lastActivity: new Date()
  };

  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  return progress;
};

export const getProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!stored) {
      return {
        totalJourneys: 0,
        completedJourneys: 0,
        favoriteStrategies: [],
        lastActivity: new Date()
      };
    }
    
    const progress = JSON.parse(stored);
    return {
      ...progress,
      lastActivity: new Date(progress.lastActivity)
    };
  } catch (error) {
    console.error('Error loading progress:', error);
    return {
      totalJourneys: 0,
      completedJourneys: 0,
      favoriteStrategies: [],
      lastActivity: new Date()
    };
  }
};

// Helper function to extract favorite coping strategies
const extractFavoriteStrategies = (journeys: CBTJourney[]): string[] => {
  const strategyCounts: Record<string, number> = {};
  
  journeys.forEach(journey => {
    // Extract strategies from the plan field
    const strategies = journey.plan.toLowerCase().split(/[,;.!?]/);
    strategies.forEach(strategy => {
      const trimmed = strategy.trim();
      if (trimmed.length > 3) {
        strategyCounts[trimmed] = (strategyCounts[trimmed] || 0) + 1;
      }
    });
  });
  
  // Return top 5 most used strategies
  return Object.entries(strategyCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([strategy]) => strategy);
};

// Settings management
export interface AppSettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  reminderEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export const getSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!stored) {
      return {
        soundEnabled: false,
        animationsEnabled: true,
        reminderEnabled: true,
        theme: 'light'
      };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      soundEnabled: false,
      animationsEnabled: true,
      reminderEnabled: true,
      theme: 'light'
    };
  }
};

export const saveSettings = (settings: AppSettings): void => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

// Clear all data (for privacy/reset)
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.JOURNEYS);
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
};

// Export data for backup
export const exportData = (): string => {
  const data = {
    journeys: getJourneys(),
    progress: getProgress(),
    settings: getSettings(),
    exportDate: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
};

// Import data from backup
export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.journeys) {
      localStorage.setItem(STORAGE_KEYS.JOURNEYS, JSON.stringify(data.journeys));
    }
    if (data.progress) {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data.progress));
    }
    if (data.settings) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
    }
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};