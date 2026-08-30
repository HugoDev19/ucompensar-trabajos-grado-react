import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/app.store'
import type { BackendUser } from '@/types/api'
import { ApiError } from '@/services/http'
import { authApi } from '@/services/auth.service'

function initials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function toStoreUser(user: BackendUser) {
  return {
    id: user.public_id,
    name: user.full_name,
    initials: initials(user.full_name),
    email: user.email,
    role: user.role.name,
  }
}

export function useAuth() {
  const { loginSuccess, logout: storeLogout } = useAppStore()
  const navigate = useNavigate()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  // El access_token vive solo en memoria (nunca en localStorage, ver
  // app.store.ts) a propósito -- un XSS no puede robarlo de ahí porque no
  // hay ningún storage que leer. El costo es que un F5 borra ese estado
  // de React. Este efecto lo recupera al arrancar la app intercambiando
  // la cookie HttpOnly de refresh_token (que sí sobrevive al refresh,
  // porque la pone el navegador, no React) por un access_token nuevo.
  const [isRestoringSession, setIsRestoringSession] = useState(true)

  useEffect(() => {
    let cancelled = false
    authApi
      .refresh()
      .then(async (tokens) => {
        const user = await authApi.me(tokens.access_token)
        if (!cancelled) loginSuccess(toStoreUser(user), tokens.access_token)
      })
      .catch(() => {
        // Sin cookie o ya expiró (7 días) -- se queda deslogueado, es lo
        // esperado, no un error que mostrar.
      })
      .finally(() => {
        if (!cancelled) setIsRestoringSession(false)
      })
    return () => {
      cancelled = true
    }
  }, [loginSuccess])

  const loginWithCredentials = useCallback(
    async (email: string, password: string) => {
      setIsLoggingIn(true)
      setLoginError(null)
      try {
        const tokens = await authApi.login(email, password)
        const user = await authApi.me(tokens.access_token)
        loginSuccess(toStoreUser(user), tokens.access_token)
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
    authApi.logout().catch(() => {
      // Aunque falle el aviso al backend, la sesión local ya quedó
      // cerrada -- no bloquear al usuario por esto.
    })
  }, [storeLogout, navigate])

  return { logout, loginWithCredentials, isLoggingIn, loginError, isRestoringSession }
}
