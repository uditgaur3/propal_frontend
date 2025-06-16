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
    console.error("Error reading users file, returning empty array:", error);
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
    const safeUsers = users.map(({ password: _password, ...user }) => user);
    return NextResponse.json(safeUsers);
  } catch (error: any) {
    console.error('Error reading users:', error);
    return NextResponse.json({ message: 'Failed to read users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, phoneNumber, role } = await request.json();

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const users = await readUsers();

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // In a real app, hash the password here before saving
    const newUser: User = {
      id: Date.now().toString(), // Simple ID generation
      username,
      email,
      password, // Store password as is (for demo only, hash in production)
      phoneNumber: phoneNumber || undefined,
      role: role || 'user'
    };

    users.push(newUser);
    await writeUsers(users);

    // Return user without password
    const { password: _removedPassword, ...safeNewUser } = newUser;
    return NextResponse.json(safeNewUser, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: error.message || 'Failed to create user' }, { status: 500 });
  }
}
