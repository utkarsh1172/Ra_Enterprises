'use client';

import { useState } from 'react';
import type { Product } from '@/types';
import { CheckIcon } from '@/components/layout/Icons';

interface ProductDetailTabsProps {
  product: Product;
}

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'nutrition', label: 'Nutritional Info' },
  { id: 'reviews', label: 'Reviews' },
] as const;

type TabId = (typeof tabs)[number]['id'];

const perfectFor = [
  'Traditional Maharashtrian dishes',
  'Vegetarian and non-vegetarian recipes',
  'Everyday home cooking',
  'Authentic regional taste',
];

export default function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('description');

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      {/* min-w-0: grid items default to min-width:auto, which would let the
          tab strip stretch the column instead of scrolling inside it. */}
      <div className="min-w-0">
        <div role="tablist" className="flex gap-6 overflow-x-auto border-b border-[#ead8b6]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 border-b-2 pb-3 text-sm font-bold transition-colors ${
                activeTab === tab.id
                  ? 'border-[#8d301d] text-[#542315]'
                  : 'border-transparent text-[#8a7261] hover:text-[#542315]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-56 pt-7">
          {activeTab === 'description' && (
            <>
              <h2 className="font-serif text-h3 text-[#542315]">Product Description</h2>
              <p className="mt-4 text-sm leading-7 text-[#5f4a3e]">{product.longDescription}</p>
            </>
          )}

          {activeTab === 'ingredients' && (
            <>
              <h2 className="font-serif text-h3 text-[#542315]">Ingredients</h2>
              {product.ingredients?.length ? (
                <p className="mt-4 text-sm leading-7 text-[#5f4a3e]">{product.ingredients.join(', ')}</p>
              ) : (
                <p className="mt-4 text-sm leading-7 text-[#5f4a3e]">
                  Made with carefully selected whole spices, roasted and ground in small batches.
                </p>
              )}
            </>
          )}

          {activeTab === 'nutrition' && (
            <>
              <h2 className="font-serif text-h3 text-[#542315]">Nutritional Info</h2>
              <p className="mt-4 text-sm leading-7 text-[#5f4a3e]">
                This is a spice blend used in small quantities for flavour. Detailed nutrition data
                will be shown here when added to the product record.
              </p>
            </>
          )}

          {activeTab === 'reviews' && (
            <>
              <h2 className="font-serif text-h3 text-[#542315]">Reviews</h2>
              <p className="mt-4 text-sm leading-7 text-[#5f4a3e]">
                Customer review display is ready for this product. Add reviews from the admin side
                or connect a review source when you are ready.
              </p>
            </>
          )}
        </div>
      </div>

      <aside className="rounded-lg bg-[#fbecd4] p-6 text-[#542315]">
        <h3 className="font-serif text-h4 text-[#8d301d]">Perfect For</h3>
        <ul className="mt-4 space-y-3">
          {perfectFor.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm font-semibold text-[#5f4a3e]">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#f5a831] text-[#321208]">
                <CheckIcon className="h-3 w-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
