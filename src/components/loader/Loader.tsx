'use client';

// ── Cinematic first-load brand intro ─────────────────────────
// A musal (pestle) sweeps in from the left, whole spices sweep
// in from the right, they collide centre-stage in a soft
// "smash" of powder and particles, then the two halves part
// like curtains to reveal the homepage underneath, with the
// wordmark held briefly in the middle of the reveal.
//
// - Runs once per browser session (sessionStorage flag) — it
//   only ever plays on a real first load, not on client-side
//   navigation (layout.tsx, and this component, don't remount
//   on route changes in the App Router).
// - The homepage is already mounted and painting underneath this
//   overlay the whole time, so the animation costs nothing in
//   terms of LCP/CLS — it only delays what the user *sees*, not
//   what the browser does.
// - `prefers-reduced-motion` gets a short, static-friendly fade
//   instead of the sweep/impact choreography.

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const STORAGE_KEY = 'ra1-intro-played';

function subscribe() {
  return () => {};
}

function getSnapshot() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return true;
  }
}

// Treat the intro as "already played" until the client has had a
// chance to check sessionStorage — avoids ever flashing the overlay
// during/just after hydration when it turns out to be a repeat visit.
function getServerSnapshot() {
  return true;
}

/** True once per browser session, on a genuine first load only. */
function useShouldPlayIntro() {
  const alreadyPlayed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return !alreadyPlayed;
}

type Phase = 'enter' | 'impact' | 'reveal' | 'done';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SPICES = [
  { src: '/images/cardamon-removebg-preview.png', size: 62, dx: -8, dy: -34, rot: -18 },
  { src: '/images/blackpapercorns-removebg-preview.png', size: 54, dx: 18, dy: -6, rot: 12 },
  { src: '/images/cuminseed-removebg-preview.png', size: 58, dx: -14, dy: 26, rot: -8 },
  { src: '/images/anise-stars-removebg-preview.png', size: 56, dx: 20, dy: 30, rot: 22 },
  { src: '/images/cinnamon-sticks-wrapped-with-rustic-thread-removebg-preview.png', size: 66, dx: 4, dy: 2, rot: -4 },
];

function useParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (i % 2 === 0 ? 0.18 : -0.12);
        const distance = 70 + ((i * 37) % 90);
        const colors = ['#f5a831', '#c9421d', '#ffd187', '#7a2b0f', '#e8b84b'];
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance * 0.7,
          size: 5 + (i % 4) * 3,
          color: colors[i % colors.length],
          delay: (i % 5) * 0.015,
        };
      }),
    [count]
  );
}

export default function Loader() {
  const reduceMotion = useReducedMotion();
  const play = useShouldPlayIntro();
  const [phase, setPhase] = useState<Phase>('enter');
  const particles = useParticles(16);

  // Mark the session as "played" as soon as we know we're playing —
  // a plain external-system write, not a state update.
  useEffect(() => {
    if (!play) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* sessionStorage unavailable (e.g. private mode) — fine, just replays next load */
    }
  }, [play]);

  useEffect(() => {
    if (!play) return;

    if (reduceMotion) {
      const t = setTimeout(() => setPhase('done'), 900);
      return () => clearTimeout(t);
    }

    const timers = [
      setTimeout(() => setPhase('impact'), 850),
      setTimeout(() => setPhase('reveal'), 1200),
      setTimeout(() => setPhase('done'), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [play, reduceMotion]);

  useEffect(() => {
    if (play && phase !== 'done') {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [play, phase]);

  if (!play || phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] overflow-hidden bg-[#1c0d08]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        role="status"
        aria-label="RA A1 Enterprises is loading"
      >
        {reduceMotion ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex h-full w-full flex-col items-center justify-center gap-3 text-center"
          >
            <span className="font-hero text-2xl tracking-wide text-[#ffd187] sm:text-3xl">
              RA A1 ENTERPRISES
            </span>
            <span className="text-caption uppercase tracking-[0.25em] text-amber-100/70">
              Authentic Taste. Pure Spices.
            </span>
          </motion.div>
        ) : (
          <>
            {/* Warm spice-toned backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2b120a] via-[#1c0d08] to-[#150a06]" />
            <div className="grain absolute inset-0 opacity-25 mix-blend-soft-light" />

            {/* ── Left curtain: musal sweeps in ───────────────── */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#150a06] to-[#2b120a]"
              animate={phase === 'reveal' ? { x: '-100%' } : { x: 0 }}
              transition={{ duration: 0.85, ease: EASE_OUT }}
            >
              <motion.div
                className="absolute top-1/2 right-[-6%] w-[42%] max-w-[190px] -translate-y-1/2 sm:w-[38%]"
                initial={{ x: -260, rotate: -22, opacity: 0 }}
                animate={{
                  x: phase === 'enter' ? 0 : -14,
                  rotate: phase === 'impact' ? -6 : -16,
                  opacity: 1,
                }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
              >
                <motion.div
                  animate={phase === 'impact' ? { x: [0, 10, -4, 0], rotate: [-6, 2, -10, -6] } : {}}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative aspect-[1/3.1] w-full overflow-hidden rounded-full border-2 border-[#f5a831]/40 shadow-2xl shadow-black/60"
                >
                  <Image
                    src="/images/Musal.jpg"
                    alt=""
                    fill
                    priority
                    sizes="200px"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── Right curtain: spices sweep in ──────────────── */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#150a06] to-[#2b120a]"
              animate={phase === 'reveal' ? { x: '100%' } : { x: 0 }}
              transition={{ duration: 0.85, ease: EASE_OUT }}
            >
              <div className="absolute top-1/2 left-[-4%] w-[58%] max-w-[220px] -translate-y-1/2 sm:w-[52%]">
                {SPICES.map((s, i) => (
                  <motion.div
                    key={s.src}
                    className="absolute top-1/2 left-1/2"
                    style={{ width: s.size, height: s.size }}
                    initial={{ x: 220 + i * 26, y: s.dy * 2, rotate: 0, opacity: 0 }}
                    animate={{
                      x: phase === 'enter' ? s.dx + 30 : s.dx,
                      y: s.dy,
                      rotate: phase === 'impact' ? s.rot * 1.6 : s.rot,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.8, delay: i * 0.04, ease: EASE_OUT }}
                  >
                    <motion.div
                      animate={phase === 'impact' ? { x: [0, -10, 4, 0], y: [0, -4, 2, 0] } : {}}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="relative -translate-x-1/2 -translate-y-1/2"
                      style={{ width: s.size, height: s.size }}
                    >
                      <Image
                        src={s.src}
                        alt=""
                        fill
                        priority
                        sizes="70px"
                        className="object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Impact: flash + powder + flying particles ───── */}
            {phase === 'impact' && (
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  initial={{ scale: 0.2, opacity: 0.9 }}
                  animate={{ scale: 3.2, opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,196,91,0.85),rgba(245,168,49,0.25)_55%,transparent_75%)]"
                />
                <motion.div
                  initial={{ scale: 0.3, opacity: 0.7 }}
                  animate={{ scale: 4.2, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
                  className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(230,120,50,0.55),transparent_70%)] blur-md"
                />
                {particles.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.65, delay: p.delay, ease: 'easeOut' }}
                    className="absolute left-1/2 top-1/2 rounded-full"
                    style={{ width: p.size, height: p.size, backgroundColor: p.color }}
                  />
                ))}
              </div>
            )}

            {/* ── Wordmark reveal ──────────────────────────────── */}
            {phase === 'reveal' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-4 text-center"
              >
                <motion.span
                  initial={{ opacity: 0, y: 14, letterSpacing: '0.02em' }}
                  animate={{ opacity: 1, y: 0, letterSpacing: '0.06em' }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  className="font-hero text-3xl text-[#ffd187] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl"
                >
                  RA A1 ENTERPRISES
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
                  className="text-caption uppercase tracking-[0.3em] text-amber-100/85"
                >
                  Authentic Taste. Pure Spices.
                </motion.span>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
