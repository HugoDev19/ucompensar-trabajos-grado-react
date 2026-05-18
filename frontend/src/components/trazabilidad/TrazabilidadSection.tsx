import { useState } from 'react'
import { CheckCircle2, XCircle, Upload, FolderOpen, Send } from 'lucide-react'
import { StatusBadge } from '@/components/ui/Badge'
import { AUDIT_LOG, C } from '@/data'

const STEPS = [
  'Radicado',
  'Docs cargados',
  'Revisión coord.',
  'Consejo',
  'Acta resolución',
]

const DOCS = [
  { name: 'Anteproyecto_LauraPinzon_v2.pdf', status: 'approved', size: '2.4 MB' },
  { name: 'Carta_aval_director.pdf', status: 'pending', size: 'Sin cargar' },
  { name: 'Paz_y_salvo_academico.pdf', status: 'pending', size: 'Sin cargar' },
]

const CURRENT_STEP = 2

export function TrazabilidadSection() {
  const [tab, setTab] = useState('docs')
  const [comment, setComment] = useState('')

  return (
    <div className="max-w-4xl space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="section-title">Laura Pinzón — Proyecto de grado</h1>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className="font-mono font-bold text-xs" style={{ color: C.green }}>CC 1020482311</span>
            <span className="text-zinc-300">·</span>
            <span className="text-xs text-zinc-500">Ing. Sistemas · 9.° sem.</span>
            <StatusBadge status="en-revision" />
          </div>
        </div>
        <button className="btn-primary gap-2">
          <Send size={14} /> Enviar a consejo
        </button>
      </div>

      {/* Step indicator */}
      <div className="card p-5 overflow-x-auto">
        <div className="flex items-start" style={{ minWidth: 380 }}>
          {STEPS.map((step, i) => {
            const done = i < CURRENT_STEP
            const act = i === CURRENT_STEP
            return (
              <div key={step} className="flex-1 flex flex-col items-center relative">
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute top-3 left-1/2 w-full h-0.5 z-0 transition-colors"
                    style={{ background: done ? C.green : 'var(--color-border)' }}
                  />
                )}
                <div
                  className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                  style={{
                    background: done ? C.green : act ? C.orange : 'var(--color-surface)',
                    color: done || act ? '#fff' : 'var(--color-text-dim)',
                    border: !done && !act ? '2px solid var(--color-border)' : 'none',
                    boxShadow: act ? `0 0 0 4px ${C.orangeL}` : 'none',
                  }}
                >
                  {done ? <CheckCircle2 size={13} /> : i + 1}
                </div>
                <span
                  className="mt-2 text-[10px] text-center leading-tight max-w-[64px]"
                  style={{
                    color: act ? C.orange : done ? C.green : 'var(--color-text-dim)',
                    fontWeight: act || done ? 600 : 400,
                  }}
                >
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)]">
        {[['docs', `Documentos (${DOCS.length})`], ['audit', `Trazabilidad (${AUDIT_LOG.length})`]].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className="px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors"
            style={{
              borderColor: tab === k ? C.orange : 'transparent',
              color: tab === k ? C.orange : 'var(--color-text-muted)',
              background: 'transparent',
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Documents tab */}
      {tab === 'docs' && (
        <div className="space-y-3 animate-fadeIn">
          {/* Upload zone */}
          <label
            className="flex items-center justify-center gap-2.5 p-5 rounded-xl cursor-pointer transition-all"
            style={{ border: '2px dashed var(--color-border)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.background = 'var(--color-primary-soft)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.background = 'transparent' }}
          >
            <Upload size={16} className="text-zinc-400" />
            <span className="text-sm text-zinc-400">Haz clic para subir un documento a SharePoint</span>
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
          </label>

          {/* Document list */}
          {DOCS.map(doc => (
            <div
              key={doc.name}
              className="card flex items-center gap-3 px-4 py-3.5"
              style={{ borderLeft: `3px solid ${doc.status === 'approved' ? C.green : 'var(--color-border)'}` }}
            >
              <FolderOpen size={15} className="text-zinc-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text)] truncate">{doc.name}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{doc.size}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {doc.status === 'approved' && (
                  <>
                    <CheckCircle2 size={15} style={{ color: C.green }} />
                    <span className="badge" style={{ background: C.greenL, color: C.green }}>Aprobado</span>
                  </>
                )}
                {doc.status === 'pending' && (
                  <>
                    <button className="p-1.5 rounded-lg transition-colors hover:bg-green-50/10" style={{ color: C.green }}>
                      <CheckCircle2 size={18} />
                    </button>
                    <button className="p-1.5 rounded-lg transition-colors hover:bg-red-50/10 text-red-500">
                      <XCircle size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Review comment */}
          <div className="card p-4">
            <label className="field-label mb-2">Comentario de revisión (opcional)</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Escribe un comentario para el estudiante…"
              rows={2}
              className="field-input resize-none"
            />
          </div>
        </div>
      )}

      {/* Audit tab */}
      {tab === 'audit' && (
        <div className="card overflow-hidden animate-fadeIn">
          {AUDIT_LOG.map((entry, i) => (
            <div
              key={i}
              className="flex gap-3.5 px-5 py-4"
              style={{ borderTop: i > 0 ? '1px solid var(--color-border)' : 'none' }}
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-2.5 h-2.5 rounded-full mt-1"
                  style={{ background: entry.dot }}
                />
                {i < AUDIT_LOG.length - 1 && (
                  <div className="w-px flex-1 bg-[var(--color-border)] mt-1.5" />
                )}
              </div>
              <div className="pb-2 min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text)]">{entry.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{entry.sub}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
