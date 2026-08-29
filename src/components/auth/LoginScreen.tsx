import { useState } from 'react'
import { LoginPanel } from './LoginPanel'
import { SSOForm } from './SSOForm'
import { CredentialsForm } from './CredentialsForm'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/utils/cn'

type TabType = 'sso' | 'credentials'

interface LoginScreenProps {
  onLogin: () => void
  onCredentialsLogin: (email: string, password: string) => void
  isLoggingIn?: boolean
  loginError?: string | null
}

export function LoginScreen({ onLogin, onCredentialsLogin, isLoggingIn, loginError }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('sso')

  return (
    <div className="flex h-screen min-h-[600px] bg-[var(--color-bg)] transition-colors duration-300">
      <LoginPanel />

      <div className="flex-1 flex flex-col items-center justify-center px-11 py-9 relative bg-[var(--color-surface)]">
        <p className="absolute top-6 right-8 text-[12px] text-[var(--color-text-dim)] cursor-pointer hover:text-[var(--color-primary)] transition-colors font-medium">
          ¿Necesitas ayuda?
        </p>

        <div className="w-full max-w-[340px] animate-in">
          <div className="flex justify-center mb-8">
            <Logo variant="dark" size="md" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-[24px] font-bold text-[var(--color-text)] mb-2 tracking-tight">
              Bienvenido/a
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
              Accede con tu cuenta institucional
              <br />o tus credenciales UCompensar
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-[var(--color-bg)] rounded-xl p-1 mb-6 border border-[var(--color-border)]">
            {(['sso', 'credentials'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex-1 py-2 rounded-lg text-[12px] font-bold transition-all duration-200 cursor-pointer border-none',
                  activeTab === tab
                    ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm'
                    : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]/50'
                )}
              >
                {tab === 'sso' ? 'Microsoft SSO' : 'Credenciales'}
              </button>
            ))}
          </div>

          <div className="animate-in" key={activeTab}>
            {activeTab === 'sso' ? (
              <SSOForm
                onLogin={onLogin}
                onSwitchToCredentials={() => setActiveTab('credentials')}
              />
            ) : (
              <CredentialsForm onSubmit={onCredentialsLogin} isLoading={isLoggingIn} error={loginError} />
            )}
          </div>
        </div>

        <p className="absolute bottom-6 text-[10px] text-[var(--color-text-dim)] text-center opacity-60">
          © 2026 Fundación Universitaria Compensar · Vigilada Mineducación
        </p>
      </div>
    </div>
  )
}
