import { Building2, Calendar, Home, Users } from 'lucide-react'
import { RolesEnum } from '../@shared/enums'

export const sidebarMenuItems = [
  {
    title: 'Home',
    url: '/admin/home',
    icon: Home,
    as: '/admin/home',
    requiredRoles: [RolesEnum.USER, RolesEnum.ADMIN]
  },
  {
    title: 'Agenda',
    url: '/admin/home',
    icon: Calendar,
    as: '/admin/schedules',
    requiredRoles: [RolesEnum.USER, RolesEnum.ADMIN]
  },
  {
    title: 'Unidades',
    url: '/admin/units',
    icon: Building2,
    as: '/admin/units',
    requiredRoles: [RolesEnum.ADMIN]
  },

  {
    title: 'Colaboradores',
    url: '/admin/employees',
    icon: Users,
    as: '/admin/employees',
    requiredRoles: [RolesEnum.ADMIN]
  }
]
