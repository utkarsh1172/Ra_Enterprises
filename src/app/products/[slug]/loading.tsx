// ── Loading skeleton for a single product page ──────────────────

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="bg-white border-b border-amber-100 py-3 px-4">
        <div className="max-w-7xl mx-auto skeleton h-4 w-48 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="skeleton aspect-square rounded-2xl border border-amber-100" />

          <div className="space-y-6">
            <div className="skeleton h-4 w-32 rounded-full" />
            <div className="skeleton h-10 w-2/3 rounded-full" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-full rounded-full" />
              <div className="skeleton h-4 w-5/6 rounded-full" />
            </div>
            <div className="flex gap-2">
              <div className="skeleton h-6 w-20 rounded-full" />
              <div className="skeleton h-6 w-24 rounded-full" />
            </div>
            <div className="skeleton h-32 w-full rounded-2xl" />
          </div>
        </div>
        <span className="sr-only" role="status">Loading product…</span>
      </div>
    </div>
  );
}
