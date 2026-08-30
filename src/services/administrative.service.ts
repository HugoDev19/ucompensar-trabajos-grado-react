import { authHeaders, request } from './http'
import type { BackendUser } from '@/types/api'

export type AdministrativeApprovalResult = 'APROBADO' | 'RECHAZADO' | 'OBSERVADO'

export interface AdministrativeAreaOut {
  public_id: string
  code: string
  name: string
  description: string | null
  manager: BackendUser | null
  active: boolean
}

export interface AreaUserOut {
  public_id: string
  user: BackendUser
  can_sign_approvals: boolean
  start_date: string
  end_date: string | null
  active: boolean
}

export interface AdministrativeApprovalOut {
  public_id: string
  process_code: string
  signed_by: BackendUser
  result: AdministrativeApprovalResult
  approval_date: string
  approval_document_url: string | null
  observations: string | null
}

export const administrativeApi = {
  // Cualquier usuario autenticado puede listar areas (get_current_user,
  // no require_role -- ver app/domains/administrative/router.py).
  listAreas: (accessToken: string) =>
    request<AdministrativeAreaOut[]>('/administrative-areas', { headers: authHeaders(accessToken) }),

  // Restringido a "administrativo" en el backend.
  listAreaUsers: (accessToken: string, areaPublicId: string) =>
    request<AreaUserOut[]>(`/administrative-areas/${areaPublicId}/users`, {
      headers: authHeaders(accessToken),
    }),

  // Sin restriccion de rol fija en el backend a proposito -- la
  // autorizacion real la decide `can_sign_approvals` de esa area
  // puntual, verificado del lado del servidor. La UI deja intentarlo y
  // muestra el error si el backend lo rechaza.
  signApproval: (
    accessToken: string,
    areaPublicId: string,
    payload: { process_public_id: string; result: AdministrativeApprovalResult; approval_document_url?: string; observations?: string }
  ) =>
    request<AdministrativeApprovalOut>(`/administrative-areas/${areaPublicId}/approvals`, {
      method: 'POST',
      headers: authHeaders(accessToken),
      body: JSON.stringify(payload),
    }),

  listProcessApprovals: (accessToken: string, processPublicId: string) =>
    request<AdministrativeApprovalOut[]>(`/processes/${processPublicId}/administrative-approvals`, {
      headers: authHeaders(accessToken),
    }),
}
