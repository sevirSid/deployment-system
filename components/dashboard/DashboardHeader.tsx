'use client';

import { Settings } from 'lucide-react';

export function DashboardHeader() {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">System Dashboard</h1>
          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
            All Systems Operational
          </span>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-50">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </div>
  );
}