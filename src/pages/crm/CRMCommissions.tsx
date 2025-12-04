import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Wallet, PiggyBank, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const statsCards = [
  { label: "Total ce mois", value: "12'450 CHF", icon: DollarSign, color: "from-emerald-500 to-emerald-600" },
  { label: "En attente", value: "3'200 CHF", icon: Wallet, color: "from-amber-500 to-orange-500" },
  { label: "Payées", value: "9'250 CHF", icon: PiggyBank, color: "from-blue-500 to-blue-600" },
  { label: "Évolution", value: "+23%", icon: TrendingUp, color: "from-violet-500 to-purple-600" },
];

export default function CRMCommissions() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
          <DollarSign className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Commissions</h1>
          <p className="text-muted-foreground">Suivez vos commissions et revenus</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={stat.label} className="border-0 shadow-lg bg-card/80 backdrop-blur hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("p-2 rounded-lg bg-gradient-to-br", stat.color)}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-6">
            <BarChart3 className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <p className="text-lg font-semibold text-muted-foreground">Module en construction</p>
          <p className="text-sm text-muted-foreground mt-1">Cette fonctionnalité sera bientôt disponible</p>
        </CardContent>
      </Card>
    </div>
  );
}
