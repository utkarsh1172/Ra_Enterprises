'use client';

// ── Site Header with navigation and cart icon ────────────────

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from './Icons';
import { LogoMark } from './Logo';

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
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#542315]/10 bg-[#fffaf0]/95 shadow-sm shadow-amber-950/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3" onClick={() => setMobileOpen(false)}>
            <LogoMark size={44} className="shrink-0 drop-shadow-sm transition-transform group-hover:-rotate-3" />
            <div className="leading-tight">
              <span className="block font-serif text-[1.05rem] font-bold leading-none text-[#542315] sm:text-h4">
                RA A1 Enterprises
              </span>
              <span className="mt-1 block text-[0.66rem] font-extrabold uppercase leading-none text-[#b15a2a]">
                Masale / Spices
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-[0.82rem] font-bold transition-colors ${
                  pathname === link.href
                    ? 'bg-[#fff1d0] text-[#7b2a18]'
                    : 'text-[#4b3a31] hover:bg-[#fff1d0] hover:text-[#7b2a18]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full bg-[#542315] px-5 py-2.5 text-[0.78rem] font-extrabold text-[#fff8ea] shadow-md shadow-amber-950/10 transition-all hover:-translate-y-0.5 hover:bg-[#7b2a18] sm:inline-flex"
            >
              Get a Quote
            </Link>

            {/* Cart icon */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#542315] text-[#fff8ea] shadow-lg shadow-amber-950/15 transition-transform hover:-translate-y-0.5 hover:bg-[#7b2a18]"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <AnimatePresence>
                {cart.totalItems > 0 && (
                  <motion.span
                    key={cart.totalItems}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f5a831] text-xs font-black text-[#321208]"
                  >
                    {cart.totalItems > 9 ? '9+' : cart.totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-amber-50 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? (
                <XMarkIcon className="h-6 w-6 text-[#542315]" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-[#542315]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-[#542315]/10 bg-[#fffaf0] shadow-lg lg:hidden">
          <nav className="flex flex-col py-3 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-nav transition-colors ${
                  pathname === link.href
                    ? 'bg-[#fff1d0] text-[#7b2a18]'
                    : 'text-stone-700 hover:bg-[#fff1d0] hover:text-[#7b2a18]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-[#542315] px-4 py-3 text-center text-sm font-bold text-[#fff8ea]"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
