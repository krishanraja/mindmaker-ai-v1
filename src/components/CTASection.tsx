import { Button } from "@/components/ui/button";
import { ArrowUp, Mail } from "lucide-react";

const CTASection = () => {
  const scrollToOutcomes = () => {
    const outcomesSection = document.getElementById('outcomes');
    if (outcomesSection) {
      outcomesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding relative overflow-hidden bg-brand-gradient">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_70%)]" />
      </div>

      <div className="container-width relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white">
            Ready to Transform Your AI Literacy?
          </h2>
          
          <p className="text-lg md:text-xl leading-relaxed mb-12 text-white/90">
            Choose from our structured pathways above, or get direct consultation tailored to your specific needs.
          </p>

          <div className="flex flex-col gap-4 mb-8 max-w-md mx-auto">
            <Button 
              onClick={scrollToOutcomes}
              className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 text-lg group w-full"
            >
              <ArrowUp className="mr-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" />
              Choose Your Pathway Above
            </Button>
            
            <Button asChild className="bg-accent text-white hover:bg-accent-400 font-semibold px-8 py-3 text-lg group w-full">
              <a href="https://calendly.com/krish-raja/mindmaker-meeting" target="_blank" rel="noopener noreferrer">
                <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Get Direct Consultation
              </a>
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-xl font-medium text-white mb-2">
              16 years of proven expertise in tech, data, and AI transformation
            </p>
            <p className="text-base text-white/80">
              Contact us through the consultation link above for personalized guidance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;