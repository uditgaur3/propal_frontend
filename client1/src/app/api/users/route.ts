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

// Helper function to write users to file
async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

export async function GET() {
  try {
    const users = await readUsers();
    // Don't return passwords in the response
    const safeUsers = users.map(({ password, ...user }) => user);
    return NextResponse.json(safeUsers);
  } catch (error) {
    console.error('Error reading users:', error);
    return NextResponse.json({ error: 'Failed to read users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, phoneNumber, role } = await request.json();

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const users = await readUsers();

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password, // In production, this should be hashed
      phoneNumber: phoneNumber || undefined,
      role: role || 'user'
    };

    users.push(newUser);
    await writeUsers(users);

    // Return user without password
    const { password: _, ...safeUser } = newUser;
    return NextResponse.json({ user: safeUser }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
