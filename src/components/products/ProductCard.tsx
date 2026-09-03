'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { CheckIcon, ShoppingCartIcon } from '@/components/layout/Icons';
import { trackEvent } from '@/lib/analytics';

interface ProductCardProps { product: Product; }

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const defaultSize = product.availableSizes[0] ?? { label: product.unit, price: product.price };

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart(product, 1, defaultSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      onClick={() => trackEvent('product_click', { product_id: product.id, product_name: product.name })}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#7b2a18]/12 bg-[#fffaf0] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b15a2a]/35 hover:shadow-xl hover:shadow-amber-950/10"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-[#4a1f13]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b0f08]/15 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.bestSeller && <span className="rounded-full bg-[#fff1d0] px-2.5 py-1 text-[0.66rem] font-black uppercase text-[#8d301d] shadow-sm">Bestseller</span>}
          {product.isNew && <span className="rounded-full bg-[#542315] px-2.5 py-1 text-[0.66rem] font-black uppercase text-[#fff8ea] shadow-sm">New</span>}
          {!product.inStock && <span className="rounded-full bg-stone-600 px-2.5 py-1 text-[0.66rem] font-black uppercase text-white">Out of stock</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-1 flex-col">
          <h3 className="font-serif text-product-name text-[#3d2015] transition-colors group-hover:text-[#9d371f]">{product.name}</h3>
          {product.nameHindi && <span className="mt-1 text-small font-bold text-[#b15a2a]">{product.nameHindi}</span>}
        </div>
        <div className="mt-3">
          <div>
            <span className="text-price tabular-nums text-[#8d301d]">₹{defaultSize.price}</span>
            <span className="ml-1 text-xs font-semibold text-[#7b6658]">/ {defaultSize.label}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.availableSizes.map((size) => (
              <span key={size.label} className="rounded-full border border-[#e6c990] bg-white px-2.5 py-1 text-[0.68rem] font-bold text-[#8d301d]">
                {size.label}
              </span>
            ))}
          </div>
          <motion.button
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            whileTap={product.inStock ? { scale: 0.92 } : undefined}
            aria-label={`Add ${product.name} to cart`}
            className={`mt-4 flex min-h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
              added
                ? 'border border-green-300 bg-green-50 text-green-700'
                : product.inStock
                  ? 'bg-[#542315] text-[#fff8ea] hover:bg-[#7b2a18]'
                  : 'cursor-not-allowed bg-stone-100 text-stone-400'
            }`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 8, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <CheckIcon className="h-4 w-4" /> Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 8, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingCartIcon className="h-4 w-4" /> Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </Link>
  );
}
