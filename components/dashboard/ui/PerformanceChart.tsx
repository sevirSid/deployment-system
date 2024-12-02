'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PerformanceData {
  time: string;
  cpu: number;
  memory: number;
  requests: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="cpu" stroke="#3b82f6" name="CPU %" />
        <Line type="monotone" dataKey="memory" stroke="#10b981" name="Memory %" />
        <Line type="monotone" dataKey="requests" stroke="#8b5cf6" name="Requests/s" />
      </LineChart>
    </ResponsiveContainer>
  );
}