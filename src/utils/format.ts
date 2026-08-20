export function formatDate(dateStr: string): string {
  if (dateStr === 'Hoy' || dateStr === 'Ayer') return dateStr
  try {
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

// El backend serializa datetimes naive en UTC (sin sufijo 'Z' ni offset).
// Sin esto, `new Date(iso)` los interpreta como hora LOCAL del navegador
// en vez de UTC, desfasando cada fecha por el offset de la zona horaria
// del usuario (ej. 5 horas adelantado en Colombia, UTC-5).
export function parseUtc(iso: string): Date {
  const hasTimezone = /[Zz]|[+-]\d{2}:?\d{2}$/.test(iso)
  return new Date(hasTimezone ? iso : `${iso}Z`)
}

export function formatRelativeDate(iso: string): string {
  const date = parseUtc(iso)
  const now = new Date()

  if (date.toDateString() === now.toDateString()) {
    return `Hoy ${date.toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' })}`
  }

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) return 'Ayer'

  return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short' }).format(date)
}

export function daysSince(iso: string): number {
  return Math.floor((Date.now() - parseUtc(iso).getTime()) / 86_400_000)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
