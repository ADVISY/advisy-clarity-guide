import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
  type?: 'policy' | 'commission' | 'document';
}

export function StatusBadge({ status, type = 'policy' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    if (type === 'commission') {
      const configs = {
        'paid': { label: 'Versée', className: 'bg-primary/10 text-primary border-primary/20' },
        'due': { label: 'À verser', className: 'bg-accent text-accent-foreground border-border' },
        'pending': { label: 'En validation', className: 'bg-muted text-muted-foreground border-border' }
      };
      return configs[status as keyof typeof configs] || { label: status, className: 'bg-muted text-muted-foreground' };
    }
    
    if (type === 'policy') {
      const configs = {
        'active': { label: 'Actif', className: 'bg-primary/10 text-primary border-primary/20' },
        'pending': { label: 'En attente', className: 'bg-accent text-accent-foreground border-border' },
        'cancelled': { label: 'Annulé', className: 'bg-muted text-muted-foreground border-border' },
        'expired': { label: 'Expiré', className: 'bg-muted text-muted-foreground border-border' }
      };
      return configs[status as keyof typeof configs] || { label: status, className: 'bg-muted text-muted-foreground' };
    }
    
    return { label: status, className: 'bg-muted text-muted-foreground' };
  };

  const config = getStatusConfig();
  return <Badge className={config.className} variant="outline">{config.label}</Badge>;
}
