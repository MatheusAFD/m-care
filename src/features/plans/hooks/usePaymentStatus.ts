import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { io } from 'socket.io-client'
import { toast } from 'sonner'

import { env } from '@m-care/env'
import { useGetMe } from '@m-care/features/@shared/hooks'

interface SocketMessage {
  companyId: string
  event: 'payment_intent.payment_failed' | 'payment_intent.succeeded'
}

interface UsePaymentStatusParams {
  onApproved?: VoidFunction
  onFailed?: VoidFunction
}
const socket = io(`${env.NEXT_PUBLIC_API_URL}/websocket/payment-events`)

export const usePaymentStatus = ({
  onApproved,
  onFailed
}: UsePaymentStatusParams) => {
  const router = useRouter()

  const { data, refetch } = useGetMe()

  const companyId = data?.companyId

  useEffect(() => {
    if (!companyId) {
      return
    }

    socket.emit('subscribeToCompany', { companyId })

    socket.on('payment-status', (data: SocketMessage) => {
      if (data.event === 'payment_intent.succeeded') {
        toast.success('Sucesso!', {
          description: 'Pagamento aprovado.',
          position: 'top-center',
          duration: Infinity,
          action: {
            label: 'Começar',
            onClick: () => router.push('/auth/refresh')
          }
        })

        refetch()

        onApproved?.()

        socket.off('payment-status')
        socket.disconnect()

        return
      }

      if (data.event === 'payment_intent.payment_failed') {
        toast.error('Falha!', {
          description: 'Ocorreu um erro ao processar o pagamento.',
          position: 'top-center',
          duration: 8000
        })

        refetch()

        onFailed?.()

        return
      }
    })

    return () => {
      socket.off('payment-status')
      socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId])
}
