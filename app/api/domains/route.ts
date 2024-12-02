import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for domain creation
const createDomainSchema = z.object({
  name: z.string().min(1).regex(/^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/),
  type: z.enum(['primary', 'alias']),
  catchAll: z.string().email().optional(),
  spfRecord: z.string().optional(),
  dkimEnabled: z.boolean().default(false)
});

// Mock domain storage (replace with real domain configuration)
let domains = new Map();

export async function GET() {
  try {
    const domainList = Array.from(domains.values());
    return NextResponse.json(domainList);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch domains' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createDomainSchema.parse(body);

    // Check if domain already exists
    if (domains.has(validatedData.name)) {
      return NextResponse.json(
        { error: 'Domain already exists' },
        { status: 409 }
      );
    }

    // Create domain object
    const newDomain = {
      ...validatedData,
      status: 'pending',
      dnsRecords: {
        mx: `10 mail.${validatedData.name}`,
        spf: validatedData.spfRecord || 'v=spf1 mx ~all',
        dkim: validatedData.dkimEnabled ? {
          selector: 'default',
          record: 'Generated DKIM record would go here'
        } : null
      },
      created_at: new Date().toISOString()
    };

    // Store in mock storage
    domains.set(validatedData.name, newDomain);

    return NextResponse.json(newDomain, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid domain configuration', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create domain' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const domainName = url.searchParams.get('name');

    if (!domainName) {
      return NextResponse.json(
        { error: 'Domain name is required' },
        { status: 400 }
      );
    }

    if (!domains.has(domainName)) {
      return NextResponse.json(
        { error: 'Domain not found' },
        { status: 404 }
      );
    }

    domains.delete(domainName);
    return NextResponse.json({ message: 'Domain deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete domain' },
      { status: 500 }
    );
  }
}