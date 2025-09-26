import { CheckCircle, Zap, Users, Target, Briefcase } from "lucide-react";
import ResponsiveCardGrid from "@/components/ResponsiveCardGrid";

const DifferenceSection = () => {
  const differences = [
    {
      number: "01",
      title: "Multidisciplinary Foundation",
      description: "Grounded in education, data, and technology expertise - bridging business strategy with practical AI implementation",
      icon: Briefcase,
    },
    {
      number: "02", 
      title: "Literacy-First Methodology",
      description: "Build understanding before tools. Our proven framework ensures sustainable AI adoption",
      icon: Target,
    },
    {
      number: "03",
      title: "Gamified Credit System",
      description: "Interactive, modular learning with 5-45 credit flexibility. Earn progress through engaging challenges, not boring lectures",
      icon: CheckCircle,
    },
    {
      number: "04",
      title: "AI-Enabled Coaching",
      description: "Human expertise augmented by intelligent tools - not just another consultant",
      icon: Zap,
    },
    {
      number: "05",
      title: "From knowledge to outcomes",
      description: "Real business outcomes with Fortune 500 companies and scale ups",
      icon: Users,
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            <span className="text-primary">
              Interactive & Engaging Approach
            </span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            Move beyond boring workshops and theoretical frameworks. Our gamified, interactive methodology transforms AI literacy into engaging experiences with measurable business outcomes.
          </p>
        </div>
        
        <ResponsiveCardGrid 
          desktopGridClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          mobileCardHeight="h-[280px]"
        >
          {differences.map((difference, index) => (
            <div key={index} className="card p-8 fade-in-up h-full flex flex-col" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
                  <difference.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-primary/60">
                  {difference.number}
                </div>
              </div>
              
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground mb-4">
                {difference.title}
              </h3>
              
              <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                {difference.description}
              </p>
            </div>
          ))}
        </ResponsiveCardGrid>
      </div>
    </section>
  );
};

export default DifferenceSection;