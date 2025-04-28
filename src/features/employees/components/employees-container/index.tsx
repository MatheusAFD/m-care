import { BaseQueryFilters } from '@m-care/features/@shared/types'

import { getEmployees } from '../../services/get-employees'
import { EmployeeList } from '../employee-list'

interface EmployeeContainerProps {
  filters: BaseQueryFilters
}

export const EmployeeContainer = async ({
  filters
}: EmployeeContainerProps) => {
  const { limit, page, search, status } = filters

  const [error, response] = await getEmployees({
    limit,
    page,
    search,
    status
  })

  if (error) {
    console.error(JSON.stringify(error))
  }

  return <EmployeeList initialData={response} />
}
