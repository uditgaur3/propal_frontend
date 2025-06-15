'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  role?: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, phoneNumber?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  updateProfile: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for session cookie on page load
    const session = Cookies.get('session');
    if (session) {
      try {
        const userData = JSON.parse(session);
        setUser(userData);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const signup = async (username: string, email: string, password: string, phoneNumber?: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, phoneNumber, role: 'user' }),
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Only store non-sensitive info in cookie
        const { password: _, ...safeUser } = data.user;
        Cookies.set('session', JSON.stringify(safeUser), { expires: 1 }); // 1 day expiry
        setUser(safeUser);
        setIsAuthenticated(true);
        return true;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    Cookies.remove('session');
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) {
      console.error('No user logged in');
      return false;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        return true;
      } else {
        const errorData = await response.json();
        console.error('Change password error:', errorData.error);
        return false;
      }
    } catch (error) {
      console.error('Change password error:', error);
      return false;
    }
  };

  const updateProfile = async (email: string): Promise<boolean> => {
    try {
      if (!user) return false;

      // Update user in localStorage (simulate API call)
      const updatedUser = { ...user, email };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // In a real app, you would make an API call here
      // const response = await fetch('/api/users/update-profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      // return response.ok;

      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated,
      isAdmin,
      changePassword,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
