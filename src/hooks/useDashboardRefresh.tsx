import { useCallback, useEffect, useRef } from 'react';
import { useClients } from './useClients';
import { usePolicies } from './usePolicies';
import { useCommissions } from './useCommissions';

/**
 * Central hook to manage dashboard data refresh
 * Provides manual and automatic refresh capabilities
 */
export function useDashboardRefresh(autoRefreshInterval = 60000) {
  const { fetchClients, loading: clientsLoading } = useClients();
  const { fetchPolicies, loading: policiesLoading } = usePolicies();
  const { fetchCommissions, loading: commissionsLoading } = useCommissions();
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastRefreshRef = useRef<number>(Date.now());

  const isRefreshing = clientsLoading || policiesLoading || commissionsLoading;

  /**
   * Refresh all dashboard data
   */
  const refreshAll = useCallback(async () => {
    console.log('[DashboardRefresh] Refreshing all data...');
    lastRefreshRef.current = Date.now();
    
    await Promise.all([
      fetchClients(),
      fetchPolicies(),
      fetchCommissions(),
    ]);
    
    console.log('[DashboardRefresh] Refresh complete');
  }, [fetchClients, fetchPolicies, fetchCommissions]);

  /**
   * Get time since last refresh in seconds
   */
  const getSecondsSinceLastRefresh = useCallback(() => {
    return Math.floor((Date.now() - lastRefreshRef.current) / 1000);
  }, []);

  // Setup auto-refresh interval
  useEffect(() => {
    if (autoRefreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        refreshAll();
      }, autoRefreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRefreshInterval, refreshAll]);

  return {
    refreshAll,
    isRefreshing,
    getSecondsSinceLastRefresh,
  };
}
