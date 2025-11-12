import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Search, Filter, Download, Plus, 
  Eye, Edit, Trash2, Calendar, Building2, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Contract {
  id: string;
  contract_type: string;
  company: string;
  policy_number: string | null;
  monthly_premium: number;
  start_date: string;
  end_date: string | null;
  status: string;
  created_at: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ContractsSection({ userId }: { userId: string }) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchContracts();
  }, [userId]);

  const fetchContracts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contracts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setContracts(data);
    }
    setLoading(false);
  };

  const getContractIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'auto': '🚗',
      'menage': '🏠',
      'sante': '🏥',
      'vie': '❤️',
      '3e_pilier': '💰',
      'juridique': '⚖️',
      'hypotheque': '🏦',
    };
    return icons[type] || '📄';
  };

  const getContractLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'auto': 'Assurance Auto',
      'menage': 'RC Ménage',
      'sante': 'Assurance Santé',
      'vie': 'Assurance Vie',
      '3e_pilier': '3e Pilier',
      'juridique': 'Protection Juridique',
      'hypotheque': 'Hypothèque'
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'active': 'default',
      'pending': 'secondary',
      'cancelled': 'destructive',
      'expired': 'outline'
    };
    return (
      <Badge variant={variants[status] || 'outline'} className="capitalize">
        {status}
      </Badge>
    );
  };

  const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('fr-CH');
  };

  const filteredContracts = contracts.filter(contract =>
    contract.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getContractLabel(contract.contract_type).toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.policy_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      variants={fadeIn} 
      initial="hidden" 
      animate="show"
      className="space-y-4"
    >
      <Card className="rounded-2xl bg-white/70 dark:bg-slate-900/50 border-white/30 dark:border-slate-700/40 backdrop-blur">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <ShieldCheck className="h-5 w-5" /> 
              Gestion des Contrats
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Rechercher..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl w-[200px]"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-xl"
                onClick={() => toast({ title: "Filtres", description: "Filtres avancés en développement" })}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-xl"
                onClick={() => toast({ title: "Export", description: "Export PDF/Excel en développement" })}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                size="sm" 
                className="rounded-xl"
                onClick={() => toast({ title: "Nouveau contrat", description: "Formulaire en développement" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
            </div>
          ) : filteredContracts.length === 0 ? (
            <div className="text-center py-12">
              <ShieldCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-2">Aucun contrat trouvé</p>
              <p className="text-sm text-slate-400">
                {searchTerm ? "Essayez avec d'autres termes de recherche" : "Créez votre premier contrat"}
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 dark:bg-slate-800/50">
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Compagnie</TableHead>
                    <TableHead className="font-semibold">N° Police</TableHead>
                    <TableHead className="font-semibold text-right">Prime/mois</TableHead>
                    <TableHead className="font-semibold">Début</TableHead>
                    <TableHead className="font-semibold">Fin</TableHead>
                    <TableHead className="font-semibold">Statut</TableHead>
                    <TableHead className="font-semibold text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow 
                      key={contract.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getContractIcon(contract.contract_type)}</span>
                          <span className="font-medium text-slate-700 dark:text-slate-200">
                            {getContractLabel(contract.contract_type)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-300">{contract.company}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-400" />
                          <span className="font-mono text-sm text-slate-600 dark:text-slate-300">
                            {contract.policy_number || 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-slate-900 dark:text-slate-50">
                          CHF {Number(contract.monthly_premium).toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                          <Calendar className="h-3 w-3" />
                          <span className="text-sm">{formatDate(contract.start_date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                          <Calendar className="h-3 w-3" />
                          <span className="text-sm">{formatDate(contract.end_date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(contract.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toast({ title: "Détails", description: "Vue détaillée en développement" })}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toast({ title: "Modifier", description: "Édition en développement" })}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => toast({ title: "Supprimer", description: "Confirmation requise" })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Summary Stats */}
          {filteredContracts.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="rounded-xl bg-blue-50/50 dark:bg-blue-900/20 p-4 border border-blue-200/30 dark:border-blue-700/30">
                <div className="text-sm text-blue-600 dark:text-blue-400">Total Contrats</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{filteredContracts.length}</div>
              </div>
              <div className="rounded-xl bg-green-50/50 dark:bg-green-900/20 p-4 border border-green-200/30 dark:border-green-700/30">
                <div className="text-sm text-green-600 dark:text-green-400">Contrats Actifs</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {filteredContracts.filter(c => c.status === 'active').length}
                </div>
              </div>
              <div className="rounded-xl bg-purple-50/50 dark:bg-purple-900/20 p-4 border border-purple-200/30 dark:border-purple-700/30">
                <div className="text-sm text-purple-600 dark:text-purple-400">Prime Mensuelle</div>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  CHF {filteredContracts.reduce((sum, c) => sum + Number(c.monthly_premium), 0).toFixed(2)}
                </div>
              </div>
              <div className="rounded-xl bg-orange-50/50 dark:bg-orange-900/20 p-4 border border-orange-200/30 dark:border-orange-700/30">
                <div className="text-sm text-orange-600 dark:text-orange-400">Coût Annuel</div>
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  CHF {(filteredContracts.reduce((sum, c) => sum + Number(c.monthly_premium), 0) * 12).toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
