'use server'
import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@m-care/features/@shared/lib'
import { ErrorResponse } from '@m-care/features/@shared/types'

import { CreateEmployeeResponse, EditEmployeeParams } from './types'

export const updateEmployee = async ({
  employeeId,
  data
}: EditEmployeeParams): Promise<
  [ErrorResponse | null, CreateEmployeeResponse | null]
> => {
  const [error, response] = await httpClientFetch<
    CreateEmployeeResponse,
    ErrorResponse
  >({
    url: `/employees/${employeeId}`,
    method: 'PATCH',
    data: {
      ...data,
      color: '#5F8D4E'
    }
  })

  revalidateTag('employees')
  revalidateTag('employee')

  return [error, response]
}
