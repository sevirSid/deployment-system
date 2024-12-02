import { NextResponse } from 'next/server';
import { z } from 'zod';
import si from 'systeminformation';

// Validation schema for deployment configuration
const deployConfigSchema = z.object({
  appType: z.enum(['spring', 'next']),
  gitUrl: z.string().url(),
  branch: z.string().default('main'),
  envType: z.enum(['development', 'staging', 'production']),
  version: z.string(),
  buildCommand: z.string().optional(),
  envVars: z.record(z.string()).optional()
});

// Mock deployment storage
let deployments = new Map();
let deploymentCounter = 0;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const deployId = url.searchParams.get('deployId');

    if (deployId) {
      const deployment = deployments.get(deployId);
      if (!deployment) {
        return NextResponse.json(
          { error: 'Deployment not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(deployment);
    }

    // Return all deployments
    return NextResponse.json(Array.from(deployments.values()));
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch deployment information' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const config = deployConfigSchema.parse(body);

    // Get system resources
    const [cpu, memory] = await Promise.all([
      si.currentLoad(),
      si.mem()
    ]);

    // Generate unique deployment ID
    const deployId = `deploy_${++deploymentCounter}`;

    // Create deployment record
    const deployment = {
      id: deployId,
      ...config,
      status: 'pending',
      resources: {
        cpu: cpu.currentLoad.toFixed(2),
        memory: ((memory.active / memory.total) * 100).toFixed(2)
      },
      created_at: new Date().toISOString(),
      logs: []
    };

    // Store deployment
    deployments.set(deployId, deployment);

    // Start mock deployment process
    simulateDeployment(deployId);

    return NextResponse.json(deployment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid deployment configuration', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to start deployment' },
      { status: 500 }
    );
  }
}

async function simulateDeployment(deployId: string) {
  const deployment = deployments.get(deployId);
  if (!deployment) return;

  const steps = [
    { name: 'Cloning repository', duration: 2000 },
    { name: 'Installing dependencies', duration: 3000 },
    { name: 'Running tests', duration: 2000 },
    { name: 'Building application', duration: 4000 },
    { name: 'Deploying', duration: 3000 }
  ];

  deployment.status = 'in_progress';
  deployment.started_at = new Date().toISOString();

  for (const step of steps) {
    deployment.currentStep = step.name;
    deployment.logs.push({
      timestamp: new Date().toISOString(),
      message: `Starting: ${step.name}`
    });

    await new Promise(resolve => setTimeout(resolve, step.duration));

    deployment.logs.push({
      timestamp: new Date().toISOString(),
      message: `Completed: ${step.name}`
    });
  }

  deployment.status = 'completed';
  deployment.completed_at = new Date().toISOString();
  deployment.url = `https://${deployment.envType}.${deployId}.example.com`;
}