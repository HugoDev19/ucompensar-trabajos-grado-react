import { cn } from '@/utils/cn'
import type { TramiteEstado, DocumentoTipo } from '@/types'

type BadgeVariant = 'orange' | 'green' | 'blue' | 'gray' | 'red'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantMap: Record<BadgeVariant, string> = {
  orange: 'bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] border border-[var(--brand-orange)]/20',
  green: 'bg-[var(--brand-green-soft)] text-[var(--brand-green)] border border-[var(--brand-green)]/20',
  blue: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
  gray: 'bg-[var(--color-bg)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
  red: 'bg-red-500/10 text-red-500 border border-red-500/20',
}

export function Badge({ variant = 'gray', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] font-bold',
        variantMap[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function EstadoBadge({ estado }: { estado: TramiteEstado }) {
  const map: Record<TramiteEstado, { label: string; variant: BadgeVariant }> = {
    borrador: { label: 'Borrador', variant: 'gray' },
    'en-revision': { label: 'En revisión', variant: 'orange' },
    'aprobado-consejo': { label: 'Aprobado consejo', variant: 'blue' },
    completado: { label: 'Completado', variant: 'green' },
    'docs-faltantes': { label: 'Docs faltantes', variant: 'red' },
  }
  const { label, variant } = map[estado]
  return <Badge variant={variant}>{label}</Badge>
}

export function TipoBadge({ tipo }: { tipo: DocumentoTipo }) {
  const map: Record<DocumentoTipo, BadgeVariant> = {
    Anteproyecto: 'orange',
    'Acta consejo': 'blue',
    'Carta aval': 'green',
    'Paz y salvo': 'gray',
    Resolución: 'gray',
  }
  return <Badge variant={map[tipo]}>{tipo}</Badge>
}

const statusMap: Record<string, { label: string; variant: BadgeVariant }> = {
  'borrador':        { label: 'Borrador',         variant: 'gray'   },
  'en-revision':     { label: 'En revisión',      variant: 'orange' },
  'aprobado':        { label: 'Aprobado',         variant: 'blue'   },
  'aprobado-consejo':{ label: 'Aprobado consejo', variant: 'blue'   },
  'completado':      { label: 'Completado',       variant: 'green'  },
  'docs-faltantes':  { label: 'Docs faltantes',   variant: 'red'    },
}

export function StatusBadge({ status }: { status: string }) {
  const entry = statusMap[status] ?? { label: status, variant: 'gray' as BadgeVariant }
  return <Badge variant={entry.variant}>{entry.label}</Badge>
}
