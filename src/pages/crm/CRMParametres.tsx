import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CRMParametres() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Configurez votre CRM
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
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
