import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { CheckIcon, SparklesIcon } from '@/components/layout/Icons';

const highlights = [
  'Whole spices selected for aroma, colour and character',
  'Slow-roasted and ground in fresh, small batches',
  'No artificial colours, flavours or preservatives',
  'Family recipes inspired by regional Indian kitchens',
];

export default function IntroSection() {
  return (
    <section className="bg-[#fffdf8] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/4.6] max-w-[500px] overflow-hidden rounded-[2rem] bg-[#4a1f13] shadow-2xl shadow-amber-950/15">
            <Image src="/images/whole-spices-bowls.jpeg" alt="Whole spices prepared in traditional bowls" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d1008]/75 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffd187]">The RA standard</p>
              <p className="mt-2 max-w-xs font-serif text-2xl font-bold leading-tight">Real flavour begins before the grind.</p>
            </div>
          </div>
          <div className="absolute -right-4 top-10 rounded-2xl bg-[#f6ad39] p-4 text-[#542315] shadow-xl sm:-right-8">
            <div className="font-serif text-3xl font-bold">10+</div>
            <div className="mt-0.5 text-[10px] font-black uppercase tracking-[0.1em]">years of flavour</div>
          </div>
          <div className="absolute -bottom-6 -right-2 max-w-[215px] rounded-2xl border border-[#542315]/10 bg-white p-4 shadow-xl sm:-right-10">
            <p className="font-serif text-lg font-bold text-[#542315]">No fillers. No fuss.</p>
            <p className="mt-1 text-xs leading-relaxed text-stone-500">Just wonderfully aromatic spices that let your cooking shine.</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionTitle label="Our story" title="Made with a pinch of tradition." centered={false} />
          <p className="max-w-xl text-base leading-7 text-stone-600">
            At RA Enterprises, we believe the smallest ingredients make the biggest difference. We source thoughtfully, roast with care and blend with the patience great food deserves.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-stone-600">
            Every spoonful is designed to bring a little more depth, warmth and unmistakable Indian character to the meals you already love.
          </p>
          <ul className="mt-8 space-y-3.5">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 text-sm font-medium text-[#4b3329]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#f9e3bd]">
                  <CheckIcon className="h-3 w-3 text-[#9d371f]" />
                </span>
                {highlight}
              </li>
            ))}
          </ul>
          <Link href="/about" className="group mt-9 inline-flex items-center gap-2 text-sm font-bold text-[#8d301d] transition-colors hover:text-[#542315]">
            <SparklesIcon className="h-5 w-5" />
            Discover our craft
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
