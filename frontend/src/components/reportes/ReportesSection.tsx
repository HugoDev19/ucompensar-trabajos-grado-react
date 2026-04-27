import { Card, Button, MetricCard } from '@/components/ui'
import { REPORTE_METRICS, REPORTE_BARS } from '@/utils/mock-data'

export function ReportesSection() {
  return (
    <div className="animate-in space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {REPORTE_METRICS.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-bg)]/30 flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[var(--color-text)] tracking-tight">Trámites por modalidad — 2026</h2>
            <p className="text-[12px] text-[var(--color-text-muted)] mt-0.5">Distribución de trámites por tipo de trabajo de grado</p>
          </div>
          <Button variant="outline" size="sm" className="font-bold">Exportar Excel</Button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {REPORTE_BARS.map((bar) => (
            <div key={bar.label} className="flex items-center gap-4 group">
              <div className="text-[13px] text-[var(--color-text-muted)] min-w-[180px] font-medium group-hover:text-[var(--color-text)] transition-colors">
                {bar.label}
              </div>
              <div className="flex-1 h-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${bar.pct}%`, backgroundColor: bar.color }}
                />
              </div>
              <span className="text-[13px] font-bold text-[var(--color-text)] min-w-[24px] text-right tabular-nums">
                {bar.count}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
