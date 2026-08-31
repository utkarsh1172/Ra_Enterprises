// ── Loading skeleton for the products catalog page ──────────────
// Mirrors ProductCard's shape so the layout doesn't jump on load.

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="bg-gradient-to-br from-amber-950 to-red-950 py-16 px-4 text-center">
        <div className="mx-auto h-3 w-24 rounded-full bg-white/10 skeleton" />
        <div className="mx-auto mt-4 h-10 w-72 rounded-full bg-white/10 skeleton" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-9 w-28 rounded-full" />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-[1.4rem] border border-[#542315]/10 bg-white shadow-sm"
              aria-hidden="true"
            >
              <div className="skeleton aspect-[1.08/1]" />
              <div className="p-5 space-y-3">
                <div className="skeleton h-4 w-3/4 rounded-full" />
                <div className="skeleton h-3 w-full rounded-full" />
                <div className="skeleton h-3 w-2/3 rounded-full" />
                <div className="flex items-center justify-between pt-2">
                  <div className="skeleton h-5 w-16 rounded-full" />
                  <div className="skeleton h-8 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <span className="sr-only" role="status">Loading products…</span>
      </div>
    </div>
  );
}
