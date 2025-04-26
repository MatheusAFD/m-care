import { Suspense } from 'react'
import { Metadata } from 'next'

import { Container, Loading } from '@m-care/features/@shared/components'
import {
  UnitsContainer,
  UnitsPageHeader
} from '@m-care/features/units/components'

export const metadata: Metadata = {
  title: 'Unidades',
  description: 'Gerenciamento de unidades'
}

interface UnitsPageProps {
  searchParams: Promise<{ status: string; search: string; page: number }>
}

export default async function UnitsPage({ searchParams }: UnitsPageProps) {
  const filters = await searchParams

  const { status = 'active', search = '', page = 1 } = filters

  return (
    <Container className="flex flex-col w-full p-8 gap-8">
      <UnitsPageHeader />

      <Suspense fallback={<Loading />}>
        <UnitsContainer
          filters={{
            search,
            status,
            page
          }}
        />
      </Suspense>
    </Container>
  )
}
