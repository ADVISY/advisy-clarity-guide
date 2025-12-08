import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export interface Agent {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  commission_rate: number | null;
  commission_rate_lca: number | null;
  commission_rate_vie: number | null;
}

export function useAgents() {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgents() {
      try {
        setLoading(true);
        
        // Récupérer les collaborateurs depuis la table clients (type_adresse = 'collaborateur')
        const { data, error } = await supabase
          .from('clients')
          .select('id, first_name, last_name, email, commission_rate, commission_rate_lca, commission_rate_vie')
          .eq('type_adresse', 'collaborateur')
          .order('first_name', { ascending: true });

        if (error) throw error;
        setAgents(data || []);
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, []);

  return { agents, loading };
}
