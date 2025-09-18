import { GraduationCap, BookOpen, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const StatsSection = () => {
  const stats = [
    {
      number: "Qualified",
      label: "Teacher & Educator",
      description: "with certification",
      icon: GraduationCap,
    },
    {
      number: "Advanced", 
      label: "Academic Credentials",
      description: "Linguistics, Computing & Psychology backgrounds",
      icon: BookOpen,
    },
    {
      number: "200+",
      label: "Minds Transformed",
      description: "through tech literacy acceleration programs",
      icon: Users,
    },
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container-width">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 sm:mb-4">
            The World's First{" "}
            <span className="text-primary">
              AI Literacy Accelerator
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Becoming AI literate is the essential pre-game before you become an AI orchestrator or AI leader. We're here to help you level up.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card text-center p-4 sm:p-6 group fade-in-up hover:scale-105 transition-all duration-300 rounded-xl" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-primary text-white rounded-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-6 sm:h-8 w-6 sm:w-8" />
              </div>
              
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground group-hover:scale-110 transition-transform duration-300 mb-3 sm:mb-4 tracking-tight">
                {stat.number}
              </div>
              
              <div className="text-base sm:text-lg font-medium text-foreground mb-2 sm:mb-3 tracking-wide">
                {stat.label}
              </div>
              
              <div className="text-muted-foreground font-normal text-xs sm:text-sm md:text-base leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
        
        {/* Founder CTA Button */}
        <div className="flex justify-center mt-8 sm:mt-12 md:mt-16">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-white group transition-all duration-300 min-h-[48px] px-6 sm:px-8 text-sm sm:text-base"
            onClick={() => window.open('https://www.krishraja.com/', '_blank')}
          >
            <ExternalLink className="mr-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:scale-110 transition-transform" />
            Check out our Founder
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;