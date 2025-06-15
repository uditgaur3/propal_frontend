import { ChangePassword } from '@/components/change-password';
import { ProtectedRoute } from '@/components/protected-route';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Change Password - proPAL AI",
  description: "Update your account password securely",
};

export default function ChangePasswordPage() {
  return (
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  );
}
