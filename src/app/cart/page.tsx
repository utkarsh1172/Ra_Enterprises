'use client';

// ── Cart & Checkout Page ─────────────────────────────────────

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { buildWhatsAppOrderUrl } from '@/utils/whatsapp';
import { TrashIcon, PlusIcon, MinusIcon, WhatsAppIcon, ShoppingCartIcon } from '@/components/layout/Icons';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf9f6] px-4 text-center">
        <span className="text-7xl mb-5">🛒</span>
        <h2 className="text-2xl font-bold font-serif text-stone-800 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added any spices yet.
        </p>
        <Link
          href="/products"
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const whatsappUrl = buildWhatsAppOrderUrl(cart.items);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Page header */}
      <div className="bg-white border-b border-amber-100 py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold font-serif text-stone-800 flex items-center gap-3">
            <ShoppingCartIcon className="w-6 h-6 text-amber-600" />
            Your Cart
            <span className="text-base font-normal text-gray-500">
              ({cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''})
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-3 gap-8 items-start">

        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => {
            const key = `${item.product.id}-${item.selectedSize.label}`;
            return (
              <div
                key={key}
                className="bg-white rounded-2xl shadow-sm border border-amber-50 p-4 flex gap-4"
              >
                {/* Product image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-amber-50 shrink-0 border border-amber-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    onError={() => {}}
                  />
                  {/* Fallback */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-3xl">🌶️</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-stone-800 text-sm sm:text-base leading-snug">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{item.selectedSize.label}</p>
                  <p className="text-amber-700 font-bold mt-1">
                    ₹{item.selectedSize.price}
                    <span className="text-xs text-gray-500 font-normal ml-1">
                      / {item.selectedSize.label}
                    </span>
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.selectedSize.label, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-amber-400 transition-colors cursor-pointer"
                    >
                      <MinusIcon className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.selectedSize.label, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-amber-400 transition-colors cursor-pointer"
                    >
                      <PlusIcon className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="ml-2 text-sm font-bold text-stone-800">
                      = ₹{item.selectedSize.price * item.quantity}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedSize.label)}
                  className="self-start p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Remove item"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          {/* Clear cart */}
          <div className="text-right">
            <button
              onClick={clearCart}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Clear all items
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-6 sticky top-24">
          <h2 className="text-lg font-bold font-serif text-stone-800 mb-4">Order Summary</h2>

          {/* Line items */}
          <div className="space-y-2 text-sm text-gray-600 border-b border-gray-100 pb-4 mb-4">
            {cart.items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize.label}`}
                className="flex justify-between"
              >
                <span className="truncate max-w-[60%]">
                  {item.product.name} ({item.selectedSize.label}) × {item.quantity}
                </span>
                <span className="font-medium text-stone-800 shrink-0 ml-2">
                  ₹{item.selectedSize.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-stone-800">Total</span>
            <span className="text-2xl font-bold text-amber-700">₹{cart.totalPrice}</span>
          </div>

          {/* WhatsApp checkout CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center gap-3
              bg-green-500 hover:bg-green-600
              text-white font-bold text-base
              py-4 px-6 rounded-full
              shadow-md hover:shadow-lg
              transition-all duration-200
              w-full
            "
          >
            <WhatsAppIcon className="w-6 h-6" />
            Checkout via WhatsApp
          </a>

          <p className="text-xs text-gray-400 text-center mt-3">
            Clicking above will open WhatsApp with your order pre-filled.
          </p>

          <Link
            href="/products"
            className="block text-center text-sm text-amber-700 font-medium mt-4 hover:text-amber-900 transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
