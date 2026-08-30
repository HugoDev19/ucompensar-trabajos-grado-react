import { authHeaders, request } from './http'
import type { BackendUser } from '@/types/api'

export interface TokenResponse {
  access_token: string
  token_type: string
}

export const authApi = {
  login: (email: string, password: string) =>
    // El refresh_token no viaja en este body -- el backend lo setea como
    // cookie HttpOnly (Set-Cookie), invisible para JS. El navegador la
    // guarda solo si el fetch va con credentials: 'include' (ver http.ts).
    request<TokenResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: (accessToken: string) =>
    request<BackendUser>('/auth/me', { headers: authHeaders(accessToken) }),

  // Cambia el refresh_token de la cookie (que el navegador manda solo)
  // por un access_token nuevo. Se llama al arrancar la app para restaurar
  // la sesión tras un refresh de página, y falla con 401 si no hay cookie
  // o ya expiró -- en ese caso, a login normal.
  refresh: () => request<TokenResponse>('/auth/refresh', { method: 'POST' }),

  logout: () => request<void>('/auth/logout', { method: 'POST' }),
}
