import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Car, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { DevisForm } from "@/components/forms/DevisForm";
import autoModerne from "@/assets/auto-moderne.jpg";

const AssuranceAuto = () => {
  const couvertures = [
    {
      title: "RC Véhicules (obligatoire)",
      items: [
        "Dommages causés à des tiers",
        "Couverture illimitée en Suisse",
        "Validité internationale",
        "Protection juridique incluse",
      ],
    },
    {
      title: "Casco partielle (recommandée)",
      items: [
        "Vol et tentative de vol",
        "Bris de glaces",
        "Dommages naturels (grêle, inondation)",
        "Collision avec animaux",
        "Incendie et explosion",
      ],
    },
    {
      title: "Casco complète",
      items: [
        "Tous les risques casco partielle",
        "Dommages de collision",
        "Actes de vandalisme",
        "Dommages parking",
        "Valeur à neuf (option)",
      ],
    },
  ];

  const conseils = [
    {
      icon: Shield,
      title: "Franchise adaptée",
      description: "Choisissez la franchise qui correspond à votre utilisation et votre budget",
    },
    {
      icon: Car,
      title: "Assistance 24/7",
      description: "Dépannage et remorquage inclus dans nos solutions complètes",
    },
    {
      icon: AlertTriangle,
      title: "Protection bonus",
      description: "Protégez vos années sans sinistre avec notre option bonus-protégé",
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
              src={autoModerne}
              alt="Assurance auto"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Car className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Assurance Auto
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Protégez votre véhicule avec{" "}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  la meilleure couverture
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                RC, casco partielle ou complète : trouvez l'assurance auto idéale
                pour votre véhicule au meilleur prix.
              </p>
            </div>
          </div>
        </section>

        {/* Conseils Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Nos conseils pour bien vous assurer
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {conseils.map((conseil, index) => {
                  const Icon = conseil.icon;
                  return (
                    <div
                      key={index}
                      className="p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-soft">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {conseil.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {conseil.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Types de couverture */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Quelle couverture choisir ?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comparez les différentes options pour trouver celle qui correspond à vos besoins
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {couvertures.map((couverture, index) => (
                  <div
                    key={index}
                    className="p-8 rounded-3xl bg-card border border-border shadow-soft hover:border-primary/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-foreground mb-6">
                      {couverture.title}
                    </h3>
                    <ul className="space-y-3">
                      {couverture.items.map((item, itemIndex) => (
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
                  Obtenez votre devis auto personnalisé
                </h2>
                <p className="text-lg text-muted-foreground">
                  Comparez les meilleures offres du marché en quelques minutes
                </p>
              </div>
              
              <DevisForm type="auto" title="Devis Assurance Auto" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AssuranceAuto;