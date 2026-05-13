import { useNavigate } from 'react-router-dom'
import { MetricCard } from '@/components/ui/MetricCard'
import { StatusBadge } from '@/components/ui/Badge'
import { TRAMITES, MODALITY_BARS, C } from '@/data'

export function DashboardSection() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 animate-in">
      {/* Alert banner */}
      <div className="flex items-center gap-4 rounded-2xl px-5 py-4 bg-[var(--brand-orange-soft)] border border-[var(--brand-orange)]/20 shadow-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-orange)] animate-pulse" />
        <span className="text-[13px] flex-1 font-medium text-[var(--color-text)]">
          Tienes <span className="font-bold text-[var(--brand-orange)]">4 trámites</span> que requieren atención inmediata por inactividad.
        </span>
        <button
          onClick={() => navigate('/tramites')}
          className="text-[12px] font-bold px-4 py-2 rounded-xl transition-all border border-[var(--brand-orange)] text-[var(--brand-orange)] bg-transparent hover:bg-[var(--brand-orange)] hover:text-white cursor-pointer"
        >
          Revisar ahora
        </button>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Trámites activos"    value="34"   sub="+3 esta semana"   subColor="var(--brand-green)"    accentColor="var(--brand-orange)"  />
        <MetricCard label="Aprobados este mes"  value="8"    sub="Actas generadas"                        accentColor="var(--brand-green)"   />
        <MetricCard label="Pendientes revisión" value="12"   sub="4 con alerta"     subColor="var(--brand-orange)"    accentColor="#f59e0b"   />
        <MetricCard label="Docs SharePoint"     value="214"  sub="14 GB usados"                          accentColor="var(--color-text-dim)"   />
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Recent tramites table */}
        <div className="xl:col-span-2 card overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/30">
            <h2 className="text-[15px] font-bold text-[var(--color-text)] tracking-tight">Trámites recientes</h2>
            <button onClick={() => navigate('/tramites')} className="btn-ghost text-[12px] font-bold">
              Ver todos los trámites →
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-premium">
            <table className="w-full border-collapse" style={{ minWidth: 500 }}>
              <thead>
                <tr>
                  {['Estudiante','Cédula','Modalidad','Estado','Última Act.'].map(h => (
                    <th key={h} className="th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRAMITES.slice(0, 6).map(row => (
                  <tr
                    key={row.id}
                    className="cursor-pointer transition-colors group"
                    onClick={() => navigate('/trazabilidad')}
                  >
                    <td className="td font-bold text-[var(--color-text)] group-hover:text-[var(--brand-orange)]">{row.name}</td>
                    <td className="td font-mono font-bold text-[11px] text-[var(--brand-green)]">{row.cc}</td>
                    <td className="td text-[var(--color-text-muted)] text-[12px] truncate max-w-[140px]">{row.mod}</td>
                    <td className="td"><StatusBadge status={row.status} /></td>
                    <td className="td text-[var(--color-text-dim)] text-[12px] whitespace-nowrap">{row.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modality bars */}
        <div className="card p-6 flex flex-col">
          <h2 className="text-[15px] font-bold text-[var(--color-text)] mb-6 tracking-tight">Por modalidad</h2>
          <div className="space-y-6 flex-1">
            {MODALITY_BARS.map(bar => (
              <div key={bar.label} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-[12px] font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors truncate pr-2">{bar.label}</span>
                  <span className="text-[12px] font-bold text-[var(--color-text)] tabular-nums flex-shrink-0">{bar.count}</span>
                </div>
                <div className="h-2 bg-[var(--color-bg)] rounded-full overflow-hidden border border-[var(--color-border)]">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                    style={{ width: `${bar.pct}%`, background: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)] border-dashed">
            <p className="text-[11px] text-[var(--color-text-dim)] text-center leading-relaxed">
              Los datos se actualizan automáticamente cada vez que un trámite cambia de estado en SharePoint.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
