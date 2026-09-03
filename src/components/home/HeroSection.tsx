'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRightIcon, CheckIcon, FlameIcon, LeafIcon, ShieldCheckIcon, SparklesIcon } from '@/components/layout/Icons';
import HeroBackgroundVideo from '@/components/home/hero/HeroBackgroundVideo';
import SpiceBlendStage from '@/components/home/hero/SpiceBlendStage';
import { trackEvent } from '@/lib/analytics';

const features = [
  { icon: LeafIcon, title: '100% Natural', text: 'No preservatives' },
  { icon: SparklesIcon, title: 'Handmade', text: 'Small batches' },
  { icon: FlameIcon, title: 'Rich Aroma', text: 'Traditional taste' },
  { icon: ShieldCheckIcon, title: 'Premium Quality', text: 'Trusted always' },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#241009] text-white">
      <HeroBackgroundVideo />
      <div className="hero-video-overlay pointer-events-none absolute inset-0 z-[1]" />
      <div className="grain pointer-events-none absolute inset-0 z-[2] opacity-10 mix-blend-soft-light" />

      {/* Spices enter from every edge, swirl, blend into one masala, then settle */}
      <SpiceBlendStage />

      <motion.div
        variants={reduceMotion ? undefined : container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-7xl flex-col justify-center px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={rise}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#f5a831]/45 bg-[#1d0b05]/35 px-4 py-2 text-[0.7rem] font-extrabold uppercase text-[#ffd187] shadow-lg shadow-black/20 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5a831]" />
            Authentic <span className="text-[#f5a831]">•</span> Homemade <span className="text-[#f5a831]">•</span> Traditional
          </motion.div>

          <motion.h1
            variants={rise}
            className="hero-title-shadow mx-auto max-w-3xl font-hero text-hero"
          >
            Pure Spices.
            <span className="block text-[#ffc45b]">Pure Goodness.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mx-auto mt-7 max-w-xl text-body-lg text-[#fff5df]"
          >
            Authentic masalas, handcrafted with traditional recipes and whole spices.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="#bestseller"
              onClick={() => trackEvent('explore_products_click', { location: 'hero' })}
              className="group inline-flex items-center gap-2 rounded-full bg-[#f5a831] px-6 py-3.5 text-sm font-bold text-[#38170e] shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#ffc45b]"
            >
              Explore Our Masalas
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              onClick={() => trackEvent('view_products_click', { location: 'hero' })}
              className="inline-flex items-center gap-2 rounded-full border border-[#fff5df]/40 bg-[#1d0b05]/35 px-6 py-3.5 text-sm font-bold text-[#fff8ea] backdrop-blur-sm transition-all hover:bg-[#1d0b05]/55"
            >
              View Products
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={rise}
          className="mt-14 grid gap-3 rounded-lg border border-[#fff5df]/15 bg-[#1d0b05]/45 p-3 shadow-2xl shadow-black/20 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((item) => (
            <div key={item.title} className="flex min-h-20 items-center gap-3 rounded-lg border border-[#fff5df]/10 bg-white/[0.06] px-4 py-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f5a831]/35 bg-[#f5a831]/15 text-[#ffc45b]">
                <item.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-extrabold text-[#fff8ea]">{item.title}</span>
                <span className="mt-0.5 block text-xs font-semibold text-[#ffdfaa]/80">{item.text}</span>
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={rise} className="mx-auto mt-7 flex items-center gap-2 text-xs font-semibold text-[#fff5df]/70">
          <CheckIcon className="h-4 w-4 text-[#ffc45b]" />
          Small batches. Freshly ground. Packed with care.
        </motion.div>
      </motion.div>
    </section>
  );
}
