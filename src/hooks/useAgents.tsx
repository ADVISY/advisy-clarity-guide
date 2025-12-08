import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export interface Agent {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
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
          .select('id, first_name, last_name, email')
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
