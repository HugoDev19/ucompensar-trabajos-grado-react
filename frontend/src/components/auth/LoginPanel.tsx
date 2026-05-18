import { Logo } from '@/components/ui/Logo'

const features = [
  {
    icon: (
      <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6Z" />
    ),
    label: '7 modalidades',
    desc: 'de trabajo de grado',
  },
  {
    icon: <path d="M2 12L6 8l3 3 5-7" />,
    label: 'Trazabilidad completa',
    desc: 'de cada trámite',
  },
  {
    icon: (
      <>
        <rect x="2" y="2" width="12" height="12" rx="2" />
        <path d="M5 8h6M5 5h6M5 11h4" />
      </>
    ),
    label: 'SharePoint',
    desc: 'como repositorio institucional',
  },
  {
    icon: (
      <>
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 5v3l2 2" />
      </>
    ),
    label: 'Notificaciones',
    desc: 'automáticas por Outlook',
  },
]

export function LoginPanel() {
  return (
    <div className="w-[46%] bg-[var(--color-secondary)] flex flex-col justify-between p-9 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/[0.035] pointer-events-none" />
      <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-white/[0.025] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-8">
          <Logo variant="light" size="md" />
        </div>

        <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/[0.16] rounded-full px-3 py-1 text-[10.5px] text-white/80 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          Sistema de Gestión Académica
        </div>

        <h1 className="text-[24px] font-bold text-white leading-[1.32] mb-2.5">
          Plataforma de<br />
          Trabajos de Grado<br />
          <span className="text-primary">UCompensar</span>
        </h1>

        <p className="text-[12px] text-white/60 leading-[1.7] max-w-[280px]">
          Gestiona, rastrea y aprueba todos los procesos de titulación integrado
          con tu cuenta Microsoft institucional.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-[30px] h-[30px] rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {f.icon}
                </svg>
              </div>
              <div className="text-[11.5px] text-white/65 leading-[1.35]">
                <strong className="text-white font-semibold">{f.label}</strong>{' '}
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-[9.5px] text-white/30">
        Vigilada Mineducación · Bogotá, Colombia · 2025
      </div>
    </div>
  )
}
