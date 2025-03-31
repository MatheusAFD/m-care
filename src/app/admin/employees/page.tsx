import { Suspense } from 'react'

import { Plus } from 'lucide-react'

import { Loading } from '@m-care/features/@shared/components'
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
      <header className="p-8">
        <EmployeeRegistrationModal>
          <Button>
            <Plus />
            Criar colaborador
          </Button>
        </EmployeeRegistrationModal>
      </header>

      <Suspense fallback={<Loading />}>
        <EmployeeContainer />
      </Suspense>
    </div>
  )
}
