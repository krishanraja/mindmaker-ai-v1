import { Button } from "@/components/ui/button";
import mindmakerIconLight from "@/assets/mindmaker-icon-light.png";
import ResponsiveCardGrid from "@/components/ResponsiveCardGrid";

const AudienceOutcomesSection = () => {
  const outcomes = [
    {
      audience: "Enterprise Leaders",
      outcome: "AI Leadership Benchmark",
      description: "Assess and accelerate your AI leadership capabilities. Move from AI-aware to AI-orchestrator with personalized benchmarking.",
      benefits: [
        "Leadership score across 6 core dimensions",
        "Custom AI prompt library ($5,000 value)",
        "Industry peer benchmarking",
        "Personalized strategic roadmap"
      ],
      icon: mindmakerIconLight,
      cta: "Executive Assessment"
    },
    {
      audience: "Leadership Teams",
      outcome: "From Hype to Strategy",
      description: "Transform AI anxiety into strategic clarity through hands-on decision simulations and structured workshop experiences.",
      benefits: [
        "Strategic clarity from hype to action",
        "Team alignment across leadership",
        "Risk mitigation without expensive failures",
        "90-day pilot charter ready for execution"
      ],
      icon: mindmakerIconLight,
      cta: "Team Program"
    },
    {
      audience: "Partners", 
      outcome: "Portfolio Enablement",
      description: "Enable VCs, consulting firms, and system integrators to assess and prioritize portfolio companies for AI enablement.",
      benefits: [
        "Portfolio heatmap and prioritization",
        "Co-branded materials and offer packs",
        "Qualified lead pipeline",
        "Partner credibility positioning"
      ],
      icon: mindmakerIconLight,
      cta: "Partner Assessment"
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-16 bg-background">
      <div className="container-width">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-10 fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-4 sm:mb-5 lg:mb-4">
            <span className="text-primary">
              Pick a Pathway
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground mx-auto px-4">
            Interactive, gamified learning designed to transform GenAI from overwhelming threat to strategic thinking partner. Choose your pathway.
          </p>
        </div>
        
        <ResponsiveCardGrid 
          desktopGridClass="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-6"
        >
          {outcomes.map((outcome, index) => (
            <div key={index} className="card p-4 sm:p-6 lg:p-8 fade-in-up flex flex-col justify-between h-full rounded-xl" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex flex-col flex-1">
                <div className="text-center mb-5 sm:mb-6 lg:mb-5 flex flex-col">
                  <div className="inline-flex items-center justify-center w-14 sm:w-16 h-14 sm:h-16 bg-primary text-white rounded-xl mb-4 mx-auto">
                    <img src={outcome.icon} alt="MindMaker Icon" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" loading="lazy" decoding="async" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-foreground mb-2">
                    {outcome.audience}
                  </h3>
                  <h4 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4 lg:mb-3">
                    {outcome.outcome}
                  </h4>
                  <p className="text-sm sm:text-sm font-normal leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: outcome.description }}>
                  </p>
                </div>
                
                <div className="space-y-3 mb-5 sm:mb-6 lg:mb-5">
                  {outcome.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm font-normal leading-relaxed text-muted-foreground">
                        {benefit}  
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                asChild
                size="lg"
                className="w-full bg-primary hover:bg-primary-600 text-white mt-auto min-h-[48px] text-sm sm:text-base font-semibold rounded-lg"
              >
                <a 
                  href={
                    outcome.cta === 'Executive Assessment' ? 'https://leaders.themindmaker.ai' :
                    outcome.cta === 'Team Program' ? 'https://teams.themindmaker.ai' :
                    outcome.cta === 'Partner Assessment' ? 'https://partners.themindmaker.ai' :
                    '#'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {outcome.cta}
                </a>
              </Button>
            </div>
          ))}
        </ResponsiveCardGrid>
      </div>
    </section>
  );
};

export default AudienceOutcomesSection;