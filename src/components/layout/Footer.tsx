'use client';

// ── Site Footer ───────────────────────────────────────────────

import Link from 'next/link';
import { WhatsAppIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from './Icons';
import { LogoMark } from './Logo';
import { BUSINESS_INFO, WHATSAPP_NUMBER, buildWhatsAppChatUrl } from '@/utils/whatsapp';
import { trackEvent } from '@/lib/analytics';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Top strip */}
      <div className="bg-amber-700 py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <span className="text-white font-medium">
            🌶️ Pure Spices. Traditional Blends. Authentic Flavour.
          </span>
          <a
            href={buildWhatsAppChatUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'footer_strip' })}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-full font-semibold transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Order on WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <LogoMark size={36} className="shrink-0" />
            <div className="leading-tight">
              <h3 className="text-white font-serif text-h4">RA A1 Enterprises</h3>
              <span className="block text-caption uppercase text-amber-400/80">Masale / Spices</span>
            </div>
          </div>
          <p className="text-small leading-relaxed text-stone-400">
            Crafting India&apos;s finest spice blends with generations of expertise.
            From farm to your kitchen — pure, honest, and full of flavour.
          </p>
          <div className="mt-4 flex gap-3">
            {/* Social placeholders — add hrefs when ready */}
            {['f', 'ig', 'yt'].map((s) => (
              <span
                key={s}
                className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-xs uppercase font-bold text-stone-300 cursor-pointer hover:bg-amber-700 hover:text-white transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-eyebrow uppercase mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-nav">
            {[
              { href: '/',          label: 'Home'        },
              { href: '/products',  label: 'Products'    },
              { href: '/journey',   label: 'Our Process' },
              { href: '/about',     label: 'About Us'    },
              { href: '/contact',   label: 'Contact'     },
              { href: '/cart',      label: 'Cart'        },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-amber-400 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-eyebrow uppercase mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3 text-nav">
            <li className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
              <span>{BUSINESS_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-amber-500 shrink-0" />
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                onClick={() => trackEvent('contact_click', { method: 'phone', location: 'footer' })}
                className="hover:text-amber-400 transition-colors"
              >
                +{WHATSAPP_NUMBER}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <EnvelopeIcon className="w-4 h-4 text-amber-500 shrink-0" />
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                onClick={() => trackEvent('contact_click', { method: 'email', location: 'footer' })}
                className="hover:text-amber-400 transition-colors"
              >
                {BUSINESS_INFO.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <WhatsAppIcon className="w-4 h-4 text-green-400 shrink-0" />
              <a
                href={buildWhatsAppChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}
                className="hover:text-amber-400 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white text-eyebrow uppercase mb-4">
            Our Range
          </h4>
          <ul className="space-y-2 text-nav">
            {[
              { href: '/products?category=masala-blends', label: 'Masala Blends' },
              { href: '/products?category=pure-spices',   label: 'Pure Spices'   },
              { href: '/products?category=specialty',      label: 'Specialty'     },
              { href: '/products',                         label: 'View All'      },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-amber-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-700 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <span>© {year} RA A1 Enterprises. All rights reserved.</span>
          <span>Made with ❤️ for authentic Indian flavours.</span>
        </div>
      </div>
    </footer>
  );
}
