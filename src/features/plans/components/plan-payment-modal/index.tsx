'use client'

import { useState } from 'react'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { toast } from 'sonner'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@m-care/features/@shared/components/ui'
import { DialogProps } from '@m-care/features/@shared/types'

import { createSubscription } from '@m-care/features/plans/services'

interface PlanPaymentModalProps extends DialogProps {
  planId: string
}

export const PlanPaymentModal = ({
  planId,
  isOpen,
  onOpenChange,
  onClose
}: PlanPaymentModalProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isPending, setIsPending] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !planId) {
      return
    }

    setIsPending(true)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) return

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      })

    const [error, response] = await createSubscription({
      paymentMethodId: paymentMethod!.id,
      planId
    })

    console.log(error)

    setIsPending(false)

    if (!!error || !!paymentMethodError) {
      toast.error('Erro', {
        description: 'Ocorreu um erro ao processar o pagamento.',
        position: 'top-center',
        richColors: true
      })

      return
    }

    onClose?.()

    toast.info('Aguarde!', {
      description: 'Estamos processando o seu pagamento.',
      position: 'top-center',
      richColors: true
    })

    return response
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange()

        if (open === false) {
          onClose?.()
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pagamento com cartão de crédito</DialogTitle>
          <DialogDescription className="flex gap-2 items-center">
            Informe os dados do cartão
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="py-4">
            <CardElement
              options={{
                disableLink: true,
                hidePostalCode: true
              }}
            />
          </div>

          <DialogFooter className="place-self-start mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending} onClick={onClose}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" isLoading={isPending}>
              Confirmar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
