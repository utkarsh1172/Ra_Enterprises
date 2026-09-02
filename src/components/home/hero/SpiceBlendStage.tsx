'use client';

import FlyingSpice from './FlyingSpice';
import SpicePowderCanvas from './SpicePowderCanvas';
import { WHOLE_SPICES } from './spiceChoreography';
import { useHeroMotionProfile } from './useHeroMotionProfile';

/**
 * Decorative layer that sits between the hero background and the hero copy.
 *
 * Purely presentational: `aria-hidden` and `pointer-events-none`, absolutely
 * positioned inside the existing hero section, so it adds no content for
 * crawlers, causes no layout shift, and never intercepts a click meant for
 * the buttons underneath.
 */
export default function SpiceBlendStage() {
  const { mounted, still, isMobile, particleCount } = useHeroMotionProfile();

  // Nothing renders until the viewport has been measured — keeps the server
  // and client markup identical, and the layer is decorative either way.
  if (!mounted) return null;

  const spices = isMobile ? WHOLE_SPICES.filter((s) => s.onMobile) : WHOLE_SPICES;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <SpicePowderCanvas particleCount={particleCount} still={still} />

      <div className="absolute inset-0 hidden opacity-90 sm:block">
        {spices.map((spice) => (
          <FlyingSpice key={spice.id} spice={spice} still={still} />
        ))}
      </div>
    </div>
  );
}
