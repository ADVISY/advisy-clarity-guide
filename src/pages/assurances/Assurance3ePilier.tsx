import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PiggyBank, TrendingUp, Shield, CheckCircle, Calculator } from "lucide-react";
import { DevisForm } from "@/components/forms/DevisForm";
import pilierModerne from "@/assets/3pilier-moderne.jpg";

const Assurance3ePilier = () => {
  const avantages = [
    {
      icon: TrendingUp,
      title: "Déduction fiscale",
      description: "Jusqu'à CHF 7'056/an (salariés) ou CHF 35'280 (indépendants)",
    },
    {
      icon: Shield,
      title: "Capital garanti",
      description: "Sécurisez votre avenir avec un capital disponible à la retraite",
    },
    {
      icon: Calculator,
      title: "Flexibilité",
      description: "Choix entre 3a (lié) et 3b (libre) selon vos objectifs",
    },
  ];

  const comparaison = [
    {
      title: "Pilier 3a - Prévoyance liée",
      items: [
        "Déduction fiscale maximale",
        "Capital bloqué jusqu'à la retraite",
        "Montant limité annuellement",
        "Conditions de retrait strictes",
        "Taux d'intérêt avantageux",
        "Idéal pour optimisation fiscale",
      ],
    },
    {
      title: "Pilier 3b - Prévoyance libre",
      items: [
        "Flexibilité totale",
        "Capital disponible à tout moment",
        "Pas de limite de cotisation",
        "Liberté de choix du bénéficiaire",
        "Solutions d'investissement variées",
        "Parfait pour épargne complémentaire",
      ],
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
              src={pilierModerne}
              alt="3ème pilier"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <PiggyBank className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  3ᵉ Pilier
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Préparez votre avenir avec le{" "}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  3ᵉ pilier
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Sécurité, fiscalité et liberté. Le 3ᵉ pilier est un outil essentiel de planification financière
                pour optimiser votre retraite et réduire vos impôts.
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
                  Pourquoi investir dans le 3ᵉ pilier ?
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

        {/* Comparaison 3a vs 3b */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Pilier 3a ou 3b : quelle solution choisir ?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comparez les deux options pour trouver celle qui correspond le mieux à vos objectifs
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {comparaison.map((option, index) => (
                  <div
                    key={index}
                    className="p-8 rounded-3xl bg-card border-2 border-primary/20 shadow-strong"
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-6">
                      {option.title}
                    </h3>
                    <ul className="space-y-3">
                      {option.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/20">
                <p className="text-center text-foreground leading-relaxed">
                  💡 <strong>Notre conseil :</strong> Pour maximiser les avantages fiscaux, privilégiez le pilier 3a.
                  Si vous recherchez plus de flexibilité, le pilier 3b est une excellente solution complémentaire.
                  Nos conseillers vous aident à trouver le bon équilibre selon votre situation.
                </p>
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
                  Demandez votre étude 3ᵉ pilier personnalisée
                </h2>
                <p className="text-lg text-muted-foreground">
                  Calculez votre économie fiscale et trouvez la solution optimale pour votre prévoyance
                </p>
              </div>
              
              <DevisForm type="3e-pilier" title="Étude 3ᵉ Pilier Gratuite" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Assurance3ePilier;