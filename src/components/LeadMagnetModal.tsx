import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Download, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LeadMagnetModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeenModal = localStorage.getItem("hasSeenLeadMagnet");
    
    if (!hasSeenModal) {
      // Show modal after 15 seconds on first visit
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer votre adresse email.",
        variant: "destructive",
      });
      return;
    }

    // Mark as submitted
    setHasSubmitted(true);
    localStorage.setItem("hasSeenLeadMagnet", "true");

    toast({
      title: "Guide téléchargé !",
      description: "Consultez votre boîte mail pour accéder au guide gratuit.",
    });

    // Close modal after 2 seconds
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenLeadMagnet", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md overflow-hidden p-0">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Fermer</span>
        </button>

        {!hasSubmitted ? (
          <>
            {/* Header with gradient */}
            <div className="bg-gradient-primary p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto">
                  <Gift className="w-8 h-8" />
                </div>
                <DialogHeader className="text-center space-y-2">
                  <DialogTitle className="text-2xl font-bold text-white">
                    Guide gratuit offert 🎁
                  </DialogTitle>
                  <DialogDescription className="text-white/90 text-base">
                    Téléchargez notre guide exclusif
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">
                  10 erreurs à éviter avec votre assurance maladie
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Économisez jusqu'à CHF 2'000 par an</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Optimisez votre franchise et modèle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Conseils d'experts certifiés</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger gratuitement
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center">
                Pas de spam. Désinscription en un clic. Vos données sont protégées.
              </p>
            </div>
          </>
        ) : (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Merci !</h3>
              <p className="text-muted-foreground">
                Consultez votre boîte mail pour accéder au guide.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};