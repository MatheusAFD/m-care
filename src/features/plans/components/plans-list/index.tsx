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
  const [selectedPlan, setSelectedPlan] = useState({
    id: '',
    name: '',
    price: '0'
  })

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
            setSelectedPlan({
              id: plan.id,
              price: plan.price,
              name: plan.name
            })
          }}
        />
      ))}

      <StripeProvider>
        <PlanPaymentModal
          selectedPlan={selectedPlan}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={() => {
            setSelectedPlan({
              id: '',
              price: '',
              name: ''
            })
            onClose()
          }}
        />
      </StripeProvider>
    </div>
  )
}
