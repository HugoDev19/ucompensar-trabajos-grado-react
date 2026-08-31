import { useEffect, useState, useRef } from 'react'
import {
  X,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  File as FileGeneric,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  AlertCircle,
  FileQuestion,
} from 'lucide-react'
import { renderAsync } from 'docx-preview'
import { Badge, Button } from '@/components/ui'
import { resolveFileUrl } from '@/services/http'

export interface ViewerDocument {
  public_id?: string
  file_name: string
  download_url: string
  studentName?: string
  documentType?: string
  version?: number
  status?: 'pendiente' | 'aprobado' | 'rechazado'
}

interface DocumentViewerModalProps {
  isOpen: boolean
  onClose: () => void
  document: ViewerDocument | null
  canReview?: boolean
  onApprove?: (doc: ViewerDocument) => Promise<void> | void
  onReject?: (doc: ViewerDocument, comment: string) => Promise<void> | void
  isReviewing?: boolean
}

const STATUS_BADGE: Record<'aprobado' | 'pendiente' | 'rechazado', { label: string; variant: 'green' | 'orange' | 'red' }> = {
  aprobado: { label: 'Aprobado', variant: 'green' },
  pendiente: { label: 'Pendiente', variant: 'orange' },
  rechazado: { label: 'Rechazado', variant: 'red' },
}

function getFileExtension(filename: string): string {
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop()!.toLowerCase() : ''
}

type DocCategory = 'pdf' | 'image' | 'word' | 'excel' | 'text' | 'other'

function getCategory(ext: string): DocCategory {
  if (ext === 'pdf') return 'pdf'
  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext)) return 'image'
  if (['doc', 'docx'].includes(ext)) return 'word'
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'excel'
  if (['txt', 'json', 'md'].includes(ext)) return 'text'
  return 'other'
}

// Subcomponent: Renderizador nativo de documentos Microsoft Word en el navegador
function DocxRenderer({ url, fileName }: { url: string; fileName: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(url, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`No se pudo descargar el archivo (${res.status})`)
        return res.arrayBuffer()
      })
      .then((buffer) => {
        if (cancelled || !containerRef.current) return
        containerRef.current.innerHTML = ''
        return renderAsync(buffer, containerRef.current, undefined, {
          className: 'docx-preview-rendered',
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          useBase64URL: true,
        })
      })
      .then(() => {
        if (!cancelled) setLoading(false)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Error al procesar el archivo Word')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [url])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 h-full gap-3 bg-[var(--color-bg)]/30">
        <div className="w-8 h-8 border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-[13px] font-semibold text-[var(--color-text-muted)]">
          Cargando y renderizando documento Word en línea…
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-full bg-[var(--color-bg)]/30">
        <AlertCircle size={44} className="text-amber-500 mb-3" />
        <h3 className="text-[16px] font-bold text-[var(--color-text)] mb-1">
          No se pudo renderizar la vista previa directa de Word
        </h3>
        <p className="text-[13px] text-[var(--color-text-muted)] max-w-md mb-6">
          {error.includes('zip') || error.includes('format')
            ? 'El archivo puede estar en formato binario antiguo (.doc) o requerir Microsoft Word.'
            : error}
        </p>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              const a = window.document.createElement('a')
              a.href = url
              a.download = fileName
              a.target = '_blank'
              window.document.body.appendChild(a)
              a.click()
              window.document.body.removeChild(a)
            }}
            className="font-bold flex items-center gap-2"
          >
            <Download size={15} /> Descargar archivo
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`, '_blank')}
            className="font-bold flex items-center gap-2"
          >
            <ExternalLink size={15} /> Abrir con Office Online
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-auto bg-zinc-800/40 dark:bg-black/60 p-3 md:p-8 flex justify-center scrollbar-premium">
      <div
        ref={containerRef}
        className="w-full max-w-4xl bg-white text-zinc-900 rounded-xl shadow-2xl overflow-hidden p-6 md:p-12 [&_.docx-preview-rendered]:w-full [&_.docx-wrapper]:bg-transparent [&_.docx-wrapper]:p-0 [&_.docx]:shadow-none [&_.docx]:mb-8 [&_.docx]:bg-white [&_.docx]:text-zinc-900"
      />
    </div>
  )
}

export function DocumentViewerModal({
  isOpen,
  onClose,
  document: doc,
  canReview = false,
  onApprove,
  onReject,
  isReviewing = false,
}: DocumentViewerModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [imageZoom, setImageZoom] = useState(1)
  const [isRejecting, setIsRejecting] = useState(false)
  const [rejectComment, setRejectComment] = useState('')
  const [loadError, setLoadError] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Reset states on document change or open
  useEffect(() => {
    if (isOpen) {
      setImageZoom(1)
      setIsRejecting(false)
      setRejectComment('')
      setLoadError(false)
    }
  }, [isOpen, doc?.download_url])

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isRejecting) {
          setIsRejecting(false)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isRejecting, onClose])

  if (!isOpen || !doc) return null

  const rawUrl = resolveFileUrl(doc.download_url)
  const ext = getFileExtension(doc.file_name)
  const category = getCategory(ext)

  const handleDownload = () => {
    const a = window.document.createElement('a')
    a.href = rawUrl
    a.download = doc.file_name
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    window.document.body.appendChild(a)
    a.click()
    window.document.body.removeChild(a)
  }

  const handleOpenExternal = () => {
    window.open(rawUrl, '_blank', 'noopener,noreferrer')
  }

  const renderFileIcon = () => {
    switch (category) {
      case 'pdf':
        return <FileText className="text-red-500" size={20} />
      case 'word':
        return <FileText className="text-blue-600" size={20} />
      case 'excel':
        return <FileSpreadsheet className="text-emerald-600" size={20} />
      case 'image':
        return <ImageIcon className="text-purple-500" size={20} />
      default:
        return <FileGeneric className="text-zinc-500" size={20} />
    }
  }

  const renderViewerBody = () => {
    if (loadError) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center h-full">
          <AlertCircle size={44} className="text-amber-500 mb-3" />
          <h3 className="text-[16px] font-bold text-[var(--color-text)] mb-1">No se pudo cargar la vista previa directa</h3>
          <p className="text-[13px] text-[var(--color-text-muted)] max-w-md mb-6">
            El archivo puede requerir permisos de descarga o estar en un formato no previsualizable directamente en este navegador.
          </p>
          <div className="flex gap-3">
            <Button onClick={handleDownload} className="font-bold flex items-center gap-2">
              <Download size={15} /> Descargar archivo
            </Button>
            <Button variant="outline" onClick={handleOpenExternal} className="font-bold flex items-center gap-2">
              <ExternalLink size={15} /> Abrir en nueva pestaña
            </Button>
          </div>
        </div>
      )
    }

    switch (category) {
      case 'pdf':
        return (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative">
            <iframe
              src={`${rawUrl}#toolbar=1&navpanes=1&view=FitH`}
              title={doc.file_name}
              className="w-full h-full border-0"
              onError={() => setLoadError(true)}
            />
          </div>
        )

      case 'word':
        return <DocxRenderer url={rawUrl} fileName={doc.file_name} />

      case 'image':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950/90 overflow-auto p-4 relative">
            {/* Image zoom controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur px-2.5 py-1.5 rounded-xl border border-white/10 text-white">
              <button
                onClick={() => setImageZoom((z) => Math.min(z + 0.25, 3))}
                className="p-1 hover:text-[var(--color-primary)] transition-colors"
                title="Aumentar zoom"
              >
                <ZoomIn size={16} />
              </button>
              <span className="text-[11px] font-mono px-1 font-bold">{Math.round(imageZoom * 100)}%</span>
              <button
                onClick={() => setImageZoom((z) => Math.max(z - 0.25, 0.5))}
                className="p-1 hover:text-[var(--color-primary)] transition-colors"
                title="Reducir zoom"
              >
                <ZoomOut size={16} />
              </button>
              <div className="w-px h-3.5 bg-white/20 mx-0.5" />
              <button
                onClick={() => setImageZoom(1)}
                className="p-1 hover:text-[var(--color-primary)] transition-colors"
                title="Restablecer tamaño"
              >
                <RotateCcw size={15} />
              </button>
            </div>

            <img
              src={rawUrl}
              alt={doc.file_name}
              style={{ transform: `scale(${imageZoom})`, transition: 'transform 0.15s ease-out' }}
              className="max-h-[85vh] max-w-full object-contain select-none shadow-2xl rounded-md"
              onError={() => setLoadError(true)}
            />
          </div>
        )

      case 'excel':
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center h-full bg-[var(--color-bg)]/40">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center mb-5 shadow-sm">
              <FileSpreadsheet className="text-emerald-600 dark:text-emerald-400" size={38} />
            </div>

            <h3 className="text-[17px] font-bold text-[var(--color-text)] mb-1">{doc.file_name}</h3>
            <p className="text-[13px] text-[var(--color-text-muted)] max-w-md mb-6 leading-relaxed">
              Hoja de cálculo de Microsoft Excel. Puedes descargarla directamente para abrirla en tu equipo o previsualizarla con Office Online.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={handleDownload} size="lg" className="font-bold flex items-center gap-2">
                <Download size={16} /> Descargar Excel
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open(
                    `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(rawUrl)}`,
                    '_blank'
                  )
                }
                className="font-bold flex items-center gap-2"
              >
                <ExternalLink size={16} /> Abrir con Office Online
              </Button>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center h-full">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center mb-4">
              <FileQuestion className="text-[var(--color-text-dim)]" size={32} />
            </div>
            <h3 className="text-[16px] font-bold text-[var(--color-text)] mb-1">{doc.file_name}</h3>
            <p className="text-[12.5px] text-[var(--color-text-muted)] max-w-sm mb-5">
              Tipo de archivo: <span className="font-mono font-bold uppercase">{ext || 'desconocido'}</span>
            </p>
            <div className="flex gap-3">
              <Button onClick={handleDownload} className="font-bold flex items-center gap-2">
                <Download size={15} /> Descargar archivo
              </Button>
              <Button variant="outline" onClick={handleOpenExternal} className="font-bold flex items-center gap-2">
                <ExternalLink size={15} /> Abrir en navegador
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in p-3 md:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={modalRef}
        className={`bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen ? 'w-full h-full max-w-none rounded-none' : 'w-full max-w-5xl h-[90vh]'
        }`}
      >
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] flex-shrink-0">
              {renderFileIcon()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-[14px] font-bold text-[var(--color-text)] truncate max-w-xs md:max-w-md">
                  {doc.file_name}
                </h2>
                {doc.status && (
                  <Badge variant={STATUS_BADGE[doc.status].variant}>
                    {STATUS_BADGE[doc.status].label}
                  </Badge>
                )}
                {doc.version && (
                  <span className="text-[11px] font-bold text-[var(--color-text-dim)] bg-[var(--color-bg)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">
                    v{doc.version}
                  </span>
                )}
              </div>
              <p className="text-[11.5px] text-[var(--color-text-muted)] truncate mt-0.5">
                {doc.studentName && <span>Estudiante: <strong className="text-[var(--color-text)]">{doc.studentName}</strong> · </span>}
                {doc.documentType && <span>Tipo: {doc.documentType}</span>}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="font-bold hidden sm:flex items-center gap-1.5"
              title="Descargar archivo a tu equipo"
            >
              <Download size={14} /> Descargar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenExternal}
              className="font-bold hidden sm:flex items-center gap-1.5"
              title="Abrir en pestaña nueva"
            >
              <ExternalLink size={14} /> Nueva pestaña
            </Button>
            <button
              onClick={() => setIsFullscreen((f) => !f)}
              className="p-2 rounded-lg text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[var(--color-text-dim)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              title="Cerrar visor (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Viewport */}
        <div className="flex-1 overflow-hidden relative bg-[var(--color-bg)]/20">{renderViewerBody()}</div>

        {/* Modal Review Bottom Bar (if role can review & status is pendiente) */}
        {canReview && doc.status === 'pendiente' && (
          <div className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
            {isRejecting ? (
              <div className="flex-1 flex items-center gap-2 animate-in">
                <span className="text-[12px] font-bold text-red-700 dark:text-red-400 flex-shrink-0">
                  Motivo de rechazo:
                </span>
                <input
                  autoFocus
                  type="text"
                  maxLength={300}
                  value={rejectComment}
                  onChange={(e) => setRejectComment(e.target.value)}
                  placeholder="Ej. El documento no contiene las firmas requeridas…"
                  className="flex-1 text-[12px] px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-red-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && onReject) {
                      onReject(doc, rejectComment)
                    }
                  }}
                />
                <Button
                  size="sm"
                  className="font-bold bg-red-600 text-white hover:bg-red-700 flex-shrink-0"
                  disabled={isReviewing}
                  onClick={() => onReject && onReject(doc, rejectComment)}
                >
                  Confirmar Rechazo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold flex-shrink-0"
                  onClick={() => setIsRejecting(false)}
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <>
                <div className="text-[12px] text-[var(--color-text-muted)] font-medium">
                  ¿Has revisado este documento? Puedes aprobarlo o solicitar correcciones directamente.
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-bold text-green-700 dark:text-green-400 border-green-300 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/40 flex items-center gap-1.5"
                    disabled={isReviewing}
                    onClick={() => onApprove && onApprove(doc)}
                  >
                    <Check size={14} /> Aprobar Documento
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-bold text-red-700 dark:text-red-400 border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-1.5"
                    disabled={isReviewing}
                    onClick={() => setIsRejecting(true)}
                  >
                    <X size={14} /> Rechazar
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}