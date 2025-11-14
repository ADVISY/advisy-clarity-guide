import { useDocuments } from "@/hooks/useDocuments";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function AllDocuments() {
  const { documents, loading } = useDocuments();

  if (loading) {
    return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tous les Documents</h1>
        <p className="text-muted-foreground mt-2">Gestion de tous les documents</p>
      </div>
      <Card className="bg-gradient-card border-border/50">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-foreground font-medium">{documents.length} documents</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
