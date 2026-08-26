import Link from 'next/link';

export default function AdminUnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 px-4 text-center">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Access Denied</h1>
      <p className="text-stone-500 mb-6">You don&apos;t have permission to view this page.</p>
      <Link href="/admin/login" className="text-amber-700 font-medium hover:underline">
        Back to login
      </Link>
    </div>
  );
}
