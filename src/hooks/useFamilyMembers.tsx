import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type FamilyMember = {
  id: string;
  client_id: string;
  first_name: string;
  last_name: string;
  birth_date?: string | null;
  relation_type: 'conjoint' | 'enfant' | 'autre';
  permit_type?: string | null;
  nationality?: string | null;
  created_at: string;
  updated_at: string;
};

export function useFamilyMembers(clientId?: string) {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFamilyMembers = async (id?: string) => {
    try {
      setLoading(true);
      const targetId = id || clientId;
      
      if (!targetId) {
        setFamilyMembers([]);
        return;
      }

      const { data, error } = await supabase
        .from('family_members' as any)
        .select('*')
        .eq('client_id', targetId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setFamilyMembers((data as any) || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createFamilyMember = async (memberData: Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('family_members' as any)
        .insert([memberData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Membre ajouté",
        description: "Le membre de la famille a été ajouté avec succès"
      });

      await fetchFamilyMembers(memberData.client_id);
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateFamilyMember = async (id: string, updates: Partial<FamilyMember>) => {
    try {
      const { error } = await supabase
        .from('family_members' as any)
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Membre mis à jour",
        description: "Les modifications ont été enregistrées"
      });

      await fetchFamilyMembers(clientId);
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const deleteFamilyMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('family_members' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Membre supprimé",
        description: "Le membre de la famille a été supprimé avec succès"
      });

      await fetchFamilyMembers(clientId);
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchFamilyMembers();
    }
  }, [clientId]);

  return {
    familyMembers,
    loading,
    fetchFamilyMembers,
    createFamilyMember,
    updateFamilyMember,
    deleteFamilyMember
  };
}
