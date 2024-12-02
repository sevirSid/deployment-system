import { NextResponse } from 'next/server';
import si from 'systeminformation';

export async function GET() {
  try {
    const [services, docker] = await Promise.all([
      si.services('*'),
      si.dockerContainers()
    ]);

    const runningServices = services.map(service => ({
      name: service.name,
      status: service.running ? 'running' : 'stopped',
      pid: service.pid,
      cpu: 0, // Would need process-specific CPU tracking
      memory: 0 // Would need process-specific memory tracking
    }));

    const containers = docker.map(container => ({
      id: container.id,
      name: container.name,
      image: container.image,
      state: container.state,
      status: container.status,
      cpu: container.cpu_percent,
      memory: container.mem_usage
    }));

    return NextResponse.json({
      services: runningServices,
      containers
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { action, service } = await req.json();
    
    if (!service || !action) {
      return NextResponse.json(
        { error: 'Service name and action required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would control the actual service
    const result = {
      success: true,
      message: `Service ${service} ${action} successfully`,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to control service' },
      { status: 500 }
    );
  }
}