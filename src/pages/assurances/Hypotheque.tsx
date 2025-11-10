import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Landmark, TrendingDown, Shield, CheckCircle } from "lucide-react";
import { DevisForm } from "@/components/forms/DevisForm";
import hypothequeModerne from "@/assets/hypotheque-moderne.jpg";

const Hypotheque = () => {
  const solutions = [
    {
      title: "Hypothèque fixe",
      items: ["Taux fixe de 2 à 15 ans", "Budget prévisible", "Protection contre hausse des taux", "Idéal pour stabilité"],
    },
    {
      title: "Hypothèque SARON",
      items: ["Taux variable compétitif", "Flexibilité maximale", "Suit le marché", "Économies potentielles"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={hypothequeModerne} alt="Hypothèque" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Landmark className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Hypothèque</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Réalisez votre projet{" "}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">immobilier</span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                Les meilleures conditions hypothécaires pour votre bien immobilier
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {solutions.map((solution, index) => (
                  <div key={index} className="p-8 rounded-3xl bg-card border border-border shadow-soft">
                    <h3 className="text-xl font-bold text-foreground mb-6">{solution.title}</h3>
                    <ul className="space-y-3">
                      {solution.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <DevisForm type="hypotheque" title="Simulation Hypothécaire Gratuite" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Hypotheque;