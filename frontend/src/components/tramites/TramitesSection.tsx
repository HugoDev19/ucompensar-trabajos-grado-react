import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, Button } from '@/components/ui'
import { EstadoBadge } from '@/components/ui/Badge'
import { Select } from '@/components/ui/Input'
import { MOCK_TRAMITES } from '@/utils/mock-data'
import { MODALIDADES } from '@/constants'

export function TramitesSection() {
  const navigate = useNavigate()
  return (
    <div className="animate-in">
      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-bg)]/30 flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[var(--color-text)] tracking-tight">Todos los trámites</h2>
            <p className="text-[12px] text-[var(--color-text-muted)] mt-0.5">Actualmente hay <span className="font-bold text-[var(--brand-orange)]">34 trámites</span> en proceso.</p>
          </div>
          <div className="flex gap-3">
            <Select className="w-48">
              <option>Todas las modalidades</option>
              {MODALIDADES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </Select>
            <Button size="sm" className="font-bold">Exportar .xlsx</Button>
          </div>
        </div>
        
        <div className="overflow-x-auto scrollbar-premium">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Cédula', 'Estudiante', 'Modalidad', 'Programa', 'Estado', 'Acciones'].map((h) => (
                  <th key={h} className="th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_TRAMITES.map((t) => (
                <tr key={t.id} className="group cursor-default">
                  <td className="td font-bold text-[var(--brand-green)]">{t.cedula}</td>
                  <td className="td font-bold text-[var(--color-text)]">{t.estudiante}</td>
                  <td className="td text-[var(--color-text-muted)]">{t.modalidad}</td>
                  <td className="td text-[var(--color-text-muted)] truncate max-w-[150px]">{t.programa}</td>
                  <td className="td"><EstadoBadge estado={t.estado} /></td>
                  <td className="td text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-bold"
                      onClick={() => navigate('/trazabilidad')}
                    >
                      Ver detalle
                    </Button>
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
