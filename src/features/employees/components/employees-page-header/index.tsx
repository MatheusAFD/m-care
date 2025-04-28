'use client'

import { Suspense } from 'react'

import { Plus } from 'lucide-react'

import { Button, Toggle } from '@m-care/features/@shared/components/ui'
import { EmployeeRegistrationModal } from '../employee-registration-modal'
import { SearchFilter } from '@m-care/features/@shared/components'

import { useUrlFilters } from '@m-care/features/@shared/hooks'

export const EmployeesPageHeader = () => {
  const { status, handleReset, handleStatusChange } = useUrlFilters()

  const isFiltiringActive = status === 'active'
  const isFiltiringInactive = status === 'inactive'

  return (
    <header className="flex flex-col gap-4">
      <div className="flex w-full flex-row flex-wrap gap-3">
        <EmployeeRegistrationModal>
          <Button>
            <Plus />
            Criar colaborador
          </Button>
        </EmployeeRegistrationModal>

        <Suspense>
          <SearchFilter placeholder="Pesquisar colaborador" />
        </Suspense>
      </div>

      <div className="flex gap-2 items-center">
        <Toggle
          variant="filter"
          size="filter"
          pressed={isFiltiringActive}
          onClick={() => handleStatusChange('active')}
        >
          Ativos
        </Toggle>

        <Toggle
          variant="filter"
          size="filter"
          pressed={isFiltiringInactive}
          onClick={() => handleStatusChange('inactive')}
        >
          Inativos
        </Toggle>

        <p
          className="text-xs font-medium underline cursor-pointer hover:text-gray-500 transition-colors"
          onClick={handleReset}
        >
          Resetar filtros
        </p>
      </div>
    </header>
  )
}
