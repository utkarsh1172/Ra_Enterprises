// ── Journey preview section on homepage ──────────────────────

import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import { ArrowRightIcon, FlameIcon, LeafIcon, ScaleIcon, SparklesIcon } from '@/components/layout/Icons';
import Reveal from '@/components/motion/Reveal';
import StaggerGrid from '@/components/motion/StaggerGrid';

const steps = [
  {
    step: '01',
    icon: LeafIcon,
    title: 'Farm Sourcing',
    desc: 'We partner with dedicated spice farmers across Maharashtra, Rajasthan, and Kerala to source only the finest raw spices.',
  },
  {
    step: '02',
    icon: SparklesIcon,
    title: 'Sun Drying',
    desc: 'Spices are naturally sun-dried to reduce moisture while preserving colour, aroma, and essential oils.',
  },
  {
    step: '03',
    icon: FlameIcon,
    title: 'Roasting',
    desc: 'Each spice is dry-roasted individually on a slow flame to unlock its deepest flavour before blending.',
  },
  {
    step: '04',
    icon: ScaleIcon,
    title: 'Stone Grinding',
    desc: 'Traditional stone-grinding preserves nutrients and gives our masalas a coarser, more aromatic texture.',
  },
];

export default function JourneyPreview() {
  return (
    <section className="relative overflow-hidden bg-[#3a170d] py-20 sm:py-24">
      {/* Background decorative dots */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            label="From Farm to Kitchen"
            title="How We Make Our Masalas"
            subtitle="Every step is guided by tradition, care, and an unwavering commitment to quality."
            light
          />
        </Reveal>

        <Reveal delay={0.1} className="relative mb-10 overflow-hidden rounded-lg border border-[#fff5df]/12 bg-[#2b0f08] shadow-2xl shadow-black/20">
          <Image
            src="/images/traditional-spice-prep.jpeg"
            alt="Traditional masala ingredients being prepared by hand"
            fill
            className="object-cover object-center opacity-80"
          />
          <div className="h-56 sm:h-72" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3a170d]/85 via-[#3a170d]/30 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-md items-center p-7 sm:p-10">
            <p className="font-serif text-2xl font-bold leading-tight text-[#fff8ea] sm:text-3xl">Real ingredients, prepared with the care your kitchen deserves.</p>
          </div>
        </Reveal>

        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="group relative h-full rounded-lg border border-[#fff5df]/12 bg-white/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f5a831]/35 hover:bg-white/[0.11]"
            >
              {/* Step number */}
              <span className="absolute right-4 top-4 select-none font-serif text-4xl font-bold text-[#fff5df]/10 transition-colors duration-300 group-hover:text-[#f5a831]/25">
                {s.step}
              </span>

              <span className="grid h-12 w-12 place-items-center rounded-full border border-[#f5a831]/35 bg-[#f5a831]/15 text-[#ffc45b] transition-colors duration-300 group-hover:bg-[#f5a831] group-hover:text-[#38170e]">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-h4 text-[#fff8ea]">{s.title}</h3>
              <p className="mt-2 text-small leading-relaxed text-[#fce6c0]/70">{s.desc}</p>
            </div>
          ))}
        </StaggerGrid>

        <Reveal delay={0.15} className="mt-10 text-center">
          <Link
            href="/journey"
            className="group inline-flex items-center gap-2 rounded-full bg-[#f5a831] px-7 py-3.5 text-sm font-bold text-[#38170e] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#ffc45b]"
          >
            See Full Process
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
