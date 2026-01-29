import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type Affiliate = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  commission_rate: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type AffiliateCommission = {
  id: string;
  affiliate_id: string;
  tenant_id: string;
  payment_id: string;
  payment_amount: number;
  commission_rate: number;
  commission_amount: number;
  payment_date: string;
  status: string;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  tenant?: {
    id: string;
    name: string;
    slug: string;
    status: string;
    activated_at: string | null;
  };
  affiliate?: Affiliate;
};

export type AffiliateWithStats = Affiliate & {
  tenants_count: number;
  total_commissions: number;
  total_due: number;
  total_paid: number;
};

export function useAffiliates() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAffiliates = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('affiliates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAffiliates(data || []);
    } catch (error: any) {
      console.error('Error fetching affiliates:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les affiliés",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createAffiliate = async (data: Omit<Affiliate, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: newAffiliate, error } = await supabase
        .from('affiliates')
        .insert([data])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Affilié créé",
        description: `${data.first_name} ${data.last_name} a été ajouté avec succès`
      });

      await fetchAffiliates();
      return newAffiliate;
    } catch (error: any) {
      console.error('Error creating affiliate:', error);
      toast({
        title: "Erreur",
        description: error.message?.includes('unique') 
          ? "Cet email est déjà utilisé par un autre affilié"
          : "Impossible de créer l'affilié",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateAffiliate = async (id: string, updates: Partial<Affiliate>) => {
    try {
      const { error } = await supabase
        .from('affiliates')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Affilié mis à jour",
        description: "Les modifications ont été enregistrées"
      });

      await fetchAffiliates();
    } catch (error: any) {
      console.error('Error updating affiliate:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'affilié",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteAffiliate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('affiliates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Affilié supprimé",
        description: "L'affilié a été supprimé avec succès"
      });

      await fetchAffiliates();
    } catch (error: any) {
      console.error('Error deleting affiliate:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'affilié",
        variant: "destructive"
      });
      throw error;
    }
  };

  const getActiveAffiliates = useCallback(() => {
    return affiliates.filter(a => a.status === 'active');
  }, [affiliates]);

  useEffect(() => {
    fetchAffiliates();
  }, [fetchAffiliates]);

  return {
    affiliates,
    loading,
    fetchAffiliates,
    createAffiliate,
    updateAffiliate,
    deleteAffiliate,
    getActiveAffiliates
  };
}

export function useAffiliateCommissions(affiliateId?: string) {
  const [commissions, setCommissions] = useState<AffiliateCommission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCommissions = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('affiliate_commissions')
        .select(`
          *,
          tenant:tenants!tenant_id (
            id,
            name,
            slug,
            status,
            activated_at
          ),
          affiliate:affiliates!affiliate_id (*)
        `)
        .order('payment_date', { ascending: false });

      if (affiliateId) {
        query = query.eq('affiliate_id', affiliateId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCommissions((data as any) || []);
    } catch (error: any) {
      console.error('Error fetching affiliate commissions:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les commissions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [affiliateId, toast]);

  const markAsPaid = async (ids: string[], paidAt?: Date) => {
    try {
      const { error } = await supabase
        .from('affiliate_commissions')
        .update({ 
          status: 'paid', 
          paid_at: (paidAt || new Date()).toISOString() 
        })
        .in('id', ids);

      if (error) throw error;

      toast({
        title: "Commissions payées",
        description: `${ids.length} commission(s) marquée(s) comme payée(s)`
      });

      await fetchCommissions();
    } catch (error: any) {
      console.error('Error marking commissions as paid:', error);
      toast({
        title: "Erreur",
        description: "Impossible de marquer les commissions comme payées",
        variant: "destructive"
      });
      throw error;
    }
  };

  const cancelCommission = async (id: string, reason?: string) => {
    try {
      const { error } = await supabase
        .from('affiliate_commissions')
        .update({ 
          status: 'cancelled',
          notes: reason || 'Annulée'
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Commission annulée",
        description: "La commission a été annulée"
      });

      await fetchCommissions();
    } catch (error: any) {
      console.error('Error cancelling commission:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la commission",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchCommissions();
  }, [fetchCommissions]);

  return {
    commissions,
    loading,
    fetchCommissions,
    markAsPaid,
    cancelCommission
  };
}

export function useAffiliateStats() {
  const [stats, setStats] = useState({
    totalAffiliates: 0,
    activeAffiliates: 0,
    totalTenants: 0,
    totalCommissionsGenerated: 0,
    totalDue: 0,
    totalPaid: 0,
    activeCommissions: 0,
    completedCommissions: 0
  });
  const [affiliatesWithStats, setAffiliatesWithStats] = useState<AffiliateWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch affiliates
      const { data: affiliates, error: affError } = await supabase
        .from('affiliates')
        .select('*');
      
      if (affError) throw affError;

      // Fetch tenants with affiliates
      const { data: tenants, error: tenError } = await supabase
        .from('tenants')
        .select('id, affiliate_id, affiliate_eligibility_end, activated_at')
        .not('affiliate_id', 'is', null);

      if (tenError) throw tenError;

      // Fetch all commissions
      const { data: commissions, error: commError } = await supabase
        .from('affiliate_commissions')
        .select('*');

      if (commError) throw commError;

      const now = new Date();

      // Calculate stats
      const totalAffiliates = affiliates?.length || 0;
      const activeAffiliates = affiliates?.filter(a => a.status === 'active').length || 0;
      const totalTenants = tenants?.length || 0;
      
      const totalCommissionsGenerated = commissions?.reduce((sum, c) => 
        c.status !== 'cancelled' ? sum + Number(c.commission_amount) : sum, 0) || 0;
      
      const totalDue = commissions?.reduce((sum, c) => 
        c.status === 'due' ? sum + Number(c.commission_amount) : sum, 0) || 0;
      
      const totalPaid = commissions?.reduce((sum, c) => 
        c.status === 'paid' ? sum + Number(c.commission_amount) : sum, 0) || 0;

      // Count active vs completed based on eligibility window
      const activeCommissions = tenants?.filter(t => 
        t.affiliate_eligibility_end && new Date(t.affiliate_eligibility_end) > now
      ).length || 0;

      const completedCommissions = tenants?.filter(t => 
        t.affiliate_eligibility_end && new Date(t.affiliate_eligibility_end) <= now
      ).length || 0;

      setStats({
        totalAffiliates,
        activeAffiliates,
        totalTenants,
        totalCommissionsGenerated,
        totalDue,
        totalPaid,
        activeCommissions,
        completedCommissions
      });

      // Calculate per-affiliate stats
      const affiliateStats: AffiliateWithStats[] = (affiliates || []).map(affiliate => {
        const affiliateTenants = tenants?.filter(t => t.affiliate_id === affiliate.id) || [];
        const affiliateCommissions = commissions?.filter(c => c.affiliate_id === affiliate.id) || [];

        return {
          ...affiliate,
          tenants_count: affiliateTenants.length,
          total_commissions: affiliateCommissions
            .filter(c => c.status !== 'cancelled')
            .reduce((sum, c) => sum + Number(c.commission_amount), 0),
          total_due: affiliateCommissions
            .filter(c => c.status === 'due')
            .reduce((sum, c) => sum + Number(c.commission_amount), 0),
          total_paid: affiliateCommissions
            .filter(c => c.status === 'paid')
            .reduce((sum, c) => sum + Number(c.commission_amount), 0)
        };
      });

      setAffiliatesWithStats(affiliateStats);
    } catch (error: any) {
      console.error('Error fetching affiliate stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    affiliatesWithStats,
    loading,
    refetch: fetchStats
  };
}
