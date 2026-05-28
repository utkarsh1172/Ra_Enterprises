// ── Homepage Introduction / About snippet ────────────────────

import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { CheckIcon, SparklesIcon } from '@/components/layout/Icons';

const highlights = [
  'Stone-ground in small batches for maximum freshness',
  'Sourced from certified spice farms across India',
  'No artificial colours, flavours, or preservatives',
  'Traditional family recipes passed down generations',
  'Available in multiple sizes to suit your needs',
];

export default function IntroSection() {
  return (
    <section className="py-20 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">

        {/* Visual side */}
        <div className="relative order-2 lg:order-1">
          {/* Main placeholder image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center">
            {/*
              Replace with:
              <Image src="/images/about-spices.jpg" alt="Our spice grinding process" fill className="object-cover" />
            */}
            <div className="text-center p-8">
              <span className="text-7xl block mb-4">🏺</span>
              <span className="text-amber-700 font-medium text-sm">
                [ Add process photo here ]
              </span>
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-4 rounded-2xl shadow-xl">
            <div className="text-3xl font-bold">10+</div>
            <div className="text-xs text-amber-200 mt-0.5">Years of Expertise</div>
          </div>
          <div className="absolute -top-6 -left-6 bg-white text-amber-800 p-4 rounded-2xl shadow-xl border border-amber-100">
            <div className="text-3xl font-bold">100%</div>
            <div className="text-xs text-amber-600 mt-0.5">Natural Ingredients</div>
          </div>
        </div>

        {/* Text side */}
        <div className="order-1 lg:order-2">
          <SectionTitle
            label="Our Story"
            title="Spices Crafted with Passion & Purity"
            centered={false}
          />

          <p className="text-gray-600 leading-relaxed mb-6">
            At RA Enterprises, we believe that great food begins with great spices.
            Founded on the principles of purity and tradition, we source our raw spices
            directly from farmers and blend them using time-honoured methods.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our signature blends — the earthy <strong className="text-amber-700">Ghati Masala</strong> and
            the coastal <strong className="text-amber-700">Malvani Masala</strong> — are testaments to our
            commitment to authentic Indian flavour, free from shortcuts and additives.
          </p>

          {/* Highlight list */}
          <ul className="space-y-3 mb-8">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3 h-3 text-amber-700" />
                </span>
                <span className="text-gray-700 text-sm">{h}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors group"
          >
            <SparklesIcon className="w-5 h-5" />
            Read Our Full Story
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
