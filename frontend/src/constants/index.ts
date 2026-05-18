import type { NavSection } from '@/types'

export const NAV_ITEMS: Array<{
  id: NavSection
  label: string
  group: 'principal' | 'gestion'
  path: string
  badge?: number
}> = [
  { id: 'dashboard', label: 'Dashboard', group: 'principal', path: '/dashboard', badge: 4 },
  { id: 'tramites', label: 'Mis trámites', group: 'principal', path: '/tramites' },
  { id: 'nuevo', label: 'Nuevo trámite', group: 'principal', path: '/nuevo' },
  { id: 'buscar', label: 'Buscar por cédula', group: 'principal', path: '/buscar' },
  { id: 'trazabilidad', label: 'Trazabilidad', group: 'gestion', path: '/trazabilidad' },
  { id: 'documentos', label: 'Documentos', group: 'gestion', path: '/documentos' },
  { id: 'reportes', label: 'Reportes', group: 'gestion', path: '/reportes' },
]

export const AUTH_STEPS = [
  'Verificando credenciales Microsoft',
  'Consultando Azure AD UCompensar',
  'Cargando perfil institucional',
  'Redirigiendo al sistema...',
]

export const C = {
  orange:  '#FF6600',
  orangeH: '#E65C00',
  orangeL: 'rgba(255, 102, 0, 0.1)',
  green:   '#00adba',
  greenM:  '#008E99',
  greenL:  'rgba(0, 173, 186, 0.1)',
  bg:      '#FDFDFD',
  border:  '#E2E8F0',
  text:    '#0F172A',
  muted:   '#475569',
  light:   '#FFFFFF',
}

export const MODALIDADES = [
  'Proyecto de grado',
  'Pasantía empresarial',
  'Homologación',
  'Emprendimiento',
  'Intercambio internacional',
  'Semillero',
  'Monografía',
] as const

export const CARRERAS = [
  'Ingeniería de Sistemas',
  'Ingeniería de Software',
  'Ingeniería Industrial',
  'Ingeniería de Telecomunicaciones',
  'Ingeniería Multimedia',
  'Ciencia de Datos',
  'Ingeniería Biomédica',
  'Ingeniería en Tecnologías de la Información y las Comunicaciones',
  'Administración de Empresas',
  'Administración de Servicios de Salud',
  'Mercadeo y Publicidad',
  'Profesional en Negocios y Logística Internacional',
  'Contaduría Pública',
  'Finanzas y Negocios Internacionales',
  'Administración en Salud',
  'Administración Financiera',
  'Comunicación Política y Gobierno',
  'Profesional en Deporte y Actividad Física',
  'Licenciatura en Educación Infantil',
  'Comunicación Social',
  'Licenciatura en Bilingüismo con Énfasis en Inglés',
  'Diseño Visual',
  'Profesional en Lenguas',
  'Psicología',
] as const

export const SEMESTRES = [
  '1.° semestre',
  '2.° semestre',
  '3.° semestre',
  '4.° semestre',
  '5.° semestre',
  '6.° semestre',
  '7.° semestre',
  '8.° semestre',
  '9.° semestre',
  '10.° semestre',
] as const

export const ESTADO_LABELS: Record<string, string> = {
  borrador: 'Borrador',
  'en-revision': 'En revisión',
  'aprobado-consejo': 'Aprobado consejo',
  completado: 'Completado',
  'docs-faltantes': 'Docs faltantes',
}
