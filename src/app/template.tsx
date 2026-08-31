'use client';

// ── Page transition ───────────────────────────────────────────
// Next.js re-mounts `template.tsx` on every navigation (unlike
// layout.tsx), so this gives every route a subtle fade/rise-in
// without touching each page's own markup.

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
