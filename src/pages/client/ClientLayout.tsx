import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  FileText, 
  FolderOpen, 
  MessageCircle, 
  User, 
  Bell,
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import advisyLogo from "@/assets/advisy-logo.svg";

const menuItems = [
  { title: "Accueil", icon: Home, path: "/espace-client" },
  { title: "Mes contrats", icon: FileText, path: "/espace-client/contrats" },
  { title: "Mes documents", icon: FolderOpen, path: "/espace-client/documents" },
  { title: "Messages", icon: MessageCircle, path: "/espace-client/messages" },
  { title: "Notifications", icon: Bell, path: "/espace-client/notifications" },
  { title: "Mon profil", icon: User, path: "/espace-client/profil" },
];

export default function ClientLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [clientData, setClientData] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/connexion");
        return;
      }
      
      setUser(session.user);
      
      // Check user role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      const role = roleData?.role || 'client';
      setUserRole(role);
      
      // If not a client, redirect to CRM
      if (role !== 'client') {
        toast({
          title: "Accès refusé",
          description: "Cet espace est réservé aux clients.",
          variant: "destructive",
        });
        navigate("/crm");
        return;
      }
      
      // Fetch client data
      const { data: clientRecord } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      if (clientRecord) {
        setClientData(clientRecord);
      }
      
      setLoading(false);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/connexion");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate("/");
  };

  const getInitials = () => {
    if (clientData) {
      return `${clientData.first_name?.[0] || ''}${clientData.last_name?.[0] || ''}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'C';
  };

  const getDisplayName = () => {
    if (clientData) {
      return `${clientData.first_name || ''} ${clientData.last_name || ''}`.trim();
    }
    return user?.email || 'Client';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar - Clean design matching the reference image */}
      <aside className="w-72 bg-card border-r flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <img src={advisyLogo} alt="Advisy" className="h-10" />
          </div>
        </div>
        
        {/* User Card */}
        <div className="p-4">
          <div className="bg-primary/5 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{getDisplayName()}</p>
                <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
                {item.title === "Notifications" && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-white font-bold">
                    2
                  </span>
                )}
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </button>
            );
          })}
        </nav>
        
        {/* Contact Section */}
        <div className="p-4 border-t">
          <div className="bg-muted/50 rounded-xl p-4 space-y-3">
            <p className="text-sm font-medium text-foreground flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              Besoin d'aide ?
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+41225555555" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                +41 22 555 55 55
              </a>
              <a href="mailto:contact@advisy.ch" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                contact@advisy.ch
              </a>
            </div>
          </div>
        </div>
        
        {/* Logout */}
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Déconnexion
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet context={{ user, clientData }} />
        </div>
      </main>
    </div>
  );
}
