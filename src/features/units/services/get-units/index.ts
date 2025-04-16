import { httpClientFetch } from '@m-care/features/@shared/lib'
import { GetUnitsResponse } from '../../types/get-units-response'
import { ErrorResponse } from '@m-care/features/@shared/types'
import { GetUnitsFilters } from './types'

export const getUnits = async ({
  limit,
  page,
  search
}: GetUnitsFilters): Promise<
  [ErrorResponse | null, GetUnitsResponse | null]
> => {
  const [error, response] = await httpClientFetch<
    GetUnitsResponse,
    ErrorResponse
  >({
    method: 'GET',
    url: `/units?page=${page}&limit=${limit}&search=${search}`,
    next: {
      revalidate: 60,
      tags: ['get-units']
    }
  })

  return [error, response]
}
