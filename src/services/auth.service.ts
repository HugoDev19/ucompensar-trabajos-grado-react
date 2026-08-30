import { authHeaders, request } from './http'
import type { BackendUser } from '@/types/api'

export interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export const authApi = {
  login: (email: string, password: string) =>
    request<TokenResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: (accessToken: string) =>
    request<BackendUser>('/auth/me', { headers: authHeaders(accessToken) }),
}
