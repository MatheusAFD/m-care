import { httpClientFetch } from '@m-care/features/@shared/lib'
import { ErrorResponse } from '@m-care/features/@shared/types'
import { CreateEmployeeResponse, EditEmployeeParams } from './types'

export const editEmployee = async ({
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

  return [error, response]
}
