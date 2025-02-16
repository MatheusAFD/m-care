import { Button } from '@m-care/features/@shared/components/ui'

import { twMerge } from 'tailwind-merge'
import { Plan } from '@m-care/features/plans/services/get-plans/get-plans-response'
import { formatToMonetaryValue } from '@m-care/features/@shared/utils'

interface PlanCardProps {
  plan: Plan
  onSelectPlan: VoidFunction
}

export const PlanCard = ({ plan, onSelectPlan }: PlanCardProps) => {
  const { name, description, price, isFree, isRecommended } = plan

  const isTertiary = !isFree && !isRecommended

  return (
    <div
      className={twMerge(
        'w-[17.5rem] rounded-sm overflow-hidden flex flex-col shadow-lg',
        isRecommended ? 'min-h-[380px]' : 'min-h-[352px]'
      )}
    >
      {isRecommended && (
        <div className="w-full bg-green-principal">
          <p className="text-white font-medium text-center text-sm py-1">
            Recommended
          </p>
        </div>
      )}
      <div
        className={twMerge(
          'flex-1 px-7 py-10 flex flex-col justify-between items-center',
          isRecommended && 'bg-green-lite ',
          isFree && 'bg-white',
          isTertiary && 'bg-green-lite border outline-1 outline-green-principal'
        )}
      >
        <header className="flex items-center flex-col gap-4 text-center">
          <h1 className="text-3xl font-medium">{name}</h1>
          <p className="text-base">{description}</p>
        </header>
        <strong className="text-4xl font-bold">
          {isFree ? 'Free' : formatToMonetaryValue(price)}
        </strong>

        <Button
          variant={isRecommended ? 'default' : 'outline'}
          size="lg"
          onClick={onSelectPlan}
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}
