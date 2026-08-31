// ── Site-wide 404 page ────────────────────────────────────────

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf9f6] px-4 text-center">
      <span className="text-7xl mb-5">🔍</span>
      <h1 className="text-3xl md:text-4xl font-bold font-serif text-stone-800 mb-3">
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-8 max-w-md">
        We couldn&apos;t find what you were looking for. It may have moved, or the link might be
        incorrect.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
