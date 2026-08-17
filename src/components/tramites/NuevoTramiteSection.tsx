import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Input, Select } from '@/components/ui/Input'
import { MODALIDADES, CARRERAS, SEMESTRES } from '@/constants'
import { cn } from '@/utils/cn'
import { PlusCircle, Check } from 'lucide-react'
import { useState } from 'react'

const docList = [
  { label: 'Anteproyecto aprobado', estado: 'cargado' as const },
  { label: 'Carta aval del director', estado: 'pendiente' as const },
  { label: 'Paz y salvo académico', estado: 'sin-cargar' as const },
]

export function NuevoTramiteSection() {
  const [formData, setFormData] = useState({
    cedula: '1020482311',
    nombre: 'Laura Pinzón Sánchez',
    carrera: 'Ingeniería de Sistemas',
    semestre: '9.° semestre',
    modalidad: 'Proyecto de grado',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="animate-fade-in space-y-4 max-w-[700px]">
      <Card>
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] -mx-4 -mt-4 mb-6 px-5 py-4 rounded-t-xl flex items-center gap-2.5 shadow-md">
          <PlusCircle size={18} stroke="white" />
          <span className="text-[14px] font-bold text-white tracking-tight">
            Radicar nuevo trámite
          </span>
        </div>

        {/* Personal Information */}
        <div className="mb-6 pb-6 border-b border-neutral-border">
          <h3 className="text-[11px] font-bold text-neutral-muted uppercase tracking-wide mb-3.5">
            Información Personal
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Cédula"
              name="cedula"
              value={formData.cedula}
              onChange={handleInputChange}
            />
            <Input
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="mb-6 pb-6 border-b border-neutral-border">
          <h3 className="text-[11px] font-bold text-neutral-muted uppercase tracking-wide mb-3.5">
            Información Académica
          </h3>
          <div className="flex flex-col gap-3">
            {/* Carrera Selector */}
            <div>
              <label className="text-[9.5px] font-bold text-neutral-muted uppercase tracking-wide block mb-1">
                Carrera
              </label>
              <Select
                name="carrera"
                value={formData.carrera}
                onChange={handleInputChange}
                className="w-full"
              >
                {CARRERAS.map((carrera) => (
                  <option key={carrera} value={carrera}>
                    {carrera}
                  </option>
                ))}
              </Select>
            </div>

            {/* Semestres Grid */}
            <div>
              <label className="text-[9.5px] font-bold text-neutral-muted uppercase tracking-wide block mb-3">
                Semestre académico
              </label>
              <div className="grid grid-cols-5 gap-2.5">
                {SEMESTRES.map((sem) => {
                  const num = sem.split('.')[0]
                  const isActive = formData.semestre === sem
                  return (
                    <button
                      key={sem}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, semestre: sem }))
                      }
                      className={cn(
                        'py-3.5 px-2.5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-1 group relative overflow-hidden cursor-pointer outline-none',
                        isActive
                          ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white border-transparent shadow-[0_8px_20px_-6px_rgba(255,102,0,0.4)] scale-[1.03]'
                          : 'bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-bg)] hover:scale-[1.02]'
                      )}
                    >
                      <span className={cn(
                        'text-[18px] font-extrabold font-display leading-none transition-transform group-hover:scale-110',
                        isActive ? 'text-white' : 'text-[var(--color-text)]'
                      )}>
                        {num}
                      </span>
                      <span className={cn(
                        'text-[8px] uppercase tracking-wider font-bold transition-colors',
                        isActive ? 'text-white/80' : 'text-[var(--color-text-dim)] group-hover:text-[var(--color-text-muted)]'
                      )}>
                        Semestre
                      </span>
                      {isActive && (
                        <div className="absolute top-1 right-1.5 w-2 h-2 bg-white rounded-full ring-2 ring-[var(--color-primary)]" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Modalidad */}
        <div className="mb-6 pb-6 border-b border-neutral-border">
          <h3 className="text-[11px] font-bold text-neutral-muted uppercase tracking-wide mb-3.5">
            Tipo de Trámite
          </h3>
          <Select
            name="modalidad"
            value={formData.modalidad}
            onChange={handleInputChange}
            className="w-full"
          >
            {MODALIDADES.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </Select>
        </div>

        {/* Document checklist */}
        <div className="mb-6">
          <h3 className="text-[11px] font-bold text-neutral-muted uppercase tracking-wide mb-3.5">
            Documentos Requeridos
          </h3>
          <div className="flex flex-col gap-2.5">
            {docList.map((doc) => (
              <div
                key={doc.label}
                className={cn(
                  'flex items-center justify-between px-4 py-3 bg-neutral-bg rounded-xl border-l-[4px] transition-all duration-150',
                  doc.estado === 'cargado' && 'border-l-[var(--color-teal)] bg-[var(--color-teal-soft)]',
                  doc.estado === 'pendiente' && 'border-l-[var(--color-primary)] bg-[var(--color-primary-soft)]',
                  doc.estado === 'sin-cargar' && 'border-l-[var(--color-border)]'
                )}
              >
                <span className="text-[12px] font-medium text-neutral-text">{doc.label}</span>
                {doc.estado === 'cargado' && <Badge variant="green">Cargado</Badge>}
                {doc.estado === 'pendiente' && <Badge variant="orange">Pendiente</Badge>}
                {doc.estado === 'sin-cargar' && <Badge variant="gray">Sin cargar</Badge>}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-4 border-t border-neutral-border">
          <Button variant="outline" size="md" className="font-bold">
            Guardar borrador
          </Button>
          <Button size="md" className="font-bold">Enviar solicitud →</Button>
        </div>
      </Card>

      {/* Form Summary */}
      <Card className="bg-neutral-bg border-neutral-border">
        <div className="text-[11px] space-y-1.5">
          <div className="flex justify-between">
            <span className="text-neutral-muted">Carrera:</span>
            <span className="font-medium text-neutral-text">{formData.carrera}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-muted">Semestre:</span>
            <span className="font-medium text-neutral-text">{formData.semestre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-muted">Modalidad:</span>
            <span className="font-medium text-neutral-text">{formData.modalidad}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
