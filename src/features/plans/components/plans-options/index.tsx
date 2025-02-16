import { getPlans } from '@m-care/features/plans/services'

import { PlansList, PlansTable } from '../'

export const PlansOptions = async () => {
  const [error, plans] = await getPlans()

  return (
    <>
      {!!error && <div>Algo deu errado</div>}

      <PlansList plans={plans} />
      <PlansTable plans={plans} />
    </>
  )
}
