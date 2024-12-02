'use client';

import { useState, useEffect, useCallback } from 'react';

interface DockerContainer {
  id: string;
  name: string;
  image: string;
  state: string;
  status: string;
  created: string;
  ports: string;
  cpu_percent: number;
  mem_usage: number;
  mem_limit: number;
}

interface DockerImage {
  id: string;
  tags: string[];
  size: number;
  created: string;
}

interface DockerState {
  containers: DockerContainer[];
  images: DockerImage[];
}

export function useDocker(pollInterval = 5000) {
  const [state, setState] = useState<DockerState>({ containers: [], images: [] });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDocker = useCallback(async () => {
    try {
      const response = await fetch('/api/docker');
      if (!response.ok) throw new Error('Failed to fetch Docker information');
      const data = await response.json();
      setState(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Docker information');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const controlContainer = useCallback(async (containerId: string, action: string) => {
    try {
      const response = await fetch('/api/docker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ containerId, action })
      });
      
      if (!response.ok) throw new Error('Failed to control container');
      await fetchDocker(); // Refresh container list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to control container');
      return false;
    }
  }, [fetchDocker]);

  useEffect(() => {
    fetchDocker();
    const interval = setInterval(fetchDocker, pollInterval);
    return () => clearInterval(interval);
  }, [fetchDocker, pollInterval]);

  return {
    containers: state.containers,
    images: state.images,
    error,
    isLoading,
    controlContainer,
    refresh: fetchDocker
  };
}