import { useQuery } from '@tanstack/react-query'
import { getEmployees } from '../../services/get-employees'
import { EmployeesResponse } from '../../types'
import { GetEmployeeFilters } from '../../services/get-employees/types'

interface UseGetEmployeesParams extends GetEmployeeFilters {
  initialData?: EmployeesResponse | null
}

export const useGetEmployees = ({
  initialData,
  limit,
  page,
  search = ''
}: UseGetEmployeesParams) => {
  const queryData = useQuery({
    queryKey: ['get-employees', limit, page, search],
    queryFn: async () => {
      const [error, response] = await getEmployees({ limit, page, search })
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
