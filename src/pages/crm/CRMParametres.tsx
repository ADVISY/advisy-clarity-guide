import { Card, CardContent } from "@/components/ui/card";
import { Settings, User, Bell, Shield, Palette, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsSections = [
  { label: "Profil", icon: User, color: "from-blue-500 to-blue-600", description: "Informations personnelles" },
  { label: "Notifications", icon: Bell, color: "from-amber-500 to-orange-500", description: "Préférences d'alertes" },
  { label: "Sécurité", icon: Shield, color: "from-emerald-500 to-emerald-600", description: "Mot de passe et 2FA" },
  { label: "Apparence", icon: Palette, color: "from-violet-500 to-purple-600", description: "Thème et affichage" },
  { label: "Données", icon: Database, color: "from-slate-500 to-slate-600", description: "Export et import" },
];

export default function CRMParametres() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 shadow-lg shadow-slate-500/20">
          <Settings className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground">Configurez votre CRM</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsSections.map((section) => (
          <Card key={section.label} className="group border-0 shadow-lg bg-card/80 backdrop-blur hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={cn("p-3 rounded-xl bg-gradient-to-br shrink-0", section.color)}>
                  <section.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold mb-1 group-hover:text-primary transition-colors">{section.label}</p>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-6">
            <Settings className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <p className="text-lg font-semibold text-muted-foreground">Configuration avancée</p>
          <p className="text-sm text-muted-foreground mt-1">Les paramètres détaillés seront bientôt disponibles</p>
        </CardContent>
      </Card>
    </div>
  );
}
