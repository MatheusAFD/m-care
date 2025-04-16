'use client'

import { PaginationButtons } from '@m-care/features/@shared/components'
import { useUrlFilters } from '@m-care/features/@shared/hooks'
import { useGetUnits } from '@m-care/features/units/hooks/use-get-units'
import { GetUnitsResponse } from '@m-care/features/units/types/get-units-response'
import { UnitCard } from '../unit-card'

interface UnitsListProps {
  initialData: GetUnitsResponse | null
}

export const UnitsList = (props: UnitsListProps) => {
  const { initialData } = props

  const { handlePageChange, page, search } = useUrlFilters()

  const { data, pagination } = useGetUnits({
    initialData,
    limit: 20,
    page,
    search
  })

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {data?.data.map((unit) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            onEdit={() => console.log(unit)}
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
    </>
  )
}
