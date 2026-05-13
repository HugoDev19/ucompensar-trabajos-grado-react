interface MetricCardProps {
  label: string
  value: string | number
  sub: string
  subColor?: string
  accentColor?: string
}

export function MetricCard({ label, value, sub, subColor, accentColor }: MetricCardProps) {
  return (
    <div
      className="card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
      style={{ borderTop: accentColor ? `4px solid ${accentColor}` : '1px solid var(--color-border)' }}
    >
      <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-dim)] mb-2 group-hover:text-[var(--brand-orange)] transition-colors">
        {label}
      </div>
      <div className="text-[28px] font-bold text-[var(--color-text)] leading-none tracking-tight">
        {value}
      </div>
      <div
        className="text-[11px] mt-3 font-medium opacity-80"
        style={{ color: subColor ?? 'var(--color-text-muted)' }}
      >
        {sub}
      </div>
    </div>
  )
}
