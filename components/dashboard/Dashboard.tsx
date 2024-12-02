'use client';

import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardNav } from './DashboardNav';
import { MetricsPanel } from './panels/MetricsPanel';
import { ServicesPanel } from './panels/ServicesPanel';
import { DatabasePanel } from './panels/DatabasePanel';
import { DockerPanel } from './panels/DockerPanel';
import { DeployPanel } from './panels/DeployPanel';
import { EmailPanel } from './panels/EmailPanel';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('metrics');

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'metrics' && <MetricsPanel />}
        {activeTab === 'services' && <ServicesPanel />}
        {activeTab === 'database' && <DatabasePanel />}
        {activeTab === 'docker' && <DockerPanel />}
        {activeTab === 'deploy' && <DeployPanel />}
        {activeTab === 'email' && <EmailPanel />}
      </div>
    </div>
  );
}