'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'light' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  as?: 'button';
}

interface LinkButtonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 ease-premium rounded-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-navy text-parchment hover:bg-navy-600 px-7 py-3.5 text-sm uppercase tracking-wider',
  outline:
    'border border-navy/30 text-navy hover:border-champagne hover:text-champagne px-7 py-3.5 text-sm uppercase tracking-wider',
  light:
    'border border-white/40 text-white hover:bg-white hover:text-navy px-7 py-3.5 text-sm uppercase tracking-wider',
  ghost:
    'text-navy hover:text-champagne px-2 py-1 text-sm',
};

const sizes: Record<Size, string> = {
  sm: 'text-xs px-5 py-2.5',
  md: 'text-sm px-7 py-3.5',
  lg: 'text-base px-9 py-4',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  onClick,
  ...rest
}: LinkButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
      aria-label={rest['aria-label']}
    >
      {children}
    </a>
  );
}
