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
import { formatToMonetaryValue } from '@m-care/features/@shared/utils'

interface PlanPaymentModalProps extends DialogProps {
  selectedPlan: {
    id: string
    name: string
    price: string | number
  }
}

export const PlanPaymentModal = ({
  selectedPlan,
  isOpen,
  onOpenChange,
  onClose
}: PlanPaymentModalProps) => {
  const [isPending, setIsPending] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const { id, price, name } = selectedPlan

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !id) {
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
      planId: id
    })

    setIsPending(false)

    if (!!error || !!paymentMethodError) {
      toast.error('Erro', {
        description: 'Ocorreu um erro ao processar o pagamento.',
        position: 'top-center',
        id: 'after-payment'
      })

      return
    }

    onClose?.()

    toast.loading('Aguarde!', {
      description: 'Estamos processando o seu pagamento.',
      position: 'top-center',
      id: 'after-payment'
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

        <dl>
          <div className="flex justify-between">
            <dt className="text-sm text-zinc-500">Plano selecionado</dt>
            <dd className="font-medium">{name}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-sm text-zinc-500">Preço</dt>
            <dd className="font-medium">{formatToMonetaryValue(price)}</dd>
          </div>
        </dl>

        <form onSubmit={onSubmit}>
          <div className="py-4">
            <CardElement
              options={{
                disableLink: true,
                hidePostalCode: true,
                iconStyle: 'solid'
              }}
              onChange={(event) => {
                setFormIsValid(event.complete)
              }}
            />
          </div>

          <DialogFooter className="place-self-start mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={isPending}
                onClick={onClose}
                size="lg"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              isLoading={isPending}
              disabled={!formIsValid || isPending}
              size="lg"
            >
              Pagar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
