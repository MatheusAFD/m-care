import { getUnits } from '../../services'
import { UnitsList } from '../units-list'
import { UnitsInitialFilters } from './types'

export const UnitsContainer = async ({ filters }: UnitsInitialFilters) => {
  const { status, search, page } = filters

  const [error, response] = await getUnits({
    limit: 20,
    page: page,
    search,
    status
  })

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <UnitsList initialData={response} />
    </>
  )
}
