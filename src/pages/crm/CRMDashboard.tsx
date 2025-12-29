import { useUserRole } from "@/hooks/useUserRole";
import { useClients } from "@/hooks/useClients";
import { usePolicies } from "@/hooks/usePolicies";
import { useCommissions } from "@/hooks/useCommissions";
import { usePerformance } from "@/hooks/usePerformance";
import { useCommissionParts } from "@/hooks/useCommissionParts";
import { usePermissions } from "@/hooks/usePermissions";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Users, FileText, DollarSign, TrendingUp, 
  MessageSquare, Loader2, BarChart3, Heart, Shield,
  Trophy, Star, Crown, Target, Zap, Award,
  Calendar, Filter, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isWithinInterval, subMonths } from "date-fns";
import { fr } from "date-fns/locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  ComposedChart,
  Area,
} from "recharts";

type PeriodFilter = 'week' | 'month' | 'quarter' | 'year';

export default function CRMDashboard() {
  const { user } = useAuth();
  const { role, isAdmin, isManager, isAgent, isPartner, isClient } = useUserRole();
  const { can, dashboardScope, commissionScope, isLoading: permissionsLoading } = usePermissions();
  const { clients, loading: clientsLoading } = useClients();
  const { policies, loading: policiesLoading } = usePolicies();
  const { commissions, loading: commissionsLoading } = useCommissions();
  const { loading: performanceLoading, companyTotals, myPerformance, myTeam, individualPerformance, teamPerformance } = usePerformance();
  const { fetchAllParts, fetchPartsForAgent } = useCommissionParts();

  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('month');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [agentFilter, setAgentFilter] = useState<string>('all');
  const [allCommissionParts, setAllCommissionParts] = useState<any[]>([]);
  const [myCommissionParts, setMyCommissionParts] = useState<any[]>([]);
  const [partsLoading, setPartsLoading] = useState(true);

  // Get current user's collaborator record
  const myCollaborator = useMemo(() => {
    if (!user) return null;
    return clients.find(c => c.user_id === user.id && c.type_adresse === 'collaborateur');
  }, [clients, user]);

  // Fetch commission parts based on role
  useEffect(() => {
    const loadParts = async () => {
      setPartsLoading(true);
      
      if (dashboardScope === 'global' || commissionScope === 'all') {
        const parts = await fetchAllParts();
        setAllCommissionParts(parts);
        setMyCommissionParts(parts);
      } else if (myCollaborator) {
        const parts = await fetchPartsForAgent(myCollaborator.id);
        setMyCommissionParts(parts);
        
        if (dashboardScope === 'team' && myTeam) {
          // Get team members' parts too
          const teamParts = [...parts];
          for (const member of myTeam.teamMembers) {
            const memberParts = await fetchPartsForAgent(member.id);
            teamParts.push(...memberParts);
          }
          setAllCommissionParts(teamParts);
        } else {
          setAllCommissionParts(parts);
        }
      }
      
      setPartsLoading(false);
    };
    
    if (!clientsLoading && !permissionsLoading) {
      loadParts();
    }
  }, [dashboardScope, commissionScope, myCollaborator, myTeam, clientsLoading, permissionsLoading]);

  const loading = clientsLoading || policiesLoading || commissionsLoading || performanceLoading || partsLoading || permissionsLoading;

  // Period date range
  const periodRange = useMemo(() => {
    const now = new Date();
    switch (periodFilter) {
      case 'week':
        return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
      case 'month':
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case 'quarter':
        const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        const quarterEnd = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3 + 3, 0);
        return { start: quarterStart, end: quarterEnd };
      case 'year':
        return { start: new Date(now.getFullYear(), 0, 1), end: new Date(now.getFullYear(), 11, 31) };
      default:
        return { start: startOfMonth(now), end: endOfMonth(now) };
    }
  }, [periodFilter]);

  // Filter policies based on scope and filters
  const filteredPolicies = useMemo(() => {
    let filtered = policies;

    // Filter by dashboard scope
    if (dashboardScope === 'personal' && myCollaborator) {
      const myClientIds = clients.filter(c => c.assigned_agent_id === myCollaborator.id).map(c => c.id);
      filtered = filtered.filter(p => myClientIds.includes(p.client_id));
    } else if (dashboardScope === 'team' && myTeam) {
      const teamMemberIds = [myCollaborator?.id, ...myTeam.teamMembers.map(m => m.id)].filter(Boolean);
      const teamClientIds = clients.filter(c => teamMemberIds.includes(c.assigned_agent_id)).map(c => c.id);
      filtered = filtered.filter(p => teamClientIds.includes(p.client_id));
    }

    // Filter by agent
    if (agentFilter !== 'all') {
      const agentClientIds = clients.filter(c => c.assigned_agent_id === agentFilter).map(c => c.id);
      filtered = filtered.filter(p => agentClientIds.includes(p.client_id));
    }

    // Filter by product type
    if (productFilter !== 'all') {
      filtered = filtered.filter(p => {
        const type = (p.product_type || '').toLowerCase();
        if (productFilter === 'lca') return type.includes('lca') || type.includes('maladie') || type.includes('complémentaire');
        if (productFilter === 'vie') return type.includes('vie') || type.includes('pilier') || type.includes('3');
        return true;
      });
    }

    return filtered;
  }, [policies, dashboardScope, myCollaborator, myTeam, clients, agentFilter, productFilter]);

  // Period filtered policies
  const periodPolicies = useMemo(() => {
    return filteredPolicies.filter(p => {
      const date = new Date(p.created_at);
      return isWithinInterval(date, periodRange);
    });
  }, [filteredPolicies, periodRange]);

  // Calculate CA using specified rules: LCA * 16, VIE * 5%
  const calculateCA = useMemo(() => {
    let lcaTotal = 0;
    let vieTotal = 0;

    periodPolicies.forEach(p => {
      const type = (p.product_type || '').toLowerCase();
      const yearlyPremium = p.premium_yearly || (p.premium_monthly || 0) * 12;

      if (type.includes('vie') || type.includes('pilier') || type.includes('3')) {
        // VIE: volume * 5%
        vieTotal += yearlyPremium * 0.05;
      } else {
        // LCA: montant * 16 (assuming it's monthly premium * 16)
        const monthlyPremium = p.premium_monthly || (p.premium_yearly || 0) / 12;
        lcaTotal += monthlyPremium * 16;
      }
    });

    return { lca: lcaTotal, vie: vieTotal, total: lcaTotal + vieTotal };
  }, [periodPolicies]);

  // KPI Stats
  const kpiStats = useMemo(() => {
    const activeContracts = filteredPolicies.filter(p => p.status === 'active').length;
    const periodContracts = periodPolicies.length;
    const lcaContracts = periodPolicies.filter(p => {
      const type = (p.product_type || '').toLowerCase();
      return type.includes('lca') || type.includes('maladie') || type.includes('complémentaire');
    }).length;
    const vieContracts = periodPolicies.filter(p => {
      const type = (p.product_type || '').toLowerCase();
      return type.includes('vie') || type.includes('pilier') || type.includes('3');
    }).length;

    // Personal commission from parts
    const myCommission = myCommissionParts.reduce((sum, p) => sum + (p.amount || 0), 0);
    const confirmedCommission = myCommissionParts.filter(p => p.status === 'paid').reduce((sum, p) => sum + (p.amount || 0), 0);
    const estimatedCommission = myCommissionParts.filter(p => p.status !== 'paid').reduce((sum, p) => sum + (p.amount || 0), 0);

    return {
      activeContracts,
      periodContracts,
      lcaContracts,
      vieContracts,
      caEstimated: calculateCA.total,
      myCommission,
      confirmedCommission,
      estimatedCommission,
    };
  }, [filteredPolicies, periodPolicies, myCommissionParts, calculateCA]);

  // Top 5 performers (photos only, no numbers for gamification)
  const topPerformers = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Calculate contracts per agent for current month
    const agentScores = individualPerformance.map(agent => {
      const agentClientIds = clients.filter(c => c.assigned_agent_id === agent.id).map(c => c.id);
      const monthContracts = policies.filter(p => {
        const date = new Date(p.created_at);
        return agentClientIds.includes(p.client_id) && 
               date.getMonth() === currentMonth && 
               date.getFullYear() === currentYear;
      }).length;

      return {
        ...agent,
        monthContracts,
        initials: agent.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      };
    }).filter(a => a.monthContracts > 0);

    return agentScores.sort((a, b) => b.monthContracts - a.monthContracts).slice(0, 5);
  }, [individualPerformance, clients, policies]);

  // Employee of the month (highest contracts)
  const employeeOfMonth = topPerformers[0] || null;

  // Manager of the month
  const managerOfMonth = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const managerScores = teamPerformance.map(team => {
      const teamMemberIds = [team.managerId, ...team.teamMembers.map(m => m.id)];
      const teamClientIds = clients.filter(c => teamMemberIds.includes(c.assigned_agent_id)).map(c => c.id);
      const monthContracts = policies.filter(p => {
        const date = new Date(p.created_at);
        return teamClientIds.includes(p.client_id) && 
               date.getMonth() === currentMonth && 
               date.getFullYear() === currentYear;
      }).length;

      return {
        name: team.managerName,
        id: team.managerId,
        monthContracts,
        initials: team.managerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      };
    }).filter(m => m.monthContracts > 0);

    return managerScores.sort((a, b) => b.monthContracts - a.monthContracts)[0] || null;
  }, [teamPerformance, clients, policies]);

  // Monthly chart data with CA trend
  const monthlyChartData = useMemo(() => {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const currentYear = new Date().getFullYear();

    return months.map((month, i) => {
      const monthPolicies = filteredPolicies.filter(p => {
        const date = new Date(p.created_at);
        return date.getFullYear() === currentYear && date.getMonth() === i;
      });

      let lca = 0;
      let vie = 0;
      let caLca = 0;
      let caVie = 0;

      monthPolicies.forEach(p => {
        const type = (p.product_type || '').toLowerCase();
        const yearlyPremium = p.premium_yearly || (p.premium_monthly || 0) * 12;
        const monthlyPremium = p.premium_monthly || (p.premium_yearly || 0) / 12;

        if (type.includes('vie') || type.includes('pilier') || type.includes('3')) {
          vie++;
          caVie += yearlyPremium * 0.05;
        } else {
          lca++;
          caLca += monthlyPremium * 16;
        }
      });

      return { month, lca, vie, total: lca + vie, ca: Math.round(caLca + caVie) };
    });
  }, [filteredPolicies]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-CH', { 
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(value);
  };

  // Get available agents for filter (based on scope)
  const availableAgents = useMemo(() => {
    let agents = clients.filter(c => c.type_adresse === 'collaborateur');
    
    if (dashboardScope === 'team' && myTeam && myCollaborator) {
      const teamIds = [myCollaborator.id, ...myTeam.teamMembers.map(m => m.id)];
      agents = agents.filter(a => teamIds.includes(a.id));
    } else if (dashboardScope === 'personal' && myCollaborator) {
      agents = agents.filter(a => a.id === myCollaborator.id);
    }

    return agents;
  }, [clients, dashboardScope, myTeam, myCollaborator]);

  // Can see financial data?
  const canSeeFinancials = dashboardScope === 'global' || isAdmin;

  const periodLabels: Record<PeriodFilter, string> = {
    week: 'Cette semaine',
    month: 'Ce mois',
    quarter: 'Ce trimestre',
    year: 'Cette année',
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-sm text-muted-foreground">
              {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
              {dashboardScope === 'personal' && ' • Vue personnelle'}
              {dashboardScope === 'team' && ' • Vue équipe'}
              {dashboardScope === 'global' && ' • Vue globale'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={periodFilter} onValueChange={(v) => setPeriodFilter(v as PeriodFilter)}>
            <SelectTrigger className="w-[140px] h-9">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Année</SelectItem>
            </SelectContent>
          </Select>

          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-[130px] h-9">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Produit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="lca">LCA Maladie</SelectItem>
              <SelectItem value="vie">3e Pilier / VIE</SelectItem>
            </SelectContent>
          </Select>

          {availableAgents.length > 1 && (
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="w-[150px] h-9">
                <Users className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les agents</SelectItem>
                {availableAgents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.first_name} {agent.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
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
          {/* KPI Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Contracts Deposited */}
            <Card className="border shadow-sm bg-gradient-to-br from-violet-500/10 to-violet-600/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Contrats déposés</p>
                    <p className="text-3xl font-bold">{kpiStats.periodContracts}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs bg-rose-500/10 text-rose-600 border-rose-200">
                        <Heart className="h-3 w-3 mr-1" />
                        LCA: {kpiStats.lcaContracts}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-200">
                        <Shield className="h-3 w-3 mr-1" />
                        VIE: {kpiStats.vieContracts}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-violet-500/20">
                    <FileText className="h-6 w-6 text-violet-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Contracts */}
            <Card className="border shadow-sm bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Contrats actifs</p>
                    <p className="text-3xl font-bold">{kpiStats.activeContracts}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      sur {filteredPolicies.length} total
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/20">
                    <Target className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CA Estimated (visible according to scope) */}
            {(canSeeFinancials || commissionScope !== 'none') && (
              <Card className="border shadow-sm bg-gradient-to-br from-amber-500/10 to-amber-600/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">CA estimé</p>
                      <p className="text-3xl font-bold">{formatCurrency(kpiStats.caEstimated)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {periodLabels[periodFilter]}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/20">
                      <DollarSign className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Personal Commission (visible if has commission scope) */}
            {commissionScope !== 'none' && (
              <Card className="border shadow-sm bg-gradient-to-br from-blue-500/10 to-blue-600/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Ma commission</p>
                      <p className="text-3xl font-bold">{formatCurrency(kpiStats.myCommission)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-emerald-600">
                          ✓ {formatCurrency(kpiStats.confirmedCommission)}
                        </span>
                        <span className="text-xs text-amber-600">
                          ~ {formatCurrency(kpiStats.estimatedCommission)}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/20">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            {/* Main Column */}
            <div className="space-y-6">
              {/* Combined Chart: Contracts + CA */}
              <Card className="border shadow-sm bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <CardTitle className="text-sm font-semibold">Performance {new Date().getFullYear()}</CardTitle>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-rose-500" />
                        <span>LCA</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-blue-500" />
                        <span>VIE</span>
                      </div>
                      {(canSeeFinancials || commissionScope !== 'none') && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded bg-emerald-500" />
                          <span>CA</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={monthlyChartData} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          yAxisId="left"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        {(canSeeFinancials || commissionScope !== 'none') && (
                          <YAxis 
                            yAxisId="right"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                          />
                        )}
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                          formatter={(value: any, name: string) => {
                            if (name === 'ca') return [`${formatCurrency(value)} CHF`, 'CA'];
                            return [value, name === 'lca' ? 'LCA' : 'VIE'];
                          }}
                        />
                        <Bar 
                          yAxisId="left"
                          dataKey="lca" 
                          fill="hsl(340 82% 52%)"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={30}
                        />
                        <Bar 
                          yAxisId="left"
                          dataKey="vie" 
                          fill="hsl(217 91% 60%)"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={30}
                        />
                        {(canSeeFinancials || commissionScope !== 'none') && (
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="ca"
                            stroke="hsl(142 76% 36%)"
                            strokeWidth={2}
                            dot={{ fill: 'hsl(142 76% 36%)', r: 4 }}
                          />
                        )}
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Summary Stats */}
                  {canSeeFinancials && (
                    <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t">
                      <div className="text-center p-2.5 rounded-xl bg-rose-500/10">
                        <p className="text-[9px] text-muted-foreground">LCA Total</p>
                        <p className="text-sm font-bold text-rose-600">
                          {monthlyChartData.reduce((s, m) => s + m.lca, 0)}
                        </p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-blue-500/10">
                        <p className="text-[9px] text-muted-foreground">VIE Total</p>
                        <p className="text-sm font-bold text-blue-600">
                          {monthlyChartData.reduce((s, m) => s + m.vie, 0)}
                        </p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-emerald-500/10">
                        <p className="text-[9px] text-muted-foreground">CA Annuel</p>
                        <p className="text-sm font-bold text-emerald-600">
                          {formatCurrency(monthlyChartData.reduce((s, m) => s + m.ca, 0))}
                        </p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-violet-500/10">
                        <p className="text-[9px] text-muted-foreground">Total Contrats</p>
                        <p className="text-sm font-bold text-violet-600">
                          {monthlyChartData.reduce((s, m) => s + m.total, 0)}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Motivation Message for Agents */}
              {dashboardScope === 'personal' && myPerformance && (
                <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/20">
                        <Star className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {kpiStats.periodContracts >= 5 
                            ? "🔥 Excellent travail ce mois !" 
                            : kpiStats.periodContracts >= 3 
                              ? "👍 Bon rythme, continue !"
                              : "💪 C'est parti pour un super mois !"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {kpiStats.periodContracts} contrat{kpiStats.periodContracts > 1 ? 's' : ''} ce mois • 
                          Objectif : 10 contrats
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Gamification & Activity */}
            <div className="space-y-6">
              {/* Top 5 - Photos Only */}
              <Card className="border shadow-sm bg-card overflow-hidden">
                <CardHeader className="pb-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <CardTitle className="text-sm font-semibold">Top 5 du mois</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  {topPerformers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Pas encore de données ce mois
                    </p>
                  ) : (
                    <div className="flex justify-center gap-2">
                      {topPerformers.map((performer, i) => (
                        <div key={performer.id} className="relative">
                          <Avatar className={cn(
                            "border-2",
                            i === 0 && "w-14 h-14 border-amber-400",
                            i === 1 && "w-12 h-12 border-gray-400",
                            i === 2 && "w-12 h-12 border-orange-400",
                            i > 2 && "w-10 h-10 border-muted"
                          )}>
                            <AvatarFallback className={cn(
                              "font-bold",
                              i === 0 && "bg-amber-100 text-amber-700",
                              i === 1 && "bg-gray-100 text-gray-700",
                              i === 2 && "bg-orange-100 text-orange-700",
                              i > 2 && "bg-muted"
                            )}>
                              {performer.initials}
                            </AvatarFallback>
                          </Avatar>
                          {i < 3 && (
                            <div className={cn(
                              "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white",
                              i === 0 && "bg-amber-400",
                              i === 1 && "bg-gray-400",
                              i === 2 && "bg-orange-400"
                            )}>
                              {i + 1}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Employee & Manager of the Month */}
              <div className="grid grid-cols-2 gap-3">
                {/* Employee of the Month */}
                <Card className="border shadow-sm bg-gradient-to-br from-amber-500/5 to-amber-500/10">
                  <CardContent className="p-3 text-center">
                    <Crown className="h-5 w-5 text-amber-500 mx-auto mb-2" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Employé du mois</p>
                    {employeeOfMonth ? (
                      <>
                        <Avatar className="w-10 h-10 mx-auto my-2 border-2 border-amber-400">
                          <AvatarFallback className="bg-amber-100 text-amber-700 font-bold">
                            {employeeOfMonth.initials}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-xs font-medium truncate">{employeeOfMonth.name}</p>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-2">À déterminer</p>
                    )}
                  </CardContent>
                </Card>

                {/* Manager of the Month */}
                <Card className="border shadow-sm bg-gradient-to-br from-violet-500/5 to-violet-500/10">
                  <CardContent className="p-3 text-center">
                    <Award className="h-5 w-5 text-violet-500 mx-auto mb-2" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Manager du mois</p>
                    {managerOfMonth ? (
                      <>
                        <Avatar className="w-10 h-10 mx-auto my-2 border-2 border-violet-400">
                          <AvatarFallback className="bg-violet-100 text-violet-700 font-bold">
                            {managerOfMonth.initials}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-xs font-medium truncate">{managerOfMonth.name}</p>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-2">À déterminer</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats (Team view for managers) */}
              {dashboardScope === 'team' && myTeam && (
                <Card className="border shadow-sm bg-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-violet-500" />
                      <CardTitle className="text-sm font-semibold">Mon équipe</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {myTeam.teamMembers.slice(0, 5).map(member => (
                        <div 
                          key={member.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="w-7 h-7">
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm truncate">{member.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {member.contractsCount}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}