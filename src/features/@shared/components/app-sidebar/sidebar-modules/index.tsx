import Link from 'next/link'

import { Restricted } from '@m-care/features/@shared/components'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@m-care/features/@shared/components/ui'
import { sidebarMenuItems } from '@m-care/features/constants'
import { getMe } from '@m-care/features/users/services'

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
            <SidebarMenuButton asChild size="sm" url={item.as}>
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
