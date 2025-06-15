'use client';

import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { useEffect } from 'react';

export default function TestPage() {
  useEffect(() => {
    document.title = "Theme Test - proPAL AI";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Theme Toggle Test</h1>
      
      <div className="flex gap-4 items-center">
        <span className="text-gray-700 dark:text-gray-300">Test Theme Toggle:</span>
        <ThemeToggleButton className="border border-gray-400" />
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-900 dark:text-white">
          This should change colors when theme toggles
        </p>
      </div>
      
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Test Button 1
        </button>
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600">
          Test Button 2
        </button>
      </div>
    </div>
  );
}
