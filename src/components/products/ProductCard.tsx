'use client';

// ── Reusable Product Card ─────────────────────────────────────

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingCartIcon } from '@/components/layout/Icons';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const defaultSize = product.availableSizes[0];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault(); // prevent link navigation
    addToCart(product, 1, defaultSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-amber-50"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Show placeholder on broken image
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Fallback placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-5xl">🌶️</span>
          <span className="text-xs text-amber-400 mt-2 opacity-60">[ product image ]</span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && (
            <span className="bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Best Seller
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Hindi name */}
        {product.nameHindi && (
          <span className="text-xs text-amber-600 font-medium mb-0.5">
            {product.nameHindi}
          </span>
        )}

        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1 leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Sizes chips */}
        <div className="mt-3 flex flex-wrap gap-1">
          {product.availableSizes.map((s) => (
            <span
              key={s.label}
              className="text-xs border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full"
            >
              {s.label}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-amber-700">₹{defaultSize.price}</span>
            <span className="text-xs text-gray-500 ml-1">/ {defaultSize.label}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            className={`
              flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-full transition-all duration-200
              ${added
                ? 'bg-green-100 text-green-700 border border-green-300'
                : product.inStock
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {added ? (
              '✓ Added!'
            ) : (
              <>
                <ShoppingCartIcon className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
