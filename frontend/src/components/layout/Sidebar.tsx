import { memo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Plus, Search, GitBranch,
  FolderOpen, BarChart3, LogOut, ChevronRight, X,
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { useThemeStore } from '@/stores/theme.store'
import { cn } from '@/utils/cn'
import type { User } from '@/types'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard, group: 'Principal', badge: '4', path: '/dashboard' },
  { id: 'tramites', label: 'Mis trámites', Icon: FileText, group: 'Principal', path: '/tramites' },
  { id: 'nuevo', label: 'Nuevo trámite', Icon: Plus, group: 'Principal', path: '/nuevo' },
  { id: 'buscar', label: 'Buscar cédula', Icon: Search, group: 'Principal', path: '/buscar' },
  { id: 'trazabilidad', label: 'Trazabilidad', Icon: GitBranch, group: 'Gestión', path: '/trazabilidad' },
  { id: 'documentos', label: 'Documentos', Icon: FolderOpen, group: 'Gestión', path: '/documentos' },
  { id: 'reportes', label: 'Reportes', Icon: BarChart3, group: 'Gestión', path: '/reportes' },
]

type NavItemType = typeof NAV_ITEMS[0]

interface NavItemProps {
  item: NavItemType
  active: boolean
  collapsed: boolean
  onClick: (path: string) => void
}

const NavItem = memo(function NavItem({ item, active, collapsed, onClick }: NavItemProps) {
  return (
    <button
      onClick={() => onClick(item.path)}
      title={collapsed ? item.label : undefined}
      className={cn(
        'w-full flex items-center gap-2.5 rounded-xl transition-all duration-200 relative cursor-pointer border-none outline-none mb-0.5',
        collapsed ? 'px-2 py-2.5 justify-center' : 'px-3 py-2 justify-start',
        active 
          ? 'bg-[var(--brand-orange)] text-white font-semibold shadow-lg' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
      )}
      style={{ fontSize: 12 }}
    >
      <item.Icon size={16} className={cn('flex-shrink-0 transition-transform', active && 'scale-110')} />
      {!collapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
      {!collapsed && item.badge && (
        <span
          className={cn(
            'text-[9px] font-bold px-1.5 py-0.5 rounded-full transition-colors',
            active ? 'bg-white/20 text-white' : 'bg-[var(--brand-orange)] text-white'
          )}
        >
          {item.badge}
        </span>
      )}
    </button>
  )
})

interface SidebarProps {
  user: User
  onLogout: () => void
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { theme } = useThemeStore()

  const handleToggle = () => setCollapsed((prev) => !prev)

  return (
    <aside
      className={cn(
        'flex flex-col flex-shrink-0 h-full transition-all duration-300 overflow-hidden z-40',
        theme === 'dark' ? 'bg-[var(--color-surface)] border-r border-white/5' : 'bg-[var(--brand-green)] border-r border-black/10'
      )}
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* ── Logo header ── */}
      <div
        className={cn(
          'flex items-center h-14 flex-shrink-0 px-4 transition-all',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        {!collapsed && (
          <div className="cursor-pointer animate-in" onClick={() => navigate('/dashboard')}>
            <Logo variant="light" size="sm" />
          </div>
        )}
        <button
          onClick={handleToggle}
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-all cursor-pointer bg-white/0 hover:bg-white/10 text-white/50 hover:text-white border-none"
          title={collapsed ? "Expandir menú" : "Contraer menú"}
        >
          {collapsed ? <ChevronRight size={16} /> : <X size={16} />}
        </button>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4 scrollbar-premium">
        {['Principal', 'Gestión'].map(group => (
          <div key={group}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-white/30">
                {group}
              </p>
            )}
            {collapsed && <div className="h-px bg-white/5 mx-2 mb-2" />}
            <div className="space-y-1">
              {NAV_ITEMS.filter(n => n.group.toLowerCase() === group.toLowerCase()).map(item => (
                <NavItem
                  key={item.id}
                  item={item}
                  active={location.pathname === item.path}
                  collapsed={collapsed}
                  onClick={(path) => navigate(path)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── User footer ── */}
      <div className="p-3 mt-auto border-t border-white/10">
        <div className={cn(
          'flex items-center gap-3 p-2 rounded-xl transition-all',
          !collapsed && 'hover:bg-white/5'
        )}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-md transition-transform hover:scale-105"
            style={{ background: 'var(--brand-orange)' }}
            title={collapsed ? user.name : undefined}
          >
            {user.initials}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0 animate-in">
                <p className="text-[13px] font-semibold text-white truncate leading-none">{user.name}</p>
                <p className="text-[11px] mt-1 text-white/40">{user.role}</p>
              </div>
              <button
                onClick={() => {
                  onLogout()
                  navigate('/login')
                }}
                className="flex items-center justify-center p-2 rounded-lg transition-all text-white/40 hover:text-white hover:bg-white/10 border-none cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
