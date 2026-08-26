// ── Journey / How We Make Masalas Page ───────────────────────

import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Process – How We Make Masalas',
  description:
    'Discover the traditional process behind RA A1 Masale spices — from farm sourcing and sun-drying to stone grinding and quality packaging.',
};

const steps = [
  {
    step: '01',
    icon: '🌱',
    title: 'Careful Farm Sourcing',
    shortDesc: 'From field to factory — only the best.',
    desc:
      'We work directly with spice farmers across Maharashtra, Kerala, Rajasthan, and Gujarat. ' +
      'Our sourcing team visits farms to verify soil quality, farming practices, and harvest conditions. ' +
      'We prioritise farmers who avoid chemical pesticides and follow natural growing methods.',
    videoPlaceholder: true,
    imagePlaceholder: true,
  },
  {
    step: '02',
    icon: '☀️',
    title: 'Natural Sun Drying',
    shortDesc: 'Patience brings out the best flavour.',
    desc:
      'After harvest, whole spices are spread on clean mats under direct sunlight. ' +
      'This natural dehydration process reduces moisture content, prevents mold, and concentrates the essential oils. ' +
      'We never use artificial dryers — only the sun.',
    videoPlaceholder: false,
    imagePlaceholder: true,
  },
  {
    step: '03',
    icon: '🔥',
    title: 'Individual Dry Roasting',
    shortDesc: 'Every spice gets its own time on the flame.',
    desc:
      'Each spice in a blend is dry-roasted separately on a slow, controlled flame. ' +
      'This awakens the aromatic compounds and develops the complex, layered flavour profile ' +
      'that makes our masalas distinctive. Over-roasting or under-roasting both compromise quality — ' +
      'so this step demands skill and attention.',
    videoPlaceholder: true,
    imagePlaceholder: true,
  },
  {
    step: '04',
    icon: '🪨',
    title: 'Traditional Stone Grinding',
    shortDesc: 'Old method, unbeatable result.',
    desc:
      'We use traditional stone chakki grinding for our blends. Unlike high-speed industrial mills ' +
      'that generate heat and destroy volatile oils, stone grinding works at low temperatures. ' +
      'The result is a coarser, more aromatic, nutrient-rich powder that you simply cannot replicate with machines.',
    videoPlaceholder: true,
    imagePlaceholder: true,
  },
  {
    step: '05',
    icon: '⚖️',
    title: 'Precise Blending',
    shortDesc: 'The secret is in the ratio.',
    desc:
      'Each of our masala blends follows a proprietary recipe refined over years of tasting and feedback. ' +
      'Ground spices are measured precisely by weight and hand-mixed in the correct proportion. ' +
      'This ensures batch-to-batch consistency while preserving the artisanal character.',
    videoPlaceholder: false,
    imagePlaceholder: true,
  },
  {
    step: '06',
    icon: '📦',
    title: 'Quality Check & Packaging',
    shortDesc: 'Sealed fresh, delivered fresh.',
    desc:
      'Before packaging, every batch undergoes smell, colour, and texture checks by our quality team. ' +
      'Products are packed in airtight, food-grade pouches that preserve freshness and aroma. ' +
      'We print the manufacturing date and best-before date on every pack — no compromises.',
    videoPlaceholder: false,
    imagePlaceholder: true,
  },
];

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-amber-950 to-red-950 py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            From Farm to Kitchen
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">
            How We Make Our Masalas
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-amber-500" />
            <span className="text-amber-500 text-lg">✦</span>
            <div className="h-px w-12 bg-amber-500" />
          </div>
          <p className="mt-5 text-amber-200 max-w-2xl mx-auto text-base leading-relaxed">
            Every packet of RA A1 Masale masala is the result of a meticulous, six-step
            journey guided by tradition, care, and an obsession with quality.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {steps.map((step, idx) => (
          <div
            key={step.step}
            className={`grid md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
          >
            {/* Text */}
            <div className={idx % 2 === 1 ? 'md:col-start-2' : ''}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{step.icon}</span>
                <span className="text-5xl font-bold text-amber-200 select-none">{step.step}</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-stone-800 mb-1">{step.title}</h2>
              <p className="text-amber-600 font-medium text-sm mb-4">{step.shortDesc}</p>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </div>

            {/* Media */}
            <div className={`space-y-4 ${idx % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
              {/* Image placeholder */}
              {step.imagePlaceholder && (
                <div className="rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex flex-col items-center justify-center shadow-md">
                  {/*
                    Replace with real image:
                    <Image src={`/images/journey/step-${step.step}.jpg`} alt={step.title} fill className="object-cover" />
                  */}
                  <span className="text-5xl mb-2">{step.icon}</span>
                  <span className="text-xs text-amber-500">[ Add photo: {step.title} ]</span>
                </div>
              )}

              {/* Video placeholder */}
              {step.videoPlaceholder && (
                <div className="rounded-2xl overflow-hidden aspect-video bg-stone-800 flex flex-col items-center justify-center shadow-md border border-stone-700">
                  {/*
                    Replace with real video:
                    <video src={`/videos/step-${step.step}.mp4`} controls className="w-full h-full object-cover" />
                    OR embed a YouTube/Vimeo link here.
                  */}
                  <span className="text-4xl mb-2">▶️</span>
                  <span className="text-xs text-stone-400">[ Add video: {step.title} ]</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quality promise */}
      <div className="bg-amber-50 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle
            label="Our Promise"
            title="Quality You Can Taste"
            subtitle="Every packet that leaves our facility is something we are proud to put our name on."
          />
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            {[
              { icon: '🌿', label: 'No Preservatives' },
              { icon: '🎨', label: 'No Artificial Colour' },
              { icon: '✅', label: 'Batch Quality Tested' },
            ].map((p) => (
              <div key={p.label} className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
                <div className="text-3xl mb-2">{p.icon}</div>
                <div className="font-semibold text-stone-800 text-sm">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-amber-600 py-14 px-4 text-center">
        <h2 className="text-2xl font-bold font-serif text-white mb-3">
          Ready to Experience the Difference?
        </h2>
        <p className="text-amber-100 mb-7 max-w-md mx-auto">
          Taste the result of our six-step process in every dish you cook.
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
