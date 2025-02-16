'use server'

import { httpClientFetch } from '@m-care/features/@shared/lib'
import { ResponseConfig } from '@m-care/features/@shared/lib/client-fetch'

interface CreateSubscriptionResponse {
  success: boolean
}

interface CreateSubscriptionBody {
  paymentMethodId: string
  planId: string
}

export const createSubscription = async (
  data: CreateSubscriptionBody
): Promise<ResponseConfig<CreateSubscriptionResponse>> => {
  const { paymentMethodId, planId } = data

  const [error, response] = await httpClientFetch<CreateSubscriptionResponse>({
    method: 'POST',
    url: '/payments/create-subscription',
    data: {
      planId,
      paymentMethodId
    }
  })

  if (error) {
    return [error, null]
  }

  return [null, response]
}
