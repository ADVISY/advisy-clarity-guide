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
        
        // Récupérer les agents depuis la table profiles (car assigned_agent_id référence profiles)
        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .eq('is_active', true)
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

  // Helper to get manager for an agent - now returns null since profiles don't have manager_id
  const getManagerForAgent = (agentId: string): Agent | null => {
    return null;
  };

  return { agents, loading, getManagerForAgent };
}
