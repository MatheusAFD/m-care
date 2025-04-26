import {
  Conditional,
  NoDataBackground
} from '@m-care/features/@shared/components'
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

  const hasData = Boolean(response?.data.length) ?? false

  return (
    <>
      <Conditional condition={hasData}>
        <UnitsList initialData={response} />
      </Conditional>

      <Conditional condition={!hasData}>
        <NoDataBackground
          src="/no-data-background/units.svg"
          alt="Imagem de um prédio"
          text="Nenhuma unidade cadastrada."
        />
      </Conditional>
    </>
  )
}
