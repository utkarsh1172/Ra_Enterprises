import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, WhatsAppIcon } from '@/components/layout/Icons';
import { buildWhatsAppChatUrl } from '@/utils/whatsapp';

const proof = [
  { value: '100%', text: 'natural ingredients' },
  { value: '10+', text: 'years of craft' },
  { value: '4.9/5', text: 'customer love' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#241009] text-white">
      <Image
        src="/images/whole-spice-selection.jpeg"
        alt="RA Enterprises whole spices arranged for traditional masala preparation"
        fill
        priority
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#241009] via-[#241009]/90 to-[#241009]/20" />
      <div className="grain absolute inset-0 opacity-20 mix-blend-soft-light" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-24">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffd187] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f4a635]" />
            Small-batch masalas, freshly made
          </div>

          <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Let every meal
            <span className="block text-[#ffc45b] italic">taste like home.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-stone-200 sm:text-lg">
            Bold, fragrant masalas made with whole spices, time-honoured recipes and zero shortcuts. Bring the real flavour of India to your everyday kitchen.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-[#f5a831] px-6 py-3.5 text-sm font-bold text-[#38170e] shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#ffc45b]"
            >
              Shop the collection
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href={buildWhatsAppChatUrl('Hello! I would like to know more about your spices.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Order on WhatsApp
            </a>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 border-t border-white/15 pt-5">
            {proof.map((item) => (
              <div key={item.text} className="border-r border-white/15 px-3 first:pl-0 last:border-0">
                <div className="font-serif text-xl font-bold text-[#ffd187]">{item.value}</div>
                <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-stone-300">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[430px] lg:block">
          <div className="absolute bottom-10 right-0 max-w-[220px] rounded-2xl border border-white/15 bg-[#fff8ea]/95 p-5 text-[#542315] shadow-2xl shadow-black/30 backdrop-blur">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#b15a2a]">The RA promise</span>
            <p className="mt-2 font-serif text-xl font-bold leading-tight">Flavour that starts with the whole spice.</p>
            <div className="mt-4 flex items-center gap-1 text-sm text-[#9b4b23]">
              <span>Explore the range</span><ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="animate-float absolute right-10 top-16 rounded-2xl border border-white/20 bg-[#2e1209]/70 px-4 py-3 text-sm font-semibold text-[#ffd187] shadow-xl backdrop-blur">
            Freshly ground for fuller aroma
          </div>
        </div>
      </div>
    </section>
  );
}
