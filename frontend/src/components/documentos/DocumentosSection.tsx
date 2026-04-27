import { Card, Button } from '@/components/ui'
import { TipoBadge } from '@/components/ui/Badge'
import { MOCK_DOCUMENTOS } from '@/utils/mock-data'
import { CheckCircle } from 'lucide-react'

export function DocumentosSection() {
  return (
    <div className="animate-in">
      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-bg)]/30 flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[var(--color-text)] tracking-tight">Documentos — SharePoint</h2>
            <p className="text-[12px] text-[var(--color-text-muted)] mt-0.5">Repositorio institucional UCompensar</p>
          </div>
          <Button size="sm" className="font-bold">+ Subir documento</Button>
        </div>

        {/* SharePoint status */}
        <div className="mx-6 mt-5 mb-4 flex items-center gap-3 px-4 py-3 bg-[var(--brand-green-soft)] border border-[var(--brand-green)]/20 rounded-xl">
          <CheckCircle size={16} className="text-[var(--brand-green)] flex-shrink-0" />
          <span className="text-[12px] text-[var(--brand-green)] font-bold">
            Conectado · unipanamericanaeduco.sharepoint.com
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-premium">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Archivo', 'Estudiante', 'Tipo', 'Fecha', 'Acciones'].map((h) => (
                  <th key={h} className="th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_DOCUMENTOS.map((doc) => (
                <tr key={doc.id} className="group">
                  <td className="td font-bold text-[var(--color-text)]">{doc.nombre}</td>
                  <td className="td text-[var(--color-text-muted)]">{doc.estudiante}</td>
                  <td className="td"><TipoBadge tipo={doc.tipo} /></td>
                  <td className="td text-[var(--color-text-dim)] font-medium">{doc.fecha}</td>
                  <td className="td">
                    <Button variant="outline" size="sm" className="font-bold">Ver OneDrive</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
