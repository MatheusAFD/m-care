import { httpClientFetch } from '@m-care/features/@shared/lib'
import { EmployeeFormSchemaType } from '../../types'
import { ErrorResponse } from '@m-care/features/@shared/types'
import { CreateEmployeeResponse } from './types'

export const createEmployee = async (
  data: EmployeeFormSchemaType
): Promise<[ErrorResponse | null, CreateEmployeeResponse | null]> => {
  const [error, response] = await httpClientFetch<
    CreateEmployeeResponse,
    ErrorResponse
  >({
    url: '/employees',
    method: 'POST',
    data: {
      ...data,
      color: '#5F8D4E',
      status: 'ACTIVE'
    }
  })

  return [error, response]
}
