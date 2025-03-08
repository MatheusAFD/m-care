import { Building2, Calendar, DoorOpen, Home, Users } from 'lucide-react'

export const sidebarMenuItems = [
  {
    title: 'Home',
    url: '/admin/home',
    icon: Home,
    as: '/admin/home'
  },
  {
    title: 'Agenda',
    url: '/admin/home',
    icon: Calendar,
    as: '/admin/schedules'
  },
  {
    title: 'Unidades',
    url: '/admin/home',
    icon: Building2,
    as: '/admin/units'
  },

  {
    title: 'Salas',
    url: '/admin/home',
    icon: DoorOpen,
    as: 'admin/rooms'
  },
  {
    title: 'Colaboradores',
    url: '/admin/home',
    icon: Users,
    as: '/admin/employees'
  }
]
