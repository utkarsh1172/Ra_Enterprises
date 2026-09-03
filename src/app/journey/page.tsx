// ── Journey / How We Make Masalas Page ───────────────────────

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRightIcon,
  CheckIcon,
  FlameIcon,
  LeafIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@/components/layout/Icons';

export const metadata: Metadata = {
  title: 'Our Process – How We Make Masalas',
  description:
    'Discover the traditional process behind RA A1 Enterprises spices — from farm sourcing and sun-drying to stone grinding and quality packaging.',
  alternates: { canonical: '/journey' },
};

const steps = [
  { step: '1', icon: LeafIcon, title: 'Sourcing', text: 'Handpicked from trusted farms' },
  { step: '2', icon: CheckIcon, title: 'Cleaning', text: 'Carefully cleaned and sorted' },
  { step: '3', icon: SparklesIcon, title: 'Sun Drying', text: 'Naturally dried to retain oils' },
  { step: '4', icon: FlameIcon, title: 'Roasting', text: 'Slow roasted for rich aroma' },
  { step: '5', icon: ScaleIcon, title: 'Grinding', text: 'Ground in small batches' },
  { step: '6', icon: ShieldCheckIcon, title: 'Packing', text: 'Hygienically packed with care' },
];

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-[#fff8ea]">
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="text-eyebrow uppercase text-[#b15a2a]">Our Process</span>
        <h1 className="mx-auto mt-3 max-w-3xl font-serif text-h1 text-[#542315]">
          From Farm to Flavour
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5f4a3e]">
          A careful journey that ensures purity, freshness and authentic taste in every pack.
        </p>

        <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <div className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-[#e6c990] lg:block" />
          {steps.map((item) => (
            <div key={item.step} className="relative rounded-lg border border-[#ead8b6] bg-[#fffaf0] p-5 shadow-sm lg:border-transparent lg:bg-transparent lg:shadow-none">
              <span className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#f1d59c] bg-[#ffdda0] text-[#7b2a18] shadow-md shadow-amber-950/10">
                <item.icon className="h-6 w-6" />
              </span>
              <span className="mt-3 block text-sm font-black text-[#542315]">{item.step}</span>
              <h2 className="mt-1 text-sm font-extrabold text-[#3d2015]">{item.title}</h2>
              <p className="mx-auto mt-2 max-w-[150px] text-xs leading-5 text-[#7b6658]">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-lg border border-[#542315]/10 bg-[#3a170d] text-left shadow-2xl shadow-amber-950/10">
          <Image
            src="/images/traditional-spice-prep.jpeg"
            alt="Traditional spices prepared for roasting and grinding"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3a170d]/95 via-[#3a170d]/70 to-[#3a170d]/20" />
          <div className="relative z-10 grid min-h-[250px] gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-lg font-serif text-3xl font-bold leading-tight text-[#fff8ea]">
                Same Traditional Process. Same Authentic Taste.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#fce6c0]">
                Every batch follows the same patient rhythm: whole spices, careful roasting,
                fresh grinding and clean packing.
              </p>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#f5a831] px-6 py-3 text-sm font-bold text-[#321208] shadow-md shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#ffc45b]"
            >
              Explore Our Masalas
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
