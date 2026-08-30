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
  { id: 'comites', label: 'Comités', group: 'gestion', path: '/comites' },
  { id: 'administrativo', label: 'Áreas administrativas', group: 'gestion', path: '/administrativo' },
  { id: 'externo', label: 'Entidades externas', group: 'gestion', path: '/externo' },
  { id: 'calificaciones', label: 'Calificaciones', group: 'gestion', path: '/calificaciones' },
  { id: 'notificaciones', label: 'Notificaciones', group: 'gestion', path: '/notificaciones' },
  { id: 'reportes', label: 'Reportes', group: 'gestion', path: '/reportes' },
]

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
