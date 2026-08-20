import { useState } from 'react'
import { Input } from '@/components/ui'
import { Button } from '@/components/ui'

interface CredentialsFormProps {
  onSubmit: (email: string, password: string) => void
  isLoading?: boolean
  error?: string | null
}

export function CredentialsForm({ onSubmit, isLoading, error }: CredentialsFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (!email || !password || isLoading) return
    onSubmit(email, password)
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="text-[11.5px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <Input
        label="Usuario o correo"
        type="email"
        placeholder="usuario@ucompensar.edu.co"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />

      <div className="flex flex-col gap-1">
        <label className="text-[9.5px] font-bold text-neutral-muted uppercase tracking-wide">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full px-3 py-2 pr-12 border-[1.5px] border-neutral-border rounded-lg text-[12px] text-neutral-text bg-neutral-bg outline-none transition-all focus:border-primary focus:bg-neutral-surface focus:ring-2 focus:ring-primary-soft placeholder:text-neutral-muted/60"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-muted hover:text-primary transition-colors cursor-pointer"
          >
            {showPassword ? 'Ocultar' : 'Ver'}
          </button>
        </div>
      </div>

      <div className="text-right -mt-1">
        <a href="#" className="text-[10.5px] text-primary hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button onClick={handleSubmit} size="lg" className="w-full text-[13px]" disabled={isLoading}>
        {isLoading ? 'Iniciando sesión…' : 'Iniciar sesión'}
      </Button>

      <p className="text-center text-[11px] text-neutral-muted mt-1">
        ¿No tienes cuenta?{' '}
        <a href="#" className="text-primary font-semibold hover:underline">
          Solicita acceso
        </a>
      </p>
    </div>
  )
}
