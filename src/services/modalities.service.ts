import { authHeaders, request } from './http'
import type { ModalityOut } from '@/types/api'

export interface RequiredDocumentOut {
  public_id: string
  document_type: { public_id: string; code: string; name: string; description: string | null }
  mandatory: boolean
  note: string | null
  sort_order: number
}

export interface EvaluationCriterionOut {
  public_id: string
  name: string
  weight_percentage: number
  is_inclusion_requirement: boolean
  sort_order: number
}

export interface ModalityDetail extends ModalityOut {
  required_documents: RequiredDocumentOut[]
  criteria: EvaluationCriterionOut[]
}

export const modalitiesApi = {
  list: (accessToken: string) =>
    request<ModalityOut[]>('/modalities', { headers: authHeaders(accessToken) }),

  get: (accessToken: string, modalityPublicId: string) =>
    request<ModalityDetail>(`/modalities/${modalityPublicId}`, { headers: authHeaders(accessToken) }),
}
