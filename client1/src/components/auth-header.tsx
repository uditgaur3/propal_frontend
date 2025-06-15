'use client';

import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import { ThemeToggleButton } from './theme-toggle-button';

interface AuthHeaderProps {
  title?: string;
}

export function AuthHeader({ title = "proPAL AI" }: AuthHeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Back to home button */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <IconArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.webp"
                alt="proPAL AI logo"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Theme toggle */}
          <div className="flex items-center">
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}
