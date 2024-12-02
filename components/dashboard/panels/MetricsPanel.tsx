'use client';

import { Card } from '@/components/ui/card';
import { MetricCard } from '../ui/MetricCard';
import { PerformanceChart } from '../ui/PerformanceChart';
import { useMetrics } from '@/hooks/useMetrics';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Activity, Memory, Network } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PerformanceData {
  time: string;
  cpu: number;
  memory: number;
  requests: number;
}

const MAX_DATA_POINTS = 20;

export function MetricsPanel() {
  const { metrics, error, isLoading } = useMetrics(2000);
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceData[]>([]);

  useEffect(() => {
    if (metrics) {
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        cpu: parseFloat(metrics.cpu.usage),
        memory: parseFloat(metrics.memory.usagePercent),
        requests: parseFloat(metrics.requests.rate)
      };

      setPerformanceHistory(prev => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-MAX_DATA_POINTS);
      });
    }
  }, [metrics]);

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Error loading metrics: {error}
      </div>
    );
  }

  if (isLoading && !metrics) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="CPU Usage"
          value={`${metrics?.cpu.usage}%`}
          icon={Activity}
          color="blue"
          loading={isLoading}
        />
        <MetricCard
          label="Memory Usage"
          value={`${metrics?.memory.usagePercent}%`}
          icon={Memory}
          color="green"
          loading={isLoading}
        />
        <MetricCard
          label="Request Rate"
          value={`${metrics?.requests.rate}/s`}
          icon={Network}
          color="purple"
          loading={isLoading}
        />
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">System Performance</h2>
        <div className="h-80">
          <PerformanceChart data={performanceHistory} />
        </div>
      </Card>
    </div>
  );
}