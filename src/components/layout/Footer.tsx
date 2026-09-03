'use client';

// ── Site Footer ───────────────────────────────────────────────

import Link from 'next/link';
import { WhatsAppIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, ArrowRightIcon } from './Icons';
import { LogoMark } from './Logo';
import { BUSINESS_INFO, WHATSAPP_NUMBER, buildWhatsAppChatUrl } from '@/utils/whatsapp';
import { trackEvent } from '@/lib/analytics';

const quickLinks = [
  { href: '/',          label: 'Home'        },
  { href: '/products',  label: 'Products'    },
  { href: '/journey',   label: 'Our Process' },
  { href: '/about',     label: 'About Us'    },
  { href: '/contact',   label: 'Contact'     },
  { href: '/cart',      label: 'Cart'        },
];

const rangeLinks = [
  { href: '/products?category=masala-blends', label: 'Masala Blends' },
  { href: '/products?category=pure-spices',   label: 'Pure Spices'   },
  { href: '/products?category=specialty',     label: 'Specialty'     },
  { href: '/products',                        label: 'View All'      },
];

const linkClass = 'text-sm font-semibold text-[#fce6c0]/75 transition-colors hover:text-[#ffc45b]';
const headingClass = 'mb-4 text-eyebrow uppercase text-[#ffc45b]';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2b0f08] text-[#fce6c0]">
      {/* Top strip */}
      <div className="border-b border-[#fff5df]/10 bg-[#4a1b0f] py-3.5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <span className="text-sm font-bold text-[#fff8ea]">
            Pure Spices. Traditional Blends. Authentic Flavour.
          </span>
          <a
            href={buildWhatsAppChatUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'footer_strip' })}
            className="group inline-flex items-center gap-2 rounded-full bg-[#f5a831] px-4 py-2 text-sm font-bold text-[#38170e] transition-all hover:-translate-y-0.5 hover:bg-[#ffc45b]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order on WhatsApp
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">

        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <LogoMark size={40} className="shrink-0" />
            <div className="leading-tight">
              <span className="block font-serif text-h4 text-[#fff8ea]">RA A1 Enterprises</span>
              <span className="mt-1 block text-[0.66rem] font-extrabold uppercase leading-none text-[#ffc45b]">
                Masale / Spices
              </span>
            </div>
          </div>
          <p className="text-small leading-relaxed text-[#fce6c0]/70">
            Crafting India&apos;s finest spice blends with generations of expertise.
            From farm to your kitchen — pure, honest, and full of flavour.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className={headingClass}>Quick Links</h2>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className={headingClass}>Contact Us</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#f5a831]" />
              <span className="text-sm font-semibold text-[#fce6c0]/75">{BUSINESS_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="h-4 w-4 shrink-0 text-[#f5a831]" />
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                onClick={() => trackEvent('contact_click', { method: 'phone', location: 'footer' })}
                className={linkClass}
              >
                +{WHATSAPP_NUMBER}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <EnvelopeIcon className="h-4 w-4 shrink-0 text-[#f5a831]" />
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                onClick={() => trackEvent('contact_click', { method: 'email', location: 'footer' })}
                className={`${linkClass} break-all`}
              >
                {BUSINESS_INFO.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#4ade80]" />
              <a
                href={buildWhatsAppChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}
                className={linkClass}
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className={headingClass}>Our Range</h2>
          <ul className="space-y-2.5">
            {rangeLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#fff5df]/10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs font-semibold text-[#fce6c0]/50 sm:flex-row">
          <span>© {year} RA A1 Enterprises. All rights reserved.</span>
          <span>Made for authentic Indian flavours.</span>
        </div>
      </div>
    </footer>
  );
}
