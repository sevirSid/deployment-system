'use client';

import { useState, useEffect, useCallback } from 'react';

interface SystemMetrics {
  cpu: {
    usage: string;
    cores: Array<{ load: string }>;
  };
  memory: {
    total: number;
    used: number;
    usagePercent: string;
  };
  requests: {
    rate: string;
    total: number;
  };
  timestamp: string;
}

export function useMetrics(pollInterval = 5000) {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = useCallback(async () => {
    try {
      const response = await fetch('/api/metrics');
      if (!response.ok) throw new Error('Failed to fetch metrics');
      const data = await response.json();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, pollInterval);
    return () => clearInterval(interval);
  }, [fetchMetrics, pollInterval]);

  return {
    metrics,
    error,
    isLoading,
    refetch: fetchMetrics
  };
}