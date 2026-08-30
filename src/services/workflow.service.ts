import { authHeaders, request } from './http'
import type { PossibleStateOut, RoleOut } from '@/types/api'

export interface AllowedTransitionOut {
  public_id: string
  source_state: PossibleStateOut
  target_state: PossibleStateOut
  authorized_role: RoleOut
}

export const workflowApi = {
  transitions: (accessToken: string, modalityPublicId: string) =>
    request<AllowedTransitionOut[]>(`/workflow/transitions?modality_public_id=${modalityPublicId}`, {
      headers: authHeaders(accessToken),
    }),
}
