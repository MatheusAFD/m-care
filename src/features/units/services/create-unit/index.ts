'use server'

import { httpClientFetch } from '@m-care/features/@shared/lib'
import { ErrorResponse } from '@m-care/features/@shared/types'

import { UnitFormData } from '../../types'
import { CreateUnitResponse } from './types'

export const createUnit = async (
  data: UnitFormData
): Promise<[ErrorResponse | null, CreateUnitResponse | null]> => {
  const unitStatus = data.status ? 'active' : 'inactive'

  const [error, response] = await httpClientFetch<
    CreateUnitResponse,
    ErrorResponse
  >({
    url: '/units',
    method: 'POST',
    data: {
      ...data,
      status: unitStatus
    }
  })

  return [error, response]
}
