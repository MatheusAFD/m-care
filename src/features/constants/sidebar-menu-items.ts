import { Building2, Calendar, DoorOpen, Home, Users } from 'lucide-react'
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
    url: '/admin/home',
    icon: Building2,
    as: '/admin/units',
    requiredRoles: [RolesEnum.ADMIN]
  },
  {
    title: 'Salas',
    url: '/admin/home',
    icon: DoorOpen,
    as: 'admin/rooms',
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
