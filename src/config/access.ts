import type { NavSection } from '@/types'

// Fuente única de verdad para qué rol puede ver cada sección -- la usan
// tanto el menú (Sidebar, para no mostrar un link que va a fallar) como
// el guard de rutas (RequireSection, para no dejar entrar por URL directa).
//
// Solo "nuevo" está restringido hoy porque es la única sección que el
// backend también restringe explícitamente (POST /processes exige rol
// "estudiante", ver app/domains/processes/router.py). El resto de
// secciones son de solo lectura y el backend ya filtra qué ve cada quien
// (ej. un estudiante solo ve sus propios trámites) sin necesitar ocultar
// el menú entero.
export const SECTION_ROLES: Partial<Record<NavSection, string[]>> = {
  nuevo: ['estudiante'],
}

export function canAccessSection(section: NavSection, role: string): boolean {
  const allowed = SECTION_ROLES[section]
  return !allowed || allowed.includes(role)
}

// Aprobar/rechazar un documento -- PUT /documents/{id}/review exige
// require_role("coordinador", "administrativo") en el backend.
const DOCUMENT_REVIEW_ROLES = ['coordinador', 'administrativo']

export function canReviewDocuments(role: string): boolean {
  return DOCUMENT_REVIEW_ROLES.includes(role)
}
