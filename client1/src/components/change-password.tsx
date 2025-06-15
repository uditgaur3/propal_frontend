'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

interface ChangePasswordProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const ChangePassword = ({ onClose, isModal = false }: ChangePasswordProps) => {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isModal) {
      document.title = "Change Password - proPAL AI";
    }
  }, [isModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password');
      return;
    }

    setIsLoading(true);

    try {
      const result = await changePassword(currentPassword, newPassword);
      
      if (result) {
        setSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // Close modal after success if it's a modal
        if (isModal && onClose) {
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } else {
        setError('Failed to change password. Please check your current password.');
      }
    } catch (err) {
      setError('An error occurred while changing password');
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter current password"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <IconEyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <IconEye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter new password"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <IconEyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <IconEye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Must be at least 6 characters long
        </p>
      </div>      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm new password"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <IconEyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <IconEye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-red-100 border border-red-300">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-md bg-green-100 border border-green-300">
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      <div className={`flex ${isModal ? 'justify-end space-x-3' : 'space-x-4'}`}>
        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Changing Password...' : 'Change Password'}
        </button>
      </div>
    </form>
  );
  if (isModal) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Change Password</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Update your account password
          </p>
        </div>
        {formContent}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
            <p className="mt-2 text-sm text-gray-600">
              Update your account password to keep your account secure.
            </p>
          </div>
          {formContent}
        </div>
      </div>
    </div>
  );
};
