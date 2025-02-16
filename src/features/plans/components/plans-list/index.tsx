'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import { PlanCard, PlanPaymentModal } from '@m-care/features/plans/components'

import { StripeProvider } from '@m-care/features/stripe/context'
import { useDisclosure } from '@m-care/features/@shared/hooks'
import { Plan } from '@m-care/features/plans/services'

interface PlansListProps {
  plans: Plan[] | null
}

import { usePaymentStatus } from '../../hooks'

export const PlansList = ({ plans }: PlansListProps) => {
  const [selectedPlanId, setSelectedPlanId] = useState('')

  const { isOpen, onOpenChange, onClose } = useDisclosure()

  usePaymentStatus({
    onApproved() {
      toast.dismiss('after-payment')
    },
    onFailed() {
      toast.dismiss('after-payment')
    }
  })

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
