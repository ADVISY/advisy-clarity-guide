import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Globe, Mail, CreditCard, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function KingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres Plateforme</h1>
        <p className="text-muted-foreground">Configuration globale de LYTA</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-amber-500" />
              Domaine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Domaine principal</Label>
              <Input value="lyta.ch" disabled />
            </div>
            <div className="space-y-2">
              <Label>Format sous-domaine</Label>
              <Input value="{slug}.lyta.ch" disabled />
            </div>
            <p className="text-xs text-muted-foreground">
              Configuration DNS gérée par l'équipe technique
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-5 w-5 text-amber-500" />
              Emails
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email expéditeur</Label>
              <Input placeholder="noreply@lyta.ch" />
            </div>
            <div className="space-y-2">
              <Label>Email support</Label>
              <Input placeholder="support@lyta.ch" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-5 w-5 text-amber-500" />
              Facturation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Stripe connecté</p>
                <p className="text-sm text-muted-foreground">
                  Pour la facturation automatique
                </p>
              </div>
              <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-600 rounded-full">
                Bientôt
              </span>
            </div>
            <div className="space-y-2">
              <Label>Prix mensuel par défaut</Label>
              <Input placeholder="299" type="number" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-amber-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nouveau client</p>
                <p className="text-sm text-muted-foreground">
                  Notifier lors d'une inscription
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Client suspendu</p>
                <p className="text-sm text-muted-foreground">
                  Alerter en cas de suspension
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Settings className="h-4 w-4 mr-2" />
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}
