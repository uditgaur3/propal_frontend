'use client';

import { useAuth } from '@/contexts/auth-context';
import { useNotification } from '@/contexts/notification-context';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { user, changePassword, updateProfile } = useAuth();
  const { showNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Form states
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    document.title = "Profile - proPAL AI";
  }, []);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);
  const showMessage = (text: string, type: 'success' | 'error') => {
    showNotification(text, type);
  };
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const success = await updateProfile(email);
      if (success) {
        showMessage('Profile updated successfully!', 'success');
        setIsEditing(false);
      } else {
        showMessage('Failed to update profile. Please try again.', 'error');
      }
    } catch (error) {
      showMessage('Failed to update profile. Please try again.', 'error');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      showMessage('New passwords do not match.', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showMessage('New password must be at least 6 characters long.', 'error');
      return;
    }

    try {
      const success = await changePassword(currentPassword, newPassword);
      if (success) {
        showMessage('Password changed successfully!', 'success');
        setShowChangePassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showMessage('Failed to change password. Please check your current password.', 'error');
      }
    } catch (error) {
      showMessage('An error occurred while changing password.', 'error');
    }
  };
  return (
    <div className="space-y-6">
      {/* User Profile Information */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Profile Information
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {user && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {user.username}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Username cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {user.email}
                      </span>
                    </div>
                  )}
                </div>                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {user.phoneNumber || 'Not provided'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Phone number cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Role
                  </label>
                  <div className="mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {user.role || 'user'}
                    </span>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleUpdateProfile}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEmail(user.email || '');
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Security
            </h3>
            {!showChangePassword && (
              <button
                onClick={() => setShowChangePassword(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Change Password
              </button>
            )}
          </div>

          {showChangePassword && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                  minLength={6}
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassword(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {!showChangePassword && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Keep your account secure by using a strong password.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
