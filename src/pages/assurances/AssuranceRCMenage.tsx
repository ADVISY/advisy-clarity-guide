import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Home, Shield, CheckCircle, Heart } from "lucide-react";
import { DevisForm } from "@/components/forms/DevisForm";
import menageModerne from "@/assets/menage-moderne.jpg";

const AssuranceRCMenage = () => {
  const garanties = [
    {
      title: "Responsabilité Civile Privée",
      items: [
        "Dommages corporels causés à des tiers",
        "Dommages matériels causés à autrui",
        "Protection de toute la famille",
        "Couverture internationale",
        "Enfants et animaux domestiques inclus",
      ],
    },
    {
      title: "Assurance Ménage",
      items: [
        "Vol et cambriolage",
        "Incendie et explosion",
        "Dégâts d'eau et inondations",
        "Bris de glaces",
        "Catastrophes naturelles",
      ],
    },
    {
      title: "Extensions possibles",
      items: [
        "Objets de valeur (bijoux, œuvres d'art)",
        "Vélos électriques",
        "Instruments de musique",
        "Électronique portable",
        "Assurance tous risques",
      ],
    },
  ];

  const avantages = [
    {
      icon: Shield,
      title: "Protection complète",
      description: "Couvrez tous les risques du quotidien avec une seule police",
    },
    {
      icon: Heart,
      title: "Toute la famille",
      description: "Protection automatique pour tous les membres de votre foyer",
    },
    {
      icon: Home,
      title: "Biens assurés",
      description: "Mobilier, électroménager et objets personnels protégés",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={menageModerne}
              alt="Assurance RC ménage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Home className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  RC & Assurance Ménage
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Protégez vos biens et votre{" "}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  responsabilité
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                RC privée et assurance ménage : deux protections essentielles
                pour sécuriser votre quotidien et celui de votre famille.
              </p>
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Pourquoi ces assurances sont indispensables ?
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {avantages.map((avantage, index) => {
                  const Icon = avantage.icon;
                  return (
                    <div
                      key={index}
                      className="p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-soft">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {avantage.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {avantage.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Garanties Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Nos garanties complètes
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Des solutions adaptées à tous vos besoins de protection
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {garanties.map((garantie, index) => (
                  <div
                    key={index}
                    className="p-8 rounded-3xl bg-card border border-border shadow-soft hover:border-primary/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-foreground mb-6">
                      {garantie.title}
                    </h3>
                    <ul className="space-y-3">
                      {garantie.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
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

        {/* Devis Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Demandez votre devis RC & Ménage
                </h2>
                <p className="text-lg text-muted-foreground">
                  Obtenez une protection complète au meilleur prix
                </p>
              </div>
              
              <DevisForm type="rc-menage" title="Devis RC & Assurance Ménage" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AssuranceRCMenage;