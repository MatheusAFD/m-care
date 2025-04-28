import { Suspense } from 'react'

import { Container, Loading } from '@m-care/features/@shared/components'

import {
  EmployeeContainer,
  EmployeesPageHeader
} from '@m-care/features/employees/components'
import { Metadata } from 'next'
import { RouteParamsWithFilters } from '@m-care/features/@shared/types'

export const metadata: Metadata = {
  title: 'Colaboradores',
  description: 'Gerenciamento de colaboradores'
}

export default async function EmployeesPage({
  searchParams
}: RouteParamsWithFilters) {
  const filters = await searchParams

  const { status = 'active', search = '', page = 1, limit = 20 } = filters

  const filtersParams = {
    status,
    search,
    page,
    limit
  }

  return (
    <Container className="flex flex-col w-full p-8 gap-8">
      <EmployeesPageHeader />

      <Suspense fallback={<Loading />}>
        <EmployeeContainer filters={filtersParams} />
      </Suspense>
    </Container>
  )
}
