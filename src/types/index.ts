// ─── Navigation ──────────────────────────────────────────────
export type NavSection =
  | 'dashboard'
  | 'tramites'
  | 'nuevo'
  | 'buscar'
  | 'trazabilidad'
  | 'documentos'
  | 'reportes'
  | 'comites'

// ─── Auth ─────────────────────────────────────────────────────
export type AuthMethod = 'sso' | 'credentials'

export type AuthStep = {
  label: string
  status: 'pending' | 'loading' | 'done'
}

export interface User {
  id: string
  name: string
  initials: string
  email: string
  role: string
}

// ─── Tramite ──────────────────────────────────────────────────
export type TramiteEstado =
  | 'borrador'
  | 'en-revision'
  | 'aprobado-consejo'
  | 'completado'
  | 'docs-faltantes'

export type TramiteModalidad =
  | 'Proyecto de grado'
  | 'Pasantía'
  | 'Homologación'
  | 'Emprendimiento'
  | 'Intercambio intl.'
  | 'Semillero'
  | 'Monografía'

export interface Tramite {
  id: string
  cedula: string
  estudiante: string
  modalidad: TramiteModalidad
  programa: string
  estado: TramiteEstado
  semestre: string
  updatedAt: string
  documentos: DocumentoTramite[]
}

export interface DocumentoTramite {
  id: string
  nombre: string
  estado: 'cargado' | 'pendiente' | 'sin-cargar'
}

// ─── Documento ────────────────────────────────────────────────
export type DocumentoTipo =
  | 'Anteproyecto'
  | 'Acta consejo'
  | 'Carta aval'
  | 'Paz y salvo'
  | 'Resolución'

export interface Documento {
  id: string
  nombre: string
  estudiante: string
  tipo: DocumentoTipo
  fecha: string
  url?: string
}

// ─── Timeline ─────────────────────────────────────────────────
export interface TimelineEvent {
  id: string
  titulo: string
  autor: string
  fecha: string
  status: 'done' | 'active'
}

// ─── Metrics ─────────────────────────────────────────────────
export interface Metric {
  label: string
  value: string | number
  sub: string
  subColor?: string
  accent?: 'orange' | 'green'
}
