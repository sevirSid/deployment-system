import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for email creation
const createEmailSchema = z.object({
  username: z.string().min(1).max(64).regex(/^[a-zA-Z0-9._-]+$/),
  domain: z.string().min(1),
  password: z.string().min(8),
  quota: z.number().min(1).max(100)
});

// Mock email storage (replace with real email server connection)
let emailAccounts = new Map();

export async function GET() {
  try {
    const accounts = Array.from(emailAccounts.values()).map(account => ({
      ...account,
      password: undefined // Remove password from response
    }));
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch email accounts' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createEmailSchema.parse(body);

    // Check if email already exists
    const emailKey = `${validatedData.username}@${validatedData.domain}`;
    if (emailAccounts.has(emailKey)) {
      return NextResponse.json(
        { error: 'Email account already exists' },
        { status: 409 }
      );
    }

    // Create email account object
    const newAccount = {
      username: validatedData.username,
      domain: validatedData.domain,
      quota: {
        used: 0,
        total: validatedData.quota
      },
      status: 'active',
      created_at: new Date().toISOString()
    };

    // Store in mock storage
    emailAccounts.set(emailKey, {
      ...newAccount,
      password: validatedData.password // Store password securely in real implementation
    });

    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email configuration', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create email account' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    if (!emailAccounts.has(email)) {
      return NextResponse.json(
        { error: 'Email account not found' },
        { status: 404 }
      );
    }

    emailAccounts.delete(email);
    return NextResponse.json({ message: 'Email account deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete email account' },
      { status: 500 }
    );
  }
}