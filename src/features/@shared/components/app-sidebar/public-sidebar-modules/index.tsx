import Link from 'next/link'

import { RolesEnum } from '@m-care/features/@shared/enums'
import { sidebarMenuItems } from '@m-care/features/constants'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui'

export const PublicSidebarModules = () => {
  const filteredSidebarMenuItems = sidebarMenuItems.filter((item) =>
    item.requiredRoles?.includes(RolesEnum.USER)
  )

  return (
    <SidebarMenu>
      {filteredSidebarMenuItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild size="sm" url={item.as}>
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
