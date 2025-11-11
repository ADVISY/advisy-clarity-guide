import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Phone, Calendar } from "lucide-react";

export const CTABanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-slide-up">
      <div className="bg-gradient-primary text-white shadow-strong">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Message */}
            <div className="flex-1 min-w-0">
              <p className="text-base md:text-lg font-semibold mb-1">
                💰 Économisez jusqu'à 40% sur vos assurances
              </p>
              <p className="text-sm text-white/90">
                Analyse gratuite de votre situation en moins de 24h
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={scrollToContact}
                className="bg-white text-primary hover:bg-white/90 shadow-medium font-semibold"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Prendre rendez-vous
              </Button>
              
              <a href="tel:+41782122360">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Appeler</span>
                </Button>
              </a>

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};