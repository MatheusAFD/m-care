export interface BaseQueryFilters {
  page: number
  limit: number
  search?: string
  status?: string
}

export interface RouteParamsWithFilters {
  searchParams: Promise<BaseQueryFilters>
}
