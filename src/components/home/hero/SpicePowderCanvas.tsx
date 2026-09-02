'use client';

import { useEffect, useRef } from 'react';
import {
  BLEND_LIMIT,
  BLEND_STEPS,
  MASALA,
  POWDER_STREAMS,
  TIMELINE,
  easeInOut,
  easeOut,
  lerp,
  mixRGB,
  seededRandom,
  segment,
  type RGB,
} from './spiceChoreography';

type Props = {
  particleCount: number;
  /** Draw the settled frame once and stop — used for prefers-reduced-motion. */
  still: boolean;
};

type Particle = {
  stream: number;
  /** Origin just outside the canvas, in 0..1 canvas space. */
  ox: number;
  oy: number;
  /** Polar description of the swirl. */
  angle: number;
  ring: number;
  core: number;
  rest: number;
  turns: number;
  /** Per-particle timing jitter, so the stream arrives as a spray not a wall. */
  delay: number;
  size: number;
  alpha: number;
  drift: number;
};

const SPRITE_PX = 48;
/** Frame at which the settled composition is fully resolved. */
const STILL_FRAME_T = 7.5;

/** A soft radial dot, pre-rendered once per colour so no gradient is built per frame. */
function makeSprite(rgb: RGB): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = SPRITE_PX;
  c.height = SPRITE_PX;
  const g = c.getContext('2d');
  if (!g) return c;
  const half = SPRITE_PX / 2;
  const grad = g.createRadialGradient(half, half, 0, half, half, half);
  const [r, gr, b] = rgb;
  grad.addColorStop(0, `rgba(${r},${gr},${b},0.95)`);
  grad.addColorStop(0.35, `rgba(${r},${gr},${b},0.42)`);
  grad.addColorStop(1, `rgba(${r},${gr},${b},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, SPRITE_PX, SPRITE_PX);
  return c;
}

function buildParticles(count: number): Particle[] {
  const rand = seededRandom(20260902);
  const out: Particle[] = [];

  POWDER_STREAMS.forEach((stream, streamIdx) => {
    const n = Math.max(6, Math.round(count * stream.share));
    // Direction the stream enters from, as an angle — its swirl entry sits on
    // the same side, so the drift inward reads as one continuous move.
    const entryAngle = Math.atan2(stream.from[1], stream.from[0]);

    for (let i = 0; i < n; i++) {
      const spread = (rand() - 0.5) * 0.9;
      const angle = entryAngle + spread;

      out.push({
        stream: streamIdx,
        ox: 0.5 + stream.from[0] * (0.62 + rand() * 0.3),
        oy: 0.5 + stream.from[1] * (0.62 + rand() * 0.3),
        angle,
        ring: 0.62 + rand() * 0.3,
        core: 0.26 + rand() * 0.26,
        rest: 0.3 + rand() * 0.34,
        turns: 0.5 + rand() * 0.55,
        delay: rand() * 0.85,
        // Many small soft grains rather than few large ones — reads as powder
        // catching the light, not as bokeh.
        size: 18 + rand() * 46,
        alpha: 0.18 + rand() * 0.3,
        drift: rand(),
      });
    }
  });

  return out;
}

export default function SpicePowderCanvas({ particleCount, still }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const particles = buildParticles(particleCount);

    // sprites[stream][blendStep] — 7 x 5 tiny canvases, built once.
    const sprites: HTMLCanvasElement[][] = POWDER_STREAMS.map((s) => {
      const steps: HTMLCanvasElement[] = [];
      for (let i = 0; i < BLEND_STEPS; i++) {
        const t = (i / (BLEND_STEPS - 1)) * BLEND_LIMIT;
        steps.push(makeSprite(mixRGB(s.color, MASALA, t)));
      }
      return steps;
    });

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      if (width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Blend point sits right of centre on wide screens so the powder never
      // crowds the headline column; it recentres as the layout stacks.
      const cx = width * (width > 900 ? 0.62 : 0.5);
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.52;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const inward = easeInOut(
          segment(t, TIMELINE.appearFrom + p.delay, TIMELINE.inwardTo + p.delay * 0.5),
        );
        const swirl = easeInOut(segment(t, TIMELINE.swirlFrom, TIMELINE.swirlTo));
        const blend = easeOut(segment(t, TIMELINE.blendFrom, TIMELINE.blendTo));
        const settle = easeInOut(segment(t, TIMELINE.settleFrom, TIMELINE.settleTo));

        const ambient = t > TIMELINE.ambientFrom ? t - TIMELINE.ambientFrom : 0;

        // Angle sweeps through the swirl, then keeps turning almost imperceptibly.
        const angle =
          p.angle + swirl * p.turns * Math.PI * 2 + ambient * 0.05 * (0.4 + p.drift);

        // Radius: outer ring -> core -> collapse on the blend -> ease back out to rest.
        let r = lerp(p.ring, p.core, swirl);
        r *= 1 - blend * 0.7;
        r = lerp(r, p.rest, settle);

        // Y is flattened so the swirl reads as a bowl of masala, not a sphere.
        const swirlX = cx + Math.cos(angle) * r * radius;
        const swirlY = cy + Math.sin(angle) * r * radius * 0.72;

        const x = lerp(p.ox * width, swirlX, inward);
        const y = lerp(p.oy * height, swirlY, inward);

        const bob = ambient > 0 ? Math.sin(ambient * 0.5 + p.drift * 6.28) * 4 : 0;

        const fadeIn = segment(t, p.delay, 1 + p.delay);
        const alpha = p.alpha * fadeIn * lerp(1, 0.5, settle);
        if (alpha <= 0.005) continue;

        const step = Math.min(BLEND_STEPS - 1, Math.round(blend * (BLEND_STEPS - 1)));
        const size = p.size * (1 + swirl * 0.16) * (1 - settle * 0.12);

        ctx.globalAlpha = alpha;
        ctx.drawImage(sprites[p.stream][step], x - size / 2, y + bob - size / 2, size, size);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    resize();

    const ro = new ResizeObserver(() => {
      resize();
      if (still) draw(STILL_FRAME_T);
    });
    ro.observe(canvas);

    // Reduced motion: one settled frame, no loop at all.
    if (still) {
      draw(STILL_FRAME_T);
      return () => ro.disconnect();
    }

    const start = performance.now();
    let raf = 0;
    let onScreen = true;
    let frame = 0;

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      // Once it's only ambient drift, half the frame rate — the movement is
      // slow enough that nobody can tell, and it hands the battery back.
      const cheap = t > TIMELINE.ambientFrom + 1;
      if (!cheap || frame % 2 === 0) draw(t);
      frame++;
      raf = requestAnimationFrame(tick);
    };

    const play = () => {
      if (raf || !onScreen || document.hidden) return;
      raf = requestAnimationFrame(tick);
    };

    const pause = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Don't burn frames on a hero that's scrolled past or a backgrounded tab.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) play();
        else pause();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener('visibilitychange', onVisibility);

    play();

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [particleCount, still]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
