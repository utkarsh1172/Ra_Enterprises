// ── RA A1 Masale brand mark ───────────────────────────────────
// A single glossy red chili on the brand's maroon medallion,
// with the site's existing ✦ accent motif, so the wordmark and
// the mark share one visual language.
// Pure SVG shapes only — no external font dependency, so it
// renders identically as a header icon, a favicon, or on a
// dark/light background.

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 40, className = '' }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="RA A1 Masale"
      className={className}
    >
      <defs>
        <radialGradient id="raBadgeBg" cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#5c2417" />
          <stop offset="100%" stopColor="#2b0f08" />
        </radialGradient>
        <linearGradient id="raChili" x1="20%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#ff5a3c" />
          <stop offset="55%" stopColor="#e2361a" />
          <stop offset="100%" stopColor="#a8180a" />
        </linearGradient>
      </defs>

      {/* Badge */}
      <circle cx="50" cy="50" r="48" fill="url(#raBadgeBg)" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="#f5a831" strokeWidth="1.5" strokeOpacity="0.45" />

      {/* Stem / calyx */}
      <path d="M46 22 L54 22 L52 30 L48 30 Z" fill="#6fae44" />
      <path d="M50 22 C46 18 40 18 37 21 C41 22 44 24 46 27 Z" fill="#5c9438" />
      <path d="M50 22 C54 18 60 18 63 21 C59 22 56 24 54 27 Z" fill="#5c9438" />

      {/* Chili body: curved, tapering, hanging to the lower-left */}
      <path
        d="M50 27
           C63 30 71 43 66 56
           C61 71 44 82 33 76
           C29 74 29 70 33 67
           C45 62 53 52 55 41
           C56 35 55 30 50 27 Z"
        fill="url(#raChili)"
      />

      {/* Glossy highlight */}
      <path
        d="M52 33 C57 37 59 44 57 51"
        fill="none"
        stroke="#ffb199"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />

      {/* ✦ accent — echoes the divider motif used across the site */}
      <path
        d="M75 66 L76.9 70.8 L82 71.8 L78.1 75.2 L79.2 80.3 L75 77.6 L70.8 80.3 L71.9 75.2 L68 71.8 L73.1 70.8 Z"
        fill="#ffc45b"
      />
    </svg>
  );
}

interface LogoProps {
  size?: number;
  showTagline?: boolean;
  dark?: boolean;
  className?: string;
}

/** Full lockup: mark + wordmark, matching the header/footer brand block. */
export default function Logo({ size = 40, showTagline = true, dark = false, className = '' }: LogoProps) {
  const nameColor = dark ? 'text-white' : 'text-[#542315]';
  const taglineColor = dark ? 'text-amber-200/80' : 'text-[#b15a2a]';

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size} className="shrink-0" />
      <span className="leading-tight">
        <span className={`block font-serif text-h4 ${nameColor}`}>RA A1 Masale</span>
        {showTagline && (
          <span className={`block text-caption uppercase ${taglineColor}`}>Crafted Masalas</span>
        )}
      </span>
    </span>
  );
}
