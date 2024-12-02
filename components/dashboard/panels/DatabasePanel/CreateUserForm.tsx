'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Users } from 'lucide-react';

interface UserConfig {
  username: string;
  password: string;
  host: string;
  database: string;
}

export function CreateUserForm() {
  const [config, setConfig] = useState<UserConfig>({
    username: '',
    password: '',
    host: 'localhost',
    database: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle user creation
    console.log('Creating user:', config);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Create New User
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={config.username}
                onChange={(e) => setConfig({ ...config, username: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={config.password}
                onChange={(e) => setConfig({ ...config, password: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="host">Host</Label>
              <Input
                id="host"
                placeholder="localhost"
                value={config.host}
                onChange={(e) => setConfig({ ...config, host: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="database">Database</Label>
              <Input
                id="database"
                placeholder="Enter database name"
                value={config.database}
                onChange={(e) => setConfig({ ...config, database: e.target.value })}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}