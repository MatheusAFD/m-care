'use client'

import React, { PropsWithChildren } from 'react'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { QueryClientProvider } from '@tanstack/react-query'

import { SidebarProvider } from '../components/ui'
import { queryClient } from '../lib'

interface AppProvidersProps {
  children: React.ReactNode
}

export const GlobalProviders: React.FC<AppProvidersProps> = ({
  children
}: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <SidebarProvider>{children}</SidebarProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}
