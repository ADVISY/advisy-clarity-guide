import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Plus, Users, Shield, UserCheck, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const statsCards = [
  { label: "Total", value: "15", icon: Users, color: "from-blue-500 to-blue-600" },
  { label: "Admins", value: "2", icon: Crown, color: "from-amber-500 to-orange-500" },
  { label: "Agents", value: "10", icon: UserCheck, color: "from-emerald-500 to-emerald-600" },
  { label: "Backoffice", value: "3", icon: Shield, color: "from-violet-500 to-purple-600" },
];

export default function CRMCollaborateurs() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
            <UserCog className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Collaborateurs</h1>
            <p className="text-muted-foreground">Gérez votre équipe et les accès</p>
          </div>
        </div>
        <Button className="group bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90" />
          Ajouter un collaborateur
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
            <UserCog className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <p className="text-lg font-semibold text-muted-foreground">Module en construction</p>
          <p className="text-sm text-muted-foreground mt-1">Cette fonctionnalité sera bientôt disponible</p>
        </CardContent>
      </Card>
    </div>
  );
}
