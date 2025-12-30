import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, FileCheck, TrendingUp, Crown, AlertCircle, ArrowUpRight, ArrowDownRight, Activity, Clock, Zap, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

export default function KingDashboard() {
  const navigate = useNavigate();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['king-dashboard-stats'],
    queryFn: async () => {
      const [tenantsResult, usersResult, policiesResult, commissionsResult] = await Promise.all([
        supabase.from('tenants').select('id, status, created_at'),
        supabase.from('user_tenant_assignments').select('id', { count: 'exact' }),
        supabase.from('policies').select('id', { count: 'exact' }),
        supabase.from('commissions').select('amount'),
      ]);

      const tenants = tenantsResult.data || [];
      const activeCount = tenants.filter(t => t.status === 'active').length;
      const testCount = tenants.filter(t => t.status === 'test').length;
      const suspendedCount = tenants.filter(t => t.status === 'suspended').length;
      
      // Calculate total commissions
      const totalCommissions = (commissionsResult.data || []).reduce(
        (sum, c) => sum + (Number(c.amount) || 0), 0
      );

      // Calculate this month's new tenants
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const newThisMonth = tenants.filter(t => new Date(t.created_at) >= startOfMonth).length;

      return {
        totalTenants: tenantsResult.count || tenants.length,
        activeTenants: activeCount,
        testTenants: testCount,
        suspendedTenants: suspendedCount,
        totalUsers: usersResult.count || 0,
        totalPolicies: policiesResult.count || 0,
        totalCommissions,
        newThisMonth,
      };
    },
  });

  // Get monthly growth data for chart
  const { data: growthData } = useQuery({
    queryKey: ['king-growth-data'],
    queryFn: async () => {
      const { data: tenants } = await supabase
        .from('tenants')
        .select('created_at')
        .order('created_at', { ascending: true });

      // Group by month
      const monthlyData: Record<string, number> = {};
      const now = new Date();
      
      // Initialize last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = date.toLocaleDateString('fr-CH', { month: 'short', year: '2-digit' });
        monthlyData[key] = 0;
      }

      // Count tenants created each month
      tenants?.forEach(t => {
        const date = new Date(t.created_at);
        const key = date.toLocaleDateString('fr-CH', { month: 'short', year: '2-digit' });
        if (monthlyData.hasOwnProperty(key)) {
          monthlyData[key]++;
        }
      });

      // Calculate cumulative
      let cumulative = 0;
      const entries = Object.entries(monthlyData);
      
      // Count tenants before our range
      const firstMonthKey = entries[0]?.[0];
      if (firstMonthKey) {
        const [firstMonth] = entries;
        const beforeRange = tenants?.filter(t => {
          const date = new Date(t.created_at);
          const key = date.toLocaleDateString('fr-CH', { month: 'short', year: '2-digit' });
          return !monthlyData.hasOwnProperty(key);
        }).length || 0;
        cumulative = beforeRange;
      }

      return entries.map(([month, newTenants]) => {
        cumulative += newTenants;
        return { month, newTenants, total: cumulative };
      });
    },
  });

  const { data: recentTenants } = useQuery({
    queryKey: ['king-recent-tenants'],
    queryFn: async () => {
      const { data } = await supabase
        .from('tenants')
        .select(`
          *,
          tenant_branding (logo_url, display_name, primary_color)
        `)
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  // Get activity data (recent actions)
  const { data: recentActivity } = useQuery({
    queryKey: ['king-recent-activity'],
    queryFn: async () => {
      // Get recent policies across all tenants
      const { data: policies } = await supabase
        .from('policies')
        .select('id, created_at, tenant_id')
        .order('created_at', { ascending: false })
        .limit(5);

      // Get recent commissions
      const { data: commissions } = await supabase
        .from('commissions')
        .select('id, created_at, amount, tenant_id')
        .order('created_at', { ascending: false })
        .limit(5);

      // Get tenant names
      const tenantIds = [...new Set([
        ...(policies?.map(p => p.tenant_id) || []),
        ...(commissions?.map(c => c.tenant_id) || [])
      ])].filter(Boolean);

      const { data: tenantData } = await supabase
        .from('tenants')
        .select('id, name')
        .in('id', tenantIds);

      const tenantMap = Object.fromEntries(
        (tenantData || []).map(t => [t.id, t.name])
      );

      // Merge and sort activities
      const activities = [
        ...(policies?.map(p => ({
          type: 'policy' as const,
          id: p.id,
          date: p.created_at,
          tenant: tenantMap[p.tenant_id || ''] || 'Inconnu',
        })) || []),
        ...(commissions?.map(c => ({
          type: 'commission' as const,
          id: c.id,
          date: c.created_at,
          amount: c.amount,
          tenant: tenantMap[c.tenant_id || ''] || 'Inconnu',
        })) || []),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

      return activities;
    },
  });

  // Status distribution for pie chart
  const statusData = [
    { name: 'Actifs', value: stats?.activeTenants || 0, color: '#10b981' },
    { name: 'Test', value: stats?.testTenants || 0, color: '#3b82f6' },
    { name: 'Suspendus', value: stats?.suspendedTenants || 0, color: '#ef4444' },
  ];

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return `Il y a ${diffDays}j`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Crown className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Dashboard KING</h1>
              <p className="text-muted-foreground">Vue d'ensemble de la plateforme LYTA</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate('/king/tenants')}
          >
            <Building2 className="h-4 w-4 mr-2" />
            Tous les clients
          </Button>
          <Button 
            onClick={() => navigate('/king/wizard')}
            className="bg-amber-500 hover:bg-amber-600"
          >
            <Zap className="h-4 w-4 mr-2" />
            Nouveau Client SaaS
          </Button>
        </div>
      </div>

      {/* Stats Cards - Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clients SaaS
            </CardTitle>
            <Building2 className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? '...' : stats?.totalTenants}</div>
            <div className="flex items-center gap-2 mt-2">
              {(stats?.newThisMonth || 0) > 0 ? (
                <span className="flex items-center text-xs text-emerald-600">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  +{stats?.newThisMonth} ce mois
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">Aucun nouveau</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Utilisateurs
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? '...' : stats?.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Sur tous les tenants
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/20 to-transparent rounded-bl-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contrats totaux
            </CardTitle>
            <FileCheck className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? '...' : stats?.totalPolicies}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Tous les cabinets
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-bl-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              MRR Estimé
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">
              CHF {((stats?.activeTenants || 0) * 299).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats?.activeTenants || 0} × 299 CHF
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Croissance des clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData || []}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                    name="Total clients"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Répartition par statut
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              {statusData.map((status) => (
                <div key={status.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: status.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {status.name}: <span className="font-medium text-foreground">{status.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Tenants */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Derniers clients créés
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/king/tenants')}>
              Voir tous
            </Button>
          </CardHeader>
          <CardContent>
            {recentTenants && recentTenants.length > 0 ? (
              <div className="space-y-3">
                {recentTenants.map((tenant: any) => (
                  <div
                    key={tenant.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/king/tenants/${tenant.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ 
                          backgroundColor: tenant.tenant_branding?.[0]?.primary_color 
                            ? `${tenant.tenant_branding[0].primary_color}20` 
                            : 'hsl(var(--primary) / 0.1)' 
                        }}
                      >
                        {tenant.tenant_branding?.[0]?.logo_url ? (
                          <img 
                            src={tenant.tenant_branding[0].logo_url} 
                            alt={tenant.name}
                            className="h-6 w-6 object-contain"
                          />
                        ) : (
                          <Building2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-xs text-muted-foreground">{tenant.slug}.lyta.ch</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tenant.status === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : tenant.status === 'test'
                          ? 'bg-blue-500/10 text-blue-600'
                          : 'bg-red-500/10 text-red-600'
                      }`}>
                        {tenant.status === 'active' ? 'Actif' : tenant.status === 'test' ? 'Test' : 'Suspendu'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Building2 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Aucun client SaaS</p>
                <Button 
                  className="mt-3 bg-amber-500 hover:bg-amber-600"
                  size="sm"
                  onClick={() => navigate('/king/wizard')}
                >
                  Créer le premier
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity: any) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'policy' 
                          ? 'bg-violet-500/10' 
                          : 'bg-emerald-500/10'
                      }`}>
                        {activity.type === 'policy' ? (
                          <FileCheck className="h-4 w-4 text-violet-600" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {activity.type === 'policy' 
                            ? 'Nouveau contrat' 
                            : `Commission CHF ${Number(activity.amount).toLocaleString()}`
                          }
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.tenant}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.date)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Aucune activité récente</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(stats?.suspendedTenants || 0) > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-destructive">
                  {stats?.suspendedTenants} client(s) suspendu(s)
                </p>
                <p className="text-sm text-muted-foreground">
                  Ces clients n'ont plus accès à leur CRM. Vérifiez leur statut.
                </p>
              </div>
              <Button 
                variant="outline" 
                className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => navigate('/king/tenants')}
              >
                Voir les suspendus
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
