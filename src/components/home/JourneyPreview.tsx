// ── Journey preview section on homepage ──────────────────────

import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import { ArrowRightIcon } from '@/components/layout/Icons';

const steps = [
  {
    step: '01',
    icon: '🌱',
    title: 'Farm Sourcing',
    desc: 'We partner with dedicated spice farmers across Maharashtra, Rajasthan, and Kerala to source only the finest raw spices.',
  },
  {
    step: '02',
    icon: '☀️',
    title: 'Sun Drying',
    desc: 'Spices are naturally sun-dried to reduce moisture while preserving colour, aroma, and essential oils.',
  },
  {
    step: '03',
    icon: '🔥',
    title: 'Roasting',
    desc: 'Each spice is dry-roasted individually on a slow flame to unlock its deepest flavour before blending.',
  },
  {
    step: '04',
    icon: '🪨',
    title: 'Stone Grinding',
    desc: 'Traditional stone-grinding preserves nutrients and gives our masalas a coarser, more aromatic texture.',
  },
];

export default function JourneyPreview() {
  return (
    <section className="relative overflow-hidden bg-[#3a170d] py-24">
      {/* Background decorative dots */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionTitle
          label="From Farm to Kitchen"
          title="How We Make Our Masalas"
          subtitle="Every step is guided by tradition, care, and an unwavering commitment to quality."
          light
        />

        <div className="relative mb-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#2b0f08] shadow-2xl shadow-black/20">
          <Image
            src="/images/traditional-spice-prep.jpeg"
            alt="Traditional masala ingredients being prepared by hand"
            fill
            className="object-cover object-center opacity-80"
          />
          <div className="h-56 sm:h-72" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3a170d]/85 via-[#3a170d]/30 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-md items-center p-7 sm:p-10">
            <p className="font-serif text-2xl font-bold leading-tight text-[#fff3d8] sm:text-3xl">Real ingredients, prepared with the care your kitchen deserves.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative rounded-2xl border border-white/10 bg-white/[0.07] p-6 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/[0.12]"
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-4xl font-bold text-white/10 select-none">
                {s.step}
              </span>

              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="mb-2 font-serif text-xl font-bold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-amber-100/70">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/journey"
            className="inline-flex items-center gap-2 rounded-full bg-[#f5a831] px-7 py-3.5 text-sm font-bold text-[#38170e] transition-all hover:-translate-y-0.5 hover:bg-[#ffc45b]"
          >
            See Full Process
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
