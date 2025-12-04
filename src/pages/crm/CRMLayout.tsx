import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  FileCheck,
  DollarSign,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import advisyLogo from "@/assets/advisy-logo.svg";

const menuItems = [
  { to: "/crm", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/crm/clients", icon: Users, label: "Adresses" },
  { to: "/crm/suivis", icon: ClipboardList, label: "Suivis" },
  { to: "/crm/propositions", icon: FileText, label: "Propositions" },
  { to: "/crm/contrats", icon: FileCheck, label: "Contrats" },
  { to: "/crm/commissions", icon: DollarSign, label: "Commissions" },
  { to: "/crm/collaborateurs", icon: UserCog, label: "Collaborateurs" },
  { to: "/crm/rapports", icon: BarChart3, label: "Rapports" },
  { to: "/crm/parametres", icon: Settings, label: "Paramètres" },
];

export default function CRMLayout() {
  const { user, signOut } = useAuth();
  const { role, loading } = useUserRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary" />
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
        </div>
      </div>
    );
  }

  const NavItems = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="space-y-1">
      {menuItems.map((item, index) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onItemClick}
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
              "hover:translate-x-1",
              isActive
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                : "hover:bg-primary/5 text-foreground/70 hover:text-foreground"
            )
          }
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <item.icon className={cn(
            "h-5 w-5 transition-transform duration-300",
            "group-hover:scale-110"
          )} />
          <span className="font-medium">{item.label}</span>
          <ChevronRight className="h-4 w-4 ml-auto opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </NavLink>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-background to-primary/5">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-card/80 backdrop-blur-xl border-r border-border/50 shadow-xl">
        {/* Logo Section */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
              <img src={advisyLogo} alt="Advisy" className="w-6 h-6 brightness-0 invert" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ADVISY CRM
              </h1>
              <p className="text-xs text-muted-foreground capitalize font-medium">
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <NavItems />
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border/50 bg-muted/30">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-card/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full group hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-300"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border/50 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <img src={advisyLogo} alt="Advisy" className="w-5 h-5 brightness-0 invert" />
            </div>
            <h1 className="text-lg font-bold text-primary">ADVISY CRM</h1>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-card/95 backdrop-blur-xl">
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <img src={advisyLogo} alt="Advisy" className="w-6 h-6 brightness-0 invert" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">ADVISY CRM</h2>
                    <p className="text-xs text-muted-foreground capitalize">{role}</p>
                  </div>
                </div>
              </div>
              <nav className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                <NavItems onItemClick={() => setMobileMenuOpen(false)} />
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-muted/30">
                <p className="text-sm font-medium mb-4 truncate px-2">{user?.email}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="lg:p-8 p-4 pt-20 lg:pt-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
