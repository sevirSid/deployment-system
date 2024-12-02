'use client';

import { Activity, Server, Database, Terminal, Rocket, Mail } from 'lucide-react';

interface TabButtonProps {
  value: string;
  icon: any;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ value, icon: Icon, label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded ${
        isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

interface DashboardNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  return (
    <div className="flex gap-4 mb-6 border-b">
      <TabButton
        value="metrics"
        icon={Activity}
        label="Metrics"
        isActive={activeTab === 'metrics'}
        onClick={() => onTabChange('metrics')}
      />
      <TabButton
        value="services"
        icon={Server}
        label="Services"
        isActive={activeTab === 'services'}
        onClick={() => onTabChange('services')}
      />
      <TabButton
        value="database"
        icon={Database}
        label="Database"
        isActive={activeTab === 'database'}
        onClick={() => onTabChange('database')}
      />
      <TabButton
        value="docker"
        icon={Terminal}
        label="Docker"
        isActive={activeTab === 'docker'}
        onClick={() => onTabChange('docker')}
      />
      <TabButton
        value="deploy"
        icon={Rocket}
        label="Deploy"
        isActive={activeTab === 'deploy'}
        onClick={() => onTabChange('deploy')}
      />
      <TabButton
        value="email"
        icon={Mail}
        label="Email"
        isActive={activeTab === 'email'}
        onClick={() => onTabChange('email')}
      />
    </div>
  );
}