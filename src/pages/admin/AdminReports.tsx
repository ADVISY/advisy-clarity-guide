import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function AdminReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rapports Globaux</h1>
        <p className="text-muted-foreground mt-2">Statistiques et analyses</p>
      </div>
      <Card className="bg-gradient-card border-border/50">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Rapports en développement</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
