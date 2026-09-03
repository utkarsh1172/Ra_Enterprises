'use client';

import Image from 'next/image';
import { useHeroMotionProfile } from './useHeroMotionProfile';

const HERO_VIDEO_SRC = '/videos/Use_the_uploaded_reference_ima.mp4';
const HERO_POSTER_SRC = '/images/whole-spice-selection.jpeg';

/**
 * Decorative hero media layer.
 *
 * The poster renders first for fast paint and reduced-motion users. The video
 * is mounted only after hydration so it never blocks the initial page render.
 */
export default function HeroBackgroundVideo() {
  const { mounted, still } = useHeroMotionProfile();
  const shouldPlayVideo = mounted && !still;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Image
        src={HERO_POSTER_SRC}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_center] sm:object-center"
      />

      {shouldPlayVideo && (
        <video
          className="hero-background-video pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER_SRC}
          preload="metadata"
          tabIndex={-1}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
