'use client'
import { useState } from 'react'

import { PaginationButtons } from '@m-care/features/@shared/components'
import { useDisclosure, useUrlFilters } from '@m-care/features/@shared/hooks'
import { useGetUnits } from '@m-care/features/units/hooks/use-get-units'
import { GetUnitsResponse } from '@m-care/features/units/types/get-units-response'
import { UnitCard } from '../unit-card'
import { UnitEditModal } from '../unit-edit-modal'

interface UnitsListProps {
  initialData: GetUnitsResponse | null
}

export const UnitsList = (props: UnitsListProps) => {
  const { initialData } = props

  const [selectedUnit, setSelectedUnit] = useState('')

  const { handlePageChange, page, search } = useUrlFilters()

  const { isOpen, onOpenChange } = useDisclosure()

  const { data, pagination } = useGetUnits({
    initialData,
    limit: 20,
    page,
    search
  })

  const handleEdit = async (employeeId: string) => {
    setSelectedUnit(employeeId)
    onOpenChange()
  }

  const handleCloseModal = () => {
    setSelectedUnit('')
  }

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {data?.data.map((unit) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            onEdit={() => handleEdit(unit.id)}
          />
        ))}
      </div>

      <PaginationButtons
        page={page}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.hasNextPage}
        hasPrevPage={pagination.hasPreviousPage}
        handlePageChange={handlePageChange}
        className="mt-8"
      />

      <UnitEditModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        unitId={selectedUnit}
        onClose={handleCloseModal}
      />
    </>
  )
}
