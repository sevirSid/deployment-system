'use client';

import { useState, useCallback } from 'react';

export interface DeployConfig {
  appType: 'spring' | 'next';
  gitUrl: string;
  branch: string;
  envType: 'development' | 'staging' | 'production';
  version: string;
  buildCommand?: string;
  envVars?: Record<string, string>;
}

export interface Deployment {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  url?: string;
  currentStep?: string;
  logs: Array<{
    timestamp: string;
    message: string;
  }>;
  created_at: string;
  started_at?: string;
  completed_at?: string;
}

export function useDeploy() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [currentDeployment, setCurrentDeployment] = useState<Deployment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deploy = useCallback(async (config: DeployConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      if (!response.ok) {
        throw new Error('Deployment failed');
      }

      const deployment = await response.json();
      setCurrentDeployment(deployment);
      setDeployments(prev => [deployment, ...prev]);
      return deployment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start deployment');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getDeploymentStatus = useCallback(async (deployId: string) => {
    try {
      const response = await fetch(`/api/deploy?deployId=${deployId}`);
      if (!response.ok) throw new Error('Failed to fetch deployment status');
      const deployment = await response.json();
      
      setCurrentDeployment(deployment);
      setDeployments(prev => 
        prev.map(d => d.id === deployId ? deployment : d)
      );
      
      return deployment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch deployment status');
      throw err;
    }
  }, []);

  const getDeploymentLogs = useCallback(async (deployId: string) => {
    try {
      const response = await fetch(`/api/deploy/logs?deployId=${deployId}`);
      if (!response.ok) throw new Error('Failed to fetch deployment logs');
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch deployment logs');
      throw err;
    }
  }, []);

  return {
    deployments,
    currentDeployment,
    error,
    isLoading,
    deploy,
    getDeploymentStatus,
    getDeploymentLogs
  };
}