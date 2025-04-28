import { httpClientFetch } from '@m-care/features/@shared/lib'
import { ErrorResponse } from '@m-care/features/@shared/types'

import { Employee } from '../../types'

interface GetEmployeeParams {
  employeeId: string
}

export const getEmployee = async (
  params: GetEmployeeParams
): Promise<[ErrorResponse | null, Employee | null]> => {
  const { employeeId } = params

  const [error, response] = await httpClientFetch<Employee, ErrorResponse>({
    url: `/employees/${employeeId}`,
    method: 'GET',

    next: {
      tags: ['employee'],
      revalidate: 60
    }
  })

  return [error, response]
}
