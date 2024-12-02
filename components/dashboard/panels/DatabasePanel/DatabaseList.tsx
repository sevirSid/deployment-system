'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Trash2 } from 'lucide-react';

const databases = [
  { name: 'app_production', size: '1.2 GB', tables: 24, charset: 'utf8mb4' },
  { name: 'app_staging', size: '850 MB', tables: 24, charset: 'utf8mb4' }
];

export function DatabaseList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Existing Databases
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}