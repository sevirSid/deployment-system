'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  loading?: boolean;
}

export function MetricCard({ label, value, icon: Icon, color, loading }: MetricCardProps) {
  const percentage = parseFloat(value) || 0;
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 text-${color}-500`} />
          <h3 className="font-medium">{label}</h3>
        </div>
        <span className="text-2xl font-bold">
          {loading ? '-' : value}
        </span>
      </div>
      <Progress 
        value={loading ? 0 : percentage} 
        className="h-2"
        indicatorClassName={`bg-${color}-500`}
      />
    </Card>
  );
}