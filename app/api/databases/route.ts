import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for database creation
const createDatabaseSchema = z.object({
  name: z.string().min(1).max(64).regex(/^[a-zA-Z0-9_]+$/),
  charset: z.enum(['utf8mb4', 'utf8', 'latin1']),
});

// Mock database storage (replace with real database connection)
let databases = new Map();

export async function GET() {
  try {
    // Convert Map to array of database objects
    const dbList = Array.from(databases.values());
    return NextResponse.json(dbList);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch databases' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createDatabaseSchema.parse(body);

    // Check if database already exists
    if (databases.has(validatedData.name)) {
      return NextResponse.json(
        { error: 'Database already exists' },
        { status: 409 }
      );
    }

    // Create database object
    const newDatabase = {
      name: validatedData.name,
      charset: validatedData.charset,
      created_at: new Date().toISOString(),
      size: '0 MB',
      tables: 0
    };

    // Store in mock database
    databases.set(validatedData.name, newDatabase);

    return NextResponse.json(newDatabase, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid database configuration', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create database' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const dbName = url.searchParams.get('name');

    if (!dbName) {
      return NextResponse.json(
        { error: 'Database name is required' },
        { status: 400 }
      );
    }

    if (!databases.has(dbName)) {
      return NextResponse.json(
        { error: 'Database not found' },
        { status: 404 }
      );
    }

    databases.delete(dbName);
    return NextResponse.json({ message: 'Database deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete database' },
      { status: 500 }
    );
  }
}