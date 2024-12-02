import { z } from 'zod';

export const VALID_CHARSETS = ['utf8mb4', 'utf8', 'latin1'] as const;

export const DATABASE_PRIVILEGES = [
  'SELECT',
  'INSERT',
  'UPDATE',
  'DELETE',
  'CREATE',
  'DROP',
  'ALTER',
  'INDEX'
] as const;

export interface DatabaseConfig {
  name: string;
  charset: typeof VALID_CHARSETS[number];
}

export interface UserConfig {
  username: string;
  password: string;
  host: string;
  databases: string[];
}

export interface PrivilegeConfig {
  username: string;
  host: string;
  database: string;
  privileges: typeof DATABASE_PRIVILEGES[number][];
}

// Validation schemas
export const databaseConfigSchema = z.object({
  name: z.string().min(1).max(64).regex(/^[a-zA-Z0-9_]+$/),
  charset: z.enum(VALID_CHARSETS)
});

export const userConfigSchema = z.object({
  username: z.string().min(1).max(32).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(8),
  host: z.string().default('localhost'),
  databases: z.array(z.string()).min(1)
});

export const privilegeConfigSchema = z.object({
  username: z.string(),
  host: z.string().default('localhost'),
  database: z.string(),
  privileges: z.array(z.enum(DATABASE_PRIVILEGES))
});

// Helper functions
export function validateDatabaseName(name: string): boolean {
  return /^[a-zA-Z0-9_]+$/.test(name) && name.length <= 64;
}

export function validateUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]+$/.test(username) && username.length <= 32;
}

export function formatDatabaseSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}