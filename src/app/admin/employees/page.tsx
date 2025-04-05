import { Suspense } from 'react'

import { Plus } from 'lucide-react'

import { Loading, SearchFilter } from '@m-care/features/@shared/components'
import { Button } from '@m-care/features/@shared/components/ui'
import {
  EmployeeContainer,
  EmployeeRegistrationModal
} from '@m-care/features/employees/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Colaboradores',
  description: 'Gerenciamento de colaboradores'
}

export default function EmployeesPage() {
  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-wrap items-start gap-3 p-8">
        <EmployeeRegistrationModal>
          <Button>
            <Plus />
            Criar colaborador
          </Button>
        </EmployeeRegistrationModal>

        <Suspense>
          <SearchFilter />
        </Suspense>
      </header>

      <Suspense fallback={<Loading />}>
        <EmployeeContainer />
      </Suspense>
    </div>
  )
}
