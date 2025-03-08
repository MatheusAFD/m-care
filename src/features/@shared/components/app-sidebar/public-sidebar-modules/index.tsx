import Link from 'next/link'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui'

import { sidebarMenuItems } from '@m-care/features/constants'
import { RolesEnum } from '@m-care/features/@shared/enums'

export const PublicSidebarModules = () => {
  const filteredSidebarMenuItems = sidebarMenuItems.filter((item) =>
    item.requiredRoles?.includes(RolesEnum.USER)
  )

  return (
    <SidebarMenu>
      {filteredSidebarMenuItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild size="lg" url={item.as}>
            <Link href={item.url}>
              <item.icon />
              <p>{item.title}</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
