import { useUserRole } from "@/hooks/useUserRole";
import { useClients } from "@/hooks/useClients";
import { usePolicies } from "@/hooks/usePolicies";
import { useCommissions } from "@/hooks/useCommissions";
import { usePerformance } from "@/hooks/usePerformance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Users, FileText, DollarSign, TrendingUp, Clock, 
  Cake, MessageSquare, ChevronRight, Loader2, 
  BarChart3, Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { format, differenceInYears, isSameMonth, isSameDay, addYears } from "date-fns";
import { fr } from "date-fns/locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CRMDashboard() {
  const { role, isAdmin, isManager, isAgent, isPartner, isClient } = useUserRole();
  const { clients, loading: clientsLoading } = useClients();
  const { policies, loading: policiesLoading } = usePolicies();
  const { commissions, loading: commissionsLoading } = useCommissions();
  const { loading: performanceLoading, companyTotals } = usePerformance();

  const [showMyAddresses, setShowMyAddresses] = useState(true);
  const [showMyContracts, setShowMyContracts] = useState(false);

  const loading = clientsLoading || policiesLoading || commissionsLoading || performanceLoading;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-CH', { 
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(value);
  };

  // Upcoming birthdays
  const upcomingBirthdays = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    return clients
      .filter(c => c.birthdate && c.type_adresse === 'client')
      .map(c => {
        const birthDate = new Date(c.birthdate!);
        const nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday < today) {
          nextBirthday.setFullYear(currentYear + 1);
        }
        const age = differenceInYears(nextBirthday, birthDate);
        const isToday = isSameDay(nextBirthday, today);
        
        return {
          id: c.id,
          name: `${c.first_name || ''} ${c.last_name || ''}`.trim(),
          date: nextBirthday,
          age,
          isToday,
          displayDate: isToday ? "Aujourd'hui" : format(nextBirthday, "d MMMM", { locale: fr })
        };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 12);
  }, [clients]);

  // Monthly contracts data for chart
  const monthlyContracts = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 
                    'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    
    const data = months.map((month, index) => ({
      month,
      value: 0,
    }));

    policies.forEach(p => {
      const date = new Date(p.created_at);
      if (date.getFullYear() === currentYear) {
        data[date.getMonth()].value += 1;
      }
    });

    return data;
  }, [policies]);

  // Recent comments/activities
  const recentActivities = useMemo(() => {
    const activities: { 
      id: string;
      type: 'comment' | 'contract' | 'client';
      author: string;
      content: string;
      clientName?: string;
      productType?: string;
      date: Date;
    }[] = [];

    // Add recent policies as activities
    policies
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 8)
      .forEach(policy => {
        const client = clients.find(c => c.id === policy.client_id);
        activities.push({
          id: policy.id,
          type: 'contract',
          author: client ? `${client.first_name || ''} ${client.last_name || ''}`.trim() : 'Client',
          content: `Nouveau contrat créé`,
          clientName: client ? `${client.first_name || ''} ${client.last_name || ''}`.trim() : undefined,
          productType: policy.product_type || 'Assurance',
          date: new Date(policy.created_at),
        });
      });

    return activities
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 8);
  }, [policies, clients]);

  // Group activities by date
  const groupedActivities = useMemo(() => {
    const groups: { [key: string]: typeof recentActivities } = {};
    
    recentActivities.forEach(activity => {
      const dateKey = format(activity.date, 'dd.MM.yyyy');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
    });

    return Object.entries(groups).map(([date, items]) => ({
      date,
      items,
    }));
  }, [recentActivities]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-sm text-muted-foreground">
              {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Chargement...</span>
        </div>
      )}

      {!loading && (
        <>
          {/* Main 3-column layout */}
          <div className="grid gap-6 lg:grid-cols-[320px_1fr_360px]">
            
            {/* Left Column - Birthdays */}
            <Card className="border shadow-sm bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cake className="h-4 w-4 text-rose-500" />
                    <CardTitle className="text-sm font-semibold">Anniversaires à venir</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Mes adresses</span>
                    <Switch 
                      checked={showMyAddresses} 
                      onCheckedChange={setShowMyAddresses}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {upcomingBirthdays.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Aucun anniversaire à venir
                    </p>
                  ) : (
                    upcomingBirthdays.map((birthday, i) => (
                      <div 
                        key={birthday.id}
                        className={cn(
                          "flex items-center gap-3 p-2.5 rounded-lg transition-colors hover:bg-muted/50 cursor-pointer",
                          birthday.isToday && "bg-rose-50 hover:bg-rose-100"
                        )}
                      >
                        <Cake className={cn(
                          "h-4 w-4 flex-shrink-0",
                          birthday.isToday ? "text-rose-500" : "text-muted-foreground"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-medium truncate",
                            birthday.isToday && "text-rose-700"
                          )}>
                            {birthday.displayDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium truncate max-w-[120px]">{birthday.name}</p>
                          <p className="text-xs text-muted-foreground">{birthday.age}ans</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Notes section */}
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm font-medium mb-2 text-muted-foreground">Bloc-notes</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 min-h-[100px]">
                    <textarea 
                      placeholder="Vos notes ici..."
                      className="w-full bg-transparent text-sm resize-none focus:outline-none min-h-[80px] text-amber-900 placeholder:text-amber-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Center Column - Chart */}
            <Card className="border shadow-sm bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-emerald-500" />
                    <CardTitle className="text-sm font-semibold">Statistiques des contrats signés</CardTitle>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-xs font-medium">
                      {currentYear}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Mes contrats</span>
                    <Switch 
                      checked={showMyContracts} 
                      onCheckedChange={setShowMyContracts}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyContracts} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                        labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                        formatter={(value: number) => [`${value} Contrats`, `Signé ${currentYear}`]}
                        cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="hsl(142 76% 45%)"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Summary stats below chart */}
                <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t">
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <Users className="h-5 w-5 mx-auto mb-1 opacity-80" />
                    <p className="text-lg font-bold">{companyTotals.clientsCount}</p>
                    <p className="text-[10px] opacity-80">Clients</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                    <FileText className="h-5 w-5 mx-auto mb-1 opacity-80" />
                    <p className="text-lg font-bold">{companyTotals.contractsCount}</p>
                    <p className="text-[10px] opacity-80">Contrats</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                    <DollarSign className="h-5 w-5 mx-auto mb-1 opacity-80" />
                    <p className="text-lg font-bold">{formatCurrency(companyTotals.totalCommissions)}</p>
                    <p className="text-[10px] opacity-80">Commissions</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                    <TrendingUp className="h-5 w-5 mx-auto mb-1 opacity-80" />
                    <p className="text-lg font-bold">{formatCurrency(companyTotals.totalPremiumsMonthly)}</p>
                    <p className="text-[10px] opacity-80">Primes/mois</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Recent Activity */}
            <Card className="border shadow-sm bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <CardTitle className="text-sm font-semibold">Dernières nouvelles</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Mes adresses</span>
                    <Switch 
                      checked={showMyAddresses} 
                      onCheckedChange={setShowMyAddresses}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                  {groupedActivities.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Aucune activité récente
                    </p>
                  ) : (
                    groupedActivities.map((group) => (
                      <div key={group.date}>
                        <p className="text-sm font-semibold text-foreground mb-2">{group.date}</p>
                        <div className="space-y-2">
                          {group.items.map((activity) => (
                            <div 
                              key={activity.id}
                              className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer border-l-4 border-emerald-500"
                            >
                              <div className="flex items-start gap-2">
                                <div className="p-1.5 rounded-md bg-emerald-100 flex-shrink-0">
                                  <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-semibold text-emerald-700">Nouveau contrat</p>
                                    <span className="text-[10px] text-muted-foreground">
                                      {format(activity.date, "HH:mm")}
                                    </span>
                                  </div>
                                  <p className="text-sm font-medium">{activity.author}</p>
                                  {activity.productType && (
                                    <p className="text-xs text-muted-foreground mt-0.5 border-l-2 border-muted pl-2">
                                      {activity.productType}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
