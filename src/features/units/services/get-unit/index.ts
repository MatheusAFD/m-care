import { httpClientFetch } from '@m-care/features/@shared/lib'

import { ErrorResponse } from '@m-care/features/@shared/types'
import { Unit } from '../../types'

interface GetEmployeeParams {
  unitId: string
}

export const getUnit = async (
  params: GetEmployeeParams
): Promise<[ErrorResponse | null, Unit | null]> => {
  const { unitId } = params

  const [error, response] = await httpClientFetch<Unit, ErrorResponse>({
    url: `/units/${unitId}`,
    method: 'GET',

    next: {
      tags: ['get-unit'],
      revalidate: 60
    }
  })

  return [error, response]
}
