import { useQuery } from '@tanstack/react-query'

import { getEmployees } from '../../services/get-employees'
import { GetEmployeeFilters } from '../../services/get-employees/types'
import { EmployeesResponse } from '../../types'

interface UseGetEmployeesParams extends GetEmployeeFilters {
  initialData?: EmployeesResponse | null
}

export const useGetEmployees = ({
  initialData,
  limit,
  page,
  search,
  status
}: UseGetEmployeesParams) => {
  const queryData = useQuery({
    queryKey: ['get-employees', search, page, limit, status],
    queryFn: async () => {
      const [error, response] = await getEmployees({
        limit,
        page,
        search,
        status
      })
      if (error) {
        throw error
      }

      return response
    },
    initialData,
    initialDataUpdatedAt: Date.now()
  })

  return queryData
}
