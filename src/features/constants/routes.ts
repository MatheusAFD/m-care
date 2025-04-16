import { RolesEnum } from '../@shared/enums'

export const publicRoutes = [
  { path: '/auth/sign-in', whenAuthenticated: 'redirect' },
  { path: '/auth/register', whenAuthenticated: 'redirect' },
  { path: '/auth/sign-out', whenAuthenticated: 'keep' }
] as const

export const privateRoutes = [
  { url: '/plans', requiredRoles: [RolesEnum.ADMIN] },
  { url: '/admin/home', requiredRoles: [RolesEnum.USER, RolesEnum.ADMIN] },
  { url: '/admin/units', requiredRoles: [RolesEnum.USER, RolesEnum.ADMIN] },
  { url: '/admin/employees', requiredRoles: [RolesEnum.USER, RolesEnum.ADMIN] },
  { url: '/auth/refresh', requiredRoles: [RolesEnum.USER, RolesEnum.ADMIN] }
]
