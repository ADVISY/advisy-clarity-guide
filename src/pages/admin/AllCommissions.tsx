import { useCommissions } from "@/hooks/useCommissions";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";

export default function AllCommissions() {
  const { commissions, loading } = useCommissions();

  if (loading) {
    return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  const total = commissions.reduce((sum, c) => sum + (c.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Toutes les Commissions</h1>
        <p className="text-muted-foreground mt-2">Vue globale des commissions</p>
      </div>
      <StatsCard title="Total Commissions" value={`CHF ${total.toLocaleString('fr-CH')}`} icon={DollarSign} />
    </div>
  );
}
