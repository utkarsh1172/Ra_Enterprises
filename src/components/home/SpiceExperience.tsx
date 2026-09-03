'use client';

// ── "Spice Experience" — ingredients orbit a central statement.
// Desktop: subtle mouse-parallax on each spice.
// Mobile/touch: lightweight ambient float, no pointer tracking.

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/motion/Reveal';

const ingredients = [
  { src: '/images/cardamon-removebg-preview.png', label: 'Cardamom', top: '6%', left: '14%', size: 84, depth: 26 },
  { src: '/images/cuminseed-removebg-preview.png', label: 'Cumin', top: '10%', left: '78%', size: 76, depth: 34 },
  { src: '/images/blackpapercorns-removebg-preview.png', label: 'Black Pepper', top: '76%', left: '10%', size: 72, depth: 20 },
  { src: '/images/anise-stars-removebg-preview.png', label: 'Star Anise', top: '80%', left: '82%', size: 80, depth: 30 },
  { src: '/images/cinnamon-sticks-wrapped-with-rustic-thread-removebg-preview.png', label: 'Cinnamon', top: '46%', left: '4%', size: 90, depth: 40 },
  { src: '/images/fresh-raw-ginger-root-isolated-transparent-background-natural-spice-with-texture-details_831490-9443-removebg-preview.png', label: 'Ginger', top: '50%', left: '90%', size: 88, depth: 22 },
];

function ParallaxSpice({ item, mx, my }: { item: (typeof ingredients)[number]; mx: ReturnType<typeof useMotionValue<number>>; my: ReturnType<typeof useMotionValue<number>> }) {
  const x = useTransform(mx, (v) => v * item.depth);
  const y = useTransform(my, (v) => v * item.depth);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{ top: item.top, left: item.left, width: item.size, height: item.size, x: springX, y: springY }}
    >
      <Image src={item.src} alt={item.label} fill sizes="100px" className="object-contain drop-shadow-xl" />
    </motion.div>
  );
}

export default function SpiceExperience() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="overflow-hidden bg-[#fffdf8] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            label="The Spice Experience"
            title="Every Blend Starts With Whole Spices"
            subtitle="Move your cursor around — this is the same handful of ingredients that goes into every RA A1 Enterprises masala."
          />
        </Reveal>

        <div
          ref={containerRef}
          onMouseMove={reduceMotion ? undefined : handleMouseMove}
          onMouseLeave={reduceMotion ? undefined : handleMouseLeave}
          className="relative mx-auto min-h-[340px] max-w-4xl sm:min-h-[420px] lg:min-h-[480px]"
        >
          {/* Central statement card */}
          <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center rounded-lg border border-[#ead8b6] bg-[#fffaf0]/95 px-8 py-10 text-center shadow-2xl shadow-amber-950/10 backdrop-blur-sm">
            <p className="font-serif text-xl font-bold leading-snug text-[#542315]">
              Cardamom, cumin, black pepper, star anise, cinnamon &amp; ginger — hand-picked, then blended with care.
            </p>
            <span className="mt-5 text-caption uppercase text-[#b15a2a]">No fillers. No shortcuts.</span>
          </div>

          {/* Desktop: mouse-parallax ingredients */}
          {ingredients.map((item) => (
            <ParallaxSpice key={item.label} item={item} mx={mx} my={my} />
          ))}

          {/* Mobile/tablet: lightweight ambient grid, no pointer tracking */}
          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-6 lg:hidden">
            {ingredients.map((item, i) => (
              <div
                key={item.label}
                className="animate-float flex flex-col items-center gap-2"
                style={reduceMotion ? undefined : { animationDelay: `${i * 0.3}s` }}
              >
                <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                  <Image src={item.src} alt={item.label} fill sizes="70px" className="object-contain drop-shadow-md" />
                </div>
                <span className="text-center text-[11px] font-bold uppercase tracking-wide text-[#8d301d]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
