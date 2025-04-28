import { Suspense } from 'react'

import { Metadata } from 'next'

import { Container, Loading } from '@m-care/features/@shared/components'
import { RouteParamsWithFilters } from '@m-care/features/@shared/types'
import {
  UnitsContainer,
  UnitsPageHeader
} from '@m-care/features/units/components'

export const metadata: Metadata = {
  title: 'Unidades',
  description: 'Gerenciamento de unidades'
}

export default async function UnitsPage({
  searchParams
}: RouteParamsWithFilters) {
  const filters = await searchParams

  const { status = 'active', search = '', page = 1 } = filters

  const filtersParams = {
    status,
    search,
    page
  }

  return (
    <Container className="flex flex-col w-full p-8 gap-8">
      <UnitsPageHeader />

      <Suspense fallback={<Loading />}>
        <UnitsContainer filters={filtersParams} />
      </Suspense>
    </Container>
  )
}
