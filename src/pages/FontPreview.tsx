import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const fonts = [
  {
    name: "Poppins",
    family: "'Poppins', sans-serif",
    url: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
    description: "Moderne et géométrique, très lisible"
  },
  {
    name: "Plus Jakarta Sans",
    family: "'Plus Jakarta Sans', sans-serif",
    url: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
    description: "Élégante et professionnelle, populaire pour les SaaS"
  },
  {
    name: "DM Sans",
    family: "'DM Sans', sans-serif",
    url: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap",
    description: "Clean et minimaliste, excellente lisibilité"
  },
  {
    name: "Outfit",
    family: "'Outfit', sans-serif",
    url: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap",
    description: "Contemporaine avec du caractère"
  },
  {
    name: "Inter (actuelle)",
    family: "'Inter', sans-serif",
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
    description: "Police actuelle du système"
  }
];

export default function FontPreview() {
  const [selectedFont, setSelectedFont] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Load all fonts */}
      {fonts.map(font => (
        <link key={font.name} rel="stylesheet" href={font.url} />
      ))}

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Prévisualisation des Polices</h1>
          <p className="text-muted-foreground">Choisissez la police pour LYTA</p>
        </div>

        <div className="grid gap-6">
          {fonts.map((font) => (
            <Card 
              key={font.name}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedFont === font.name ? 'ring-2 ring-primary border-primary' : ''
              }`}
              onClick={() => setSelectedFont(font.name)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {font.name}
                    {selectedFont === font.name && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">{font.description}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ fontFamily: font.family }} className="space-y-4">
                  {/* Logo Style */}
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <span className="text-4xl font-bold" style={{ color: '#D4A418' }}>LYTA</span>
                    <span className="text-2xl font-semibold text-foreground">Dashboard</span>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex gap-6 text-sm font-medium text-muted-foreground">
                    <span className="hover:text-foreground cursor-pointer">Clients</span>
                    <span className="hover:text-foreground cursor-pointer">Contrats</span>
                    <span className="hover:text-foreground cursor-pointer">Commissions</span>
                    <span className="hover:text-foreground cursor-pointer">Rapports</span>
                  </div>

                  {/* Sample Content */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">CHF 125'450</p>
                      <p className="text-sm text-muted-foreground">Commissions du mois</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">847</p>
                      <p className="text-sm text-muted-foreground">Clients actifs</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">98.5%</p>
                      <p className="text-sm text-muted-foreground">Taux de rétention</p>
                    </div>
                  </div>

                  {/* Body Text */}
                  <p className="text-sm text-muted-foreground pt-2">
                    Gérez efficacement vos clients, contrats et commissions avec LYTA. 
                    Une plateforme complète pour les courtiers en assurances.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedFont && (
          <div className="text-center pt-4">
            <p className="text-lg font-medium text-foreground mb-4">
              Vous avez sélectionné : <strong>{selectedFont}</strong>
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Confirmer ce choix
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
