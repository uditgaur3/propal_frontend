'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const pathname = usePathname() || '';
  // Only render on legal pages
  if (pathname !== '/privacy-policy' && pathname !== '/terms-conditions') {
    return null;
  }

  const logoHref = '/'; // Logo always returns to main page
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link href={logoHref}>
          <img src="/logo.webp" alt="proPAL AI logo" className="h-10 w-auto" />
        </Link>
      </div>
    </header>
  );
}
