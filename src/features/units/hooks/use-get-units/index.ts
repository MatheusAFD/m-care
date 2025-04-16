import { useQuery } from '@tanstack/react-query'

import { GetUnitsResponse } from '../../types/get-units-response'

import { getUnits } from '../../services'
import { GetUnitsFilters } from '../../services/get-units/types'

interface UseGetEmployeesParams extends GetUnitsFilters {
  initialData?: GetUnitsResponse | null
}

export const useGetUnits = ({
  initialData,
  limit,
  page,
  search = ''
}: UseGetEmployeesParams) => {
  const queryData = useQuery({
    queryKey: ['get-units', limit, page, search],
    queryFn: async () => {
      const [error, response] = await getUnits({ limit, page, search })
      if (error) {
        throw error
      }

      return response
    },
    initialData,
    initialDataUpdatedAt: Date.now()
  })

  const pagination = {
    totalPages: queryData.data?.pagination.totalPages ?? 1,
    hasNextPage: queryData.data?.pagination.hasNextPage ?? false,
    hasPreviousPage: queryData.data?.pagination.hasPreviousPage ?? false
  }

  return { pagination, ...queryData }
}
