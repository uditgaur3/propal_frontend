'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { useEffect, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.title = "Dashboard - proPAL AI";
  }, []);

  const sidebarItems = [
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      name: 'Agent',
      href: '/dashboard/agent',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sticky Header */}        <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center group">
                  <div className="relative w-12 h-12 transition-transform duration-200 group-hover:scale-110">
                    <Image
                      src="/logo.webp"
                      alt="proPAL AI"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">Online</span>
                </div>
                <ThemeToggleButton />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm text-gray-700 dark:text-gray-300">
                    Welcome, {user?.username}!
                  </span>
                </div>
                {isAdmin() && (
                  <button
                    onClick={() => router.push('/admin')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={logout}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Dashboard Menu
                  </h2>
                </div>
                <nav className="space-y-1 p-2">
                  {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 ${
                          isActive
                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 shadow-md'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white hover:shadow-sm'
                        }`}
                      >
                        <span className={`mr-3 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`}>
                          {item.icon}
                        </span>
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
