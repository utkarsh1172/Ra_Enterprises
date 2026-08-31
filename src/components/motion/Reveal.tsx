'use client';

// ── Scroll-triggered fade/slide-up reveal ────────────────────────
// Wraps any content (server or client) and animates it in once,
// the first time it scrolls into view. Respects reduced-motion.

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}

export default function Reveal({ children, delay = 0, y = 28, x = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? undefined : { opacity: 0, y, x }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
