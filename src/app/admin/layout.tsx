import { AppSidebar } from '@m-care/features/@shared/components'
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Home'
}

export default function AdminLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <AppSidebar />
      {children}
    </>
  )
}
