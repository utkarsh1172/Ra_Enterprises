'use client';

import { useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';

export type DeviceTier = 'mobile' | 'tablet' | 'desktop';

const PARTICLE_BUDGET: Record<DeviceTier, number> = {
  mobile: 110,
  tablet: 230,
  desktop: 420,
};

const MOBILE_Q = '(max-width: 639px)';
const TABLET_Q = '(max-width: 1023px)';

/* Media queries are an external store, so subscribe to them as one rather
   than mirroring them into state from an effect. */

function subscribeTier(onChange: () => void) {
  const mobile = window.matchMedia(MOBILE_Q);
  const tablet = window.matchMedia(TABLET_Q);
  mobile.addEventListener('change', onChange);
  tablet.addEventListener('change', onChange);
  return () => {
    mobile.removeEventListener('change', onChange);
    tablet.removeEventListener('change', onChange);
  };
}

/** Returns a primitive, so identity never churns and no render loop is possible. */
function getTier(): DeviceTier {
  if (window.matchMedia(MOBILE_Q).matches) return 'mobile';
  if (window.matchMedia(TABLET_Q).matches) return 'tablet';
  return 'desktop';
}

const getServerTier = (): DeviceTier => 'desktop';

const subscribeNever = () => () => {};
const onClient = () => true;
const onServer = () => false;

/** Cores don't change, so measure once per session. */
let coreScaleCache: number | null = null;
function getCoreScale(): number {
  if (coreScaleCache !== null) return coreScaleCache;
  if (typeof navigator === 'undefined') return 1;
  // Four cores or fewer usually means a phone or an older laptop.
  const cores = navigator.hardwareConcurrency ?? 8;
  coreScaleCache = cores <= 4 ? 0.55 : cores <= 6 ? 0.8 : 1;
  return coreScaleCache;
}

export type HeroMotionProfile = {
  /** False during SSR and the first client render — keeps hydration identical. */
  mounted: boolean;
  /** Render the settled composition as a single static frame, no animation. */
  still: boolean;
  tier: DeviceTier;
  isMobile: boolean;
  particleCount: number;
};

/**
 * Decides how much animation this device should actually be asked to do.
 * Reduced-motion wins outright; otherwise the particle budget scales with the
 * viewport and gets cut further on low-core machines.
 */
export function useHeroMotionProfile(): HeroMotionProfile {
  const prefersReduced = useReducedMotion();
  const mounted = useSyncExternalStore(subscribeNever, onClient, onServer);
  const tier = useSyncExternalStore(subscribeTier, getTier, getServerTier);

  return {
    mounted,
    still: Boolean(prefersReduced),
    tier,
    isMobile: tier === 'mobile',
    particleCount: Math.round(PARTICLE_BUDGET[tier] * (mounted ? getCoreScale() : 1)),
  };
}
