'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateDatabaseForm } from './CreateDatabaseForm';
import { CreateUserForm } from './CreateUserForm';
import { DatabaseList } from './DatabaseList';
import { UserPrivileges } from './UserPrivileges';
import { Database, Users, Shield } from 'lucide-react';

const mockUsers = [
  { username: 'app_user', host: 'localhost', databases: ['app_production'] },
  { username: 'admin', host: 'localhost', databases: ['*'] }
];

const mockDatabases = [
  { name: 'app_production', size: '1.2 GB', tables: 24, charset: 'utf8mb4' },
  { name: 'app_staging', size: '850 MB', tables: 24, charset: 'utf8mb4' }
];

export function DatabasePanel() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="databases" className="space-y-6">
        <TabsList>
          <TabsTrigger value="databases" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Databases
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="privileges" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privileges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="databases" className="space-y-6">
          <CreateDatabaseForm />
          <DatabaseList />
        </TabsContent>

        <TabsContent value="users">
          <CreateUserForm />
        </TabsContent>

        <TabsContent value="privileges">
          <UserPrivileges users={mockUsers} databases={mockDatabases} />
        </TabsContent>
      </Tabs>
    </div>
  );
}