'use client';

// ── Site Header with navigation and cart icon ────────────────

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from './Icons';

const navLinks = [
  { href: '/',          label: 'Home'     },
  { href: '/products',  label: 'Products' },
  { href: '/journey',   label: 'Our Process' },
  { href: '/about',     label: 'About Us' },
  { href: '/contact',   label: 'Contact'  },
];

export default function Header() {
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-950/10 bg-[#fffdf8]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[14px] bg-[#6f2417] text-sm font-black tracking-tight text-[#ffc45b] shadow-lg shadow-amber-950/20 transition-transform group-hover:-rotate-3">
              <span className="relative z-10">RA</span>
              <span className="absolute -bottom-3 -right-2 text-3xl text-orange-400/35">✦</span>
            </div>
            <div className="leading-tight">
              <span className="block font-serif text-lg font-bold text-[#542315]">
                RA A1 Masale
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#b15a2a]">
                Crafted Masalas
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-stone-600 transition-colors hover:bg-orange-50 hover:text-[#8d301d]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Cart icon */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#542315] text-white shadow-lg shadow-amber-950/15 transition-transform hover:-translate-y-0.5"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.totalItems > 9 ? '9+' : cart.totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-amber-50 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <XMarkIcon className="w-6 h-6 text-[#542315]" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-[#542315]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-amber-100 bg-[#fffdf8] shadow-lg">
          <nav className="flex flex-col py-3 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-semibold text-stone-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
