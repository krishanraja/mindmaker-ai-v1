import { useState, useCallback, useRef, useEffect } from 'react';
import { useStatsTimer, getTimeBasedInterval, addRandomVariation } from './useStatsTimer';
import { useOpenAIContext } from './useOpenAIContext';

interface CounterState {
  aiTrainingSearches: number;
  aiReplaceSearches: number;
  unpreparedPercentage: number;
}

interface CounterData {
  key: string;
  value: number;
  label: string;
  icon: any;
  color: string;
  bgColor: string;
  pulse: boolean;
  suffix?: string;
}

interface UseRealisticCountersOptions {
  isVisible: boolean;
}

const STORAGE_KEY = 'realistic_counters_state';
const HOURLY_RESET_KEY = 'last_hourly_reset';

// Base realistic starting values
const getInitialCounters = (): CounterState => {
  const now = new Date();
  const hour = now.getHours();
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  
  // Adjust base values based on time
  const weekendMultiplier = isWeekend ? 0.6 : 1;
  const hourMultiplier = hour >= 9 && hour <= 17 ? 1.2 : 0.7;
  
  return {
    aiTrainingSearches: Math.round(2847 * weekendMultiplier * hourMultiplier),
    aiReplaceSearches: Math.round((800 + Math.random() * 700) * weekendMultiplier * hourMultiplier),
    unpreparedPercentage: 73.2 + (Math.random() * 2 - 1) // ±1% variation
  };
};

export const useRealisticCounters = ({ isVisible }: UseRealisticCountersOptions) => {
  const { marketSentiment } = useOpenAIContext();
  const [counters, setCounters] = useState<CounterState>(getInitialCounters);
  const lastUpdateTime = useRef<number>(Date.now());
  const hourlyResetRef = useRef<number>(new Date().getHours());

  // Load and save state from localStorage
  const loadSavedState = useCallback((): CounterState | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const age = Date.now() - parsed.timestamp;
        
        // If data is less than 10 minutes old, use it
        if (age < 10 * 60 * 1000) {
          return parsed.counters;
        }
      }
    } catch (error) {
      console.error('Error loading saved counter state:', error);
    }
    return null;
  }, []);

  const saveState = useCallback((state: CounterState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        counters: state,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error saving counter state:', error);
    }
  }, []);

  // Check for hourly reset
  const checkHourlyReset = useCallback(() => {
    const currentHour = new Date().getHours();
    const lastResetHour = parseInt(localStorage.getItem(HOURLY_RESET_KEY) || '0');
    
    if (currentHour !== lastResetHour) {
      console.log('Hourly reset triggered');
      localStorage.setItem(HOURLY_RESET_KEY, currentHour.toString());
      
      // Reset aiReplaceSearches with new hourly baseline
      setCounters(prev => ({
        ...prev,
        aiReplaceSearches: Math.round(800 + Math.random() * 700)
      }));
    }
  }, []);

  // Calculate realistic increments for AI Training Searches
  const updateAiTrainingSearches = useCallback(() => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateTime.current;
    lastUpdateTime.current = now;
    
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6;
    
    // Determine base increment rate (searches per minute)
    let baseSearchesPerMinute: number;
    
    if (hour >= 9 && hour <= 11 || hour >= 14 && hour <= 16 || hour >= 19 && hour <= 21) {
      // Peak hours
      baseSearchesPerMinute = 5.5;
    } else if (hour >= 9 && hour <= 17) {
      // Business hours
      baseSearchesPerMinute = 2.5;
    } else if (hour >= 6 && hour <= 23) {
      // Regular hours
      baseSearchesPerMinute = 1.2;
    } else {
      // Late night/early morning
      baseSearchesPerMinute = 0.3;
    }
    
    // Apply weekend multiplier
    if (isWeekend) {
      baseSearchesPerMinute *= 0.4;
    }
    
    // Apply OpenAI market sentiment
    baseSearchesPerMinute *= marketSentiment.trainingInterestMultiplier;
    
    // Convert to increment for this specific time interval
    const minutesSinceLastUpdate = timeSinceLastUpdate / 60000;
    const expectedIncrement = baseSearchesPerMinute * minutesSinceLastUpdate;
    
    // Add realistic randomization (±30%)
    const increment = Math.max(0, addRandomVariation(expectedIncrement, 30));
    
    setCounters(prev => ({
      ...prev,
      aiTrainingSearches: prev.aiTrainingSearches + Math.round(increment)
    }));
  }, [marketSentiment.trainingInterestMultiplier]);

  // Calculate realistic increments for AI Replace Searches
  const updateAiReplaceSearches = useCallback(() => {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6;
    
    // Base increment (searches per 3-second interval)
    let baseIncrement: number;
    
    if (hour >= 9 && hour <= 17) {
      // Business hours - higher anxiety
      baseIncrement = Math.random() < 0.8 ? Math.floor(Math.random() * 3) + 1 : 0;
    } else if (hour >= 6 && hour <= 22) {
      // Regular hours
      baseIncrement = Math.random() < 0.4 ? Math.floor(Math.random() * 2) + 1 : 0;
    } else {
      // Late night
      baseIncrement = Math.random() < 0.1 ? 1 : 0;
    }
    
    // Apply weekend multiplier
    if (isWeekend) {
      baseIncrement *= 0.5;
    }
    
    // Apply OpenAI market sentiment (anxiety multiplier)
    baseIncrement = Math.round(baseIncrement * marketSentiment.aiAnxietyMultiplier);
    
    setCounters(prev => ({
      ...prev,
      aiReplaceSearches: prev.aiReplaceSearches + baseIncrement
    }));
  }, [marketSentiment.aiAnxietyMultiplier]);

  // Calculate realistic changes for Unprepared Percentage
  const updateUnpreparedPercentage = useCallback(() => {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    
    // Very slow increase during business hours, almost no change otherwise
    if (hour >= 9 && hour <= 17) {
      const increment = Math.random() < 0.15 ? 0.01 : 0;
      setCounters(prev => ({
        ...prev,
        unpreparedPercentage: Math.min(85, prev.unpreparedPercentage + increment)
      }));
    }
  }, []);

  // Initialize counters from saved state or defaults
  useEffect(() => {
    const savedState = loadSavedState();
    if (savedState) {
      console.log('Loaded saved counter state');
      setCounters(savedState);
    }
    checkHourlyReset();
  }, [loadSavedState, checkHourlyReset]);

  // Save state whenever counters change
  useEffect(() => {
    saveState(counters);
  }, [counters, saveState]);

  // Set up timers with realistic intervals
  const timerConfigs = [
    {
      key: 'aiTrainingSearches',
      updateInterval: getTimeBasedInterval(8000), // 8-40 seconds based on time
      callback: updateAiTrainingSearches
    },
    {
      key: 'aiReplaceSearches',
      updateInterval: getTimeBasedInterval(3000), // 1.5-9 seconds based on time
      callback: updateAiReplaceSearches
    },
    {
      key: 'unpreparedPercentage',
      updateInterval: 180000, // 3 minutes
      callback: updateUnpreparedPercentage
    },
    {
      key: 'hourlyCheck',
      updateInterval: 60000, // 1 minute
      callback: checkHourlyReset
    }
  ];

  useStatsTimer({
    isActive: isVisible,
    configs: timerConfigs
  });

  // Format numbers for display
  const formatNumber = useCallback((num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return Math.round(num).toLocaleString();
    }
    return (Math.round(num * 10) / 10).toString();
  }, []);

  // Return formatted counter data
  const getCounterData = useCallback((): CounterData[] => [
    {
      key: 'aiTrainingSearches',
      value: counters.aiTrainingSearches,
      label: 'People searching "AI training" right now',
      icon: 'Search', // Will be mapped to actual icon in component
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      pulse: true
    },
    {
      key: 'aiReplaceSearches',
      value: counters.aiReplaceSearches,
      label: '"Will AI replace me?" searches this hour',
      icon: 'Search',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      pulse: true
    },
    {
      key: 'unpreparedPercentage',
      value: counters.unpreparedPercentage,
      label: '% unprepared for AI transformation',
      icon: 'Brain',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      pulse: false,
      suffix: '%'
    }
  ], [counters]);

  return {
    counters,
    counterData: getCounterData(),
    formatNumber,
    marketSentiment
  };
};