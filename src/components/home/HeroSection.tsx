'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRightIcon } from '@/components/layout/Icons';
import SpiceBlendStage from '@/components/home/hero/SpiceBlendStage';
import { trackEvent } from '@/lib/analytics';

const proof = [
  { value: '100%', text: 'natural ingredients' },
  { value: '10+', text: 'years of craft' },
  { value: '4.9/5', text: 'customer love' },
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
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#241009] text-white">
      <motion.div
        initial={reduceMotion ? undefined : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/images/whole-spice-selection.jpeg"
          alt="RA A1 Enterprises whole spices arranged for traditional masala preparation"
          fill
          priority
          className="object-cover object-[62%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#241009] via-[#241009]/90 to-[#241009]/20" />
      <div className="grain absolute inset-0 opacity-20 mix-blend-soft-light" />

      {/* Spices enter from every edge, swirl, blend into one masala, then settle */}
      <SpiceBlendStage />

      <motion.div
        variants={reduceMotion ? undefined : container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-24"
      >
        <div>
          <motion.div
            variants={rise}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-3.5 py-2 text-eyebrow uppercase text-[#ffd187] backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#f4a635] animate-pulse" />
            Small-batch masalas, freshly made
          </motion.div>

          <motion.h1
            variants={rise}
            className="max-w-3xl font-hero text-hero"
          >
            RA A1 Enterprises
            <span className="block text-[#ffc45b]">Authentic Taste. Pure Spices.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-7 max-w-xl text-body-lg text-stone-200"
          >
            Bringing the richness, aroma and authentic taste of Indian spices to every kitchen — bold, fragrant masalas made with whole spices, time-honoured recipes and zero shortcuts.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/products"
              onClick={() => trackEvent('explore_products_click', { location: 'hero' })}
              className="group inline-flex items-center gap-2 rounded-full bg-[#f5a831] px-6 py-3.5 text-sm font-bold text-[#38170e] shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#ffc45b]"
            >
              Explore Our Masalas
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              onClick={() => trackEvent('contact_click', { location: 'hero' })}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Contact Us
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-12 grid max-w-xl grid-cols-3 border-t border-white/15 pt-5"
          >
            {proof.map((item, i) => (
              <motion.div
                key={item.text}
                initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: 'easeOut' }}
                className="border-r border-white/15 px-3 first:pl-0 last:border-0"
              >
                <div className="font-serif text-h4 text-[#ffd187]">{item.value}</div>
                <div className="mt-0.5 text-caption uppercase text-stone-300">{item.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={rise}
          className="relative hidden min-h-[430px] lg:block"
        >
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, x: 24, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-10 right-0 max-w-[220px] rounded-2xl border border-white/15 bg-[#fff8ea]/95 p-5 text-[#542315] shadow-2xl shadow-black/30 backdrop-blur"
          >
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#b15a2a]">The RA promise</span>
            <p className="mt-2 font-serif text-xl font-bold leading-tight">Flavour that starts with the whole spice.</p>
            <div className="mt-4 flex items-center gap-1 text-sm text-[#9b4b23]">
              <span>Explore the range</span><ArrowRightIcon className="h-4 w-4" />
            </div>
          </motion.div>
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="animate-float absolute right-10 top-16 rounded-2xl border border-white/20 bg-[#2e1209]/70 px-4 py-3 text-sm font-semibold text-[#ffd187] shadow-xl backdrop-blur"
          >
            Freshly ground for fuller aroma
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
