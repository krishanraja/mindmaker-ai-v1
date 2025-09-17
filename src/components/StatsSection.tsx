import { GraduationCap, BookOpen, Users } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      number: "Qualified",
      label: "Teacher & Educator",
      description: "with proven enterprise data literacy programs",
      icon: GraduationCap,
    },
    {
      number: "Advanced", 
      label: "Academic Credentials",
      description: "Linguistics, Computing & Psychology degrees",
      icon: BookOpen,
    },
    {
      number: "200+",
      label: "Minds Transformed",
      description: "through AI literacy acceleration programs",
      icon: Users,
    },
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container-width">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            The World's First{" "}
            <span className="text-primary">
              AI Literacy Accelerator
            </span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Combining qualified teaching credentials with advanced cognitive science to transform how leaders think about AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card text-center p-6 group fade-in-up hover:scale-105 transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-8 w-8" />
              </div>
              
              <div className="text-4xl font-semibold text-foreground group-hover:scale-110 transition-transform duration-300 mb-4">
                {stat.number}
              </div>
              
              <div className="text-lg font-semibold text-foreground mb-2">
                {stat.label}
              </div>
              
              <div className="text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;