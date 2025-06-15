'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useNotification } from '@/contexts/notification-context';
import { useRouter } from 'next/navigation';

export const AdminLoginDemo = () => {
  const { login, isAuthenticated, isAdmin, user } = useAuth();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "Admin Demo1 - proPAL AI";
  }, []);

  const handleAdminLogin = async () => {
    setLoading(true);
    
    try {
      const success = await login('admin@example.com', 'admin123');
      if (success) {
        showNotification('Admin login successful! Redirecting...', 'success');
        setTimeout(() => {
          router.push('/admin');
        }, 1500);
      } else {
        showNotification('Login failed. Please check credentials.', 'error');
      }
    } catch (error) {
      showNotification('An error occurred during login.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUserLogin = async () => {
    setLoading(true);
    
    try {
      const success = await login('user@example.com', 'user123');
      if (success) {
        showNotification('User login successful! Redirecting...', 'success');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        showNotification('Login failed. Please check credentials.', 'error');
      }
    } catch (error) {
      showNotification('An error occurred during login.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Welcome back, {user?.username}!
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              You are logged in as: <span className="font-semibold">{user?.role || 'user'}</span>
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Admin Access:</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                isAdmin() 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {isAdmin() ? 'Granted' : 'Denied'}
              </span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Go to Dashboard
              </button>
                {isAdmin() && (
                <button
                  onClick={() => {
                    console.log('Admin panel button clicked');
                    console.log('User:', user);
                    console.log('Is Admin:', isAdmin());
                    router.push('/admin');
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  Go to Admin Panel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Admin User Demo
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Test the admin user functionality
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Sample Admin User</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p><strong>Email:</strong> admin@example.com</p>
                <p><strong>Password:</strong> admin123</p>
                <p><strong>Role:</strong> admin</p>
              </div>
              <button
                onClick={handleAdminLogin}
                disabled={loading}
                className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Logging in...' : 'Login as Admin'}
              </button>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Sample Regular User</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p><strong>Email:</strong> user@example.com</p>
                <p><strong>Password:</strong> user123</p>
                <p><strong>Role:</strong> user</p>
              </div>
              <button
                onClick={handleUserLogin}
                disabled={loading}
                className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Logging in...' : 'Login as User'}
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">What you can test:</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Admin user can access the admin panel at <code>/admin</code></li>
              <li>• Regular users are denied access to admin features</li>
              <li>• Both users can access the regular dashboard</li>
              <li>• Role-based access control is enforced</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
