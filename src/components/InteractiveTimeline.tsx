import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight, Play, Pause, Brain, Target, Zap, Rocket, Bot, Star, Lightbulb, Crown } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  impact: string;
  meaning: string;
  icon: React.ComponentType<{ className?: string }>;
  colorFrom: string;
  colorTo: string;
}

const InteractiveTimeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const timelineData: TimelineItem[] = [
    {
      year: "1956",
      title: "AI is Born",
      description: "The term 'Artificial Intelligence' is coined at Dartmouth",
      impact: "What this means for you:",
      meaning: "You're living in the era AI was always meant to reach - mass human adoption.",
      icon: Brain,
      colorFrom: "from-blue-400",
      colorTo: "to-purple-400"
    },
    {
      year: "1997", 
      title: "Deep Blue Beats Chess Master",
      description: "AI defeats world chess champion Garry Kasparov",
      impact: "What this means for you:",
      meaning: "AI excels at strategic thinking - learn to collaborate, not compete with it.",
      icon: Target,
      colorFrom: "from-purple-400",
      colorTo: "to-pink-400"
    },
    {
      year: "2011",
      title: "Watson Wins Jeopardy!",
      description: "IBM's Watson defeats human champions at knowledge trivia",
      impact: "What this means for you:",
      meaning: "AI processes information instantly - your value is in interpretation and wisdom.",
      icon: Lightbulb,
      colorFrom: "from-pink-400", 
      colorTo: "to-red-400"
    },
    {
      year: "2016",
      title: "AlphaGo's Breakthrough",
      description: "AI masters the ancient game of Go through creative intuition",
      impact: "What this means for you:",
      meaning: "AI can be creative and intuitive - embrace hybrid human-AI collaboration.",
      icon: Zap,
      colorFrom: "from-red-400",
      colorTo: "to-orange-400"
    },
    {
      year: "2020",
      title: "GPT-3 Revolution", 
      description: "AI begins writing, coding, and creating at human level",
      impact: "What this means for you:",
      meaning: "AI is your creative partner - focus on prompting, editing, and strategic direction.",
      icon: Crown,
      colorFrom: "from-orange-400",
      colorTo: "to-yellow-400"
    },
    {
      year: "2022",
      title: "ChatGPT Goes Viral",
      description: "1 million users in 5 days - AI enters mainstream consciousness",
      impact: "What this means for you:",
      meaning: "AI literacy is now as essential as digital literacy was in the 1990s.",
      icon: Rocket,
      colorFrom: "from-yellow-400",
      colorTo: "to-green-400"
    },
    {
      year: "2024",
      title: "AI Agents Emerge",
      description: "AI systems begin completing complex multi-step business tasks",
      impact: "What this means for you:",
      meaning: "The future belongs to those who can orchestrate AI agents effectively.",
      icon: Bot,
      colorFrom: "from-green-400", 
      colorTo: "to-teal-400"
    },
    {
      year: "2025",
      title: "Your AI Literacy Journey",
      description: "You decide how AI shapes your personal and professional future",
      impact: "What this means for you:",
      meaning: "Right now, you have the power to shape how AI impacts your life and career.",
      icon: Star,
      colorFrom: "from-teal-400",
      colorTo: "to-blue-400"
    }
  ];

  const nextItem = useCallback(() => {
    setActiveItem((prev) => (prev + 1) % timelineData.length);
  }, [timelineData.length]);

  const prevItem = useCallback(() => {
    setActiveItem((prev) => (prev - 1 + timelineData.length) % timelineData.length);
  }, [timelineData.length]);

  const handleSliderChange = (value: number[]) => {
    setActiveItem(value[0]);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setIsPaused(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveItem((prev) => {
        const next = (prev + 1) % timelineData.length;
        if (next === 0) {
          setIsAutoPlaying(false); // Stop at the end of one full cycle
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, timelineData.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevItem();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 2000);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextItem();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 2000);
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextItem, prevItem]);

  const currentItem = timelineData[activeItem];
  const IconComponent = currentItem.icon;

  return (
    <div 
      className="w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="glass-card border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md bg-white/5">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            The AI Revolution Timeline
          </h2>
          <p className="text-white/70 text-sm md:text-base">
            Discover where we've been and where we're heading
          </p>
        </div>

        {/* Timeline Slider */}
        <div className="mb-6 md:mb-8 px-2">
          <div className="flex justify-between items-center mb-4">
            {timelineData.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveItem(index);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 2000);
                }}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  index === activeItem 
                    ? 'bg-white scale-125 shadow-lg shadow-white/50' 
                    : index < activeItem 
                      ? 'bg-white/70 hover:bg-white/90 scale-110' 
                      : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to ${item.year}: ${item.title}`}
              />
            ))}
          </div>
          
          <Slider
            value={[activeItem]}
            onValueChange={handleSliderChange}
            max={timelineData.length - 1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Main Content Card */}
        <div className="glass-card-dark rounded-xl p-6 md:p-8 border border-white/10 mb-6 min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center animate-pulse">
                <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
            
            <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${currentItem.colorFrom} ${currentItem.colorTo} bg-clip-text text-transparent mb-2 animate-fade-in`}>
              {currentItem.year}
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 animate-fade-in">
              {currentItem.title}
            </h3>
            
            <p className="text-white/80 text-base md:text-lg mb-6 animate-fade-in">
              {currentItem.description}
            </p>
          </div>

          {/* Impact Section */}
          <div className="glass-card rounded-lg p-4 md:p-6 animate-scale-in">
            <h4 className="text-yellow-300 font-semibold mb-2 text-base md:text-lg">
              {currentItem.impact}
            </h4>
            <p className="text-white text-base md:text-lg font-medium leading-relaxed">
              {currentItem.meaning}
            </p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={() => {
              prevItem();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 2000);
            }}
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 md:px-4 py-2 text-white border border-white/20"
            disabled={activeItem === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleAutoPlay}
              variant="ghost"
              size="sm"
              className="bg-white/10 hover:bg-white/20 p-2 text-white border border-white/20"
              aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <div className="text-white/60 text-sm">
              {activeItem + 1} of {timelineData.length}
            </div>
          </div>

          <Button
            onClick={() => {
              nextItem();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 2000);
            }}
            variant="ghost" 
            size="sm"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 md:px-4 py-2 text-white border border-white/20"
            disabled={activeItem === timelineData.length - 1}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-center mt-6">
          <p className="text-white/50 text-xs md:text-sm">
            💡 Use arrow keys, click dots, or drag the slider • Press space to play/pause
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTimeline;