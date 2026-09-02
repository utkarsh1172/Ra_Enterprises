'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { WholeSpice } from './spiceChoreography';

type Props = {
  spice: WholeSpice;
  /** Skip the flight and render the resting frame — prefers-reduced-motion. */
  still: boolean;
};

const SHADOW = 'object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]';

/**
 * One whole spice flying in from its own edge and settling into the
 * composition. Transform-only (x / y / scale / rotate) so it never touches
 * layout, and the resting float lives on a nested element so the two
 * animations can't fight over the same transform.
 */
export default function FlyingSpice({ spice, still }: Props) {
  const { src, size, rest, from, delay, spin } = spice;
  const box = { top: rest.top, left: rest.left, width: size, height: size };

  if (still) {
    return (
      <div className="absolute" style={{ ...box, transform: `rotate(${spin[1]}deg)` }}>
        <Image src={src} alt="" fill sizes={`${size}px`} className={SHADOW} />
      </div>
    );
  }

  return (
    <motion.div
      className="absolute will-change-transform"
      style={box}
      initial={{ x: from[0], y: from[1], opacity: 0, scale: 0.55, rotate: spin[0] }}
      animate={{
        x: [from[0], from[0] * 0.34, 0],
        y: [from[1], from[1] * 0.3, 0],
        opacity: [0, 0.92, 1],
        scale: [0.55, 1.12, 1],
        rotate: [spin[0], spin[0] * 0.4, spin[1]],
      }}
      transition={{
        duration: 4.6,
        delay: 0.35 + delay,
        times: [0, 0.62, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ y: [0, -7, 0], rotate: [0, 1.6, 0] }}
        transition={{
          duration: 7 + delay,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5.2 + delay,
        }}
      >
        <Image src={src} alt="" fill sizes={`${size}px`} className={SHADOW} />
      </motion.div>
    </motion.div>
  );
}
