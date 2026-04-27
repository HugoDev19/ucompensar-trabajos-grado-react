import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge, EstadoBadge } from '@/components/ui'
import { Input } from '@/components/ui/Input'
import { MOCK_TRAMITES } from '@/utils/mock-data'

export function BuscarSection() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('1020482311')
  const tramite = MOCK_TRAMITES[0]

  return (
    <div className="animate-fade-in max-w-[480px]">
      <Card className="mb-3">
        <h3 className="text-[12.5px] font-bold text-neutral-text mb-3">
          Buscar por cédula
        </h3>
        <div className="flex gap-2">
          <Input
            className="flex-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Número de cédula..."
          />
          <Button size="md">Buscar</Button>
        </div>
      </Card>

      <Card>
        {/* Student header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-border">
          <div className="w-10 h-10 rounded-full bg-brand-orange-light flex items-center justify-center text-[13px] font-bold text-brand-orange">
            LP
          </div>
          <div>
            <div className="text-[13.5px] font-bold">{tramite.estudiante} Sánchez</div>
            <div className="text-[10.5px] text-neutral-muted">
              CC {tramite.cedula} · {tramite.programa} · {tramite.semestre}
            </div>
          </div>
          <Badge variant="green" className="ml-auto">
            Activa
          </Badge>
        </div>

        {/* Tramite card */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-neutral-bg rounded-lg border-l-[3px] border-l-brand-orange">
          <div>
            <div className="text-[12px] font-semibold">{tramite.modalidad}</div>
            <div className="text-[10px] text-neutral-muted">
              Iniciado: 12 mar 2026 · 1/4 docs
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <EstadoBadge estado={tramite.estado} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/trazabilidad')}
            >
              Ver
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
