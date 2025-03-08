import Link from 'next/link'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@m-care/features/@shared/components/ui'
import { Restricted } from '@m-care/features/@shared/components'

import { getMe } from '@m-care/features/users/services'
import { sidebarMenuItems } from '@m-care/features/constants'

export const SidebarModules = async () => {
  const [error, data] = await getMe()

  if (error) {
    return <span>Erro ao carregar os módulos.</span>
  }

  return (
    <SidebarMenu>
      {sidebarMenuItems.map((item) => (
        <Restricted
          key={item.title}
          userRole={data?.roles.type}
          requiredRoles={item.requiredRoles}
        >
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" url={item.as}>
              <Link href={item.url}>
                <item.icon />
                <p>{item.title}</p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Restricted>
      ))}
    </SidebarMenu>
  )
}
