'use client';

// ── Client-side Add to Cart section for product detail page ──
// Separated into its own client component so the product page
// can remain a Server Component for SEO.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductSize } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingCartIcon, MinusIcon, PlusIcon } from '@/components/layout/Icons';
import Button from '@/components/ui/Button';

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.availableSizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!product.inStock) return;
    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    addToCart(product, quantity, selectedSize);
    router.push('/cart');
  }

  return (
    <div className="space-y-5">
      {/* Size selector */}
      <div>
        <label className="block text-label text-gray-700 mb-2">
          Select Size
        </label>
        <div className="flex flex-wrap gap-2">
          {product.availableSizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all cursor-pointer ${
                selectedSize.label === size.label
                  ? 'border-amber-600 bg-amber-50 text-amber-700'
                  : 'border-gray-200 text-gray-600 hover:border-amber-300'
              }`}
            >
              {size.label}
              <span className="ml-1.5 text-xs text-gray-500">₹{size.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price display */}
      <div className="flex items-baseline gap-2">
        <span className="text-price-lg tabular-nums text-amber-700">
          ₹{selectedSize.price * quantity}
        </span>
        {quantity > 1 && (
          <span className="text-small text-gray-500">
            (₹{selectedSize.price} × {quantity})
          </span>
        )}
      </div>

      {/* Quantity selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-amber-400 transition-colors cursor-pointer"
          >
            <MinusIcon className="w-4 h-4 text-gray-600" />
          </button>
          <span className="w-10 text-center text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-amber-400 transition-colors cursor-pointer"
          >
            <PlusIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          variant={added ? 'outline' : 'primary'}
          size="lg"
          fullWidth
        >
          {added ? (
            '✓ Added to Cart!'
          ) : (
            <>
              <ShoppingCartIcon className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </Button>

        <Button
          onClick={handleBuyNow}
          disabled={!product.inStock}
          variant="secondary"
          size="lg"
          fullWidth
        >
          Buy Now
        </Button>
      </div>

      {!product.inStock && (
        <p className="text-sm text-red-600 font-medium">
          ⚠️ This product is currently out of stock.
        </p>
      )}
    </div>
  );
}
