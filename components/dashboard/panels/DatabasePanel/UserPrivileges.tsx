'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, Save } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
  username: string;
  host: string;
}

interface Database {
  name: string;
}

interface Privilege {
  name: string;
  description: string;
}

const privileges: Privilege[] = [
  { name: 'SELECT', description: 'Allows reading data' },
  { name: 'INSERT', description: 'Allows inserting new records' },
  { name: 'UPDATE', description: 'Allows modifying existing records' },
  { name: 'DELETE', description: 'Allows removing records' },
  { name: 'CREATE', description: 'Allows creating new tables' },
  { name: 'DROP', description: 'Allows dropping tables' },
  { name: 'ALTER', description: 'Allows modifying table structure' },
  { name: 'INDEX', description: 'Allows creating/dropping indexes' }
];

export function UserPrivileges({ users, databases }: { users: User[]; databases: Database[] }) {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>([]);

  const handlePrivilegeChange = (privilegeName: string) => {
    setSelectedPrivileges(current => 
      current.includes(privilegeName)
        ? current.filter(p => p !== privilegeName)
        : [...current, privilegeName]
    );
  };

  const handleSavePrivileges = async () => {
    // TODO: Implement saving privileges
    console.log({
      user: selectedUser,
      database: selectedDatabase,
      privileges: selectedPrivileges
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Manage User Privileges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Select User</Label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={`${user.username}@${user.host}`} value={user.username}>
                    {user.username}@{user.host}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Select Database</Label>
            <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
              <SelectTrigger>
                <SelectValue placeholder="Select a database" />
              </SelectTrigger>
              <SelectContent>
                {databases.map(db => (
                  <SelectItem key={db.name} value={db.name}>
                    {db.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Privileges</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {privileges.map(privilege => (
                <div key={privilege.name} className="flex items-start space-x-2">
                  <Checkbox
                    id={privilege.name}
                    checked={selectedPrivileges.includes(privilege.name)}
                    onCheckedChange={() => handlePrivilegeChange(privilege.name)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={privilege.name}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {privilege.name}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {privilege.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={handleSavePrivileges}
          disabled={!selectedUser || !selectedDatabase}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Privileges
        </Button>
      </CardContent>
    </Card>
  );
}