import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { HeartPulse, CheckCircle, Shield, TrendingDown, Users } from "lucide-react";
import { DevisForm } from "@/components/forms/DevisForm";
import santeModerne from "@/assets/sante-moderne.jpg";

const AssuranceSante = () => {
  const avantages = [
    {
      icon: Shield,
      title: "Couverture complète",
      description: "LAMal obligatoire + complémentaires adaptées à vos besoins",
    },
    {
      icon: TrendingDown,
      title: "Économies garanties",
      description: "Jusqu'à 40% d'économies sur vos primes annuelles",
    },
    {
      icon: Users,
      title: "Conseil personnalisé",
      description: "Analyse gratuite de votre situation et recommandations",
    },
  ];

  const prestations = [
    {
      title: "LAMal - Assurance de base",
      items: [
        "Soins médicaux essentiels",
        "Hospitalisations en division commune",
        "Médicaments remboursés",
        "Choix du modèle (standard, médecin de famille, HMO, Telmed)",
        "Optimisation de la franchise (300 à 2500 CHF)",
      ],
    },
    {
      title: "LCA - Assurances complémentaires",
      items: [
        "Médecines alternatives et naturelles",
        "Chambre privée ou demi-privée",
        "Soins dentaires",
        "Lunettes et lentilles",
        "Prestations à l'étranger",
      ],
    },
    {
      title: "Modèles alternatifs",
      items: [
        "Telmed : consultation téléphonique prioritaire (-15% prime)",
        "HMO : cabinet de groupe (-20% prime)",
        "Médecin de famille : médecin traitant désigné (-10% prime)",
        "Pharmed : pharmacien en première ligne",
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
              src={santeModerne}
              alt="Assurance santé"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <HeartPulse className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  Assurance Santé
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Trouvez la couverture santé{" "}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  adaptée à vos besoins
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Comparez, comprenez et choisissez la meilleure assurance maladie selon votre profil.
                Nous vous aidons à optimiser vos primes tout en gardant une excellente couverture.
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
                  Pourquoi choisir Advisy pour votre assurance santé ?
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

        {/* Prestations Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Nos prestations en assurance santé
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Des solutions complètes pour tous vos besoins de santé
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {prestations.map((prestation, index) => (
                  <div
                    key={index}
                    className="p-8 rounded-3xl bg-card border border-border shadow-soft"
                  >
                    <h3 className="text-xl font-bold text-foreground mb-6">
                      {prestation.title}
                    </h3>
                    <ul className="space-y-3">
                      {prestation.items.map((item, itemIndex) => (
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
                  Demandez votre devis personnalisé
                </h2>
                <p className="text-lg text-muted-foreground">
                  Recevez une analyse complète et gratuite de vos besoins en assurance santé
                </p>
              </div>
              
              <DevisForm type="sante" title="Devis Assurance Santé" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AssuranceSante;