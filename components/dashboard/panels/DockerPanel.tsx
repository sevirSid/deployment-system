'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Terminal, RefreshCw } from 'lucide-react';

const containers = [
  { name: 'api-service', status: 'Running', uptime: '5d 12h', image: 'spring-boot:latest' },
  { name: 'web-frontend', status: 'Running', uptime: '3d 8h', image: 'nextjs:latest' },
  { name: 'database', status: 'Running', uptime: '10d 4h', image: 'mysql:8.0' }
];

export function DockerPanel() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            <h2 className="text-lg font-medium">Docker Containers</h2>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        <div className="space-y-4">
          {containers.map((container) => (
            <div key={container.name} className="flex items-center justify-between p-4 border rounded">
              <div>
                <h3 className="font-medium">{container.name}</h3>
                <p className="text-sm text-gray-500">
                  Image: {container.image} | Uptime: {container.uptime}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-2 py-1 text-sm bg-green-100 text-green-600 rounded">
                  {container.status}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Logs</Button>
                  <Button variant="outline" size="sm">Restart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}