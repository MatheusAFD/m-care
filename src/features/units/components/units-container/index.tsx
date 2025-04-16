import {
  Conditional,
  NoDataBackground
} from '@m-care/features/@shared/components'
import { getUnits } from '../../services'
import { UnitsList } from '../units-list'

export const UnitsContainer = async () => {
  const [error, response] = await getUnits({
    limit: 20,
    page: 1,
    search: ''
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
