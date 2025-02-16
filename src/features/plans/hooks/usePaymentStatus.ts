import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { io } from 'socket.io-client'
import { toast } from 'sonner'
import { env } from '@m-care/env'

const socket = io(`${env.NEXT_PUBLIC_API_URL}/websocket/payment-events`)

interface SocketMessage {
  companyId: string
  event: 'payment_intent.payment_failed' | 'payment_intent.succeeded'
}

interface UsePaymentStatusParams {
  onApproved?: VoidFunction
  onFailed?: VoidFunction
}

export const usePaymentStatus = ({
  onApproved,
  onFailed
}: UsePaymentStatusParams) => {
  const router = useRouter()

  useEffect(() => {
    const companyId = '01JM5WV6SA7SJVZGZ8WV0T9057'
    socket.emit('subscribeToCompany', { companyId })

    socket.on('payment-status', (data: SocketMessage) => {
      if (data.event === 'payment_intent.succeeded') {
        toast.success('Sucesso!', {
          description: 'Pagamento aprovado.',
          position: 'top-center',
          duration: Infinity,
          action: {
            label: 'Começar',
            onClick: () => router.push('/home')
          }
        })

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

        onFailed?.()

        return
      }
    })

    return () => {
      socket.off('payment-status')
      socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
