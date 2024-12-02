'use client';

import { useState, useEffect, useCallback } from 'react';

interface Service {
  name: string;
  status: string;
  pid: number;
  cpu: number;
  memory: number;
}

interface Container {
  id: string;
  name: string;
  image: string;
  state: string;
  status: string;
  cpu: number;
  memory: number;
}

interface ServicesState {
  services: Service[];
  containers: Container[];
}

export function useServices(pollInterval = 5000) {
  const [state, setState] = useState<ServicesState>({ services: [], containers: [] });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setState(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const controlService = useCallback(async (service: string, action: string) => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, action })
      });
      
      if (!response.ok) throw new Error('Failed to control service');
      await fetchServices(); // Refresh services list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to control service');
      return false;
    }
  }, [fetchServices]);

  useEffect(() => {
    fetchServices();
    const interval = setInterval(fetchServices, pollInterval);
    return () => clearInterval(interval);
  }, [fetchServices, pollInterval]);

  return {
    services: state.services,
    containers: state.containers,
    error,
    isLoading,
    controlService,
    refresh: fetchServices
  };
}