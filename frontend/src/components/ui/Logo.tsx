import { cn } from '@/utils/cn'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const logoUrl = new URL('../../assets/logo.jpg', import.meta.url).href

export function Logo({ size = 'md', className }: LogoProps) {
  const dims = { sm: { w: 160, h: 32 }, md: { w: 210, h: 42 }, lg: { w: 240, h: 48 } }
  const { w, h } = dims[size]

  return (
    <img
      src={logoUrl}
      alt="Logo Universidad Compensar"
      width={w}
      height={h}
      className={cn('object-contain', className)}
    />
  )
}
