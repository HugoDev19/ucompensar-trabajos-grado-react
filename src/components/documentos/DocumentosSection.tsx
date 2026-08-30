import { Fragment, useEffect, useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import { Check, X, ShieldCheck } from 'lucide-react'
import { canReviewDocuments } from '@/config/access'
import { useAppStore } from '@/stores/app.store'
import { ApiError, resolveFileUrl } from '@/services/http'
import { documentsApi, type ProcessDocumentOut } from '@/services/documents.service'
import { processesApi } from '@/services/processes.service'
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
  const currentUser = useAppStore((s) => s.currentUser)
  const canReview = currentUser ? canReviewDocuments(currentUser.role) : false

  const [rows, setRows] = useState<Row[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fila en la que se está confirmando un rechazo (con su comentario) --
  // solo una a la vez, es la interacción más simple sin meter un modal
  // nuevo solo para esto.
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [rejectComment, setRejectComment] = useState('')
  const [reviewingId, setReviewingId] = useState<string | null>(null)
  const [reviewError, setReviewError] = useState<string | null>(null)

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

  async function handleApprove(doc: Row) {
    if (!accessToken) return
    setReviewError(null)
    setReviewingId(doc.public_id)
    try {
      const updated = await documentsApi.review(accessToken, doc.public_id, 'aprobado')
      setRows((prev) => prev.map((r) => (r.public_id === doc.public_id ? { ...r, ...updated } : r)))
    } catch (err) {
      setReviewError(err instanceof ApiError ? err.message : 'No se pudo aprobar el documento')
    } finally {
      setReviewingId(null)
    }
  }

  async function handleReject(doc: Row) {
    if (!accessToken) return
    setReviewError(null)
    setReviewingId(doc.public_id)
    try {
      const updated = await documentsApi.review(accessToken, doc.public_id, 'rechazado', rejectComment.trim() || undefined)
      setRows((prev) => prev.map((r) => (r.public_id === doc.public_id ? { ...r, ...updated } : r)))
      setRejectingId(null)
      setRejectComment('')
    } catch (err) {
      setReviewError(err instanceof ApiError ? err.message : 'No se pudo rechazar el documento')
    } finally {
      setReviewingId(null)
    }
  }

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

        <div className="mx-6 mt-5 mb-4 flex items-center gap-3 px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl">
          <ShieldCheck size={16} className="text-[var(--color-text-dim)] flex-shrink-0" />
          <span className="text-[12px] text-[var(--color-text-muted)] font-bold">
            Almacenamiento privado en Cloudflare R2 · cada descarga usa un enlace firmado con vencimiento
          </span>
        </div>

        {error && (
          <p className="mx-6 mb-4 text-[12.5px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </p>
        )}
        {reviewError && (
          <p className="mx-6 mb-4 text-[12.5px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {reviewError}
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
                  <Fragment key={doc.public_id}>
                    <tr className="group">
                      <td className="td font-bold text-[var(--color-text)]">{doc.file_name}</td>
                      <td className="td text-[var(--color-text-muted)]">{doc.studentName}</td>
                      <td className="td text-[var(--color-text-muted)]">{doc.document_type.name}</td>
                      <td className="td"><Badge variant={STATUS_BADGE[doc.status].variant}>{STATUS_BADGE[doc.status].label}</Badge></td>
                      <td className="td text-[var(--color-text-dim)] font-medium">{formatRelativeDate(doc.uploaded_at)}</td>
                      <td className="td">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-bold"
                            onClick={() => window.open(resolveFileUrl(doc.download_url), '_blank')}
                          >
                            Ver documento
                          </Button>

                          {canReview && doc.status === 'pendiente' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="font-bold text-green-700 border-green-300 hover:bg-green-50"
                                disabled={reviewingId === doc.public_id}
                                onClick={() => handleApprove(doc)}
                              >
                                <Check size={14} /> Aprobar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="font-bold text-red-700 border-red-300 hover:bg-red-50"
                                disabled={reviewingId === doc.public_id}
                                onClick={() => {
                                  setRejectingId(doc.public_id)
                                  setRejectComment('')
                                  setReviewError(null)
                                }}
                              >
                                <X size={14} /> Rechazar
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>

                    {rejectingId === doc.public_id && (
                      <tr>
                        <td colSpan={6} className="td bg-red-50/50">
                          <div className="flex items-center gap-3 py-1">
                            <span className="text-[12px] font-bold text-red-700 flex-shrink-0">
                              Motivo del rechazo (opcional):
                            </span>
                            <input
                              autoFocus
                              type="text"
                              maxLength={300}
                              value={rejectComment}
                              onChange={(e) => setRejectComment(e.target.value)}
                              placeholder="Ej. Falta la firma del director…"
                              className="flex-1 text-[12.5px] px-3 py-1.5 rounded-lg border border-red-200 bg-white outline-none focus:border-red-400"
                            />
                            <Button
                              size="sm"
                              className="font-bold bg-red-600 text-white hover:bg-red-700 flex-shrink-0"
                              disabled={reviewingId === doc.public_id}
                              onClick={() => handleReject(doc)}
                            >
                              Confirmar rechazo
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="font-bold flex-shrink-0"
                              onClick={() => setRejectingId(null)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  )
}
