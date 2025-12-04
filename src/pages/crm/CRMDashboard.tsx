import { useUserRole } from "@/hooks/useUserRole";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, DollarSign, TrendingUp, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const kpiCards = [
  {
    title: "Clients",
    value: "124",
    change: "+12%",
    description: "Total clients actifs",
    icon: Users,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    title: "Contrats",
    value: "89",
    change: "+8%",
    description: "Contrats en cours",
    icon: FileText,
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-500/10 to-emerald-600/5",
  },
  {
    title: "Commissions",
    value: "12'450 CHF",
    change: "+23%",
    description: "Ce mois",
    icon: DollarSign,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/5",
    roles: ["admin", "partner"],
  },
  {
    title: "Revenus",
    value: "45'890 CHF",
    change: "+15%",
    description: "Primes mensuelles",
    icon: TrendingUp,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/10 to-purple-600/5",
    roles: ["admin", "partner"],
  },
];

export default function CRMDashboard() {
  const { role, isAdmin, isPartner, isClient } = useUserRole();

  const visibleCards = kpiCards.filter(
    (card) => !card.roles || card.roles.includes(role || "")
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Tableau de bord
            </h1>
          </div>
          <p className="text-muted-foreground ml-14">
            {isAdmin && "Vue d'ensemble administrative"}
            {isPartner && "Vue d'ensemble partenaire"}
            {isClient && "Aperçu de vos contrats"}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {visibleCards.map((card, index) => (
          <Card
            key={card.title}
            className={cn(
              "group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500",
              "hover:-translate-y-1 cursor-pointer",
              "bg-gradient-to-br",
              card.bgGradient
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Decorative gradient orb */}
            <div className={cn(
              "absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl transition-all duration-500",
              "bg-gradient-to-br",
              card.gradient,
              "group-hover:opacity-40 group-hover:scale-150"
            )} />
            
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "p-3 rounded-xl bg-gradient-to-br shadow-lg",
                  card.gradient
                )}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-semibold">
                  <ArrowUpRight className="h-3 w-3" />
                  {card.change}
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <p className="text-3xl font-bold tracking-tight">{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Nouveau contrat créé</p>
                    <p className="text-xs text-muted-foreground">Il y a {i} heure{i > 1 ? 's' : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">À faire</h3>
            <div className="space-y-4">
              {[
                { label: "Contrats à renouveler", count: 5 },
                { label: "Suivis en attente", count: 12 },
                { label: "Documents à valider", count: 3 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
