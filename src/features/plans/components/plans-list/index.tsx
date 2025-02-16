'use client'

import { useState } from 'react'

import { Plan } from '../../services'
import { PlanCard } from '../plan-card'
import { PlanPaymentModal } from '../plan-payment-modal'

import { StripeProvider } from '@m-care/features/stripe/context'
import { useDisclosure } from '@m-care/features/@shared/hooks'

interface PlansListProps {
  plans: Plan[] | null
}

export const PlansList = ({ plans }: PlansListProps) => {
  const [selectedPlanId, setSelectedPlanId] = useState('')

  const { isOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <div className="flex flex-wrap gap-2 justify-center items-end place-self-center">
      {plans?.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          onSelectPlan={() => {
            onOpenChange()
            setSelectedPlanId(plan.id)
          }}
        />
      ))}

      <StripeProvider>
        <PlanPaymentModal
          planId={selectedPlanId}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={() => {
            setSelectedPlanId('')
            onClose()
          }}
        />
      </StripeProvider>
    </div>
  )
}
