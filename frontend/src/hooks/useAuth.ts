import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/app.store'

export function useAuth() {
  const { startAuth, finishAuth, logout: storeLogout } = useAppStore()
  const navigate = useNavigate()

  const login = useCallback(() => {
    startAuth()
  }, [startAuth])

  const handleAuthDone = useCallback(() => {
    finishAuth()
    navigate('/dashboard')
  }, [finishAuth, navigate])

  const logout = useCallback(() => {
    storeLogout()
    navigate('/login')
  }, [storeLogout, navigate])

  return { login, logout, handleAuthDone }
}
