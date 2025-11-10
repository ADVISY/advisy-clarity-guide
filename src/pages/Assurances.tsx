import { useState, useEffect, useCallback } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Shield, Car, Home, HeartPulse, Landmark, Scale, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import assuranceConseilHero from "@/assets/assurance-conseil-hero.jpg";
import santeModerne from "@/assets/sante-moderne.jpg";
import pilierModerne from "@/assets/3pilier-moderne.jpg";
import autoModerne from "@/assets/auto-moderne.jpg";
import menageModerne from "@/assets/menage-moderne.jpg";
import hypothequeModerne from "@/assets/hypotheque-moderne.jpg";
import juridiqueModerne from "@/assets/juridique-moderne.jpg";
import lppEntreprise from "@/assets/lpp-entreprise.jpg";

const Assurances = () => {
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
      icon: HeartPulse,
      title: "Assurance Santé",
      subtitle: "LAMal & complémentaires",
      description: "Comparez et optimisez vos primes d'assurance maladie. Trouvez le meilleur rapport qualité-prix selon votre profil.",
      image: santeModerne,
      link: "/assurances/sante",
    },
    {
      icon: Shield,
      title: "3ᵉ Pilier",
      subtitle: "Prévoyance & fiscalité",
      description: "Préparez votre retraite tout en réduisant vos impôts. Solutions 3a et 3b adaptées à vos objectifs.",
      image: pilierModerne,
      link: "/assurances/3e-pilier",
    },
    {
      icon: Car,
      title: "Assurance Auto",
      subtitle: "Protection complète",
      description: "RC, casco, assistance : trouvez la couverture idéale pour votre véhicule au meilleur prix.",
      image: autoModerne,
      link: "/assurances/auto",
    },
    {
      icon: Home,
      title: "RC Ménage",
      subtitle: "Protection quotidienne",
      description: "Protégez-vous contre les dommages du quotidien. Une assurance essentielle pour toute la famille.",
      image: menageModerne,
      link: "/assurances/rc-menage",
    },
  ];

  const services = [
    {
      icon: Landmark,
      title: "Hypothèque",
      description: "Financez votre bien immobilier aux meilleures conditions",
      link: "/assurances/hypotheque",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: Scale,
      title: "Protection Juridique",
      description: "Défendez vos droits en toute sérénité",
      link: "/assurances/protection-juridique",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: Users,
      title: "Assurance Personnel",
      description: "Solutions pour vos collaborateurs",
      link: "/entreprises/assurance-personnel",
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: Building,
      title: "Prévoyance LPP",
      description: "2ᵉ pilier pour entreprises",
      link: "/entreprises/prevoyance-lpp",
      gradient: "from-orange-500/10 to-red-500/10",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Slider Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Column - Text */}
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                      Nos assurances
                    </span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                    Toutes vos{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                        assurances
                      </span>
                      <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 blur-sm" />
                    </span>
                    {" "}au même endroit
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                    Advisy vous accompagne dans toutes vos démarches d'assurance et de prévoyance.{" "}
                    <span className="text-foreground font-medium">
                      Solutions sur mesure pour particuliers et entreprises.
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Column - Slider */}
              <div className="relative animate-scale-in">
                <div className="relative overflow-hidden rounded-[32px]" ref={emblaRef}>
                  <div className="flex">
                    {slides.map((slide, index) => {
                      const Icon = slide.icon;
                      return (
                        <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                          <div className="relative">
                            <Link to={slide.link}>
                              <div className="group relative z-20 rounded-[32px] overflow-hidden border-4 border-white/20 shadow-strong hover:shadow-[0_0_80px_rgba(100,50,255,0.5)] transition-all duration-700 hover:-translate-y-3 hover:border-primary/40 cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700 z-10" />
                                <img 
                                  src={slide.image} 
                                  alt={slide.title}
                                  className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                                />
                                
                                <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-primary/20 shadow-strong">
                                  <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0 group-hover:scale-110 transition-transform">
                                      <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="text-2xl font-bold text-foreground mb-1">
                                        {slide.title}
                                      </h3>
                                      <p className="text-sm font-semibold text-primary mb-2">
                                        {slide.subtitle}
                                      </p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">
                                        {slide.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>

                            <div className="absolute -top-16 -right-16 w-80 h-80 bg-gradient-to-br from-primary/15 to-primary-glow/10 rounded-full blur-[120px] -z-10 animate-float" />
                            <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-gradient-to-tl from-accent/20 to-primary/10 rounded-full blur-[140px] -z-10 animate-pulse" />
                          </div>
                        </div>
                      );
                    })}
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
                      aria-label={`Aller à l'assurance ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                  Découvrez toutes nos solutions
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Des services complets pour protéger ce qui compte vraiment pour vous
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={index}
                      to={service.link}
                      className="group relative p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-primary font-semibold mt-4 group-hover:gap-4 transition-all">
                          En savoir plus
                          <span className="text-xl">→</span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
                Besoin de conseils personnalisés ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nos conseillers Advisy analysent votre situation et vous proposent les meilleures solutions du marché.
              </p>
              <Button size="lg" asChild>
                <Link to="/#contact">Demander un rendez-vous gratuit</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Assurances;