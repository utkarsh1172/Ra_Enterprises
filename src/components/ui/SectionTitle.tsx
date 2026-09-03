// ── Reusable section heading ─────────────────────────────────
// Eyebrow + serif heading + supporting line, matching the
// composition used across every page of the site.

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
  const titleColor = light ? 'text-[#fff8ea]' : 'text-[#542315]';
  const subtitleColor = light ? 'text-[#fce6c0]' : 'text-[#5f4a3e]';
  const labelColor = light ? 'text-[#ffc45b]' : 'text-[#b15a2a]';

  return (
    <div className={`${centered ? 'text-center' : ''} mb-10`}>
      {label && (
        <span className={`mb-3 inline-block text-eyebrow uppercase ${labelColor}`}>
          {label}
        </span>
      )}

      <h2 className={`font-serif text-h2 ${titleColor}`}>{title}</h2>

      {subtitle && (
        <p className={`mt-4 max-w-2xl ${centered ? 'mx-auto' : ''} text-body-lg ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
