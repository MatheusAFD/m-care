import { useQuery } from '@tanstack/react-query'
import { getMe } from '../../users/services/get-me/get-me'

export const useGetMe = () => {
  const queryData = useQuery({
    queryKey: ['get-me'],
    queryFn: async () => {
      const [error, response] = await getMe()
      if (error) {
        throw error
      }
      return response
    }
  })

  return { ...queryData }
}
