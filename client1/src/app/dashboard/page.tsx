'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile page by default
    router.replace('/dashboard/profile');
  }, [router]);
  return null; // Will redirect immediately
}
