import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, Crown, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function KingUsers() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Utilisateurs Plateforme</h1>
        <p className="text-muted-foreground">Gérez les accès à la plateforme LYTA</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un utilisateur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Utilisateurs KING
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-amber-500" />
            </div>
            <p className="text-muted-foreground mb-2">
              Gestion des utilisateurs KING (Super Admins)
            </p>
            <p className="text-sm text-muted-foreground">
              Fonctionnalité en cours de développement
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
