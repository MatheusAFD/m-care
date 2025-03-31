import { parseAsInteger, useQueryState } from 'nuqs'

export const useUrlFilters = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return { page, handlePageChange }
}
