'use client';

// ── Cart & Checkout Page ─────────────────────────────────────
// Cart state, quantity maths and the WhatsApp checkout handoff
// are unchanged — only the presentation follows the new system.

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { buildWhatsAppOrderUrl } from '@/utils/whatsapp';
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  WhatsAppIcon,
  ShoppingCartIcon,
  ArrowRightIcon,
} from '@/components/layout/Icons';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fff8ea] px-4 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-[#ead8b6] bg-[#fffaf0] text-[#b15a2a] shadow-sm">
          <ShoppingCartIcon className="h-9 w-9" />
        </span>
        <h1 className="mt-6 font-serif text-h2 text-[#542315]">Your cart is empty</h1>
        <p className="mt-3 max-w-sm text-body text-[#6f5a4c]">
          Looks like you haven&apos;t added any masalas yet.
        </p>
        <Link
          href="/products"
          className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-[#542315] px-7 py-3.5 text-button text-[#fff8ea] shadow-lg shadow-amber-950/15 transition-all hover:-translate-y-0.5 hover:bg-[#7b2a18]"
        >
          Browse Products
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  const whatsappUrl = buildWhatsAppOrderUrl(cart.items);

  return (
    <div className="min-h-screen bg-[#fff8ea]">
      {/* Page header */}
      <div className="border-b border-[#ead8b6] bg-[#fffaf0] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <span className="text-eyebrow uppercase text-[#b15a2a]">Your Order</span>
          <h1 className="mt-2 flex flex-wrap items-baseline gap-3 font-serif text-h2 text-[#542315]">
            Your Cart
            <span className="text-sm font-bold text-[#7b6658]">
              {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''}
            </span>
          </h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.55fr_1fr] lg:px-8">

        {/* Cart items */}
        <div className="space-y-4">
          {cart.items.map((item) => {
            const key = `${item.product.id}-${item.selectedSize.label}`;
            return (
              <div
                key={key}
                className="flex gap-4 rounded-lg border border-[#ead8b6] bg-[#fffaf0] p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Product image */}
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[#e6c990] bg-[#f5ead7] sm:h-28 sm:w-28"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>

                {/* Info */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-serif text-product-name text-[#3d2015] transition-colors hover:text-[#9d371f]"
                      >
                        {item.product.name}
                      </Link>
                      {item.product.nameHindi && (
                        <p className="mt-0.5 text-small font-bold text-[#b15a2a]">
                          {item.product.nameHindi}
                        </p>
                      )}
                      <p className="mt-1.5 text-sm font-bold text-[#8d301d]">
                        ₹{item.selectedSize.price}
                        <span className="ml-1 text-xs font-semibold text-[#7b6658]">
                          / {item.selectedSize.label}
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize.label)}
                      className="shrink-0 rounded-lg p-2 text-[#a98d76] transition-colors hover:bg-[#fbe3dc] hover:text-[#a3301b]"
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Quantity controls */}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                    <div className="flex h-10 items-center gap-1 rounded-lg border border-[#e6c990] bg-white px-1.5">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize.label, item.quantity - 1)
                        }
                        className="grid h-7 w-7 place-items-center rounded-md text-[#542315] transition-colors hover:bg-[#fff1d0]"
                        aria-label={`Decrease ${item.product.name} quantity`}
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-extrabold tabular-nums text-[#3d2015]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize.label, item.quantity + 1)
                        }
                        className="grid h-7 w-7 place-items-center rounded-md text-[#542315] transition-colors hover:bg-[#fff1d0]"
                        aria-label={`Increase ${item.product.name} quantity`}
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <span className="text-price tabular-nums text-[#542315]">
                      ₹{item.selectedSize.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Clear cart */}
          <div className="text-right">
            <button
              onClick={clearCart}
              className="text-sm font-bold text-[#a98d76] transition-colors hover:text-[#a3301b]"
            >
              Clear all items
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div className="rounded-lg border border-[#ead8b6] bg-[#fffaf0] p-6 shadow-lg shadow-amber-950/5 lg:sticky lg:top-24">
          <h2 className="font-serif text-h3 text-[#542315]">Order Summary</h2>

          {/* Line items */}
          <div className="mt-5 space-y-2.5 border-b border-[#ead8b6] pb-5 text-sm text-[#6f5a4c]">
            {cart.items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize.label}`}
                className="flex justify-between gap-3"
              >
                <span className="min-w-0 truncate">
                  {item.product.name} ({item.selectedSize.label}) × {item.quantity}
                </span>
                <span className="shrink-0 font-bold tabular-nums text-[#3d2015]">
                  ₹{item.selectedSize.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-label text-[#4b3329]">Total</span>
            <span className="text-price-lg tabular-nums text-[#8d301d]">₹{cart.totalPrice}</span>
          </div>

          {/* WhatsApp checkout CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex min-h-13 w-full items-center justify-center gap-2.5 rounded-lg bg-[#542315] px-6 py-3.5 text-button-lg text-[#fff8ea] shadow-lg shadow-amber-950/15 transition-all hover:-translate-y-0.5 hover:bg-[#7b2a18]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Checkout via WhatsApp
          </a>

          <p className="mt-3 text-center text-xs font-semibold text-[#8a7261]">
            Clicking above opens WhatsApp with your order pre-filled.
          </p>

          <Link
            href="/products"
            className="mt-5 block text-center text-sm font-bold text-[#8d301d] transition-colors hover:text-[#542315]"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
