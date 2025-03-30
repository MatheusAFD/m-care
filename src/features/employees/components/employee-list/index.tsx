'use client'

import { PaginationButtons } from '@m-care/features/@shared/components'
import { useGetEmployees } from '../../hooks'
import { EmployeeResponse } from '../../types'
import { EmployeeCard } from '../employee-card'
import { useUrlFilters } from '@m-care/features/@shared/hooks/'

interface EmployeeListProps {
  initialData: EmployeeResponse | null
}

export const EmployeeList = ({ initialData }: EmployeeListProps) => {
  const { handlePageChange, page } = useUrlFilters()

  const { data } = useGetEmployees({
    initialData,
    limit: 20,
    page
  })

  return (
    <>
      <div className="flex flex-wrap gap-4 px-8">
        {data?.data.map((employee) => (
          <EmployeeCard
            key={employee.id}
            name={employee.name}
            color={employee.color}
          />
        ))}
      </div>

      <PaginationButtons
        handlePageChange={handlePageChange}
        hasNextPage={data?.pagination.hasNextPage}
        hasPrevPage={data?.pagination.hasPreviousPage}
        totalPages={data?.pagination.totalPages}
        page={page}
        className="mt-8"
      />
    </>
  )
}
