'use client';

// ── Purchase panel for the product detail page ───────────────
// Owns the selected pack size, so the price, the size pills and
// the cart all stay in sync. Rendered on the server too, which
// keeps the price and description in the initial HTML for SEO.

import { useState } from 'react';
import { Product, ProductSize } from '@/types';
import { useCart } from '@/context/CartContext';
import { CheckIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from '@/components/layout/Icons';
import WeightSelector from '@/components/products/WeightSelector';

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const { addToCart } = useCart();

  const fallbackSize = product.availableSizes[0] ?? { label: product.unit, price: product.price };
  const sizes = product.availableSizes.length > 0 ? product.availableSizes : [fallbackSize];
  const [selectedSize, setSelectedSize] = useState<ProductSize>(fallbackSize);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!product.inStock) return;
    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-price-lg tabular-nums text-[#8d301d]">₹{selectedSize.price}</span>
        <span className="text-sm font-semibold text-[#7b6658]">/ {selectedSize.label}</span>
      </div>

      <p className="mt-5 max-w-xl text-body leading-7 text-[#6f5a4c]">{product.description}</p>

      <div className="mt-7">
        <WeightSelector sizes={sizes} selected={selectedSize} onSelect={setSelectedSize} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex h-13 items-center gap-1 rounded-lg border border-[#e6c990] bg-[#fffaf0] px-2">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="grid h-9 w-9 place-items-center rounded-md text-[#542315] transition-colors hover:bg-[#fff1d0]"
            aria-label="Decrease quantity"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="w-9 text-center text-base font-extrabold tabular-nums text-[#3d2015]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="grid h-9 w-9 place-items-center rounded-md text-[#542315] transition-colors hover:bg-[#fff1d0]"
            aria-label="Increase quantity"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`flex h-13 flex-1 min-w-52 items-center justify-center gap-2.5 rounded-lg px-6 text-button-lg transition-all ${
            product.inStock
              ? 'bg-[#542315] text-[#fff8ea] shadow-lg shadow-amber-950/15 hover:-translate-y-0.5 hover:bg-[#7b2a18]'
              : 'cursor-not-allowed bg-[#efe3d2] text-[#a98d76]'
          }`}
        >
          {added ? (
            <>
              <CheckIcon className="h-5 w-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCartIcon className="h-5 w-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>

      {!product.inStock && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          This product is currently out of stock.
        </p>
      )}
    </div>
  );
}
