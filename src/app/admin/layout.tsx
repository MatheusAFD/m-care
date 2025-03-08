import { PropsWithChildren } from 'react'

import { CustomSidebar } from '@m-care/features/@shared/components/app-sidebar'

export default function AdminLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <CustomSidebar />
      {children}
    </>
  )
}
