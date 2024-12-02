import { z } from 'zod';

export const EMAIL_STATUSES = ['active', 'suspended', 'pending'] as const;
export const DOMAIN_TYPES = ['primary', 'alias'] as const;

export interface EmailConfig {
  username: string;
  domain: string;
  password: string;
  quota: number;
}

export interface DomainConfig {
  name: string;
  type: typeof DOMAIN_TYPES[number];
  catchAll?: string;
  spfRecord?: string;
  dkimEnabled: boolean;
}

// Validation schemas
export const emailConfigSchema = z.object({
  username: z.string().min(1).max(64).regex(/^[a-zA-Z0-9._-]+$/),
  domain: z.string().min(1),
  password: z.string().min(8),
  quota: z.number().min(1).max(100)
});

export const domainConfigSchema = z.object({
  name: z.string().min(1).regex(/^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/),
  type: z.enum(DOMAIN_TYPES),
  catchAll: z.string().email().optional(),
  spfRecord: z.string().optional(),
  dkimEnabled: z.boolean().default(false)
});

// Helper functions
export function validateEmailUsername(username: string): boolean {
  return /^[a-zA-Z0-9._-]+$/.test(username) && username.length <= 64;
}

export function validateDomainName(domain: string): boolean {
  return /^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/.test(domain);
}

export function formatQuota(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

export function generateSpfRecord(domain: string): string {
  return `v=spf1 mx a:${domain} ~all`;
}

export function generateDkimSelector(): string {
  return `default._domainkey`;
}