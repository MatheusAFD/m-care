'use server'

import { revalidateTag } from 'next/cache'

import { httpClientFetch } from '@m-care/features/@shared/lib'
import { ErrorResponse } from '@m-care/features/@shared/types'

import { Unit } from '../../types'
import { UpdateUnitParams } from './types'

export const updateUnit = async ({
  unitId,
  data
}: UpdateUnitParams): Promise<[ErrorResponse | null, Unit | null]> => {
  const unitStatus = data.status ? 'active' : 'inactive'

  const [error, response] = await httpClientFetch<Unit, ErrorResponse>({
    url: `/units/${unitId}`,
    method: 'PATCH',
    data: {
      ...data,
      status: unitStatus
    }
  })

  revalidateTag('get-units')
  revalidateTag('get-unit')

  return [error, response]
}
