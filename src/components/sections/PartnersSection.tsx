import { Award } from "lucide-react";
import liechtensteinLogo from "@/assets/partners/liechtenstein-life.webp";
import cssLogo from "@/assets/partners/css-logo.png";
import groupeMutuelLogo from "@/assets/partners/groupe-mutuel-logo.png";
import sanitasLogo from "@/assets/partners/sanitas-logo.png";
import paxLogo from "@/assets/partners/pax-logo.png";
import helsanaLogo from "@/assets/partners/helsana-logo.svg";
import swissLifeLogo from "@/assets/partners/swiss-life-logo.jpg";

const partners = [
  { name: "Liechtenstein Life", logo: liechtensteinLogo },
  { name: "CSS", logo: cssLogo },
  { name: "Helsana", logo: helsanaLogo },
  { name: "Groupe Mutuel", logo: groupeMutuelLogo },
  { name: "Sanitas", logo: sanitasLogo },
  { name: "Pax", logo: paxLogo },
  { name: "Swiss Life", logo: swissLifeLogo },
];

export const PartnersSection = () => {
  // Calculate rotation angle for each logo
  const angleStep = 360 / partners.length;

  return (
    <section className="relative py-16 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
      
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Nos partenaires
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Accès aux{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              meilleures compagnies
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nous comparons les offres de toutes les grandes compagnies d'assurance suisses
            pour vous proposer la solution la plus avantageuse.
          </p>
        </div>

        {/* 3D Half-Circle Carousel - Desktop */}
        <div className="hidden md:block relative w-full h-[200px] overflow-hidden" style={{ perspective: "1200px" }}>
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-[900px] h-[180px] animate-sphere-rotate"
            style={{ 
              transformStyle: "preserve-3d",
              transformOrigin: "center center"
            }}
          >
            {partners.map((partner, index) => {
              // Distribute logos on a half-circle (180 degrees)
              const angle = (index / (partners.length - 1)) * 180 - 90; // -90 to 90 degrees
              const radius = 350;
              
              return (
                <div
                  key={partner.name}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-4 w-36 h-24 flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`Logo ${partner.name}`}
                      className="max-h-12 max-w-full object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-0 dark:invert"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Carousel Fallback */}
        <div className="md:hidden overflow-x-auto overflow-y-hidden">
          <div className="flex gap-4 px-4 pb-4">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-4 w-32 h-20 flex items-center justify-center"
              >
                <img 
                  src={partner.logo} 
                  alt={`Logo ${partner.name}`}
                  className="max-h-10 object-contain mix-blend-multiply dark:mix-blend-normal dark:brightness-0 dark:invert"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-8 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Et plus de <span className="font-bold text-primary">50+ compagnies</span> d'assurance en Suisse
          </p>
        </div>
      </div>
    </section>
  );
};
