import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for user creation
const createUserSchema = z.object({
  username: z.string().min(1).max(32).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(8),
  host: z.string().default('localhost'),
  databases: z.array(z.string()).min(1)
});

// Mock user storage (replace with real database connection)
let users = new Map();

export async function GET() {
  try {
    const userList = Array.from(users.values()).map(user => ({
      ...user,
      password: undefined // Remove password from response
    }));
    return NextResponse.json(userList);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createUserSchema.parse(body);

    // Check if user already exists
    const userKey = `${validatedData.username}@${validatedData.host}`;
    if (users.has(userKey)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Create user object
    const newUser = {
      username: validatedData.username,
      host: validatedData.host,
      databases: validatedData.databases,
      created_at: new Date().toISOString()
    };

    // Store in mock database
    users.set(userKey, {
      ...newUser,
      password: validatedData.password // Store password securely in real implementation
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid user configuration', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');
    const host = url.searchParams.get('host') || 'localhost';

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const userKey = `${username}@${host}`;
    if (!users.has(userKey)) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    users.delete(userKey);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}