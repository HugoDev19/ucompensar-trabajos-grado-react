import { cn } from '@/utils/cn'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--brand-orange)] text-white font-bold hover:bg-[var(--brand-orange-hover)] hover:shadow-[0_4px_12px_rgba(224,90,30,0.3)] hover:-translate-y-px active:translate-y-0 transition-all duration-200 border-none',
  outline:
    'bg-transparent border border-[var(--color-border)] text-[var(--color-text-muted)] font-bold hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] hover:bg-[var(--brand-orange-soft)] transition-all duration-200',
  ghost:
    'bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] transition-all duration-200 border-none',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[11px] rounded-lg',
  md: 'px-4 py-2.5 text-[12.5px] rounded-xl',
  lg: 'px-6 py-3 text-[14px] rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
