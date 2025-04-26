import { parseAsInteger, useQueryState } from 'nuqs'

export const useUrlFilters = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })
  const [status, setStatus] = useQueryState('status', {
    defaultValue: 'active'
  })

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch)
  }

  const handleStatusChange = (newStatus: 'active' | 'inactive') => {
    setStatus(newStatus)
  }

  const handleReset = () => {
    setPage(1)
    setSearch('')
    setStatus('active')
  }

  return {
    page,
    search,
    status,
    handleReset,
    handleSearch,
    handlePageChange,
    handleStatusChange
  }
}
