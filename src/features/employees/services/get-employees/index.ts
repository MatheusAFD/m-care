import { httpClientFetch } from '@m-care/features/@shared/lib'
import { ErrorResponse } from '@m-care/features/@shared/types'

import { EmployeesResponse } from '../../types'
import { GetEmployeeFilters } from './types'

export const getEmployees = async (
  filters: GetEmployeeFilters
): Promise<[ErrorResponse | null, EmployeesResponse | null]> => {
  const { page, limit, search, status } = filters

  const [error, response] = await httpClientFetch<
    EmployeesResponse,
    ErrorResponse
  >({
    url: `/employees?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    method: 'GET',
    next: {
      tags: ['employees'],
      revalidate: 60
    }
  })

  return [error, response]
}
