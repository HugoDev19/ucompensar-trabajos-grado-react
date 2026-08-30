import { authHeaders, request } from './http'
import type { BackendUser } from '@/types/api'

export type CommitteeRole = 'presidente' | 'secretario' | 'vocal' | 'invitado'
export type VoteResult = 'APROBADO' | 'RECHAZADO' | 'APLAZADO' | 'EN_RECONSIDERACION'

export interface CommitteeOut {
  public_id: string
  code: string
  name: string
  description: string | null
  minimum_quorum: number
  active: boolean
}

export interface CommitteeMemberOut {
  public_id: string
  user: BackendUser
  committee_role: CommitteeRole
  start_date: string
  end_date: string | null
  active: boolean
}

export interface CommitteeSessionOut {
  public_id: string
  minutes_number: string
  session_date: string
  president: BackendUser
  secretary: BackendUser
  quorum_reached: boolean
  minutes_url: string | null
  observations: string | null
  closed: boolean
  closed_at: string | null
}

export interface ProcessSessionVoteOut {
  public_id: string
  process_code: string
  votes_for: number
  votes_against: number
  votes_abstain: number
  result: VoteResult
  observations: string | null
  registered_at: string
}

export const committeesApi = {
  list: (accessToken: string) =>
    request<CommitteeOut[]>('/committees', { headers: authHeaders(accessToken) }),

  listMembers: (accessToken: string, committeePublicId: string) =>
    request<CommitteeMemberOut[]>(`/committees/${committeePublicId}/members`, {
      headers: authHeaders(accessToken),
    }),

  createSession: (
    accessToken: string,
    committeePublicId: string,
    payload: {
      minutes_number: string
      session_date: string
      president_public_id: string
      secretary_public_id: string
      quorum_reached: boolean
      minutes_url?: string
      observations?: string
    }
  ) =>
    request<CommitteeSessionOut>(`/committees/${committeePublicId}/sessions`, {
      method: 'POST',
      headers: authHeaders(accessToken),
      body: JSON.stringify(payload),
    }),

  closeSession: (accessToken: string, sessionPublicId: string) =>
    request<CommitteeSessionOut>(`/committee-sessions/${sessionPublicId}/close`, {
      method: 'PUT',
      headers: authHeaders(accessToken),
    }),

  registerVote: (
    accessToken: string,
    sessionPublicId: string,
    payload: {
      process_public_id: string
      votes_for: number
      votes_against: number
      votes_abstain: number
      result: VoteResult
      observations?: string
    }
  ) =>
    request<ProcessSessionVoteOut>(`/committee-sessions/${sessionPublicId}/votes`, {
      method: 'POST',
      headers: authHeaders(accessToken),
      body: JSON.stringify(payload),
    }),

  listVotes: (accessToken: string, sessionPublicId: string) =>
    request<ProcessSessionVoteOut[]>(`/committee-sessions/${sessionPublicId}/votes`, {
      headers: authHeaders(accessToken),
    }),
}
