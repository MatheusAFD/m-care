'use server'

import { httpClientFetch } from '@m-care/features/@shared/lib'
import { UnitFormData } from '../../types'
import { ErrorResponse } from '@m-care/features/@shared/types'
import { CreateUnitResponse } from './types'

export const createUnit = async (
  data: UnitFormData
): Promise<[ErrorResponse | null, CreateUnitResponse | null]> => {
  const [error, response] = await httpClientFetch<
    CreateUnitResponse,
    ErrorResponse
  >({
    url: '/units',
    method: 'POST',
    data
  })

  return [error, response]
}
