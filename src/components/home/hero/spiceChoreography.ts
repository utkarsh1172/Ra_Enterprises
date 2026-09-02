/**
 * Choreography for the hero "separate spices become one masala" sequence.
 *
 * Pure data and math — no React, no DOM — so the powder canvas and the
 * whole-spice image layer stay on the exact same clock without either one
 * owning the timeline.
 *
 * Timeline (seconds from hero mount):
 *   0.0–1.0  spices appear at their own edge
 *   1.0–2.5  drift inward
 *   2.5–4.0  swirl around the centre
 *   4.0–5.0  collide and blend toward one masala tone
 *   5.0–6.0  settle
 *   6.0+     very subtle ambient drift only
 */

export const TIMELINE = {
  appearFrom: 0.2,
  inwardTo: 2.6,
  swirlFrom: 2.5,
  swirlTo: 4.1,
  blendFrom: 4.0,
  blendTo: 5.2,
  settleFrom: 5.0,
  settleTo: 6.3,
  ambientFrom: 6.3,
} as const;

export type RGB = readonly [number, number, number];

export type SpiceStream = {
  id: string;
  label: string;
  /** Ground colour of the raw spice, before it blends. */
  color: RGB;
  /** Entry edge as a direction from centre; roughly unit-ish, not normalised. */
  from: readonly [number, number];
  /** Fraction of the total particle budget this stream gets. */
  share: number;
};

/**
 * Seven streams, each entering from its own side. Chilli left and turmeric
 * right carry the most weight — they're the two the eye reads first, and the
 * two the brand is actually built on.
 */
export const POWDER_STREAMS: readonly SpiceStream[] = [
  { id: 'chilli', label: 'Red chilli', color: [196, 54, 28], from: [-1, -0.12], share: 0.22 },
  { id: 'turmeric', label: 'Turmeric', color: [234, 166, 26], from: [1, -0.08], share: 0.22 },
  { id: 'coriander', label: 'Coriander', color: [178, 140, 78], from: [-0.7, -1], share: 0.13 },
  { id: 'cumin', label: 'Cumin', color: [142, 92, 48], from: [0.75, 1], share: 0.13 },
  { id: 'pepper', label: 'Black pepper', color: [104, 78, 62], from: [0.85, -1], share: 0.1 },
  { id: 'cardamom', label: 'Green cardamom', color: [126, 140, 84], from: [-0.8, 1], share: 0.1 },
  { id: 'clove', label: 'Clove', color: [126, 64, 40], from: [0.05, 1], share: 0.1 },
];

/** Everything converges toward this — the finished masala. */
export const MASALA: RGB = [206, 108, 40];

/** Discrete blend steps, so sprites can be pre-rendered instead of re-tinted per frame. */
export const BLEND_STEPS = 5;

/** How far toward MASALA a particle travels at full convergence (never 100% — some grain survives). */
export const BLEND_LIMIT = 0.72;

export type WholeSpice = {
  id: string;
  src: string;
  /** Rendered box in px. */
  size: number;
  /** Resting spot, as CSS percentages within the hero. Kept clear of the headline column. */
  rest: { top: string; left: string };
  /** Entry offset in px from the resting spot — the edge it flies in from. */
  from: readonly [number, number];
  /** Extra seconds after the sequence start. */
  delay: number;
  /** [entry rotation, resting rotation] in degrees. */
  spin: readonly [number, number];
  /** Whether it survives the mobile cut. */
  onMobile: boolean;
};

/**
 * Only assets that already exist in /public/images are listed. Chilli,
 * turmeric, coriander and clove are carried by the powder layer instead —
 * see PENDING_SPICE_ASSETS for the cut-outs that would upgrade them.
 */
export const WHOLE_SPICES: readonly WholeSpice[] = [
  {
    id: 'star-anise',
    src: '/images/anise-stars-removebg-preview.png',
    size: 62,
    rest: { top: '20%', left: '60%' },
    from: [-420, -90],
    delay: 0,
    spin: [-150, -8],
    onMobile: false,
  },
  {
    id: 'cinnamon',
    src: '/images/cinnamon-sticks-wrapped-with-rustic-thread-removebg-preview.png',
    size: 76,
    rest: { top: '9%', left: '71%' },
    from: [250, -230],
    delay: 0.18,
    spin: [130, 11],
    onMobile: false,
  },
  {
    id: 'cardamom',
    src: '/images/cardamon-removebg-preview.png',
    size: 46,
    rest: { top: '72%', left: '59%' },
    from: [-300, 250],
    delay: 0.3,
    spin: [-95, 6],
    onMobile: true,
  },
  {
    id: 'pepper',
    src: '/images/blackpapercorns-removebg-preview.png',
    size: 42,
    rest: { top: '46%', left: '90%' },
    from: [310, -150],
    delay: 0.44,
    spin: [165, -10],
    onMobile: false,
  },
  {
    id: 'cumin',
    src: '/images/cuminseed-removebg-preview.png',
    size: 44,
    rest: { top: '83%', left: '72%' },
    from: [280, 270],
    delay: 0.56,
    spin: [-125, 9],
    onMobile: true,
  },
  {
    id: 'ginger',
    src: '/images/close-up-dried-ginger-sonth-isolated-white-surface_466689-19054.png',
    size: 58,
    rest: { top: '60%', left: '66%' },
    from: [350, 70],
    delay: 0.68,
    spin: [105, -6],
    onMobile: false,
  },
];

/**
 * Transparent cut-outs that would let these streams also carry a real whole
 * spice instead of powder alone. Drop them in /public/images and add an entry
 * to WHOLE_SPICES — nothing else needs to change.
 */
export const PENDING_SPICE_ASSETS = [
  'dried red chilli (whole, transparent)',
  'turmeric fingers / root (transparent)',
  'coriander seeds cluster (transparent)',
  'whole cloves cluster (transparent)',
  'bay leaf (transparent)',
] as const;

/* ── math helpers ─────────────────────────────────────────────────────── */

export const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Progress through a window of the timeline, clamped to 0..1. */
export const segment = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const mixRGB = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
];

/** Deterministic PRNG so the composition is identical every load. */
export function seededRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
