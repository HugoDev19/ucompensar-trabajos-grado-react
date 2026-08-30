import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { canAccessSection } from '@/config/access'
import { useAppStore } from '@/stores/app.store'
import type { NavSection } from '@/types'

interface RequireSectionProps {
  section: NavSection
  children: ReactNode
}

// Segunda capa además de ocultar el link en el menú (Sidebar) -- sin
// esto, alguien podía escribir la URL a mano (ej. /nuevo) y ver el
// formulario completo antes de que el backend lo rechazara al enviar.
export function RequireSection({ section, children }: RequireSectionProps) {
  const { currentUser } = useAppStore()

  if (!currentUser || !canAccessSection(section, currentUser.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
