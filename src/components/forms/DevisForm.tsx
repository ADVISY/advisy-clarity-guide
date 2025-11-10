import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface DevisFormProps {
  type: string;
  title: string;
}

export const DevisForm = ({ type, title }: DevisFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    codePostal: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "✅ Demande envoyée !",
        description: "Nous vous recontacterons dans les 24h",
      });
      setIsSubmitting(false);
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        codePostal: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-strong">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground">
          Remplissez le formulaire et recevez votre devis personnalisé gratuitement
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom *</Label>
            <Input
              id="nom"
              required
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prenom">Prénom *</Label>
            <Input
              id="prenom"
              required
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              className="bg-background/50"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone *</Label>
            <Input
              id="telephone"
              type="tel"
              required
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              className="bg-background/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="codePostal">Code postal *</Label>
          <Input
            id="codePostal"
            required
            value={formData.codePostal}
            onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
            className="bg-background/50"
            placeholder="1000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message (optionnel)</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-background/50 min-h-[100px]"
            placeholder="Décrivez vos besoins spécifiques..."
          />
        </div>

        <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Demander mon devis gratuit"}
          <Send className="w-5 h-5" />
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Vos données sont protégées et ne seront jamais partagées avec des tiers
        </p>
      </form>
    </div>
  );
};