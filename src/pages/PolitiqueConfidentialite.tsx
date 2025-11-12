import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Shield, Lock, Eye, Database, Cookie, UserCheck } from "lucide-react";
import advisyTextLogo from "@/assets/advisy-text-logo.svg";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <WhatsAppButton />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Protection des données
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Politique de confidentialité
            </h1>
            <p className="text-lg text-muted-foreground">
              Comment nous protégeons et utilisons vos données personnelles
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12 animate-fade-in">
            {/* Introduction */}
            <section className="space-y-4">
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8">
                <p className="text-foreground/70 mb-4">
                  <img src={advisyTextLogo} alt="Advisy" className="h-5 inline-block mx-1" />
                  (e-Advisy Sàrl) accorde une grande importance à la protection de vos données personnelles. 
                  Cette politique de confidentialité vous informe sur la manière dont nous collectons, 
                  utilisons et protégeons vos données conformément à la Loi fédérale sur la protection 
                  des données (LPD) et au Règlement général sur la protection des données (RGPD).
                </p>
                <p className="text-foreground/70">
                  En utilisant notre site web et nos services, vous acceptez les pratiques décrites 
                  dans cette politique de confidentialité.
                </p>
              </div>
            </section>

            {/* Responsable du traitement */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Responsable du traitement</h2>
              </div>
              
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8">
                <p className="text-foreground font-semibold mb-2">e-Advisy Sàrl</p>
                <p className="text-foreground/70">Adresse complète à compléter</p>
                <p className="text-foreground/70">Code postal et Ville, Suisse</p>
                <p className="text-foreground/70 mt-4">
                  Email : <a href="mailto:contact@advisy.ch" className="text-primary hover:underline">contact@advisy.ch</a>
                </p>
              </div>
            </section>

            {/* Données collectées */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Données collectées</h2>
              </div>
              
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Données que vous nous fournissez directement :
                  </h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Nom et prénom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Adresse email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Numéro de téléphone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Adresse postale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Date de naissance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Informations relatives à vos besoins en assurance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Toute autre information que vous choisissez de nous communiquer</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Données collectées automatiquement :
                  </h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Adresse IP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Type de navigateur et version</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Système d&apos;exploitation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Pages visitées et durée de visite</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Date et heure de la visite</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Finalités du traitement */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Utilisation des données</h2>
              </div>
              
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8">
                <p className="text-foreground/70 mb-4">
                  Nous utilisons vos données personnelles pour les finalités suivantes :
                </p>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">1.</span>
                    <span><span className="font-semibold text-foreground">Fourniture de services :</span> Traiter vos demandes de devis, vous conseiller sur les produits d&apos;assurance adaptés à vos besoins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">2.</span>
                    <span><span className="font-semibold text-foreground">Gestion de la relation client :</span> Répondre à vos questions, gérer vos contrats et vous fournir un support client</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">3.</span>
                    <span><span className="font-semibold text-foreground">Communication :</span> Vous envoyer des informations sur nos services, des newsletters (avec votre consentement)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">4.</span>
                    <span><span className="font-semibold text-foreground">Amélioration de nos services :</span> Analyser l&apos;utilisation de notre site pour améliorer l&apos;expérience utilisateur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">5.</span>
                    <span><span className="font-semibold text-foreground">Conformité légale :</span> Respecter nos obligations légales et réglementaires</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Base légale */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Base légale du traitement</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 space-y-3">
                <p className="text-foreground/70">
                  Le traitement de vos données personnelles repose sur les bases légales suivantes :
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><span className="font-semibold text-foreground">Consentement :</span> Pour l&apos;envoi de communications marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><span className="font-semibold text-foreground">Exécution d&apos;un contrat :</span> Pour la fourniture de nos services de conseil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><span className="font-semibold text-foreground">Intérêt légitime :</span> Pour l&apos;amélioration de nos services et la sécurité de notre site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><span className="font-semibold text-foreground">Obligation légale :</span> Pour le respect des obligations légales et réglementaires</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Partage des données */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Partage des données</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 space-y-4">
                <p className="text-foreground/70">
                  Nous ne vendons ni ne louons vos données personnelles à des tiers. 
                  Nous pouvons partager vos données dans les cas suivants :
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><span className="font-semibold text-foreground">Compagnies d&apos;assurance :</span> Pour obtenir des devis et établir des contrats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><span className="font-semibold text-foreground">Prestataires de services :</span> Hébergement web, services de messagerie, outils d&apos;analyse (sous contrat de confidentialité)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><span className="font-semibold text-foreground">Autorités compétentes :</span> Si requis par la loi ou pour protéger nos droits</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Cookies et technologies similaires</h2>
              </div>
              
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 space-y-4">
                <p className="text-foreground/70">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                  Les cookies sont de petits fichiers texte stockés sur votre appareil.
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Types de cookies utilisés :</h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><span className="font-semibold text-foreground">Cookies essentiels :</span> Nécessaires au fonctionnement du site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><span className="font-semibold text-foreground">Cookies analytiques :</span> Pour analyser l&apos;utilisation du site et améliorer nos services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><span className="font-semibold text-foreground">Cookies de préférence :</span> Pour mémoriser vos choix et préférences</span>
                    </li>
                  </ul>
                </div>
                <p className="text-foreground/70">
                  Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines 
                  fonctionnalités du site pourraient ne pas fonctionner correctement.
                </p>
              </div>
            </section>

            {/* Sécurité */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Sécurité des données</h2>
              </div>
              
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 space-y-4">
                <p className="text-foreground/70">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
                  appropriées pour protéger vos données personnelles contre :
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>La perte ou la destruction accidentelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>L&apos;accès non autorisé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>La divulgation ou l&apos;altération illicite</span>
                  </li>
                </ul>
                <p className="text-foreground/70">
                  Nos mesures incluent le chiffrement SSL/TLS, des contrôles d&apos;accès stricts, 
                  et des sauvegardes régulières.
                </p>
              </div>
            </section>

            {/* Durée de conservation */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Durée de conservation</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8">
                <p className="text-foreground/70">
                  Nous conservons vos données personnelles uniquement pendant la durée nécessaire 
                  aux finalités pour lesquelles elles ont été collectées, ou conformément aux 
                  obligations légales de conservation (généralement 10 ans pour les documents 
                  contractuels en Suisse).
                </p>
                <p className="text-foreground/70 mt-4">
                  Passé ce délai, vos données sont supprimées ou anonymisées de manière sécurisée.
                </p>
              </div>
            </section>

            {/* Droits des utilisateurs */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Vos droits</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8 space-y-4">
                <p className="text-foreground/70">
                  Conformément à la législation en vigueur, vous disposez des droits suivants :
                </p>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">→</span>
                    <span><span className="font-semibold text-foreground">Droit d&apos;accès :</span> Obtenir une copie de vos données personnelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">→</span>
                    <span><span className="font-semibold text-foreground">Droit de rectification :</span> Corriger des données inexactes ou incomplètes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">→</span>
                    <span><span className="font-semibold text-foreground">Droit à l&apos;effacement :</span> Demander la suppression de vos données dans certaines conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">→</span>
                    <span><span className="font-semibold text-foreground">Droit à la limitation :</span> Limiter le traitement de vos données dans certains cas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">→</span>
                    <span><span className="font-semibold text-foreground">Droit d&apos;opposition :</span> Vous opposer au traitement de vos données</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">→</span>
                    <span><span className="font-semibold text-foreground">Droit à la portabilité :</span> Recevoir vos données dans un format structuré</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 font-bold">→</span>
                    <span><span className="font-semibold text-foreground">Droit de retirer votre consentement :</span> À tout moment pour les traitements basés sur le consentement</span>
                  </li>
                </ul>
                <p className="text-foreground/70 pt-4 border-t border-border mt-4">
                  Pour exercer vos droits, contactez-nous à :{" "}
                  <a href="mailto:contact@advisy.ch" className="text-primary font-semibold hover:underline">
                    contact@advisy.ch
                  </a>
                </p>
              </div>
            </section>

            {/* Réclamation */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Droit de réclamation</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8">
                <p className="text-foreground/70">
                  Si vous estimez que le traitement de vos données personnelles porte atteinte 
                  à vos droits, vous pouvez introduire une réclamation auprès du Préposé fédéral 
                  à la protection des données et à la transparence (PFPDT) :
                </p>
                <div className="mt-4 pl-4 border-l-4 border-primary">
                  <p className="text-foreground font-semibold">PFPDT</p>
                  <p className="text-foreground/70">Feldeggweg 1</p>
                  <p className="text-foreground/70">3003 Berne</p>
                  <p className="text-foreground/70">Suisse</p>
                  <p className="text-foreground/70 mt-2">
                    Site web :{" "}
                    <a 
                      href="https://www.edoeb.admin.ch" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      www.edoeb.admin.ch
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Modifications */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Modifications de la politique</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8">
                <p className="text-foreground/70">
                  Nous nous réservons le droit de modifier cette politique de confidentialité 
                  à tout moment. Toute modification sera publiée sur cette page avec une date 
                  de mise à jour. Nous vous encourageons à consulter régulièrement cette page 
                  pour prendre connaissance des éventuelles modifications.
                </p>
                <p className="text-foreground/70 mt-4">
                  Les modifications substantielles vous seront notifiées par email si vous nous 
                  avez fourni votre adresse email.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Nous contacter</h2>
              <div className="bg-gradient-card backdrop-blur-sm border border-border rounded-2xl p-8">
                <p className="text-foreground/70 mb-4">
                  Pour toute question concernant cette politique de confidentialité ou le traitement 
                  de vos données personnelles, vous pouvez nous contacter :
                </p>
                <div className="space-y-2 text-foreground/70">
                  <p>
                    <span className="font-semibold text-foreground">Par email :</span>{" "}
                    <a href="mailto:contact@advisy.ch" className="text-primary hover:underline">
                      contact@advisy.ch
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Par courrier :</span> e-Advisy Sàrl, Adresse à compléter
                  </p>
                </div>
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

export default PolitiqueConfidentialite;
