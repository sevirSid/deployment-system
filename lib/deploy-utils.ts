import { z } from 'zod';

export const DEPLOYMENT_STATUSES = [
  'pending',
  'in_progress',
  'completed',
  'failed'
] as const;

export const APP_TYPES = ['spring', 'next'] as const;
export const ENV_TYPES = ['development', 'staging', 'production'] as const;

export interface DeploymentConfig {
  appType: typeof APP_TYPES[number];
  gitUrl: string;
  branch: string;
  envType: typeof ENV_TYPES[number];
  version: string;
  buildCommand?: string;
  envVars?: Record<string, string>;
}

// Validation schemas
export const deploymentConfigSchema = z.object({
  appType: z.enum(APP_TYPES),
  gitUrl: z.string().url(),
  branch: z.string().default('main'),
  envType: z.enum(ENV_TYPES),
  version: z.string(),
  buildCommand: z.string().optional(),
  envVars: z.record(z.string()).optional()
});

// Helper functions
export function validateGitUrl(url: string): boolean {
  try {
    new URL(url);
    return url.endsWith('.git') || url.includes('github.com') || url.includes('gitlab.com');
  } catch {
    return false;
  }
}

export function generateDeploymentUrl(deployId: string, envType: string): string {
  return `https://${envType}.${deployId}.example.com`;
}

export function getDefaultBuildCommand(appType: typeof APP_TYPES[number]): string {
  return appType === 'spring' 
    ? './gradlew build'
    : 'npm run build';
}

export function validateVersion(appType: typeof APP_TYPES[number], version: string): boolean {
  if (appType === 'spring') {
    return /^(8|11|17)$/.test(version);
  }
  return /^(16|18|20)$/.test(version);
}