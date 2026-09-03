// ── About Us Page ─────────────────────────────────────────────

import type { Metadata } from 'next';
import Image from 'next/image';
import { HomeIcon, LeafIcon, ShieldCheckIcon, SparklesIcon } from '@/components/layout/Icons';
import Reveal from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about RA A1 Enterprises — our story, our commitment to purity, and our traditional approach to crafting authentic Indian spices and masalas.',
  alternates: { canonical: '/about' },
};

const values = [
  { icon: SparklesIcon, title: 'Traditional recipes' },
  { icon: LeafIcon, title: 'Quality ingredients' },
  { icon: ShieldCheckIcon, title: 'Customer trust' },
  { icon: HomeIcon, title: 'Growing community' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fff8ea]">
      <section className="relative overflow-hidden bg-[#3a170d] px-4 py-20 text-center text-[#fff8ea] sm:px-6 lg:px-8">
        <Image
          src="/images/dried-red-chillies.jpeg"
          alt="Baskets of sun-dried red chillies"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        {/* Darkest through the middle so the headline stays legible while the
            spice photography still reads at both edges. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3a170d]/72 via-[#3a170d]/94 to-[#3a170d]/72" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="text-eyebrow uppercase text-[#ffc45b]">Our Story</span>
          <h1 className="mt-4 font-serif text-h1">
            Rooted in Tradition.
            <span className="block">Made for Today.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#fce6c0]">
            At RA A1 Enterprises, we believe in the power of pure spices to bring people
            together through authentic taste.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
        <Reveal x={-18} y={0} className="relative">
          <div className="relative min-h-[320px] overflow-hidden rounded-lg shadow-xl shadow-amber-950/10 sm:min-h-[400px]">
            <Image
              src="/images/licensed-image (3).jpeg"
              alt="Bowls of ground spices, whole spices, cinnamon and star anise on dark wood"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          {/* Overlaps the image edge, as in the design reference. */}
          <div className="absolute right-4 top-1/2 w-40 -translate-y-1/2 rounded-lg bg-white p-6 text-center shadow-2xl shadow-amber-950/25 sm:w-48 lg:-right-8">
            <span className="block font-serif text-5xl font-bold leading-none text-[#542315]">10+</span>
            <span className="mt-2.5 block font-serif text-xl font-bold leading-tight text-[#542315]">
              Years of Flavour
            </span>
          </div>
        </Reveal>

        <Reveal x={18} y={0} delay={0.1}>
          <h2 className="font-serif text-h2 text-[#542315]">Our Journey</h2>
          <div className="mt-5 space-y-4 text-body leading-7 text-[#6f5a4c]">
            <p>
              RA A1 Enterprises is built on a deep love for Indian spices and traditional
              recipes. What started as a small initiative has grown into a trusted brand,
              bringing authentic masalas to kitchens across India.
            </p>
            <p>
              We source carefully, roast with patience and grind in small batches so every
              pack carries the aroma, colour and warmth that home cooks expect from real masala.
            </p>
          </div>

          <div className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f5a831] text-[#38170e]">
                  <value.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-[#3d2015]">{value.title}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
