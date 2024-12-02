import { NextResponse } from 'next/server';
import si from 'systeminformation';

export async function GET() {
  try {
    const [containers, images] = await Promise.all([
      si.dockerContainers(),
      si.dockerImages()
    ]);

    return NextResponse.json({
      containers: containers.map(container => ({
        id: container.id,
        name: container.name,
        image: container.image,
        state: container.state,
        status: container.status,
        created: container.created,
        ports: container.ports,
        cpu_percent: container.cpu_percent,
        mem_usage: container.mem_usage,
        mem_limit: container.mem_limit
      })),
      images: images.map(image => ({
        id: image.id,
        tags: image.tags,
        size: image.size,
        created: image.created
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Docker information' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { action, containerId } = await req.json();
    
    if (!containerId || !action) {
      return NextResponse.json(
        { error: 'Container ID and action required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would control the actual container
    const result = {
      success: true,
      message: `Container ${containerId} ${action} successfully`,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to control container' },
      { status: 500 }
    );
  }
}