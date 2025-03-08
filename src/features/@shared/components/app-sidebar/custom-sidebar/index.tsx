import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from '@m-care/features/@shared/components/ui'

import {
  SidebarModules,
  PublicSidebarModules,
  CustomSidebarFooter,
  AvatarSkeleton
} from '../'
import { Suspense } from 'react'

export async function CustomSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>M - Care</SidebarGroupLabel>
          <SidebarGroupContent>
            <Suspense fallback={<PublicSidebarModules />}>
              <SidebarModules />
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Suspense fallback={<AvatarSkeleton />}>
        <CustomSidebarFooter />
      </Suspense>
    </Sidebar>
  )
}
