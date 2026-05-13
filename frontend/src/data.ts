import { C } from '@/constants'

// ─── Tramites table data ─────────────────────────────────────
export const TRAMITES = [
  { id: '1', name: 'Laura Pinzón',    cc: '1020482311', mod: 'Proyecto de grado',   status: 'en-revision'     as const, t: 'Hoy 9:41'  },
  { id: '2', name: 'Carlos Méndez',   cc: '1018934522', mod: 'Pasantía empresarial', status: 'aprobado'        as const, t: 'Ayer'      },
  { id: '3', name: 'Daniela Torres',  cc: '1023663748', mod: 'Homologación',         status: 'completado'      as const, t: '26 mar'    },
  { id: '4', name: 'Andrés Mora',     cc: '1022847391', mod: 'Emprendimiento',       status: 'borrador'        as const, t: '25 mar'    },
  { id: '5', name: 'Sara Gómez',      cc: '1019203847', mod: 'Intercambio intl.',    status: 'docs-faltantes'  as const, t: '24 mar'    },
  { id: '6', name: 'Julián Ríos',     cc: '1021738291', mod: 'Semillero',            status: 'en-revision'     as const, t: '23 mar'    },
]

// ─── Modality bars for dashboard chart ───────────────────────
export const MODALITY_BARS = [
  { label: 'Proyecto de grado',   count: 13, pct: 65, color: C.green  },
  { label: 'Pasantía empresarial', count: 8,  pct: 40, color: C.greenM },
  { label: 'Homologación',         count: 6,  pct: 30, color: C.orange },
  { label: 'Emprendimiento',       count: 4,  pct: 20, color: '#F0956A' },
  { label: 'Intercambio intl.',    count: 3,  pct: 15, color: '#B4B2A9' },
]

// ─── Trazabilidad audit log ────────────────────────────────────
export const AUDIT_LOG = [
  { title: 'Revisión coordinadora', sub: 'María Álvarez · Hoy 9:41 am', dot: C.orange },
  { title: 'Anteproyecto cargado en SharePoint', sub: 'Laura Pinzón · 15 mar 2026 · 2.4 MB', dot: C.green },
  { title: 'Notificación enviada por Outlook', sub: 'Sistema · 12 mar 2026', dot: '#a1a1aa' },
  { title: 'Trámite radicado en sistema', sub: 'Laura Pinzón · 12 mar 2026 · 10:22', dot: '#a1a1aa' },
]

// Re-export C for convenience
export { C } from '@/constants'
