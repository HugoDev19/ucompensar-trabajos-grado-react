import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAppStore } from '@/stores/app.store'
import { useThemeStore } from '@/stores/theme.store'
import { useAuth } from '@/hooks/useAuth'
import { LoginScreen } from '@/components/auth/LoginScreen'
import { AuthOverlay } from '@/components/auth/AuthOverlay'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

// Section imports
import { DashboardSection } from '@/components/dashboard/DashboardSection'
import { TramitesSection } from '@/components/tramites/TramitesSection'
import { NuevoTramiteSection } from '@/components/tramites/NuevoTramiteSection'
import { BuscarSection } from '@/components/tramites/BuscarSection'
import { TrazabilidadSection } from '@/components/trazabilidad/TrazabilidadSection'
import { DocumentosSection } from '@/components/documentos/DocumentosSection'
import { ReportesSection } from '@/components/reportes/ReportesSection'

export default function App() {
  const { isAuthenticated, isAuthenticating } = useAppStore()
  const { theme } = useThemeStore()
  const { login, logout, handleAuthDone } = useAuth()
  const location = useLocation()

  useEffect(() => {
    // For institucional branding, the login screen is always light
    const isLogin = location.pathname === '/login'
    const activeTheme = isLogin ? 'light' : theme
    
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(activeTheme)
  }, [theme, location.pathname])

  return (
    <>
      {/* Auth overlay — self-contained animation, calls handleAuthDone when finished */}
      {isAuthenticating && <AuthOverlay onDone={handleAuthDone} />}

      <Routes>
        {/* Public — Login */}
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <LoginScreen onLogin={login} />
          }
        />

        {/* Authenticated — Shared sidebar layout (pathless route) */}
        <Route element={<DashboardLayout onLogout={logout} />}>
          <Route path="/dashboard" element={<DashboardSection />} />
          <Route path="/tramites" element={<TramitesSection />} />
          <Route path="/nuevo" element={<NuevoTramiteSection />} />
          <Route path="/buscar" element={<BuscarSection />} />
          <Route path="/trazabilidad" element={<TrazabilidadSection />} />
          <Route path="/documentos" element={<DocumentosSection />} />
          <Route path="/reportes" element={<ReportesSection />} />
        </Route>

        {/* Root redirect */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
