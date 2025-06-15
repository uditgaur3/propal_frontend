import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: 'admin' | 'user';
}

const USERS_FILE = path.join(process.cwd(), 'public', 'users.json');

// Helper function to read users from file
async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const users = await readUsers();

    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return user without password
    const { password: _, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate user' },
      { status: 500 }
    );
  }
}
