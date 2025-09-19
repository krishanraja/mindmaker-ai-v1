import { useEffect, useRef, useCallback } from 'react';

interface StatConfig {
  key: string;
  updateInterval: number; // milliseconds
  callback: () => void;
}

interface UseStatsTimerOptions {
  isActive: boolean;
  configs: StatConfig[];
}

export const useStatsTimer = ({ isActive, configs }: UseStatsTimerOptions) => {
  const intervalRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const clearAllIntervals = useCallback(() => {
    intervalRefs.current.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    intervalRefs.current.clear();
  }, []);

  const startTimer = useCallback((config: StatConfig) => {
    // Clear existing interval for this stat if any
    const existingInterval = intervalRefs.current.get(config.key);
    if (existingInterval) {
      clearInterval(existingInterval);
    }

    // Start new interval
    const intervalId = setInterval(() => {
      config.callback();
    }, config.updateInterval);

    intervalRefs.current.set(config.key, intervalId);
  }, []);

  const stopTimer = useCallback((key: string) => {
    const intervalId = intervalRefs.current.get(key);
    if (intervalId) {
      clearInterval(intervalId);
      intervalRefs.current.delete(key);
    }
  }, []);

  // Main effect to manage all timers
  useEffect(() => {
    if (isActive) {
      // Start all configured timers
      configs.forEach((config) => {
        startTimer(config);
      });
    } else {
      // Clear all timers when inactive
      clearAllIntervals();
    }

    // Cleanup on unmount or dependency change
    return () => {
      clearAllIntervals();
    };
  }, [isActive, configs, startTimer, clearAllIntervals]);

  return {
    startTimer,
    stopTimer,
    clearAllIntervals
  };
};

// Utility function to create time-based update intervals
export const getTimeBasedInterval = (baseInterval: number): number => {
  const now = new Date();
  const hour = now.getHours();
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  
  // Business hours: 9 AM - 5 PM
  const isBusinessHours = hour >= 9 && hour <= 17;
  
  // Peak hours: 9-11 AM, 2-4 PM, 7-9 PM
  const isPeakHours = 
    (hour >= 9 && hour <= 11) || 
    (hour >= 14 && hour <= 16) || 
    (hour >= 19 && hour <= 21);
  
  let multiplier = 1;
  
  if (isWeekend) {
    multiplier = 2.5; // Slower updates on weekends
  } else if (!isBusinessHours) {
    multiplier = 3; // Much slower during off-hours
  } else if (isPeakHours) {
    multiplier = 0.5; // Faster during peak hours
  }
  
  return Math.round(baseInterval * multiplier);
};

// Utility function to add realistic randomization
export const addRandomVariation = (baseValue: number, variationPercent: number = 25): number => {
  const variation = baseValue * (variationPercent / 100);
  const randomOffset = (Math.random() - 0.5) * 2 * variation;
  return Math.round(baseValue + randomOffset);
};