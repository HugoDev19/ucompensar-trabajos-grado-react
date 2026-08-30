import { authHeaders, request } from './http'
import type { BackendUser } from '@/types/api'

export interface ExternalEntityOut {
  public_id: string
  name: string
  entity_type: string
  tax_id: string | null
  representative: string | null
  representative_position: string | null
  email: string | null
  phone: string | null
  address: string | null
  active: boolean
}

export interface ExternalApprovalOut {
  public_id: string
  process_code: string
  entity: ExternalEntityOut
  approval_date: string
  approval_document_url: string
  external_signer: string
  signer_position: string | null
  observations: string | null
  registered_by: BackendUser
  registered_at: string
}

// Registrar/crear entidades y avales esta restringido a "administrativo"
// en el backend (_MANAGE_ENTITY_ROLES) -- listar es abierto a cualquier
// autenticado (get_current_user).
export const externalApi = {
  listEntities: (accessToken: string) =>
    request<ExternalEntityOut[]>('/external-entities', { headers: authHeaders(accessToken) }),

  createEntity: (
    accessToken: string,
    payload: {
      name: string
      entity_type: string
      tax_id?: string
      representative?: string
      representative_position?: string
      email?: string
      phone?: string
      address?: string
    }
  ) =>
    request<ExternalEntityOut>('/external-entities', {
      method: 'POST',
      headers: authHeaders(accessToken),
      body: JSON.stringify(payload),
    }),

  registerApproval: (
    accessToken: string,
    entityPublicId: string,
    payload: {
      process_public_id: string
      approval_date: string
      approval_document_url: string
      external_signer: string
      signer_position?: string
      observations?: string
    }
  ) =>
    request<ExternalApprovalOut>(`/external-entities/${entityPublicId}/approvals`, {
      method: 'POST',
      headers: authHeaders(accessToken),
      body: JSON.stringify(payload),
    }),

  listProcessApprovals: (accessToken: string, processPublicId: string) =>
    request<ExternalApprovalOut[]>(`/processes/${processPublicId}/external-approvals`, {
      headers: authHeaders(accessToken),
    }),
}
