import { authHeaders, request } from './http'

export interface NotificationOut {
  public_id: string
  subject: string | null
  body: string | null
  sent: boolean
  sent_at: string | null
  send_error: string | null
}

// Ambos endpoints estan abiertos a cualquier autenticado (get_current_user);
// list_for_process reutiliza la visibilidad del tramite (ProcessService.get_detail)
// y list_for_recipient ya filtra por el usuario del token.
export const notificationsApi = {
  listMine: (accessToken: string) =>
    request<NotificationOut[]>('/notifications/me', { headers: authHeaders(accessToken) }),

  listForProcess: (accessToken: string, processPublicId: string) =>
    request<NotificationOut[]>(`/processes/${processPublicId}/notifications`, {
      headers: authHeaders(accessToken),
    }),
}
