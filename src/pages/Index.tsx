import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SplashSection } from "@/components/sections/SplashSection";
import { EnhancedHeroSection } from "@/components/sections/EnhancedHeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { WhyAdvisySection } from "@/components/sections/WhyAdvisySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AIAssistant } from "@/components/AIAssistant";
import { BlogSection } from "@/components/sections/BlogSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { LeadMagnetModal } from "@/components/LeadMagnetModal";
import { CTABanner } from "@/components/CTABanner";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleEnter = () => {
    setShowSplash(false);
    setTimeout(() => {
      const accueil = document.querySelector("#accueil");
      if (accueil) {
        accueil.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {!showSplash && <Navigation />}
      {showSplash ? (
        <SplashSection onEnter={handleEnter} />
      ) : (
        <>
          <main>
            <EnhancedHeroSection />
            <StatsSection />
            <ServicesSection />
            <PartnersSection />
            <WhyAdvisySection />
            <HowItWorksSection />
            <MethodSection />
            <AboutSection />
            <TestimonialsSection />
            <BlogSection />
            <FAQSection />
            <ContactSection />
          </main>
          <Footer />
          <WhatsAppButton />
          <AIAssistant />
          <LeadMagnetModal />
          <CTABanner />
        </>
      )}
    </div>
  );
};

export default Index;
