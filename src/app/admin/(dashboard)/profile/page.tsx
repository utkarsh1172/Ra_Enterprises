import Link from 'next/link';
import { auth } from '@/lib/auth';

export default async function AdminProfilePage() {
  const session = await auth();

  return (
    <div className="max-w-md space-y-5">
      <h1 className="text-2xl font-bold text-stone-900">Profile</h1>
      <div className="rounded-xl border border-stone-200 bg-white p-5 text-sm space-y-2">
        <p><span className="text-stone-400">Name:</span> {session?.user?.name ?? '—'}</p>
        <p><span className="text-stone-400">Email:</span> {session?.user?.email}</p>
      </div>
      <Link
        href="/admin/profile/change-password"
        className="inline-block rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
      >
        Change Password
      </Link>
    </div>
  );
}
