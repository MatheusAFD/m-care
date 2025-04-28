'use client'

import { Suspense } from 'react'

import { Plus } from 'lucide-react'

import { SearchFilter } from '@m-care/features/@shared/components'
import { Button, Toggle } from '@m-care/features/@shared/components/ui'
import { useUrlFilters } from '@m-care/features/@shared/hooks'

import { UnitRegistrationModal } from '../unit-registration-modal'

export const UnitsPageHeader = () => {
  const { status, handleReset, handleStatusChange } = useUrlFilters()

  const isFiltiringActive = status === 'active'
  const isFiltiringInactive = status === 'inactive'

  return (
    <header className="flex flex-col gap-4">
      <div className="flex w-full flex-row flex-wrap gap-3">
        <UnitRegistrationModal>
          <Button>
            <Plus />
            Criar unidade
          </Button>
        </UnitRegistrationModal>

        <Suspense>
          <SearchFilter placeholder="Pesquisar unidade" />
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
