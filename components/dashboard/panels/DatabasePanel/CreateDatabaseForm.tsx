'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Database } from 'lucide-react';

interface DatabaseConfig {
  name: string;
  charset: string;
}

export function CreateDatabaseForm() {
  const [config, setConfig] = useState<DatabaseConfig>({
    name: '',
    charset: 'utf8mb4'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle database creation
    console.log('Creating database:', config);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Create New Database
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dbName">Database Name</Label>
              <Input
                id="dbName"
                placeholder="Enter database name"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="charset">Character Set</Label>
              <select
                id="charset"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1"
                value={config.charset}
                onChange={(e) => setConfig({ ...config, charset: e.target.value })}
              >
                <option value="utf8mb4">utf8mb4</option>
                <option value="utf8">utf8</option>
                <option value="latin1">latin1</option>
              </select>
            </div>
          </div>
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Create Database
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}