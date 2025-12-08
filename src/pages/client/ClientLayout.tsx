import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { 
  Home, 
  FileText, 
  FolderOpen, 
  MessageCircle, 
  User, 
  Bell,
  LogOut,
  Moon,
  Sun,
  Menu
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
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/connexion");
        return;
      }
      
      setUser(session.user);
      
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
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <Sidebar className="border-r bg-background">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-3">
              <img src={advisyLogo} alt="Advisy" className="h-8 w-8" />
              <span className="font-semibold text-lg text-primary">Advisy</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.path)}
                      className={cn(
                        "w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                      {item.title === "Notifications" && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-destructive" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t space-y-4">
            {/* Dark mode toggle */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span>Mode sombre</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>
            
            {/* User info */}
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{getDisplayName()}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-6 py-4 flex items-center gap-4">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          </header>
          
          <div className="p-6">
            <Outlet context={{ user, clientData }} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
