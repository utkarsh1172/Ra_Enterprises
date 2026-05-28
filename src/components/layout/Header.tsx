'use client';

// ── Site Header with navigation and cart icon ────────────────

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {/* Replace /images/logo.png with the actual logo once provided */}
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/images/logo.png"
                alt="RA Enterprises Logo"
                fill
                className="object-contain"
                onError={(e) => {
                  // Fallback: hide broken image
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Fallback text logo when image not available */}
              <span className="absolute inset-0 flex items-center justify-center bg-amber-600 rounded-full text-white font-bold text-lg">
                RA
              </span>
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="block text-lg font-bold text-amber-800 font-serif">
                RA Enterprises
              </span>
              <span className="block text-xs text-amber-600 tracking-wide">
                Finest Spices &amp; Blends
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-colors duration-200"
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
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-amber-50 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.totalItems > 9 ? '9+' : cart.totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-amber-50 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-amber-100 bg-white shadow-lg">
          <nav className="flex flex-col py-3 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
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
