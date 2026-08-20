import { useEffect, useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import { HardDrive } from 'lucide-react'
import { useAppStore } from '@/stores/app.store'
import {
  processesApi,
  documentsApi,
  resolveFileUrl,
  ApiError,
  type ProcessDocumentOut,
} from '@/lib/api'
import { formatRelativeDate } from '@/utils/format'

interface Row extends ProcessDocumentOut {
  studentName: string
}

const STATUS_BADGE: Record<ProcessDocumentOut['status'], { label: string; variant: 'green' | 'orange' | 'red' }> = {
  aprobado: { label: 'Aprobado', variant: 'green' },
  pendiente: { label: 'Pendiente', variant: 'orange' },
  rechazado: { label: 'Rechazado', variant: 'red' },
}

export function DocumentosSection() {
  const accessToken = useAppStore((s) => s.accessToken)
  const [rows, setRows] = useState<Row[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!accessToken) return
    setIsLoading(true)
    setError(null)
    processesApi
      .list(accessToken)
      .then(async (processes) => {
        const perProcess = await Promise.all(
          processes.map((p) =>
            documentsApi
              .listForProcess(accessToken, p.public_id)
              .then((docs) => docs.map((d) => ({ ...d, studentName: p.student.full_name })))
          )
        )
        setRows(perProcess.flat().sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()))
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : 'No se pudieron cargar los documentos'))
      .finally(() => setIsLoading(false))
  }, [accessToken])

  return (
    <div className="animate-in">
      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-bg)]/30 flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[var(--color-text)] tracking-tight">Documentos</h2>
            <p className="text-[12px] text-[var(--color-text-muted)] mt-0.5">
              Documentos cargados en todos los trámites visibles para tu rol
            </p>
          </div>
        </div>

        {/* Storage status -- honesto: hoy es almacenamiento local de desarrollo,
            no SharePoint (bloqueado por credenciales de TI, ver README) */}
        <div className="mx-6 mt-5 mb-4 flex items-center gap-3 px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl">
          <HardDrive size={16} className="text-[var(--color-text-dim)] flex-shrink-0" />
          <span className="text-[12px] text-[var(--color-text-muted)] font-bold">
            Almacenamiento local de desarrollo · SharePoint pendiente de credenciales institucionales
          </span>
        </div>

        {error && (
          <p className="mx-6 mb-4 text-[12.5px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <div className="overflow-x-auto scrollbar-premium">
          {isLoading ? (
            <p className="px-6 py-8 text-[12.5px] text-[var(--color-text-dim)]">Cargando documentos…</p>
          ) : rows.length === 0 ? (
            <p className="px-6 py-8 text-[12.5px] text-[var(--color-text-dim)]">
              Nadie ha cargado documentos todavía. Súbelos desde la trazabilidad de un trámite.
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['Archivo', 'Estudiante', 'Tipo', 'Estado', 'Fecha', 'Acciones'].map((h) => (
                    <th key={h} className="th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((doc) => (
                  <tr key={doc.public_id} className="group">
                    <td className="td font-bold text-[var(--color-text)]">{doc.file_name}</td>
                    <td className="td text-[var(--color-text-muted)]">{doc.studentName}</td>
                    <td className="td text-[var(--color-text-muted)]">{doc.document_type.name}</td>
                    <td className="td"><Badge variant={STATUS_BADGE[doc.status].variant}>{STATUS_BADGE[doc.status].label}</Badge></td>
                    <td className="td text-[var(--color-text-dim)] font-medium">{formatRelativeDate(doc.uploaded_at)}</td>
                    <td className="td">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-bold"
                        onClick={() => window.open(resolveFileUrl(doc.download_url), '_blank')}
                      >
                        Ver documento
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  )
}
