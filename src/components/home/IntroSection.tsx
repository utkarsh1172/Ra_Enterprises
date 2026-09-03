import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, CheckIcon, FlameIcon, HomeIcon, SparklesIcon } from '@/components/layout/Icons';
import Reveal from '@/components/motion/Reveal';
import { getProductBySlug } from '@/data/products';

const flavourNotes = [
  'Handpicked ingredients',
  'Sun-dried for natural oils',
  'Slow roasted for rich flavour',
  'Ground in small batches',
  'No artificial colours or additives',
];

const badges = [
  { icon: SparklesIcon, title: 'Traditional Blend' },
  { icon: FlameIcon, title: 'Rich Aroma' },
  { icon: HomeIcon, title: 'Homemade' },
];

export default async function IntroSection() {
  const ghati = await getProductBySlug('ghati-masala');
  const productName = ghati?.name ?? 'Ghati Masala';
  const productImage = ghati?.image ?? '/images/hero-spice-box.png';
  const startingSize = ghati?.availableSizes[0];
  const productPrice = startingSize?.price ?? ghati?.price ?? 100;
  const productUnit = startingSize?.label ?? ghati?.unit ?? '100g';
  const productHref = `/products/${ghati?.slug ?? 'ghati-masala'}`;

  return (
    <section id="bestseller" className="bg-[#fff8ea] py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-6 lg:grid-cols-[0.95fr_0.92fr_0.85fr] lg:px-8">
        <Reveal x={-18} y={0} className="order-1">
          <span className="text-eyebrow uppercase text-[#b15a2a]">Our Bestseller</span>
          <h2 className="mt-3 font-serif text-h1 text-[#542315]">{productName}</h2>
          {ghati?.nameHindi && <p className="mt-1 text-sm font-bold text-[#b15a2a]">{ghati.nameHindi}</p>}
          <p className="mt-5 max-w-md text-body text-[#5f4a3e]">
            A perfectly balanced blend of traditional spices from the Sahyadri ghats. Earthy,
            aromatic and full of authentic Indian flavour.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {badges.map((badge) => (
              <span key={badge.title} className="inline-flex items-center gap-2 rounded-lg border border-[#7b2a18]/10 bg-white px-3 py-2 text-xs font-bold text-[#542315] shadow-sm">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#fff1d0] text-[#b15a2a]">
                  <badge.icon className="h-4 w-4" />
                </span>
                {badge.title}
              </span>
            ))}
          </div>
          <Link
            href={productHref}
            className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-[#542315] px-5 py-3 text-sm font-bold text-[#fff8ea] shadow-lg shadow-amber-950/10 transition-all hover:-translate-y-0.5 hover:bg-[#7b2a18]"
          >
            Shop Now
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="relative order-2 min-h-[430px] overflow-hidden rounded-lg border border-[#7b2a18]/10 bg-[#f5ead7] shadow-2xl shadow-amber-950/10">
          <Image
            src={productImage}
            alt={`${productName} — traditional masala blend by RA A1 Enterprises`}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 33vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a1008]/40 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/30 bg-[#fff8ea]/92 p-4 text-[#542315] shadow-xl backdrop-blur">
            <div className="flex items-end justify-between gap-3">
              <div>
                <span className="text-[0.68rem] font-black uppercase text-[#b15a2a]">Signature Blend</span>
                <p className="mt-1 font-serif text-2xl font-bold">₹{productPrice}<span className="font-sans text-sm font-semibold text-[#7b6658]"> / {productUnit}</span></p>
              </div>
              <span className="grid h-16 w-16 place-items-center rounded-full border-4 border-[#fff8ea] bg-[#78a742] text-center text-[0.62rem] font-black uppercase leading-tight text-white shadow-lg">
                100% Natural
              </span>
            </div>
          </div>
          <div className="absolute -left-8 bottom-10 h-36 w-36 rounded-full bg-[#f5a831]/35 blur-2xl" />
        </Reveal>

        <Reveal x={18} y={0} delay={0.14} className="order-3">
          <div className="rounded-lg bg-[#4a1b0f] p-7 text-[#fff8ea] shadow-2xl shadow-amber-950/15">
            <span className="text-eyebrow uppercase text-[#ffc45b]">The Taste</span>
            <h3 className="mt-2 max-w-xs font-serif text-3xl font-bold leading-tight">The Taste of Real Spices</h3>
            <ul className="mt-7 space-y-4">
              {flavourNotes.map((note) => (
                <li key={note} className="flex items-start gap-3 text-sm font-semibold text-[#fce6c0]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f5a831] text-[#321208]">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
