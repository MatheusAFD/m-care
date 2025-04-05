import { httpClientFetch } from '@m-care/features/@shared/lib'
import { EmployeeResponse } from '../../types'
import { ErrorResponse } from '@m-care/features/@shared/types'
import { GetEmployeeFilters } from './types'

export const getEmployees = async (
  filters: GetEmployeeFilters
): Promise<[ErrorResponse | null, EmployeeResponse | null]> => {
  const { page, limit, search } = filters

  const [error, response] = await httpClientFetch<
    EmployeeResponse,
    ErrorResponse
  >({
    url: `/employees?page=${page}&limit=${limit}`,
    method: 'GET',
    params: {
      page,
      limit,
      search
    },
    next: {
      tags: ['employees'],
      revalidate: 60
    }
  })

  return [error, response]
}
