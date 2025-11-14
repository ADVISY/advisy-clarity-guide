import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CRMRapports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rapports</h1>
        <p className="text-muted-foreground mt-1">
          Analyses et statistiques de votre activité
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rapports disponibles</CardTitle>
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
