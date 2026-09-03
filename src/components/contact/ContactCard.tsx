// ── Reusable contact channel card (dark sections) ───────────────
// Renders as an <a> when href is given, otherwise as a static card
// (used for the non-clickable location entry).

import type { ComponentType, ReactNode } from 'react';

type IconType = ComponentType<{ className?: string }>;

export interface ContactCardProps {
  icon: IconType;
  title: string;
  subtitle: string;
  href?: string;
  external?: boolean;
  /** Tailwind classes for the icon badge — lets each channel keep its own accent. */
  iconClassName?: string;
  onClick?: () => void;
}

export default function ContactCard({
  icon: Icon,
  title,
  subtitle,
  href,
  external = false,
  iconClassName = 'bg-[#f5a831] text-[#38170e]',
  onClick,
}: ContactCardProps) {
  const content: ReactNode = (
    <>
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${iconClassName}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold text-[#fff8ea]">{title}</span>
        <span className="mt-0.5 block truncate text-xs font-semibold text-[#fce6c0]/70">{subtitle}</span>
      </span>
    </>
  );

  const className =
    'flex items-center gap-3 rounded-lg border border-[#fff5df]/12 bg-white/[0.06] p-4 transition-colors';

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${className} hover:border-[#f5a831]/35 hover:bg-white/[0.11]`}
    >
      {content}
    </a>
  );
}
