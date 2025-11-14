import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CRMCommissions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Commissions</h1>
        <p className="text-muted-foreground mt-1">
          Suivez vos commissions et revenus
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Synthèse des commissions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Page en construction
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
