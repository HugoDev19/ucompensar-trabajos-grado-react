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
        <div className="bg-brand-orange -mx-4 -mt-4 mb-4 px-4 py-3 rounded-t-xl flex items-center gap-2.5">
          <PlusCircle size={16} stroke="white" />
          <span className="text-[12.5px] font-bold text-white">
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
              <label className="text-[9.5px] font-bold text-neutral-muted uppercase tracking-wide block mb-2">
                Semestre
              </label>
              <div className="grid grid-cols-5 gap-2">
                {SEMESTRES.map((sem) => (
                  <button
                    key={sem}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, semestre: sem }))
                    }
                    className={cn(
                      'py-2 px-2.5 rounded-lg border-[1.5px] text-[11px] font-medium transition-all duration-150 flex items-center justify-center gap-1',
                      formData.semestre === sem
                        ? 'bg-brand-orange text-white border-brand-orange'
                        : 'bg-neutral-light text-neutral-text border-neutral-border hover:border-brand-orange'
                    )}
                  >
                    <span>{sem.split('.')[0]}</span>
                    {formData.semestre === sem && <Check size={12} />}
                  </button>
                ))}
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
          <div className="flex flex-col gap-2">
            {docList.map((doc) => (
              <div
                key={doc.label}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 bg-neutral-bg rounded-lg border-l-[3px] transition-all duration-150',
                  doc.estado === 'cargado' && 'border-l-brand-orange bg-orange-50',
                  doc.estado === 'pendiente' && 'border-l-brand-orange bg-orange-50',
                  doc.estado === 'sin-cargar' && 'border-l-neutral-border'
                )}
              >
                <span className="text-[11.5px] text-neutral-text">{doc.label}</span>
                {doc.estado === 'cargado' && <Badge variant="green">Cargado</Badge>}
                {doc.estado === 'pendiente' && <Badge variant="orange">Pendiente</Badge>}
                {doc.estado === 'sin-cargar' && <Badge variant="gray">Sin cargar</Badge>}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-3 border-t border-neutral-border">
          <Button variant="outline" size="md">
            Guardar borrador
          </Button>
          <Button size="md">Enviar solicitud →</Button>
        </div>
      </Card>

      {/* Form Summary */}
      <Card className="bg-neutral-light border-neutral-border">
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
