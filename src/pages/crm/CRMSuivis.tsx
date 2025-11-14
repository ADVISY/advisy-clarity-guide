import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CRMSuivis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Suivis</h1>
        <p className="text-muted-foreground mt-1">Gérez vos suivis et tâches</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des suivis</CardTitle>
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
