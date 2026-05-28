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
  const textColor = light ? 'text-amber-100' : 'text-spice-brown';
  const subtitleColor = light ? 'text-amber-200' : 'text-gray-600';
  const labelColor = light ? 'text-amber-400' : 'text-amber-600';
  const lineColor = light ? 'bg-amber-400' : 'bg-amber-600';

  return (
    <div className={`${centered ? 'text-center' : ''} mb-10`}>
      {label && (
        <span
          className={`inline-block text-xs font-semibold uppercase tracking-widest ${labelColor} mb-2`}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold font-serif ${textColor} leading-tight`}
      >
        {title}
      </h2>

      {/* Decorative divider */}
      <div className={`flex items-center gap-3 mt-4 ${centered ? 'justify-center' : ''}`}>
        <div className={`h-px w-12 ${lineColor}`} />
        <span className="text-amber-600 text-lg">✦</span>
        <div className={`h-px w-12 ${lineColor}`} />
      </div>

      {subtitle && (
        <p className={`mt-4 max-w-2xl ${centered ? 'mx-auto' : ''} text-base md:text-lg ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
