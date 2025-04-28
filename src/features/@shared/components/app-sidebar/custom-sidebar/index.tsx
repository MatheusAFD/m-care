import { Suspense } from 'react'

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

export function CustomSidebar() {
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
