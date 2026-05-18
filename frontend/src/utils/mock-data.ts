import type { Tramite, Documento, TimelineEvent, Metric } from '@/types'

export const MOCK_TRAMITES: Tramite[] = [
  {
    id: '1',
    cedula: '1020482311',
    estudiante: 'Laura Pinzón',
    modalidad: 'Proyecto de grado',
    programa: 'Ing. Sistemas',
    semestre: '9.° semestre',
    estado: 'en-revision',
    updatedAt: 'Hoy 9:41',
    documentos: [
      { id: 'd1', nombre: 'Anteproyecto aprobado', estado: 'cargado' },
      { id: 'd2', nombre: 'Carta aval del director', estado: 'pendiente' },
      { id: 'd3', nombre: 'Paz y salvo académico', estado: 'sin-cargar' },
    ],
  },
  {
    id: '2',
    cedula: '1018934522',
    estudiante: 'Carlos Méndez',
    modalidad: 'Pasantía',
    programa: 'Administración',
    semestre: '10.° semestre',
    estado: 'aprobado-consejo',
    updatedAt: 'Ayer',
    documentos: [
      { id: 'd4', nombre: 'Carta empresa', estado: 'cargado' },
      { id: 'd5', nombre: 'Aval director', estado: 'cargado' },
    ],
  },
  {
    id: '3',
    cedula: '1023663748',
    estudiante: 'Daniela Torres',
    modalidad: 'Homologación',
    programa: 'Ing. Software',
    semestre: '8.° semestre',
    estado: 'completado',
    updatedAt: '26 mar',
    documentos: [
      { id: 'd6', nombre: 'Certificado institución', estado: 'cargado' },
      { id: 'd7', nombre: 'Plan de estudios', estado: 'cargado' },
    ],
  },
  {
    id: '4',
    cedula: '1022847391',
    estudiante: 'Andrés Mora',
    modalidad: 'Emprendimiento',
    programa: 'Ing. Industrial',
    semestre: '9.° semestre',
    estado: 'borrador',
    updatedAt: '25 mar',
    documentos: [
      { id: 'd8', nombre: 'Plan de negocio', estado: 'pendiente' },
    ],
  },
  {
    id: '5',
    cedula: '1019203847',
    estudiante: 'Sara Gómez',
    modalidad: 'Intercambio intl.',
    programa: 'Comunicación Social',
    semestre: '8.° semestre',
    estado: 'docs-faltantes',
    updatedAt: '24 mar',
    documentos: [
      { id: 'd9', nombre: 'Carta aceptación', estado: 'sin-cargar' },
      { id: 'd10', nombre: 'Paz y salvo', estado: 'pendiente' },
    ],
  },
]

export const MOCK_DOCUMENTOS: Documento[] = [
  {
    id: 'doc1',
    nombre: 'Anteproyecto_LauraPinzon_v2.pdf',
    estudiante: 'Laura Pinzón',
    tipo: 'Anteproyecto',
    fecha: '15 mar 2026',
  },
  {
    id: 'doc2',
    nombre: 'ActaConsejo_Mar2026.pdf',
    estudiante: '—',
    tipo: 'Acta consejo',
    fecha: '20 mar 2026',
  },
  {
    id: 'doc3',
    nombre: 'CartaAval_CMendez.pdf',
    estudiante: 'Carlos Méndez',
    tipo: 'Carta aval',
    fecha: '18 mar 2026',
  },
]

export const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: 'tl1',
    titulo: 'Revisión coordinadora',
    autor: 'María Álvarez',
    fecha: 'Hoy 9:41 am',
    status: 'active',
  },
  {
    id: 'tl2',
    titulo: 'Anteproyecto cargado en SharePoint',
    autor: 'Laura Pinzón · 15 mar 2026 · 2.4 MB',
    fecha: '15 mar 2026',
    status: 'done',
  },
  {
    id: 'tl3',
    titulo: 'Notificación enviada por Outlook',
    autor: 'Sistema · 12 mar 2026',
    fecha: '12 mar 2026',
    status: 'done',
  },
  {
    id: 'tl4',
    titulo: 'Trámite radicado en sistema',
    autor: 'Laura Pinzón · 12 mar 2026 · 10:22',
    fecha: '12 mar 2026',
    status: 'done',
  },
]

export const DASHBOARD_METRICS: Metric[] = [
  {
    label: 'Trámites activos',
    value: 34,
    sub: '+3 esta semana',
    subColor: 'text-accent',
    accent: 'primary',
  },
  {
    label: 'Aprobados mes',
    value: 8,
    sub: 'Actas generadas',
    subColor: 'text-neutral-muted',
    accent: 'secondary',
  },
  {
    label: 'Pendientes revisión',
    value: 12,
    sub: '4 con alerta',
    subColor: 'text-amber-500',
  },
  {
    label: 'Docs SharePoint',
    value: 214,
    sub: '14 GB usados',
    subColor: 'text-neutral-muted',
  },
]

export const REPORTE_METRICS: Metric[] = [
  { label: 'Tiempo promedio', value: '18 días', sub: '-3 días vs mes ant.', subColor: 'text-accent', accent: 'primary' },
  { label: 'Tasa aprobación', value: '87%', sub: 'Último trimestre', subColor: 'text-neutral-muted', accent: 'secondary' },
  { label: 'Actas generadas', value: 31, sub: 'Consejo facultad', subColor: 'text-neutral-muted' },
  { label: 'Alertas activas', value: 4, sub: 'Revisar urgente', subColor: 'text-amber-500' },
]

export const REPORTE_BARS = [
  { label: 'Proyecto de grado', count: 13, pct: 65, color: '#FF6600' },
  { label: 'Pasantía empresarial', count: 8, pct: 40, color: '#243455' },
  { label: 'Homologación', count: 6, pct: 30, color: '#00adba' },
  { label: 'Emprendimiento', count: 4, pct: 20, color: '#f7a400' },
  { label: 'Intercambio intl.', count: 3, pct: 15, color: '#f7d8a4' },
]
