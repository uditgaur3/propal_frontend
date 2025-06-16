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

export async function POST(request: NextRequest) {
  try {
    const { userId, currentPassword, newPassword } = await request.json();

    // Validation
    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'User ID, current password, and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const users = await readUsers();

    // Find the user
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const user = users[userIndex];

    // Verify current password
    if (user.password !== currentPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Update password
    users[userIndex] = {
      ...user,
      password: newPassword // In production, this should be hashed
    };

    await writeUsers(users);

    return NextResponse.json({ 
      message: 'Password updated successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { message: (error as Error).message || 'Error changing password' },
      { status: 500 }
    );
  }
}
