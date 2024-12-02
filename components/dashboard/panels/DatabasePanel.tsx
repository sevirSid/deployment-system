'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Shield } from 'lucide-react';

const databases = [
  { name: 'app_production', size: '1.2 GB', tables: 24, charset: 'utf8mb4' },
  { name: 'app_staging', size: '850 MB', tables: 24, charset: 'utf8mb4' }
];

export function DatabasePanel() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5" />
          <h2 className="text-lg font-medium">Database Instances</h2>
        </div>
        <div className="space-y-4">
          {databases.map((db) => (
            <div key={db.name} className="flex items-center justify-between p-4 border rounded">
              <div>
                <h3 className="font-medium">{db.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {db.size} | Tables: {db.tables} | Charset: {db.charset}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Backup</Button>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5" />
          <h2 className="text-lg font-medium">Security & Access</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-medium text-blue-800">Automated Backup Schedule</h4>
            <p className="text-sm text-blue-600">Next backup scheduled for 00:00 UTC</p>
          </div>
        </div>
      </Card>
    </div>
  );
}