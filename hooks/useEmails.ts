'use client';

import { useState, useCallback } from 'react';

export interface EmailAccount {
  username: string;
  domain: string;
  quota: {
    used: number;
    total: number;
  };
  status: 'active' | 'suspended';
}

export interface EmailConfig {
  username: string;
  domain: string;
  password: string;
  quota: number;
}

export function useEmails() {
  const [emails, setEmails] = useState<EmailAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with actual API call
      const response = await fetch('/api/emails');
      const data = await response.json();
      setEmails(data);
    } catch (err) {
      setError('Failed to fetch email accounts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEmail = useCallback(async (config: EmailConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with actual API call
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      const data = await response.json();
      setEmails(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError('Failed to create email account');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteEmail = useCallback(async (username: string, domain: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with actual API call
      await fetch(`/api/emails/${username}@${domain}`, {
        method: 'DELETE',
      });
      setEmails(prev => prev.filter(email => 
        !(email.username === username && email.domain === domain)
      ));
    } catch (err) {
      setError('Failed to delete email account');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    emails,
    isLoading,
    error,
    fetchEmails,
    createEmail,
    deleteEmail,
  };
}