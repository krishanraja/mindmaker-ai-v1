import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle, Layers, Zap } from "lucide-react";
import mindmakerLogo from "@/assets/mindmaker-logo.png";

const Hero = () => {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
      {/* Background Layer 1: Mindmaker Animation */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/mindmaker-background.gif"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Background Layer 2: Sophisticated Purple Gradient Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-br from-[#3730a3]/70 via-[#7c3aed]/70 to-[#a855f7]/75"></div>
      
      {/* Content Layer */} 
      <div className="container-width relative z-10 text-center">
        <div className="max-w-6xl mx-auto fade-in-up pt-safe-top pb-12 md:pb-20 px-4 sm:px-6">
          {/* Logo - Mobile Optimized */}
          <div className="mb-8 md:mb-10 mt-6 md:mt-12">
            <img 
              src={mindmakerLogo} 
              alt="MindMaker" 
              className="h-8 sm:h-10 md:h-14 lg:h-16 w-auto mx-auto"
            />
          </div>
          
          {/* Main Tagline - Mobile-First Typography */}
          <h1 className="font-gobold text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[0.1em] sm:tracking-[0.15em] mb-4 md:mb-6 leading-[1.1] sm:leading-tight max-w-5xl mx-auto text-white uppercase hero-text-shimmer">
            ai literacy
          </h1>
          
          {/* Supporting Tagline - Mobile Optimized */}
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-wide mb-8 md:mb-12 leading-relaxed max-w-4xl mx-auto text-white/95">
            Everyone's future foundation.
          </p>
          
          {/* CTA Buttons - Mobile-First Design */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:gap-6 mb-8 md:mb-12 max-w-lg sm:max-w-none mx-auto">
            <Button 
              variant="hero-primary"
              size="lg" 
              className="px-6 md:px-8 py-4 md:py-4 text-sm sm:text-base md:text-lg font-semibold group w-full sm:w-auto min-h-[48px] sm:min-h-[44px] rounded-lg sm:rounded-md"
              onClick={() => {
                const outcomesSection = document.getElementById('outcomes');
                if (outcomesSection) {
                  outcomesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Take AI Literacy Assessment"
            >
              AI Literacy Assessment
              <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            
            <Button 
              variant="hero-secondary"
              size="lg"
              className="px-6 md:px-8 py-4 md:py-4 text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto min-h-[48px] sm:min-h-[44px] rounded-lg sm:rounded-md"
              onClick={() => {
                const pathwaysSection = document.getElementById('pathways');
                if (pathwaysSection) {
                  pathwaysSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="View Educational Seminars"
            >
              Educational Seminars
            </Button>
          </div>

          {/* Proof Points - Mobile-Optimized Cards */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-sm sm:max-w-4xl mx-auto mb-6 md:mb-8">
            <div className="glass-card-dark text-center p-4 sm:p-5 md:p-6 rounded-xl">
              <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-white/10 rounded-lg mb-3 sm:mb-4">
                <CheckCircle className="h-5 sm:h-6 w-5 sm:w-6 text-white" aria-hidden="true" />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white mb-1 sm:mb-2 drop-shadow-sm">5-Minute</div>
              <div className="text-base sm:text-lg font-semibold text-white mb-1">Assessment</div>
              <div className="text-white/90 text-sm md:text-base font-medium leading-relaxed tracking-wide">Discover your AI readiness gaps</div>
            </div>
            
            <div className="glass-card-dark text-center p-4 sm:p-5 md:p-6 rounded-xl">
              <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-white/10 rounded-lg mb-3 sm:mb-4">
                <Layers className="h-5 sm:h-6 w-5 sm:w-6 text-white" aria-hidden="true" />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white mb-1 sm:mb-2 drop-shadow-sm">4-Phase</div>
              <div className="text-base sm:text-lg font-semibold text-white mb-1">Methodology</div>
              <div className="text-white/90 text-sm md:text-base font-medium leading-relaxed tracking-wide">Structured learning with measurable outcomes</div>
            </div>
            
            <div className="glass-card-dark text-center p-4 sm:p-5 md:p-6 rounded-xl">
              <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-white/10 rounded-lg mb-3 sm:mb-4">
                <Zap className="h-5 sm:h-6 w-5 sm:w-6 text-white" aria-hidden="true" />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white mb-1 sm:mb-2 drop-shadow-sm">Start</div>
              <div className="text-base sm:text-lg font-semibold text-white mb-1">Day One</div>
              <div className="text-white/90 text-sm md:text-base font-medium leading-relaxed tracking-wide">Apply AI thinking in your first session</div>
            </div>
          </div>


        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;