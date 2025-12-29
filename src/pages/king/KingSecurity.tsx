import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Key, Lock, Eye } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function KingSecurity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sécurité Plateforme</h1>
        <p className="text-muted-foreground">Paramètres de sécurité globaux de LYTA</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Key className="h-5 w-5 text-amber-500" />
              Authentification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">2FA obligatoire KING</p>
                <p className="text-sm text-muted-foreground">
                  Imposer 2FA pour tous les super admins
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Session timeout</p>
                <p className="text-sm text-muted-foreground">
                  Déconnexion auto après inactivité
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5 text-amber-500" />
              Accès
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">IP Whitelist</p>
                <p className="text-sm text-muted-foreground">
                  Limiter accès par adresses IP
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Logs d'audit</p>
                <p className="text-sm text-muted-foreground">
                  Tracer toutes les actions KING
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="h-5 w-5 text-amber-500" />
              Audit Trail
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Historique des actions de sécurité
              </p>
              <p className="text-sm text-muted-foreground">
                Fonctionnalité en cours de développement
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
