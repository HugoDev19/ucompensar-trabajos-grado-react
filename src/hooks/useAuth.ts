import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/app.store'
import { authApi, ApiError } from '@/lib/api'

function initials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function useAuth() {
  const { startAuth, finishAuth, loginSuccess, logout: storeLogout } = useAppStore()
  const navigate = useNavigate()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  // Simulación de Microsoft SSO -- no hay AzureADAuthProvider todavía
  // (bloqueado por credenciales de TI, ver README del backend).
  const login = useCallback(() => {
    startAuth()
  }, [startAuth])

  const handleAuthDone = useCallback(() => {
    finishAuth()
    navigate('/dashboard')
  }, [finishAuth, navigate])

  const loginWithCredentials = useCallback(
    async (email: string, password: string) => {
      setIsLoggingIn(true)
      setLoginError(null)
      try {
        const tokens = await authApi.login(email, password)
        const user = await authApi.me(tokens.access_token)
        loginSuccess(
          {
            id: user.public_id,
            name: user.full_name,
            initials: initials(user.full_name),
            email: user.email,
            role: user.role.name,
          },
          tokens.access_token
        )
        navigate('/dashboard')
      } catch (err) {
        setLoginError(err instanceof ApiError ? err.message : 'No se pudo conectar con el servidor')
      } finally {
        setIsLoggingIn(false)
      }
    },
    [loginSuccess, navigate]
  )

  const logout = useCallback(() => {
    storeLogout()
    navigate('/login')
  }, [storeLogout, navigate])

  return { login, logout, handleAuthDone, loginWithCredentials, isLoggingIn, loginError }
}
