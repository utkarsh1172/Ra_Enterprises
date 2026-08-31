'use client';

// ── Error boundary for a single product page ─────────────────────

import { useEffect } from 'react';
import Link from 'next/link';

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Product page failed to load:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf9f6] px-4 text-center">
      <span className="text-6xl mb-5">⚠️</span>
      <h2 className="text-2xl font-bold font-serif text-stone-800 mb-3">
        We couldn&apos;t load this product
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Something went wrong. Please try again, or browse the rest of our range.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-full transition-colors cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/products"
          className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
