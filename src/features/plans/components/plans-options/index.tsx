import { getPlans } from '../../services/get-plans/get-plans'

import { PlanCard } from '../plan-card'

export const PlansOptions = async () => {
  const [error, plans] = await getPlans()

  console.log(plans)

  return (
    <>
      {!!error && <div>Algo deu errado</div>}
      <div className="flex gap-2 items-end">
        {plans?.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
      </div>
    </>
  )
}
