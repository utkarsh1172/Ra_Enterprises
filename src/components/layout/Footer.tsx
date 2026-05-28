// ── Site Footer ───────────────────────────────────────────────

import Link from 'next/link';
import { WhatsAppIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from './Icons';
import { BUSINESS_INFO, WHATSAPP_NUMBER, buildWhatsAppChatUrl } from '@/utils/whatsapp';

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
          <h3 className="text-white text-xl font-bold font-serif mb-3">RA Enterprises</h3>
          <p className="text-sm leading-relaxed text-stone-400">
            Crafting India's finest spice blends with generations of expertise.
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
          <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
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
          <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
              <span>{BUSINESS_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-amber-500 shrink-0" />
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="hover:text-amber-400 transition-colors"
              >
                +{WHATSAPP_NUMBER}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <EnvelopeIcon className="w-4 h-4 text-amber-500 shrink-0" />
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
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
                className="hover:text-amber-400 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">
            Our Range
          </h4>
          <ul className="space-y-2 text-sm">
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
          <span>© {year} RA Enterprises. All rights reserved.</span>
          <span>Made with ❤️ for authentic Indian flavours.</span>
        </div>
      </div>
    </footer>
  );
}
