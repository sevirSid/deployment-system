import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for privilege management
const privilegeSchema = z.object({
  username: z.string(),
  host: z.string().default('localhost'),
  database: z.string(),
  privileges: z.array(z.enum([
    'SELECT',
    'INSERT',
    'UPDATE',
    'DELETE',
    'CREATE',
    'DROP',
    'ALTER',
    'INDEX'
  ]))
});

// Mock privileges storage (replace with real database connection)
let privileges = new Map();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');
    const database = url.searchParams.get('database');

    if (!username && !database) {
      // Return all privileges
      return NextResponse.json(Array.from(privileges.values()));
    }

    // Filter privileges based on username and/or database
    const filteredPrivileges = Array.from(privileges.values()).filter(priv => {
      if (username && database) {
        return priv.username === username && priv.database === database;
      }
      if (username) {
        return priv.username === username;
      }
      return priv.database === database;
    });

    return NextResponse.json(filteredPrivileges);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch privileges' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = privilegeSchema.parse(body);

    const privilegeKey = `${validatedData.username}@${validatedData.host}/${validatedData.database}`;

    // Update or create privileges
    privileges.set(privilegeKey, {
      ...validatedData,
      updated_at: new Date().toISOString()
    });

    return NextResponse.json({
      message: 'Privileges updated successfully',
      privileges: validatedData.privileges
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid privilege configuration', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update privileges' },
      { status: 500 }
    );
  }
}