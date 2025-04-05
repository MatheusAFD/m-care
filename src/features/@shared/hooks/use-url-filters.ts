import { parseAsInteger, useQueryState } from 'nuqs'

export const useUrlFilters = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch)
  }

  return { page, search, handleSearch, handlePageChange }
}
