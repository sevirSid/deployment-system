'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'API Service',
    type: 'Spring Boot',
    status: 'healthy',
    instances: 3,
    cpu: 45,
    memory: 60,
    requests: 1200
  },
  {
    id: 2,
    name: 'Web Frontend',
    type: 'NextJS',
    status: 'healthy',
    instances: 2,
    cpu: 35,
    memory: 50,
    requests: 800
  }
];

export function ServicesPanel() {
  return (
    <div className="space-y-4">
      {services.map(service => (
        <Card key={service.id} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">{service.name}</h3>
              <p className="text-sm text-gray-500">Type: {service.type}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 text-sm rounded ${
                service.status === 'healthy' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {service.status}
              </span>
              <Button variant="outline" size="sm">Scale</Button>
              <Button variant="outline" size="sm">Restart</Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Instances</p>
              <p className="text-lg font-medium">{service.instances}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">CPU Usage</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${service.cpu}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Memory Usage</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${service.memory}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Requests/min</p>
              <p className="text-lg font-medium">{service.requests}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}