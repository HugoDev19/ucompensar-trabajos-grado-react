import { useNavigate } from 'react-router-dom'
import { MetricCard } from '@/components/ui/MetricCard'
import { StatusBadge } from '@/components/ui/Badge'
import { TRAMITES, MODALITY_BARS } from '@/data'
import { TrendingUp, AlertCircle, FileCheck2, BadgeCheck, History, Cloud } from 'lucide-react'

export function DashboardSection() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 animate-in">
      {/* Alert banner */}
      <div className="flex items-center gap-4 rounded-xl px-5 py-4 bg-[var(--color-surface)] border-l-4 border-l-[var(--color-primary)] shadow-md">
        <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0 text-white shadow-[0_0_15px_rgba(255,102,0,0.4)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-[14px] font-bold text-white mb-0.5">Atención inmediata requerida</h3>
          <p className="text-[13px] text-[var(--color-text-dim)]">
            Tienes <strong className="text-white">4 trámites</strong> que requieren atención inmediata por inactividad prolongada.
          </p>
        </div>
        <button
          onClick={() => navigate('/tramites')}
          className="btn-primary px-5 py-2.5 text-[13px]"
        >
          Revisar ahora
        </button>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard 
          label="Trámites activos" 
          value="34" 
          sub={<><TrendingUp size={12} className="mr-0.5" /> +3 esta semana</>} 
          subColor="var(--color-teal)" 
          icon={<FileCheck2 size={16} className="text-[var(--color-primary)]" />} 
        />
        <MetricCard 
          label="Aprobados este mes" 
          value="8" 
          sub="Actas generadas correctamente" 
          icon={<BadgeCheck size={16} className="text-[var(--color-teal)]" />} 
        />
        <MetricCard 
          label="Pendientes revisión" 
          value="12" 
          sub={<><AlertCircle size={12} className="mr-0.5" /> 4 con alerta</>} 
          subColor="var(--color-primary)" 
          icon={<History size={16} className="text-[var(--color-text-dim)]" />} 
        />
        <MetricCard 
          label="Docs SharePoint" 
          value="214" 
          sub="14 GB utilizados" 
          icon={<Cloud size={16} className="text-[var(--color-text-dim)]" />} 
        />
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Recent tramites table */}
        <div className="xl:col-span-2 card overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] bg-transparent">
            <h2 className="text-[15px] font-bold text-[var(--color-text)] tracking-tight">Trámites recientes</h2>
            <button onClick={() => navigate('/tramites')} className="btn-ghost text-[11px] font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-transparent">
              Ver todos los trámites →
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-premium flex-1">
            <table className="w-full border-collapse" style={{ minWidth: 500 }}>
              <thead>
                <tr>
                  {['Estudiante','Cédula','Modalidad','Estado','Última act.'].map(h => (
                    <th key={h} className="th text-[9px] uppercase tracking-widest text-[var(--color-text-dim)] font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRAMITES.slice(0, 6).map(row => (
                  <tr
                    key={row.id}
                    className="cursor-pointer transition-colors group border-b border-[var(--color-border)]/50 last:border-0 hover:bg-[var(--color-bg)]/50"
                    onClick={() => navigate('/trazabilidad')}
                  >
                    <td className="td font-bold text-[13px] text-[var(--color-text)] group-hover:text-[var(--color-primary)] py-4">{row.name}</td>
                    <td className="td font-bold text-[12px] text-[var(--color-teal)] py-4">{row.cc}</td>
                    <td className="td text-[var(--color-text-muted)] text-[12px] truncate max-w-[140px] py-4">{row.mod}</td>
                    <td className="td py-4"><StatusBadge status={row.status} /></td>
                    <td className="td text-[var(--color-text-dim)] font-medium text-[11px] whitespace-nowrap italic py-4">{row.t}</td>
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
          
          <div className="mt-8 p-4 bg-[var(--color-bg)]/50 rounded-xl flex items-start gap-3 border border-[var(--color-border)]/50">
            <div className="mt-0.5 text-[var(--color-text-dim)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
            </div>
            <p className="text-[10px] text-[var(--color-text-dim)] leading-relaxed italic pr-2">
              Los datos se actualizan automáticamente cada vez que un trámite cambia de estado en SharePoint.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
