interface SSOFormProps {
  onLogin: () => void
  onSwitchToCredentials: () => void
}

function MicrosoftIcon() {
  return (
    <div className="grid grid-cols-2 gap-[1.5px] w-[18px] h-[18px] flex-shrink-0">
      <span className="block rounded-[1px] bg-[#F25022]" />
      <span className="block rounded-[1px] bg-[#7FBA00]" />
      <span className="block rounded-[1px] bg-[#00A4EF]" />
      <span className="block rounded-[1px] bg-[#FFB900]" />
    </div>
  )
}

export function SSOForm({ onLogin, onSwitchToCredentials }: SSOFormProps) {
  return (
    <div>
      <button
        onClick={onLogin}
        className="w-full flex items-center justify-center gap-3 bg-white border-[1.5px] border-neutral-border rounded-xl px-5 py-3 cursor-pointer transition-all duration-[180ms] mb-4 hover:bg-[#F8F7F5] hover:border-[#B0ADA8] hover:-translate-y-px hover:shadow-card-hover group"
      >
        <MicrosoftIcon />
        <div className="text-left">
          <div className="text-[13px] font-semibold text-neutral-text">
            Continuar con Microsoft
          </div>
          <span className="text-[10px] text-neutral-muted">
            cuenta @ucompensar.edu.co
          </span>
        </div>
      </button>

      <div className="bg-[var(--color-secondary-soft)] border border-[var(--color-secondary)]/20 rounded-lg px-3.5 py-2.5 flex gap-2 items-start">
        <svg
          width="13"
          height="13"
          viewBox="0 0 16 16"
          fill="none"
          className="flex-shrink-0 mt-0.5"
        >
          <circle cx="8" cy="8" r="6.5" stroke="var(--color-secondary)" strokeWidth="1.4" />
          <path d="M8 7v5M8 5v1" stroke="var(--color-secondary)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <p className="text-[10.5px] text-[var(--color-secondary)] leading-[1.5]">
          Usa tu correo{' '}
          <strong className="font-semibold">@ucompensar.edu.co</strong> — la
          misma cuenta de Teams, Outlook y SharePoint.
        </p>
      </div>

      <div className="mt-4 text-center">
        <div className="text-[10.5px] text-neutral-muted mb-2">
          Acceso externo
        </div>
        <div className="flex gap-2 justify-center">
          {['Estudiante externo', 'Empresa aliada'].map((label) => (
            <button
              key={label}
              onClick={onSwitchToCredentials}
              className="flex-1 text-[10.5px] py-1.5 px-3 border border-neutral-border rounded-lg bg-white text-neutral-muted cursor-pointer hover:border-primary hover:text-primary transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
