import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Plus, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const statsCards = [
  { label: "Ouverts", value: "12", icon: Clock, color: "from-blue-500 to-blue-600" },
  { label: "En cours", value: "8", icon: AlertCircle, color: "from-amber-500 to-orange-500" },
  { label: "Terminés", value: "45", icon: CheckCircle2, color: "from-emerald-500 to-emerald-600" },
  { label: "Cette semaine", value: "5", icon: Calendar, color: "from-violet-500 to-purple-600" },
];

export default function CRMSuivis() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/20">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Suivis</h1>
            <p className="text-muted-foreground">Gérez vos suivis et tâches</p>
          </div>
        </div>
        <Button className="group bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90" />
          Nouveau suivi
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
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
            <ClipboardList className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <p className="text-lg font-semibold text-muted-foreground">Module en construction</p>
          <p className="text-sm text-muted-foreground mt-1">Cette fonctionnalité sera bientôt disponible</p>
        </CardContent>
      </Card>
    </div>
  );
}
