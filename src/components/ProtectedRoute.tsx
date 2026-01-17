import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Space key for session storage - tracks which space user logged into
const LOGIN_SPACE_KEY = 'lyta_login_space';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Determine which space the current route belongs to
  const getRouteSpace = (path: string): 'client' | 'team' | 'king' | null => {
    if (path.startsWith('/espace-client')) return 'client';
    if (path.startsWith('/crm')) return 'team';
    if (path.startsWith('/king')) return 'king';
    return null;
  };

  // Server-side validation of user session, role, AND login space
  useEffect(() => {
    const validateSession = async () => {
      if (loading) return;
      
      if (!user) {
        setIsValidating(false);
        setIsAuthorized(false);
        return;
      }

      try {
        // Verify session is still valid on server
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          console.error("[ProtectedRoute] Invalid session, forcing logout");
          sessionStorage.clear();
          await signOut();
          setIsAuthorized(false);
          setIsValidating(false);
          return;
        }

        // Verify user exists in database
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, is_active')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError || !profile) {
          console.error("[ProtectedRoute] User profile not found");
          sessionStorage.clear();
          await signOut();
          setIsAuthorized(false);
          setIsValidating(false);
          return;
        }

        // Check if user is active
        if (profile.is_active === false) {
          console.error("[ProtectedRoute] User account is deactivated");
          sessionStorage.clear();
          await signOut();
          setIsAuthorized(false);
          setIsValidating(false);
          return;
        }

        // Get all user roles for validation
        const { data: rolesData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        const userRoles = rolesData?.map(r => r.role) || [];
        const currentPath = location.pathname;
        const routeSpace = getRouteSpace(currentPath);
        const loginSpace = sessionStorage.getItem(LOGIN_SPACE_KEY);

        console.log("[ProtectedRoute] Validating:", { 
          currentPath, 
          routeSpace, 
          loginSpace, 
          userRoles 
        });

        // CRITICAL: Validate that user is accessing the space they logged into
        // This prevents switching spaces via URL
        if (routeSpace && loginSpace && routeSpace !== loginSpace) {
          console.error("[ProtectedRoute] Space mismatch! Logged into:", loginSpace, "Trying to access:", routeSpace);
          setIsAuthorized(false);
          setIsValidating(false);
          return;
        }

        // Validate role matches route
        if (currentPath.startsWith('/king')) {
          if (!userRoles.includes('king')) {
            console.error("[ProtectedRoute] Unauthorized access to king route");
            setIsAuthorized(false);
            setIsValidating(false);
            return;
          }
        }

        if (currentPath.startsWith('/crm')) {
          // CRM requires team roles (not client-only)
          const teamRoles = ['king', 'admin', 'manager', 'agent', 'backoffice', 'compta', 'partner'];
          const hasTeamRole = userRoles.some(role => teamRoles.includes(role));
          
          if (!hasTeamRole) {
            console.error("[ProtectedRoute] User has no team role for CRM");
            setIsAuthorized(false);
            setIsValidating(false);
            return;
          }
        }

        if (currentPath.startsWith('/espace-client')) {
          // Client space - check if user has client role OR has a client record
          const hasClientRole = userRoles.includes('client') || userRoles.includes('king');
          
          if (!hasClientRole) {
            const { data: clientRecord } = await supabase
              .from('clients')
              .select('id')
              .eq('user_id', user.id)
              .maybeSingle();

            if (!clientRecord) {
              console.error("[ProtectedRoute] User has no client record for client space");
              setIsAuthorized(false);
              setIsValidating(false);
              return;
            }
          }
        }

        setIsAuthorized(true);
        setIsValidating(false);
      } catch (error) {
        console.error("[ProtectedRoute] Validation error:", error);
        setIsAuthorized(false);
        setIsValidating(false);
      }
    };

    validateSession();
  }, [user, loading, location.pathname, signOut]);

  if (loading || isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1800AD]" />
      </div>
    );
  }

  if (!user || !isAuthorized) {
    // Clear any stale session data
    sessionStorage.removeItem('lyta_active_role');
    sessionStorage.removeItem('loginTarget');
    sessionStorage.removeItem('userLoginData');
    return <Navigate to="/connexion" replace />;
  }

  return <>{children}</>;
}
