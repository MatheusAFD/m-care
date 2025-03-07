'use client'

import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SidebarProvider } from '../components/ui'

const ONE_HOUR_IN_MINUTES = 60 * 60

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR_IN_MINUTES
    }
  }
})

interface AppProvidersProps {
  children: React.ReactNode
}

export const GlobalProviders: React.FC<AppProvidersProps> = ({
  children
}: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>{children}</SidebarProvider>
    </QueryClientProvider>
  )
}
