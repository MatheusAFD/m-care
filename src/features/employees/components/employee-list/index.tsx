'use client'

import { useState } from 'react'

import {
  Conditional,
  NoDataBackground,
  PaginationButtons
} from '@m-care/features/@shared/components'
import { useDisclosure, useUrlFilters } from '@m-care/features/@shared/hooks'

import { useGetEmployees } from '../../hooks'
import { EmployeesResponse } from '../../types'
import { EmployeeCard } from '../employee-card'
import { EmployeeEditModal } from '../employee-edit-modal'

interface EmployeeListProps {
  initialData: EmployeesResponse | null
}

export const EmployeeList = ({ initialData }: EmployeeListProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState('')

  const { page, search, status, handlePageChange } = useUrlFilters()

  const { isOpen, onOpenChange } = useDisclosure()

  const { data } = useGetEmployees({
    initialData,
    limit: 20,
    page,
    search,
    status
  })

  const handleEdit = async (employeeId: string) => {
    setSelectedEmployee(employeeId)
    onOpenChange()
  }

  const handleCloseModal = () => {
    setSelectedEmployee('')
  }

  const hasData = Boolean(data?.pagination?.totalPages)

  return (
    <>
      <Conditional condition={hasData}>
        <div className="flex flex-wrap gap-4">
          {data?.data.map((employee) => (
            <EmployeeCard
              key={employee.id}
              name={employee.name}
              color={employee.color}
              onEdit={() => handleEdit(employee.id)}
            />
          ))}
        </div>
      </Conditional>

      <Conditional condition={!hasData}>
        <NoDataBackground
          src="/no-data-background/employees.svg"
          alt="Imagem de um três pessoas no formato de desenho."
          text="Nenhum colaborador encontrado."
        />
      </Conditional>

      <PaginationButtons
        handlePageChange={handlePageChange}
        hasNextPage={data?.pagination.hasNextPage ?? false}
        hasPrevPage={data?.pagination.hasPreviousPage ?? false}
        totalPages={data?.pagination.totalPages ?? 1}
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
