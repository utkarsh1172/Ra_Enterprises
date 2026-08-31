'use client';

// ── Stagger-reveal wrapper for grids of cards ────────────────────
// Put grid layout classes on `className` as usual; each direct child
// fades/slides in with a small stagger as the grid scrolls into view.

import { Children } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function StaggerGrid({ children, className }: StaggerGridProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
