import { useState } from 'react'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

interface CredentialsFormProps {
  onLogin: () => void
}

export function CredentialsForm({ onLogin }: CredentialsFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Input
        label="Usuario o correo"
        type="email"
        placeholder="usuario@ucompensar.edu.co"
        onKeyDown={(e) => e.key === 'Enter' && onLogin()}
      />

      <div className="flex flex-col gap-1">
        <label className="text-[9.5px] font-bold text-neutral-muted uppercase tracking-wide">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === 'Enter' && onLogin()}
            className="w-full px-3 py-2 pr-12 border-[1.5px] border-neutral-border rounded-lg text-[12px] text-neutral-text bg-neutral-light outline-none transition-all focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange-light placeholder:text-neutral-muted/60"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-muted hover:text-brand-orange transition-colors cursor-pointer"
          >
            {showPassword ? 'Ocultar' : 'Ver'}
          </button>
        </div>
      </div>

      <div className="text-right -mt-1">
        <a href="#" className="text-[10.5px] text-brand-orange hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button onClick={onLogin} size="lg" className="w-full text-[13px]">
        Iniciar sesión
      </Button>

      <p className="text-center text-[11px] text-neutral-muted mt-1">
        ¿No tienes cuenta?{' '}
        <a href="#" className="text-brand-orange font-semibold hover:underline">
          Solicita acceso
        </a>
      </p>
    </div>
  )
}
