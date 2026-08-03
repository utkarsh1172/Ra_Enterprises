// ── Reusable decorative section heading ──────────────────────

interface SectionTitleProps {
  label?: string;        // small top label (e.g. "Our Range")
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;       // light text for dark backgrounds
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionTitleProps) {
  const textColor = light ? 'text-[#fff3d8]' : 'text-[#542315]';
  const subtitleColor = light ? 'text-amber-100/80' : 'text-stone-600';
  const labelColor = light ? 'text-[#ffc45b]' : 'text-[#b15a2a]';
  const lineColor = light ? 'bg-[#ffc45b]' : 'bg-[#c95d2e]';

  return (
    <div className={`${centered ? 'text-center' : ''} mb-10`}>
      {label && (
        <span
          className={`mb-3 inline-block text-[11px] font-black uppercase tracking-[0.18em] ${labelColor}`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-serif text-4xl font-bold leading-[1.05] tracking-[-0.035em] md:text-5xl ${textColor}`}
      >
        {title}
      </h2>

      {/* Decorative divider */}
      <div className={`mt-5 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <div className={`h-px w-12 ${lineColor}`} />
        <span className="text-amber-600 text-lg">✦</span>
        <div className={`h-px w-12 ${lineColor}`} />
      </div>

      {subtitle && (
        <p className={`mt-5 max-w-2xl ${centered ? 'mx-auto' : ''} text-base leading-7 md:text-lg ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
