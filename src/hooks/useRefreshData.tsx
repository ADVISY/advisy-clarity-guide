import { createContext, useContext, useCallback, useState, ReactNode } from 'react';

interface RefreshContextType {
  refreshKey: number;
  triggerRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextType | null>(null);

export function RefreshProvider({ children }: { children: ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    console.log("[RefreshProvider] Triggering global data refresh");
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <RefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export function useRefreshData() {
  const context = useContext(RefreshContext);
  if (!context) {
    // Return a fallback if not wrapped in provider (for backwards compatibility)
    return { refreshKey: 0, triggerRefresh: () => {} };
  }
  return context;
}
