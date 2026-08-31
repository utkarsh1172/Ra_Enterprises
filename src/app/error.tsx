'use client';

// ── Site-wide error boundary (any uncaught page error) ───────────

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled page error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf9f6] px-4 text-center">
      <span className="text-6xl mb-5">🌶️</span>
      <h1 className="text-3xl font-bold font-serif text-stone-800 mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-500 mb-8 max-w-md">
        We hit an unexpected error. Please try again — if it keeps happening, reach us on WhatsApp.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-full transition-colors cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
