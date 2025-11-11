import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import advisyTextLogo from "@/assets/advisy-text-logo.svg";
import teamExpertise from "@/assets/team-expertise.jpg";
import familyConsultation from "@/assets/family-consultation.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import officeConsultation from "@/assets/office-consultation.jpg";
import clientHappy from "@/assets/client-happy.jpg";
import { 
  Briefcase, 
  Rocket, 
  Shield, 
  TrendingUp, 
  Target, 
  Zap, 
  Users, 
  MessageSquare,
  Award,
  Laptop,
  UserCheck,
  HeartHandshake
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const candidatureSchema = z.object({
  nom: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  telephone: z.string().trim().min(10, "Numéro invalide").max(20),
  statut: z.string().min(1, "Veuillez sélectionner un statut"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
});

type CandidatureFormData = z.infer<typeof candidatureSchema>;

const Carriere = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const slides = [
    {
      image: teamExpertise,
      title: "Équipe dynamique et collaborative",
      description: "Rejoignez une équipe passionnée et ambitieuse",
    },
    {
      image: familyConsultation,
      title: "Accompagnement personnalisé",
      description: "Un coaching dédié pour votre réussite",
    },
    {
      image: teamMeeting,
      title: "Formation continue",
      description: "Développez vos compétences avec notre académie",
    },
  ];

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<CandidatureFormData>({
    resolver: zodResolver(candidatureSchema),
  });

  const onSubmit = (data: CandidatureFormData) => {
    console.log("Candidature:", data);
    toast.success("Candidature envoyée avec succès !");
    reset();
  };

  const scrollToCandidature = () => {
    const section = document.getElementById("candidature");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section with Slider */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
          <div className="container relative z-10 mx-auto px-4 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Column */}
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Rocket className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                      Carrières
                    </span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight flex flex-wrap items-center gap-3">
                    <span>Rejoindre</span>
                    <img src={advisyTextLogo} alt="Advisy" className="h-12 md:h-16 object-contain inline-block" />
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                    Construis ta carrière dans le conseil en assurance et finance, avec des moyens à la hauteur de tes ambitions.
                  </p>
                </div>

                <Button 
                  size="lg" 
                  className="mt-8 shadow-glow hover:-translate-y-1 transition-all duration-300"
                  onClick={scrollToCandidature}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Rejoindre l'équipe
                </Button>
              </div>

              {/* Right Column - Carousel */}
              <div className="relative animate-scale-in">
                <div className="relative overflow-hidden rounded-[32px]" ref={emblaRef}>
                  <div className="flex">
                    {slides.map((slide, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                        <div className="relative">
                          <div className="group relative z-20 rounded-[32px] overflow-hidden border-4 border-white/20 shadow-strong hover:shadow-glow transition-all duration-700 hover:-translate-y-3">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700 z-10" />
                            <img 
                              src={slide.image} 
                              alt={slide.title}
                              className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                            />
                            
                            <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-primary/20 shadow-strong">
                              <h3 className="text-2xl font-bold text-foreground mb-2">
                                {slide.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {slide.description}
                              </p>
                            </div>
                          </div>

                          <div className="absolute -top-16 -right-16 w-80 h-80 bg-gradient-to-br from-primary/15 to-primary-glow/10 rounded-full blur-[120px] -z-10 animate-float" />
                          <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-gradient-to-tl from-accent/20 to-primary/10 rounded-full blur-[140px] -z-10 animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === selectedIndex
                          ? "w-8 h-3 bg-primary shadow-glow"
                          : "w-3 h-3 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                      }`}
                      aria-label={`Aller à la slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1 - Pourquoi travailler avec Advisy */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Pourquoi travailler avec <img src={advisyTextLogo} alt="Advisy" className="h-12 md:h-14 object-contain inline-block mx-2" /> ?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chez Advisy, nous proposons une solution clé en main pour bâtir une carrière solide et pérenne. 
                Un accompagnement structuré, une ambition forte et des outils modernes pour te faire réussir.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <Briefcase className="w-8 h-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-2xl">Solution clé en main</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Une solution clé en main et un accompagnement précis pour remplir vos objectifs, 
                    avec un suivi structuré et des objectifs clairs.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Ambition dans le détail du conseil</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Une ambition directionnelle forte : aller plus loin dans le détail du conseil, 
                    la qualité de l'analyse et le service client.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                    <Zap className="w-8 h-8 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl">Back office moderne et rapide</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Un back-office moderne, avancé et rapide pour vous faire gagner du temps et sécuriser vos dossiers.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 2 - Outils et leads */}
        <section className="py-20 lg:py-32 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Des outils et des moyens concrets
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
              <div className="space-y-8">
                <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-0 group-hover:bg-purple-500/20 transition-colors" />
                  <CardHeader className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Laptop className="w-8 h-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-2xl">Outils digitaux à la pointe</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base leading-relaxed">
                      Des outils digitaux à la pointe de la technologie pour piloter votre activité, 
                      suivre vos clients et préparer vos rendez-vous.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-0 group-hover:bg-orange-500/20 transition-colors" />
                  <CardHeader className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UserCheck className="w-8 h-8 text-orange-500" />
                    </div>
                    <CardTitle className="text-2xl">Leads ultra qualifiés</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base leading-relaxed">
                      Des leads ultra qualifiés, issus de notre site de comparateur conçu spécialement pour l'équipe. 
                      Moins de prospection à froid, plus de conseils de qualité.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                  <img 
                    src={officeConsultation} 
                    alt="Outils digitaux Advisy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -top-8 -right-8 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Rémunération et évolution */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Rémunération & évolution
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                    <TrendingUp className="w-8 h-8 text-emerald-500" />
                  </div>
                  <CardTitle className="text-2xl">Commissions non plafonnées</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Votre rémunération suit réellement vos résultats, sans plafond artificiel.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <Shield className="w-8 h-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-2xl">Primes et base fixe (inscrits FINMA)</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Pour les personnes inscrites à la FINMA, une base fixe est prévue, 
                    accompagnée de primes liées à la qualité de vos affaires.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                    <Award className="w-8 h-8 text-violet-500" />
                  </div>
                  <CardTitle className="text-2xl">Évolution managériale possible</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Une évolution managériale est possible en fonction de la qualité de vos affaires, 
                    de votre perception du domaine et de l'engouement que vous générez pour l'entreprise.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 4 - Accompagnement & culture */}
        <section className="py-20 lg:py-32 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
                  <img 
                    src={clientHappy} 
                    alt="Culture d'entreprise Advisy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
              </div>

              <div className="order-1 lg:order-2">
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Accompagnement & culture
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Chez Advisy, vous n'êtes pas livré à vous-même. Un accompagnement précis vous aide à progresser 
                    sur le terrain, dans votre discours et dans votre organisation. L'objectif : vous amener à un haut 
                    niveau de qualité de conseil et de service client.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Coaching régulier</h3>
                      <p className="text-muted-foreground">Accompagnement personnalisé et suivi continu pour garantir votre progression</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <MessageSquare className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Feedback concret</h3>
                      <p className="text-muted-foreground">Retours constructifs et actionables pour progresser rapidement dans votre métier</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <HeartHandshake className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Culture de la qualité</h3>
                      <p className="text-muted-foreground">Excellence et satisfaction client placées au cœur de toutes nos actions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 - Candidature */}
        <section id="candidature" className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Prêt à rejoindre l'équipe ?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Vous voulez un cadre sérieux, des outils modernes et une vraie perspective d'évolution ? 
                  Envoyez-nous votre candidature et voyons si nous avançons ensemble.
                </p>
              </div>

              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom complet *</Label>
                      <Input 
                        id="nom" 
                        placeholder="Votre nom complet"
                        {...register("nom")}
                        className={errors.nom ? "border-red-500" : ""}
                      />
                      {errors.nom && <p className="text-sm text-red-500">{errors.nom.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="votre@email.com"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input 
                        id="telephone" 
                        type="tel"
                        placeholder="+41 XX XXX XX XX"
                        {...register("telephone")}
                        className={errors.telephone ? "border-red-500" : ""}
                      />
                      {errors.telephone && <p className="text-sm text-red-500">{errors.telephone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="statut">Statut *</Label>
                      <Select onValueChange={(value) => setValue("statut", value)}>
                        <SelectTrigger className={errors.statut ? "border-red-500" : ""}>
                          <SelectValue placeholder="Sélectionnez votre statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inscrit-finma">Inscrit FINMA</SelectItem>
                          <SelectItem value="non-inscrit-finma">Non inscrit FINMA</SelectItem>
                          <SelectItem value="reconversion">En reconversion</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.statut && <p className="text-sm text-red-500">{errors.statut.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message / Motivation *</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Parlez-nous de vos motivations et de votre parcours..."
                        rows={6}
                        {...register("message")}
                        className={errors.message ? "border-red-500" : ""}
                      />
                      {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-lg rounded-full shadow-glow hover:scale-[1.02] transition-transform"
                    >
                      <Rocket className="w-5 h-5 mr-2" />
                      Envoyer ma candidature
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Carriere;
