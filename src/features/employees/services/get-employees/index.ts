import { httpClientFetch } from '@m-care/features/@shared/lib'
import { EmployeesResponse } from '../../types'
import { ErrorResponse } from '@m-care/features/@shared/types'
import { GetEmployeeFilters } from './types'

export const getEmployees = async (
  filters: GetEmployeeFilters
): Promise<[ErrorResponse | null, EmployeesResponse | null]> => {
  const { page, limit, search } = filters

  const [error, response] = await httpClientFetch<
    EmployeesResponse,
    ErrorResponse
  >({
    url: `/employees?page=${page}&limit=${limit}&search=${search}`,
    method: 'GET',
    next: {
      tags: ['employees'],
      revalidate: 60
    }
  })

  return [error, response]
}
