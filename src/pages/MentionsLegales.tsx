import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Scale, Building2, Mail, Phone, MapPin } from "lucide-react";
import advisyTextLogo from "@/assets/advisy-text-logo.svg";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <WhatsAppButton />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Scale className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Informations légales
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Mentions légales
            </h1>
            <p className="text-lg text-muted-foreground">
              Informations légales concernant le site web{" "}
              <img src={advisyTextLogo} alt="Advisy" className="h-5 inline-block mx-1" />
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12 animate-fade-in">
            {/* Éditeur du site */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Éditeur du site</h2>
              </div>
              
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 space-y-4">
                <p className="text-foreground font-semibold text-lg">e-Advisy Sàrl</p>
                <div className="space-y-3 text-foreground/70">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Siège social</p>
                      <p>Adresse complète à compléter</p>
                      <p>Code postal et Ville</p>
                      <p>Suisse</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Téléphone</p>
                      <p>Numéro à compléter</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p>contact@advisy.ch</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border mt-6">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold text-foreground">Numéro IDE :</span> CHE-XXX.XXX.XXX (à compléter)
                  </p>
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold text-foreground">Forme juridique :</span> Société à responsabilité limitée (Sàrl)
                  </p>
                </div>
              </div>
            </section>

            {/* Hébergement */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Hébergement</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8">
                <p className="text-foreground/70">
                  Ce site est hébergé par <span className="font-semibold text-foreground">Lovable (GPT Engineer, Inc.)</span>
                </p>
                <p className="text-foreground/70 mt-2">
                  GPT Engineer, Inc.<br />
                  États-Unis
                </p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Propriété intellectuelle</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 space-y-4">
                <p className="text-foreground/70">
                  L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, vidéos, etc.) 
                  est la propriété exclusive de <span className="font-semibold text-foreground">e-Advisy Sàrl</span>, 
                  sauf mention contraire.
                </p>
                <p className="text-foreground/70">
                  Toute reproduction, distribution, modification, adaptation, retransmission ou publication, 
                  même partielle, de ces différents éléments est strictement interdite sans l&apos;accord exprès 
                  par écrit de e-Advisy Sàrl.
                </p>
                <p className="text-foreground/70">
                  Le non-respect de cette interdiction constitue une contrefaçon pouvant engager 
                  la responsabilité civile et pénale du contrefacteur.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Limitation de responsabilité</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 space-y-4">
                <p className="text-foreground/70">
                  e-Advisy Sàrl met tout en œuvre pour offrir aux utilisateurs des informations et/ou 
                  des outils disponibles et vérifiés, mais ne saurait être tenue pour responsable 
                  des erreurs, d&apos;une absence de disponibilité des informations et/ou de la présence 
                  de virus sur son site.
                </p>
                <p className="text-foreground/70">
                  Les informations fournies sur ce site le sont à titre indicatif. e-Advisy Sàrl ne garantit 
                  pas l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition 
                  sur ce site.
                </p>
                <p className="text-foreground/70">
                  e-Advisy Sàrl décline toute responsabilité concernant les liens hypertextes établis 
                  vers d&apos;autres sites à partir de son site web.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Droit applicable et juridiction</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 space-y-4">
                <p className="text-foreground/70">
                  Les présentes mentions légales sont régies par le droit suisse. Tout litige relatif 
                  à l&apos;utilisation de ce site sera soumis à la compétence exclusive des tribunaux suisses.
                </p>
                <p className="text-foreground/70">
                  Le for juridique est situé au siège social de e-Advisy Sàrl.
                </p>
              </div>
            </section>

            {/* Protection des données */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Protection des données</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8">
                <p className="text-foreground/70">
                  Pour toute information concernant la protection de vos données personnelles, 
                  veuillez consulter notre{" "}
                  <a href="/politique-confidentialite" className="text-primary font-semibold hover:underline">
                    Politique de confidentialité
                  </a>.
                </p>
              </div>
            </section>

            {/* Date de mise à jour */}
            <section className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-CH", { 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MentionsLegales;
