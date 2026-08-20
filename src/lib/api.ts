const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'
const API_ORIGIN = API_URL.replace(/\/api\/?$/, '')

// El backend devuelve rutas relativas para archivos (ej. /local-storage/...)
// -- hay que anteponerles el origen para que el navegador los pueda abrir.
export function resolveFileUrl(path: string): string {
  return path.startsWith('http') ? path : `${API_ORIGIN}${path}`
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response
  const isFormData = options.body instanceof FormData
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    })
  } catch {
    throw new ApiError(0, 'No se pudo conectar con el servidor')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    const detail = typeof body?.detail === 'string' ? body.detail : 'Error de conexión con el servidor'
    throw new ApiError(res.status, detail)
  }

  return res.json() as Promise<T>
}

export interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface BackendUser {
  public_id: string
  email: string
  full_name: string
  role: { public_id: string; name: string; description: string | null; active: boolean }
  active: boolean
}

function authHeaders(accessToken: string) {
  return { Authorization: `Bearer ${accessToken}` }
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

export interface ModalityOut {
  public_id: string
  code: string
  name: string
}

export interface PossibleStateOut {
  public_id: string
  code: string
  name: string
  description: string | null
  is_final_state: boolean
  is_initial_state: boolean
}

export interface ProcessOut {
  public_id: string
  process_code: string
  student: BackendUser
  modality: ModalityOut
  state: PossibleStateOut
  academic_semester: string
  created_at: string
  updated_at: string | null
  closed_at: string | null
}

export interface RoleOut {
  public_id: string
  name: string
  description: string | null
  active: boolean
}

export interface ProcessHistoryOut {
  public_id: string
  previous_state: PossibleStateOut | null
  new_state: PossibleStateOut
  user: BackendUser
  event_date: string
  comment: string | null
}

export const processesApi = {
  list: (accessToken: string) =>
    request<ProcessOut[]>('/processes', { headers: authHeaders(accessToken) }),

  get: (accessToken: string, processPublicId: string) =>
    request<ProcessOut>(`/processes/${processPublicId}`, { headers: authHeaders(accessToken) }),

  history: (accessToken: string, processPublicId: string) =>
    request<ProcessHistoryOut[]>(`/processes/${processPublicId}/history`, {
      headers: authHeaders(accessToken),
    }),

  changeState: (accessToken: string, processPublicId: string, targetStatePublicId: string, comment?: string) =>
    request<ProcessOut>(`/processes/${processPublicId}/state`, {
      method: 'PUT',
      headers: authHeaders(accessToken),
      body: JSON.stringify({ target_state_public_id: targetStatePublicId, comment: comment || null }),
    }),

  create: (
    accessToken: string,
    payload: { modality_public_id: string; academic_semester: string; requires_validation?: boolean; observations?: string }
  ) =>
    request<ProcessOut>('/processes', {
      method: 'POST',
      headers: authHeaders(accessToken),
      body: JSON.stringify(payload),
    }),
}

export interface RequiredDocumentOut {
  public_id: string
  document_type: { public_id: string; code: string; name: string; description: string | null }
  mandatory: boolean
  note: string | null
  sort_order: number
}

export interface ModalityDetail extends ModalityOut {
  required_documents: RequiredDocumentOut[]
}

export const modalitiesApi = {
  list: (accessToken: string) =>
    request<ModalityOut[]>('/modalities', { headers: authHeaders(accessToken) }),

  get: (accessToken: string, modalityPublicId: string) =>
    request<ModalityDetail>(`/modalities/${modalityPublicId}`, { headers: authHeaders(accessToken) }),
}

export const workflowApi = {
  transitions: (accessToken: string, modalityPublicId: string) =>
    request<AllowedTransitionOut[]>(`/workflow/transitions?modality_public_id=${modalityPublicId}`, {
      headers: authHeaders(accessToken),
    }),
}

export interface AllowedTransitionOut {
  public_id: string
  source_state: PossibleStateOut
  target_state: PossibleStateOut
  authorized_role: RoleOut
}

export interface DocumentTypeOut {
  public_id: string
  code: string
  name: string
  description: string | null
}

export type DocumentStatus = 'pendiente' | 'aprobado' | 'rechazado'

export interface ProcessDocumentOut {
  public_id: string
  document_type: DocumentTypeOut
  file_name: string
  version: number
  status: DocumentStatus
  download_url: string
  uploaded_by: BackendUser
  reviewed_by: BackendUser | null
  uploaded_at: string
  reviewed_at: string | null
  comment: string | null
}

export interface ChecklistItemOut {
  document_type: DocumentTypeOut
  mandatory: boolean
  note: string | null
  document: ProcessDocumentOut | null
  checklist_status: 'faltante' | DocumentStatus
}

export const documentsApi = {
  checklist: (accessToken: string, processPublicId: string) =>
    request<ChecklistItemOut[]>(`/processes/${processPublicId}/checklist`, {
      headers: authHeaders(accessToken),
    }),

  listForProcess: (accessToken: string, processPublicId: string) =>
    request<ProcessDocumentOut[]>(`/processes/${processPublicId}/documents`, {
      headers: authHeaders(accessToken),
    }),

  upload: (accessToken: string, processPublicId: string, documentTypePublicId: string, file: File, comment?: string) => {
    const form = new FormData()
    form.append('document_type_public_id', documentTypePublicId)
    if (comment) form.append('comment', comment)
    form.append('file', file)
    return request<ProcessDocumentOut>(`/processes/${processPublicId}/documents`, {
      method: 'POST',
      headers: authHeaders(accessToken),
      body: form,
    })
  },
}
