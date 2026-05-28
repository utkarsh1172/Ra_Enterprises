// ── Homepage Hero Section ─────────────────────────────────────

import Link from 'next/link';
import { ArrowRightIcon, WhatsAppIcon } from '@/components/layout/Icons';
import { buildWhatsAppChatUrl } from '@/utils/whatsapp';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-amber-950 via-red-950 to-stone-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large spice-inspired circles */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-amber-700/20 blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-red-800/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-amber-600/10 blur-3xl" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* Text content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-600/40 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            100% Pure &amp; Natural Spices
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white leading-tight">
            The Finest
            <span className="block text-amber-400">Spices &amp; Blends</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl text-stone-300 font-normal mt-2">
              from the Heart of India
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-stone-300 leading-relaxed max-w-lg">
            RA Enterprises brings you authentic, stone-ground masalas crafted with
            generations of expertise. From the Sahyadri hills to the Konkan coast —
            every blend tells a story of tradition and purity.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-amber-500/30 hover:shadow-xl"
            >
              Shop Our Spices
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <a
              href={buildWhatsAppChatUrl('Hello! I would like to know more about your spices.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-200"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { icon: '🌿', text: 'No Preservatives' },
              { icon: '🏔️', text: 'Farm Sourced'     },
              { icon: '🔥', text: 'Fresh Ground'     },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-sm text-stone-400">
                <span className="text-xl">{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative flex items-center justify-center">
          {/* Decorative ring */}
          <div className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full border-2 border-amber-600/30 animate-spin-slow" />
          <div className="absolute w-60 h-60 lg:w-80 lg:h-80 rounded-full border border-amber-600/20" />

          {/* Placeholder image area */}
          <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-amber-600/40 shadow-2xl shadow-amber-900/50">
            {/*
              Replace this div with your hero image:
              <Image src="/images/hero-spices.jpg" alt="RA Enterprises Spices" fill className="object-cover" />
            */}
            <div className="w-full h-full bg-gradient-to-br from-amber-700 to-red-900 flex flex-col items-center justify-center text-center p-6">
              <span className="text-6xl mb-3">🌶️</span>
              <span className="text-white font-serif text-2xl font-bold">RA</span>
              <span className="text-amber-300 text-sm mt-1">Enterprises</span>
              <span className="text-amber-400/70 text-xs mt-1">[ Add hero image here ]</span>
            </div>
          </div>

          {/* Floating spice chips */}
          {[
            { label: 'Ghati Masala',   emoji: '🌿', pos: 'top-4 -left-4'     },
            { label: 'Malvani Masala', emoji: '🥥', pos: 'top-4 -right-4'    },
            { label: 'Pure Turmeric',  emoji: '💛', pos: 'bottom-4 -left-4'  },
            { label: 'Red Chilli',     emoji: '🌶️', pos: 'bottom-4 -right-4' },
          ].map((chip) => (
            <div
              key={chip.label}
              className={`absolute ${chip.pos} bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-lg`}
            >
              <span>{chip.emoji}</span>
              <span>{chip.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 0C1200 40 960 60 720 40C480 20 240 0 0 20L0 60Z" fill="#faf9f6" />
        </svg>
      </div>
    </section>
  );
}
