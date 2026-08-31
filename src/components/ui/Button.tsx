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
    'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg',
  secondary:
    'bg-red-700 hover:bg-red-800 text-white shadow-md hover:shadow-lg',
  outline:
    'border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white',
  ghost:
    'text-amber-700 hover:bg-amber-50',
  whatsapp:
    'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg',
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
        inline-flex items-center justify-center gap-2 font-semibold rounded-full
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
