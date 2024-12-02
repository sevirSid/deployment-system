'use client';

import { useState } from 'react';
import { DeploymentForm } from './DeploymentForm';
import { DeploymentStatus } from './DeploymentStatus';

export function DeployPanel() {
  const [deployStatus, setDeployStatus] = useState<'deploying' | 'success' | null>(null);
  const [deployProgress, setDeployProgress] = useState(0);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <DeploymentForm />
      <DeploymentStatus status={deployStatus} progress={deployProgress} />
    </div>
  );
}