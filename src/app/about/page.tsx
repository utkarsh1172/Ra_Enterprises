// ── About Us Page ─────────────────────────────────────────────

import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { CheckIcon } from '@/components/layout/Icons';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about RA A1 Masale — our story, our commitment to purity, and our traditional approach to crafting authentic Indian spices and masalas.',
};

const values = [
  {
    icon: '🌿',
    title: 'Purity First',
    desc: 'No artificial colours, flavours, or preservatives — ever. What you taste is exactly what nature intended.',
  },
  {
    icon: '🏔️',
    title: 'Farm-Sourced',
    desc: 'We partner directly with certified spice farmers from Maharashtra, Kerala, Rajasthan, and Gujarat.',
  },
  {
    icon: '🪨',
    title: 'Traditional Process',
    desc: 'Stone-grinding preserves volatile oils that machine-grinding destroys — giving our masalas their signature depth.',
  },
  {
    icon: '❤️',
    title: 'Made with Love',
    desc: 'Every batch is checked by our founder personally before it leaves the facility.',
  },
];

const milestones = [
  { year: '2010', event: 'RA A1 Masale founded with a vision to preserve traditional spice blending.' },
  { year: '2013', event: 'Launched our signature Ghati Masala, inspired by Sahyadri heritage.' },
  { year: '2016', event: 'Introduced the beloved Malvani Masala for coastal cuisine lovers.' },
  { year: '2019', event: 'Expanded product range to include premium pure spice powders.' },
  { year: '2022', event: 'Reached 10,000+ happy households across Maharashtra.' },
  { year: '2024', event: 'Went online to serve spice lovers across India.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-amber-950 to-red-950 py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">
            About RA A1 Masale
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-amber-500" />
            <span className="text-amber-500 text-lg">✦</span>
            <div className="h-px w-12 bg-amber-500" />
          </div>
          <p className="mt-5 text-amber-200 max-w-2xl mx-auto text-base leading-relaxed">
            Born from a passion for authentic flavour and a deep respect for India&apos;s
            spice heritage — we are RA A1 Masale.
          </p>
        </div>
      </div>

      {/* Story section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Placeholder image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center shadow-xl">
            {/*
              Replace with founder / factory image:
              <Image src="/images/about-founder.jpg" alt="Our Founder" fill className="object-cover" />
            */}
            <div className="text-center p-8">
              <span className="text-7xl block mb-4">👨‍🍳</span>
              <span className="text-amber-700 font-medium text-sm">
                [ Add founder / factory photo here ]
              </span>
            </div>
          </div>

          <div>
            <SectionTitle
              label="Who We Are"
              title="Passion Meets Tradition"
              centered={false}
            />
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                RA A1 Masale was founded with a single, unwavering mission: to bring the
                authentic taste of Indian spices to every kitchen — without compromise.
              </p>
              <p>
                Growing up in the spice-rich belt of Maharashtra, our founder witnessed how
                commercially produced masalas were stripping away the very essence that made
                Indian food world-famous. Too much filler, too little soul.
              </p>
              <p>
                We set out to change that. Starting small, blending by hand in our own kitchen,
                we crafted our first batch of <strong className="text-amber-700">Ghati Masala</strong> —
                a recipe handed down through generations, rooted in the Sahyadri mountains.
              </p>
              <p>
                Word spread. Families came back for more. Today, RA A1 Masale serves
                thousands of households, still following the same principles: pure ingredients,
                traditional grinding, and honest blending.
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {[
                '10+ years of expertise in spice blending',
                'Direct farm partnerships for traceability',
                'Small-batch production for freshness',
                'Zero artificial additives — always',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckIcon className="w-3 h-3 text-amber-700" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="What We Stand For"
            title="Our Core Values"
            subtitle="These principles guide every decision we make — from sourcing to packaging."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-stone-800 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Our Journey"
          title="Milestones That Shaped Us"
        />
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber-200" />

          <div className="space-y-8 pl-16">
            {milestones.map((m) => (
              <div key={m.year} className="relative">
                {/* Dot */}
                <div className="absolute -left-10 mt-1 w-4 h-4 rounded-full bg-amber-600 border-2 border-white shadow" />
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  {m.year}
                </span>
                <p className="text-gray-700 mt-1 text-sm leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-amber-600 py-14 px-4 text-center">
        <h2 className="text-2xl font-bold font-serif text-white mb-3">
          Taste the Difference Today
        </h2>
        <p className="text-amber-100 mb-7 max-w-md mx-auto">
          Join thousands of happy households who have made RA A1 Masale a part of their daily cooking.
        </p>
        <Link
          href="/products"
          className="inline-block bg-white text-amber-700 font-bold px-8 py-3 rounded-full hover:bg-amber-50 transition-colors shadow-md"
        >
          Shop Our Spices
        </Link>
      </div>
    </div>
  );
}
