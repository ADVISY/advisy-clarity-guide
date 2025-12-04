import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp, PieChart, LineChart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const reportTypes = [
  { label: "Performance", icon: TrendingUp, color: "from-emerald-500 to-emerald-600", description: "Analyse des performances" },
  { label: "Ventes", icon: BarChart3, color: "from-blue-500 to-blue-600", description: "Rapport des ventes" },
  { label: "Distribution", icon: PieChart, color: "from-amber-500 to-orange-500", description: "Répartition par produit" },
  { label: "Tendances", icon: LineChart, color: "from-violet-500 to-purple-600", description: "Évolution temporelle" },
];

export default function CRMRapports() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Rapports</h1>
            <p className="text-muted-foreground">Analyses et statistiques de votre activité</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Report Types Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report) => (
          <Card key={report.label} className="group border-0 shadow-lg bg-card/80 backdrop-blur hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6">
              <div className={cn("p-3 rounded-xl bg-gradient-to-br w-fit mb-4", report.color)}>
                <report.icon className="h-6 w-6 text-white" />
              </div>
              <p className="font-semibold mb-1 group-hover:text-primary transition-colors">{report.label}</p>
              <p className="text-sm text-muted-foreground">{report.description}</p>
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
          <p className="text-sm text-muted-foreground mt-1">Les rapports détaillés seront bientôt disponibles</p>
        </CardContent>
      </Card>
    </div>
  );
}
