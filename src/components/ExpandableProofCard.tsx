import { useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableProofCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  expandedContent: string;
}

const ExpandableProofCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  description, 
  expandedContent 
}: ExpandableProofCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-card-dark rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-center p-4 sm:p-5 md:p-6 focus:outline-none focus:ring-2 focus:ring-white/20 sm:cursor-default sm:pointer-events-none"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${title} details`}
      >
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-white/10 rounded-lg mb-3 sm:mb-4">
          <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-white" aria-hidden="true" />
        </div>
        
        {/* Title & Subtitle */}
        <div className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white mb-1 sm:mb-2 drop-shadow-sm">
          {title}
        </div>
        <div className="text-base sm:text-lg font-semibold text-white mb-1">
          {subtitle}
        </div>
        
        {/* Description */}
        <div className="text-white/90 text-sm md:text-base font-medium leading-relaxed tracking-wide mb-2 sm:mb-0">
          {description}
        </div>
        
        {/* Mobile expand indicator */}
        <div className="sm:hidden flex items-center justify-center mt-2">
          <ChevronDown 
            className={cn(
              "h-4 w-4 text-white/60 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
            aria-hidden="true"
          />
        </div>
      </button>
      
      {/* Expandable Content - Mobile Only */}
      <div 
        className={cn(
          "sm:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pb-4 border-t border-white/10">
          <p className="text-white/80 text-sm leading-relaxed pt-3">
            {expandedContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpandableProofCard;