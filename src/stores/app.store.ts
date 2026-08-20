import { create } from 'zustand'
import type { NavSection, User } from '@/types'

interface AppState {
  // Auth
  isAuthenticated: boolean
  isAuthenticating: boolean
  currentUser: User | null
  accessToken: string | null

  // Navigation
  activeSection: NavSection
  searchQuery: string

  // Actions
  startAuth: () => void
  finishAuth: () => void
  loginSuccess: (user: User, accessToken: string) => void
  logout: () => void
  setSection: (section: NavSection) => void
  setSearchQuery: (q: string) => void
}

const MOCK_USER: User = {
  id: '1',
  name: 'Estudiante Demo',
  initials: 'ED',
  email: 'estudiante@ucompensar.edu.co',
  role: 'Estudiante',
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  isAuthenticating: false,
  currentUser: null,
  accessToken: null,
  activeSection: 'dashboard',
  searchQuery: '',

  startAuth: () => set({ isAuthenticating: true }),

  finishAuth: () =>
    set({
      isAuthenticating: false,
      isAuthenticated: true,
      currentUser: MOCK_USER,
    }),

  loginSuccess: (user, accessToken) =>
    set({
      isAuthenticated: true,
      currentUser: user,
      accessToken,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      currentUser: null,
      accessToken: null,
      activeSection: 'dashboard',
    }),

  setSection: (section) => set({ activeSection: section }),
  setSearchQuery: (q) => set({ searchQuery: q }),
}))
