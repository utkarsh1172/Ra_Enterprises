import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 px-4 text-center">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Page Not Found</h1>
      <p className="text-stone-500 mb-6">This admin page doesn&apos;t exist.</p>
      <Link href="/admin/dashboard" className="text-amber-700 font-medium hover:underline">
        Back to dashboard
      </Link>
    </div>
  );
}
