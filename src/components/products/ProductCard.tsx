'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingCartIcon } from '@/components/layout/Icons';

interface ProductCardProps { product: Product; }

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const defaultSize = product.availableSizes[0];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart(product, 1, defaultSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link href={`/products/${product.slug}`} className="group flex flex-col overflow-hidden rounded-[1.4rem] border border-[#542315]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/10">
      <div className="relative aspect-[1.08/1] overflow-hidden bg-[#4a1f13] text-[#fff4d7]">
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#291008]/90 via-[#291008]/20 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <span className="text-caption uppercase text-[#ffd187]">RA Select</span>
          <h3 className="mt-1 font-serif text-product-name-lg leading-[0.95]">{product.name}</h3>
          <span className="mt-3 inline-block rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-caption uppercase backdrop-blur-sm">{product.unit}</span>
        </div>
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.bestSeller && <span className="rounded-full bg-[#fff4d7] px-2.5 py-1 text-caption uppercase text-[#8d301d]">Best seller</span>}
          {!product.inStock && <span className="rounded-full bg-gray-500 px-2 py-0.5 text-xs font-bold text-white">Out of stock</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {product.nameHindi && <span className="mb-0.5 text-small font-semibold text-[#b15a2a]">{product.nameHindi}</span>}
        <h3 className="font-serif text-product-name text-[#3d2015] transition-colors group-hover:text-[#9d371f]">{product.name}</h3>
        <p className="mt-1 flex-1 text-small leading-relaxed text-stone-500 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {product.availableSizes.map((size) => <span key={size.label} className="rounded-full border border-amber-200 px-2 py-0.5 text-xs font-medium text-[#9d371f]">{size.label}</span>)}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-price tabular-nums text-[#8d301d]">₹{defaultSize.price}</span>
            <span className="ml-1 text-xs text-gray-500">/ {defaultSize.label}</span>
          </div>
          <motion.button
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            whileTap={product.inStock ? { scale: 0.92 } : undefined}
            className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors overflow-hidden ${added ? 'border border-green-300 bg-green-100 text-green-700' : product.inStock ? 'bg-[#542315] text-white hover:bg-[#8d301d]' : 'cursor-not-allowed bg-gray-100 text-gray-400'}`}
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
                  ✓ Added!
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
                  <ShoppingCartIcon className="h-4 w-4" /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </Link>
  );
}
