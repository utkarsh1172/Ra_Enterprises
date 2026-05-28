// ── Journey preview section on homepage ──────────────────────

import Link from 'next/link';
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
    <section className="py-20 bg-gradient-to-br from-amber-950 to-red-950 relative overflow-hidden">
      {/* Background decorative dots */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="From Farm to Kitchen"
          title="How We Make Our Masalas"
          subtitle="Every step is guided by tradition, care, and an unwavering commitment to quality."
          light
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-white hover:bg-white/15 transition-colors duration-200"
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-4xl font-bold text-white/10 select-none">
                {s.step}
              </span>

              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-amber-200/80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/journey"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-8 py-3 rounded-full transition-all duration-200"
          >
            See Full Process
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
