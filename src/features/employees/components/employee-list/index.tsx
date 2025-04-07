'use client'

import { useState } from 'react'

import { PaginationButtons } from '@m-care/features/@shared/components'
import { useGetEmployees } from '../../hooks'
import { EmployeesResponse } from '../../types'
import { EmployeeCard } from '../employee-card'
import { useDisclosure, useUrlFilters } from '@m-care/features/@shared/hooks'
import { EmployeeEditModal } from '../employee-edit-modal'

interface EmployeeListProps {
  initialData: EmployeesResponse | null
}

export const EmployeeList = ({ initialData }: EmployeeListProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState('')

  const { page, search, handlePageChange } = useUrlFilters()

  const { isOpen, onOpenChange } = useDisclosure()

  const { data } = useGetEmployees({
    initialData,
    limit: 20,
    page,
    search
  })

  const handleEdit = async (employeeId: string) => {
    setSelectedEmployee(employeeId)
    onOpenChange()
  }

  const handleCloseModal = () => {
    setSelectedEmployee('')
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 px-8">
        {data?.data.map((employee) => (
          <EmployeeCard
            key={employee.id}
            name={employee.name}
            color={employee.color}
            onEdit={() => handleEdit(employee.id)}
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

      <EmployeeEditModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        employeeId={selectedEmployee}
        onClose={handleCloseModal}
      />
    </>
  )
}
