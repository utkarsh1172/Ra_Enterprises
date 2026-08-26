'use client';

import { signOut } from 'next-auth/react';

export default function AdminTopbar({ email }: { email: string }) {
  return (
    <header className="h-14 border-b border-stone-200 bg-white flex items-center justify-between px-6">
      <span className="text-sm text-stone-500">Signed in as {email}</span>
      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="text-sm font-medium text-stone-600 hover:text-amber-800 transition-colors cursor-pointer"
      >
        Log out
      </button>
    </header>
  );
}
