import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Moon, Sun, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useAppStore } from '@/stores/app.store'
import { useThemeStore } from '@/stores/theme.store'
import { cn } from '@/utils/cn'
import type { NavSection } from '@/types'

const sectionLabels: Record<NavSection, string> = {
  dashboard: 'Dashboard',
  tramites: 'Mis trámites',
  nuevo: 'Nuevo trámite',
  buscar: 'Buscar por cédula',
  trazabilidad: 'Trazabilidad',
  documentos: 'Documentos',
  reportes: 'Reportes',
}

interface TopbarProps {
  activeSection: NavSection
  onNewTramite: () => void
  searchQuery: string
  onSearchChange: (q: string) => void
}

export function Topbar({ activeSection, searchQuery, onSearchChange }: TopbarProps) {
  const navigate = useNavigate()
  const { theme, toggle } = useThemeStore()
  const { currentUser, logout } = useAppStore()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Click outside to close user menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-[64px] flex items-center px-6 gap-6 glass flex-shrink-0 relative z-30 transition-all duration-300">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 flex-1 text-[13px]">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-[var(--color-text-muted)] hover:text-[var(--brand-orange)] transition-colors cursor-pointer font-medium"
        >
          UCompensar
        </button>
        <span className="text-[var(--color-border)] opacity-50">/</span>
        <span className="font-bold text-[var(--color-text)] tracking-tight">
          {sectionLabels[activeSection]}
        </span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-2 w-[280px] focus-within:border-[var(--brand-orange)] focus-within:ring-4 focus-within:ring-[var(--brand-orange-soft)] transition-all shadow-sm">
        <Search size={16} className="text-[var(--color-text-dim)] flex-shrink-0" />
        <input
          type="text"
          placeholder="Buscar trámites o documentos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-none bg-transparent text-[13px] text-[var(--color-text)] outline-none w-full placeholder:text-[var(--color-text-dim)]"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl hover:bg-[var(--color-bg)] transition-all cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text)] border-none bg-transparent group">
          <Bell size={20} className="transition-transform group-hover:rotate-12" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--brand-orange)] rounded-full ring-2 ring-[var(--color-surface)]" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggle}
          className="p-2.5 rounded-xl hover:bg-[var(--color-bg)] transition-all cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text)] border-none bg-transparent"
          title="Alternar tema"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* User Profile Dropdown */}
      {currentUser && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 hover:bg-[var(--color-bg)] px-2 py-1.5 rounded-xl transition-all cursor-pointer border-none bg-transparent group"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--brand-orange-soft)] text-[var(--brand-orange)] flex items-center justify-center text-[11px] font-bold shadow-sm transition-transform group-hover:scale-105">
              {currentUser.initials}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-[var(--color-text)]">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown size={14} className={cn('text-[var(--color-text-dim)] transition-transform', isUserMenuOpen && 'rotate-180')} />
            </div>
          </button>

          {/* Popover */}
          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-3 w-64 bg-[var(--color-surface)] rounded-2xl shadow-xl border border-[var(--color-border)] py-2 animate-in z-50 overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
                <p className="text-[14px] font-bold text-[var(--color-text)]">{currentUser.name}</p>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-1 truncate">{currentUser.email}</p>
              </div>
              <div className="p-1.5">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[var(--color-text)] hover:bg-[var(--color-bg)] rounded-xl transition-all border-none bg-transparent text-left cursor-pointer group">
                  <Settings size={16} className="text-[var(--color-text-dim)] group-hover:text-[var(--brand-orange)]" />
                  Configuración
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all border-none bg-transparent text-left cursor-pointer group"
                >
                  <LogOut size={16} className="transition-transform group-hover:translate-x-1" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
