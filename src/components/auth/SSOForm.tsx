interface SSOFormProps {
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

// El backend todavía no tiene AzureADAuthProvider (bloqueado por
// credenciales de TI, ver README del backend) -- este botón se deja
// visible para que el equipo sepa que el SSO institucional está
// planeado, pero deshabilitado para no fingir un login que no existe.
export function SSOForm({ onSwitchToCredentials }: SSOFormProps) {
  return (
    <div>
      <button
        type="button"
        disabled
        title="Disponible próximamente"
        aria-disabled="true"
        className="w-full flex items-center justify-center gap-3 bg-white border-[1.5px] border-neutral-border rounded-xl px-5 py-3 mb-4 opacity-50 cursor-not-allowed"
      >
        <MicrosoftIcon />
        <div className="text-left">
          <div className="text-[13px] font-semibold text-neutral-text">
            Continuar con Microsoft
          </div>
          <span className="text-[10px] text-neutral-muted">
            Próximamente — usa tus credenciales por ahora
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
          El acceso con tu cuenta <strong className="font-semibold">@ucompensar.edu.co</strong>{' '}
          (Teams, Outlook, SharePoint) todavía no está activo — mientras
          tanto, entra con las credenciales que te dio la coordinación.
        </p>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={onSwitchToCredentials}
          className="text-[11px] py-1.5 px-4 border border-neutral-border rounded-lg bg-white text-neutral-muted cursor-pointer hover:border-primary hover:text-primary transition-colors"
        >
          Ir a inicio con credenciales
        </button>
      </div>
    </div>
  )
}
