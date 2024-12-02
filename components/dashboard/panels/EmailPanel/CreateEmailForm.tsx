'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, AtSign } from 'lucide-react';
import { useEmails, EmailConfig } from '@/hooks/useEmails';

const AVAILABLE_DOMAINS = [
  'example.com',
  'mail.example.com',
  'dev.example.com'
] as const;

export function CreateEmailForm() {
  const { createEmail, isLoading } = useEmails();
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    username: '',
    domain: '',
    password: '',
    quota: 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEmail(emailConfig);
      // Reset form
      setEmailConfig({
        username: '',
        domain: '',
        password: '',
        quota: 5
      });
    } catch (err) {
      // Handle error (could show a toast notification)
      console.error('Failed to create email:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AtSign className="w-5 h-5" />
          Create Email Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <div className="flex gap-2">
                <Input
                  id="username"
                  placeholder="username"
                  value={emailConfig.username}
                  onChange={(e) => setEmailConfig({ ...emailConfig, username: e.target.value })}
                  required
                  disabled={isLoading}
                />
                <select
                  className="flex-shrink-0 h-10 w-[200px] rounded-md border border-input bg-background px-3"
                  value={emailConfig.domain}
                  onChange={(e) => setEmailConfig({ ...emailConfig, domain: e.target.value })}
                  required
                  disabled={isLoading}
                >
                  <option value="">Select domain</option>
                  {AVAILABLE_DOMAINS.map(domain => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={emailConfig.password}
                onChange={(e) => setEmailConfig({ ...emailConfig, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quota">Storage Quota (GB)</Label>
              <Input
                id="quota"
                type="number"
                min="1"
                value={emailConfig.quota}
                onChange={(e) => setEmailConfig({ ...emailConfig, quota: parseInt(e.target.value) })}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            <Plus className="w-4 h-4 mr-2" />
            {isLoading ? 'Creating...' : 'Create Email Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}