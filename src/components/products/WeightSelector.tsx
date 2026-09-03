'use client';

// ── Pack-size selector ───────────────────────────────────────
// Presentational: the selected size is owned by the parent so the
// price and cart stay in sync with it.

import type { ProductSize } from '@/types';

interface WeightSelectorProps {
  sizes: ProductSize[];
  selected: ProductSize;
  onSelect: (size: ProductSize) => void;
}

export default function WeightSelector({ sizes, selected, onSelect }: WeightSelectorProps) {
  return (
    <div role="group" aria-label="Select pack size" className="flex flex-wrap gap-2.5">
      {sizes.map((size) => {
        const active = selected.label === size.label;
        return (
          <button
            key={size.label}
            type="button"
            onClick={() => onSelect(size)}
            aria-pressed={active}
            className={`min-w-20 rounded-full border px-5 py-2.5 text-sm font-bold transition-all ${
              active
                ? 'border-[#542315] bg-[#542315] text-[#fff8ea] shadow-md shadow-amber-950/10'
                : 'border-[#e6c990] bg-[#fffaf0] text-[#8d301d] hover:border-[#b15a2a] hover:bg-[#fff1d0]'
            }`}
          >
            {size.label}
          </button>
        );
      })}
    </div>
  );
}
