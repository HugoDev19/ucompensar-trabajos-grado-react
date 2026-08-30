import { authHeaders, request } from './http'
import type { BackendUser } from '@/types/api'
import type { EvaluationCriterionOut } from './modalities.service'

export type MentionType = 'MERITORIO' | 'LAUREADO'

export interface GradeOut {
  public_id: string
  criterion: EvaluationCriterionOut
  evaluator: BackendUser
  grade: number
  registered_at: string
  observation: string | null
}

export interface FinalGradeOut {
  public_id: string
  final_grade: number
  passed: boolean
  registered_at: string
  registered_by: BackendUser
  council_minutes: string | null
  honor_mention: MentionType | null
}

export const gradingApi = {
  // Abierto a cualquier autenticado en el backend (get_current_user) --
  // ProcessGradingService decide del lado del servidor quien puede
  // calificar que criterio.
  addGrade: (accessToken: string, processPublicId: string, payload: { criterion_public_id: string; grade: number; observation?: string }) =>
    request<GradeOut>(`/processes/${processPublicId}/grades`, {
      method: 'POST',
      headers: authHeaders(accessToken),
      body: JSON.stringify(payload),
    }),

  listGrades: (accessToken: string, processPublicId: string) =>
    request<GradeOut[]>(`/processes/${processPublicId}/grades`, { headers: authHeaders(accessToken) }),

  // Restringido a coordinador/consejo_facultad/administrativo
  // (_REGISTER_FINAL_GRADE_ROLES). "passed" nunca se manda -- lo calcula
  // el backend contra minimum_passing_grade de la modalidad.
  registerFinalGrade: (
    accessToken: string,
    processPublicId: string,
    payload: { final_grade: number; council_minutes?: string; honor_mention?: MentionType }
  ) =>
    request<FinalGradeOut>(`/processes/${processPublicId}/final-grade`, {
      method: 'POST',
      headers: authHeaders(accessToken),
      body: JSON.stringify(payload),
    }),

  getFinalGrade: (accessToken: string, processPublicId: string) =>
    request<FinalGradeOut>(`/processes/${processPublicId}/final-grade`, { headers: authHeaders(accessToken) }),
}
