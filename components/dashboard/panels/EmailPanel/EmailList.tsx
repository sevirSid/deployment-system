'use client';

import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Trash2, RefreshCw } from 'lucide-react';
import { useEmails } from '@/hooks/useEmails';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function EmailList() {
  const { emails, isLoading, error, fetchEmails, deleteEmail } = useEmails();

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const handleDelete = async (username: string, domain: string) => {
    try {
      await deleteEmail(username, domain);
    } catch (err) {
      // Handle error (could show a toast notification)
      console.error('Failed to delete email:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Accounts
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fetchEmails()}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : emails.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No email accounts found
          </div>
        ) : (
          <div className="space-y-4">
            {emails.map((email) => (
              <div
                key={`${email.username}@${email.domain}`}
                className="flex items-center justify-between p-4 border rounded"
              >
                <div>
                  <h3 className="font-medium">
                    {email.username}@{email.domain}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={email.status === 'active' ? 'success' : 'destructive'}>
                      {email.status}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {email.quota.used}GB / {email.quota.total}GB used
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(email.username, email.domain)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}