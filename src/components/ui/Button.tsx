// ── Reusable Button component ────────────────────────────────

import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#f5a831] text-[#321208] shadow-md shadow-amber-950/10 hover:bg-[#ffc45b] hover:shadow-lg',
  secondary:
    'bg-[#542315] text-[#fff8ea] shadow-md shadow-amber-950/10 hover:bg-[#7b2a18] hover:shadow-lg',
  outline:
    'border border-[#7b2a18]/35 bg-transparent text-[#542315] hover:border-[#7b2a18] hover:bg-[#fff1d0]',
  ghost:
    'text-[#7b2a18] hover:bg-[#fff1d0]',
  whatsapp:
    'bg-[#16a34a] text-white shadow-md hover:bg-[#12803b] hover:shadow-lg',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-button-sm',
  md: 'px-6 py-3 text-button',
  lg: 'px-8 py-4 text-button-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-full font-semibold
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
